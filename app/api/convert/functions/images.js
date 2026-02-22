import { FETCH_TIMEOUT_MS } from "./types.js";

// ── Image URL patterns to extract ────────────────────────────
// Matches both markdown images and JSX/HTML src attributes
const IMAGE_PATTERNS = [
  // Markdown: ![alt](url)
  /!\[([^\]]*)\]\(([^)\s]+)\)/g,
  // JSX/HTML: src="url" or src='url'
  /<(?:img|Image)\s[^>]*?\bsrc\s*=\s*(["'])([^"']+)\1/gi,
];

// ── File extension → MIME type ───────────────────────────────
const EXT_TO_MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".bmp": "image/bmp",
  ".avif": "image/avif",
};

// ── Extract all image URLs from content ──────────────────────
// Strips fenced code blocks and inline code first to avoid
// extracting URLs from code examples.
export function extractImageUrls(content) {
  const urls = new Set();

  // Remove fenced code blocks before scanning
  let scannable = content.replace(/^[ \t]*```[\s\S]*?^[ \t]*```[ \t]*$/gm, "");
  // Remove inline code
  scannable = scannable.replace(/`[^`]+`/g, "");

  for (const pattern of IMAGE_PATTERNS) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(scannable)) !== null) {
      const url = match[2];
      if (url && /^https?:\/\//.test(url)) {
        urls.add(url);
      }
    }
  }

  return [...urls];
}

// ── Generate a clean filename from a URL ─────────────────────
//
// ReadMe CDN URLs have two patterns:
//   Long hash:  867d99eff426a6cb9cf9aefc55d5a98b36a37cc4b655847446d74fbe80b068bc-small-square_mark.png
//   Short hash: f4da170-63dac30a52f18e3f1fb3cc33_datafiniti-logo-black-p-500.png
//   Mixed:      09308c19ef5679c6c442944d6110ca679093450ba9364b1caa8aaa05b67cb768-image.png
//
// Strategy: for files.readme.io URLs, strip everything before
// the LAST recognizable name part. For other URLs, just use
// the filename as-is.
function urlToFilename(url, index) {
  try {
    const parsed = new URL(url);
    let pathname = parsed.pathname.replace(/^\//, "");

    const segments = pathname.split("/");
    let filename = segments[segments.length - 1] || `image-${index}`;
    filename = decodeURIComponent(filename);

    // For ReadMe CDN: strip long hex prefix
    // Match: 8+ hex chars followed by a dash
    if (parsed.hostname.includes("readme.io") || /^[a-f0-9]{8,}-/.test(filename)) {
      // Find the last segment that looks like a human name
      // Strategy: remove leading hex-hash prefix(es)
      // "867d99e...b068bc-small-square_mark.png" → "small-square_mark.png"
      // "f4da170-63dac30a...cc33_datafiniti-logo-black-p-500.png" → "datafiniti-logo-black-p-500.png"
      const parts = filename.split(/[-_]/);
      // Find the first non-hex part (a part that contains non-hex chars)
      let startIdx = 0;
      for (let i = 0; i < parts.length; i++) {
        if (/^[a-f0-9]+$/i.test(parts[i]) && parts[i].length >= 6) {
          startIdx = i + 1; // skip this hex part
        } else {
          break;
        }
      }
      if (startIdx > 0 && startIdx < parts.length) {
        // Reconstruct from the first non-hex part
        // Preserve the original separator between parts
        let pos = 0;
        for (let i = 0; i < startIdx; i++) {
          pos += parts[i].length + 1; // +1 for the separator
        }
        filename = filename.substring(pos);
      }
    }

    // Sanitize: keep only safe characters
    filename = filename.replace(/[^a-zA-Z0-9._-]/g, "_");

    // Ensure it has an extension
    if (!/\.\w{2,5}$/.test(filename)) {
      filename += ".png";
    }

    // Collapse multiple underscores/dashes
    filename = filename.replace(/[_-]{2,}/g, "-");

    return filename;
  } catch {
    return `image-${index}.png`;
  }
}

// ── Download a single image ──────────────────────────────────
async function downloadImage(url, timeoutMs = FETCH_TIMEOUT_MS) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "image/*,*/*",
      },
      redirect: "follow",
    });

    clearTimeout(timer);

    if (!res.ok) {
      console.warn(`[images] Failed to download ${url}: ${res.status}`);
      return null;
    }

    // Check content type
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.startsWith("image/") && !contentType.includes("octet-stream")) {
      console.warn(`[images] Not an image: ${url} (${contentType})`);
      return null;
    }

    const buffer = await res.arrayBuffer();

    // 10MB max per image
    if (buffer.byteLength > 10 * 1024 * 1024) {
      console.warn(`[images] Image too large: ${url} (${buffer.byteLength} bytes)`);
      return null;
    }

    return {
      buffer: Buffer.from(buffer),
      mimeType: contentType.split(";")[0].trim() || "image/png",
      size: buffer.byteLength,
    };
  } catch (err) {
    console.warn(`[images] Download error for ${url}:`, err.message);
    return null;
  }
}

// ── Determine MIME type from URL if not provided ─────────────
function guessMimeType(url, downloadedMime) {
  if (downloadedMime && downloadedMime !== "application/octet-stream") {
    return downloadedMime;
  }
  const ext = url.match(/\.(\w{2,5})(?:\?|#|$)/);
  if (ext) {
    return EXT_TO_MIME[`.${ext[1].toLowerCase()}`] || "image/png";
  }
  return "image/png";
}

// ════════════════════════════════════════════════════════════
//  MAIN: Download all images to a folder, rewrite URLs
//
//  ReadMe's CDN sets Content-Disposition: attachment, so
//  browsers download images instead of displaying them.
//
//  Fix: download each image, save to disk, and rewrite
//  the MDX to use local relative paths.
//
//  The user then uploads the images folder to Documentation.AI.
//
//  Returns:
//    {
//      content: string,        — MDX with local paths
//      images: [{ filename, mimeType, originalUrl, size, localPath }],
//      failed: string[],       — URLs that failed to download
//      outputDir: string,      — where images were saved
//    }
// ════════════════════════════════════════════════════════════

export async function downloadAndReplaceImages(content, outputDir = null) {
  const urls = extractImageUrls(content);

  if (urls.length === 0) {
    return { content, images: [], failed: [], outputDir: null };
  }

  // Create output directory
  const fs = await import("fs");
  const path = await import("path");

  if (!outputDir) {
    outputDir = path.default.join(process.cwd(), "public", "images", "imported");
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const images = [];
  const failed = [];
  const urlToLocal = new Map();
  const usedFilenames = new Set();

  // Download all images in parallel (max 5 concurrent)
  const batchSize = 5;
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(async (url, batchIdx) => {
        const globalIdx = i + batchIdx;
        const downloaded = await downloadImage(url);

        if (!downloaded) {
          failed.push(url);
          return null;
        }

        // Generate unique filename
        let filename = urlToFilename(url, globalIdx);
        if (usedFilenames.has(filename)) {
          const ext = filename.match(/(\.\w+)$/)?.[1] || ".png";
          const base = filename.replace(/\.\w+$/, "");
          filename = `${base}-${globalIdx}${ext}`;
        }
        usedFilenames.add(filename);

        // Save to disk
        const filePath = path.default.join(outputDir, filename);
        fs.writeFileSync(filePath, downloaded.buffer);

        const mimeType = guessMimeType(url, downloaded.mimeType);
        const localPath = `/images/imported/${filename}`;

        urlToLocal.set(url, localPath);

        return {
          filename,
          mimeType,
          originalUrl: url,
          size: downloaded.size,
          localPath: filePath,
        };
      })
    );

    for (const r of results) {
      if (r) images.push(r);
    }
  }

  // Replace URLs in content
  let updatedContent = content;
  for (const [originalUrl, localPath] of urlToLocal) {
    const escaped = originalUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    updatedContent = updatedContent.replace(new RegExp(escaped, "g"), localPath);
  }

  return { content: updatedContent, images, failed, outputDir };
}