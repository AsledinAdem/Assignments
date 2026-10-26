import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/types";

const FALLBACK_POSTS: Post[] = [
  {
    userId: 2,
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio",
    body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto.",
  },
  {
    userId: 2,
    id: 2,
    title: "qui est esse repudiandae et dolorum quidem aliquam qui",
    body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis.",
  },
  {
    userId: 2,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut.",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || "2";
  const scenario = searchParams.get("scenario") || "success";

  // Scenario: HTTP 500 Error
  if (scenario === "error") {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message:
          "The client-side fetch operation encountered an upstream failure during network transport.",
        origin: `/api/posts?userId=${userId}`,
      },
      { status: 500 },
    );
  }

  // Scenario: Slow response (3 seconds delay)
  if (scenario === "slow") {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  // Scenario: Empty (0 records)
  if (scenario === "empty") {
    return NextResponse.json([], { status: 200 });
  }

  // Scenario: Success
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=3`,
      { cache: "no-store" },
    );
    if (!res.ok) {
      return NextResponse.json(FALLBACK_POSTS, { status: 200 });
    }
    const data: Post[] = await res.json();
    return NextResponse.json(data.length > 0 ? data : FALLBACK_POSTS, {
      status: 200,
    });
  } catch {
    return NextResponse.json(FALLBACK_POSTS, { status: 200 });
  }
}
