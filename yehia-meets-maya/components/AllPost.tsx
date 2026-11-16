"use client";

import { getUserPosts } from "@/lib/api";
import { Post } from "@/types";
import { useState } from "react";

export default function AllPost() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(false);
  // const [showAll, setShowAll] = useState(true);

  const allPosts = async () => {
    setLoading(true);
    try {
      const fetchedPosts: Post[] = await getUserPosts(1);
      setPosts(fetchedPosts);
      // setShowAll(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        className="bg-secondary text-on-secondary h-10 rounded-md cursor-pointer hover:bg-secondary-container"
        onClick={() => void allPosts()}
        disabled={loading}
      >
        {loading ? "Loading posts..." : "All posts"}
        {/* {loading
          ? "Loading posts..."
          : posts
            ? showAll
              ? "Show 3 posts"
              : "Show all posts"
            : "All posts"} */}
      </button>
      {posts && (
        <div className="state-panel flex flex-col gap-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 bg-surface-container-low rounded-xl flex flex-col gap-2 transition-all hover:shadow-sm border border-surface-container/60"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  {post.title}
                </h4>
                <span className="font-code-sm text-code-sm bg-surface-container px-2 py-0.5 rounded text-on-surface-variant shrink-0">
                  Post ID: #{post.id}
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {post.body}
              </p>
              <div className="flex items-center justify-between pt-1 font-label-sm text-label-sm text-on-surface-variant">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-medium">
                    JSONPlaceholder
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface">
                    userId: {post.userId}
                  </span>
                </div>
                <span>Fetched just now</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
