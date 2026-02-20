export interface ScrapeResult {
  site: string;
  navType: string;
  sections: {
    name: string;
    pages: {
      title: string;
      path: string;
      fullUrl: string;
      level: number;
      group: string;
    }[];
  }[];
}

export async function scrapeUrl(url: string): Promise<ScrapeResult> {
  const res = await fetch("/api/scrape", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data as ScrapeResult;
}
