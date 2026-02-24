// ─── Shared Conversion Engine ────────────────────────────────────────────
// Pure functions — works in both client (browser) and server (Node.js)
//
// Source (ReadMe.io):
//   { site, navType, tabs, sections: [{ name, pages: [{ title, path, fullUrl, level, group }] }] }
//
// Target (Documentation.AI):
//   { name, navigation: { products|versions|tabs|groups|pages } }

export function cleanSiteName(site) {
  let name = site
    .replace(/\.readme\.io$/i, "")
    .replace(/\.com$/i, "")
    .replace(/\.co$/i, "")
    .replace(/\.dev$/i, "");
  name = name.replace(/^(docs?[_.]|dev[_.])/i, "");
  return name
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export function cleanPath(path) {
  let p = path.replace(/^\/+/, "");
  p = p.replace(/^main\//, "");
  return p;
}

const METHOD_SUFFIXES = [
  ["delete", "DELETE"],
  ["patch", "PATCH"],
  ["options", "OPTIONS"],
  ["post", "POST"],
  ["head", "HEAD"],
  ["put", "PUT"],
  ["get", "GET"],
  ["del", "DELETE"],
];

export function guessHttpMethod(title) {
  const lower = title.toLowerCase().trim();
  for (const [suffix, method] of METHOD_SUFFIXES) {
    if (lower.endsWith(suffix) && lower.length > suffix.length) {
      return method;
    }
  }
  return null;
}

export function cleanMethodFromTitle(title) {
  const lower = title.toLowerCase().trim();
  for (const [suffix] of METHOD_SUFFIXES) {
    if (lower.endsWith(suffix) && lower.length > suffix.length) {
      const cleaned = title.slice(0, -suffix.length).trim();
      if (cleaned) return cleaned;
    }
  }
  return title;
}

export function buildPage(srcPage) {
  const page = { title: srcPage.title.trim(), path: cleanPath(srcPage.path || "") };
  const method = guessHttpMethod(srcPage.title);
  if (method) {
    page.method = method;
    page.title = cleanMethodFromTitle(srcPage.title);
  }
  return page;
}

export function buildNestedPages(pagesList) {
  const result = [];
  const stack = [];

  const minLevel = pagesList.length > 0
    ? Math.min(...pagesList.map((p) => p.level ?? 1))
    : 1;

  for (const srcPage of pagesList) {
    const level = srcPage.level ?? 1;
    const docPage = buildPage(srcPage);

    if (level <= minLevel) {
      result.push(docPage);
      stack.length = 0;
      stack.push([level, result]);
    } else {
      while (stack.length > 1 && stack[stack.length - 1][0] >= level) stack.pop();
      const parentContainer = stack.length > 0 ? stack[stack.length - 1][1] : result;

      if (parentContainer.length > 0) {
        const parent = parentContainer[parentContainer.length - 1];
        if (!parent.pages && !parent.group) {
          const nestedGroup = { group: parent.title, pages: [docPage] };
          parentContainer[parentContainer.length - 1] = nestedGroup;
          stack.push([level, nestedGroup.pages]);
        } else if (parent.pages) {
          parent.pages.push(docPage);
          stack.push([level, parent.pages]);
        } else {
          result.push(docPage);
        }
      } else {
        result.push(docPage);
      }
    }
  }
  return result;
}

export function groupPagesByGroupField(pages) {
  const order = [];
  const map = {};

  for (const page of pages) {
    const groupName = (page.group || "").trim() || "General";
    if (!map[groupName]) {
      map[groupName] = [];
      order.push(groupName);
    }
    map[groupName].push(page);
  }

  return order.map((name) => ({
    group: name,
    pages: buildNestedPages(map[name]),
  }));
}

function convertTabs(source) {
  const tabs = source.sections.map((section) => ({
    tab: section.name,
    groups: groupPagesByGroupField(section.pages),
  }));
  if (tabs.length === 1) return { groups: tabs[0].groups };
  return { tabs };
}

function convertSimple(source) {
  const allPages = source.sections.flatMap((s) => s.pages);
  return { groups: groupPagesByGroupField(allPages) };
}

function convertProjects(source) {
  const productsMap = new Map();

  for (const section of source.sections) {
    const parts = section.name.split("/", 2);
    const prodName = (parts[0] || section.name).trim().replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const tabName = (parts[1] || "Docs").trim();

    if (!productsMap.has(prodName)) productsMap.set(prodName, new Map());
    const tabsMap = productsMap.get(prodName);
    if (!tabsMap.has(tabName)) tabsMap.set(tabName, []);
    tabsMap.get(tabName).push(...groupPagesByGroupField(section.pages));
  }

  const products = [];
  for (const [prodName, tabsMap] of productsMap) {
    if (tabsMap.size === 1) {
      const groups = [...tabsMap.values()][0];
      products.push({ product: prodName, groups });
    } else {
      const tabs = [...tabsMap].map(([tabName, groups]) => ({ tab: tabName, groups }));
      products.push({ product: prodName, tabs });
    }
  }
  return { products };
}

export function convert(source) {
  const name = cleanSiteName(source.site || "Unknown");
  let navigation;

  switch (source.navType) {
    case "projects":
      navigation = convertProjects(source);
      break;
    case "tabs":
      navigation = convertTabs(source);
      break;
    default:
      navigation = convertSimple(source);
  }

  return { name, navigation };
}

export function countPages(obj) {
  if (!obj || typeof obj !== "object") return 0;
  let count = 0;
  if (Array.isArray(obj)) {
    for (const item of obj) count += countPages(item);
  } else {
    if (obj.title && obj.path) count = 1;
    for (const val of Object.values(obj)) {
      if (typeof val === "object") count += countPages(val);
    }
  }
  return count;
}
