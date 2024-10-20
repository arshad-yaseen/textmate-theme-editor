import { NextResponse } from "next/server";

interface CodeSnippet {
  name: string;
  path: string;
  repository: {
    full_name: string;
    html_url: string;
  };
  url: string;
  html_url: string;
  content: string;
}

const MAX_CONTENT_LENGTH = 500 * 80;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get("language");

  if (!language) {
    return NextResponse.json(
      { error: "Language parameter is required." },
      { status: 400 }
    );
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: "GitHub token is not configured." },
      { status: 500 }
    );
  }

  const GITHUB_API_URL = "https://api.github.com/search/code";
  const PER_PAGE = 30;

  try {
    // Step 1: Get the total count of code snippets for the language
    const searchParamsCount = new URLSearchParams({
      q: `language:${language}`,
      per_page: "1",
    });

    const countResponse = await fetch(
      `${GITHUB_API_URL}?${searchParamsCount.toString()}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    if (!countResponse.ok) {
      const errorData = await countResponse.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to fetch data from GitHub." },
        { status: countResponse.status }
      );
    }

    const countData = await countResponse.json();
    const totalCount: number = Math.min(countData.total_count, 1000);

    if (totalCount === 0) {
      return NextResponse.json(
        { error: "No code snippets found for the specified language." },
        { status: 404 }
      );
    }

    // Step 2: Randomly select a page
    const totalPages = Math.ceil(totalCount / PER_PAGE);
    const randomPage = Math.floor(Math.random() * totalPages) + 1;

    const searchParamsPage = new URLSearchParams({
      q: `language:${language}`,
      per_page: PER_PAGE.toString(),
      page: randomPage.toString(),
    });

    const pageResponse = await fetch(
      `${GITHUB_API_URL}?${searchParamsPage.toString()}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    if (!pageResponse.ok) {
      const errorData = await pageResponse.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to fetch data from GitHub." },
        { status: pageResponse.status }
      );
    }

    const pageData = await pageResponse.json();
    const items = pageData.items;

    if (items.length === 0) {
      return NextResponse.json(
        { error: "No code snippets found on the selected page." },
        { status: 404 }
      );
    }

    // Step 3: Randomly select a code snippet from the page
    let validSnippet = null;
    let attempts = 0;
    const maxAttempts = items.length;

    while (!validSnippet && attempts < maxAttempts) {
      const randomIndex = Math.floor(Math.random() * items.length);
      const randomSnippet = items[randomIndex];

      // Step 4: Fetch the actual code content
      const contentResponse = await fetch(randomSnippet.url, {
        headers: {
          Accept: "application/vnd.github.v3.raw",
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      });

      if (contentResponse.ok) {
        const codeContent = await contentResponse.text();
        if (codeContent.length <= MAX_CONTENT_LENGTH) {
          validSnippet = { ...randomSnippet, content: codeContent };
          break;
        }
      }

      attempts++;
    }

    if (!validSnippet) {
      return NextResponse.json(
        { error: "No code snippets found with less than 500 lines." },
        { status: 404 }
      );
    }

    return NextResponse.json({ codeSnippet: validSnippet });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unknown error occurred." },
      { status: 500 }
    );
  }
}
