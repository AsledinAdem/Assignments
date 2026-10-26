import React from "react";

export default function RecentPostsSuspense() {
  return (
    <section className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">
            stream
          </span>
          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
            Section 3 · Recent Posts Preview
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-high text-secondary font-label-sm text-label-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-ping"></span>
          Server Component + Suspense
        </span>
      </div>

      <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">
              hourglass_top
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
              Intentional 2-second delay for learning
            </span>
          </div>
          <span className="font-code-sm text-code-sm bg-surface-container-low px-2 py-1 rounded text-primary">
            &lt;Suspense fallback=&lbrace;&lt;Skeleton /&gt;&rbrace;&gt;
          </span>
        </div>

        {/* (a) Loading State (Suspense Fallback UI) */}
        <div className="flex flex-col gap-3 p-4 rounded-xl bg-surface-container-low">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-secondary">
              <svg
                className="animate-spin w-4 h-4 text-secondary flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  fill="currentColor"
                ></path>
              </svg>
              <span className="font-label-md text-label-md text-secondary font-semibold">
                Streaming Chunk: Loading recent posts...
              </span>
            </div>
            <span className="font-code-sm text-code-sm text-on-surface-variant">
              fallback.tsx
            </span>
          </div>

          {/* Skeleton Pulse Items */}
          <div className="space-y-3 pt-1">
            <div className="p-3 bg-surface-container-lowest rounded-lg animate-pulse flex flex-col gap-2">
              <div className="h-3.5 bg-surface-variant rounded-md w-4/5"></div>
              <div className="h-2.5 bg-surface-variant rounded-md w-1/3"></div>
            </div>
            <div className="p-3 bg-surface-container-lowest rounded-lg animate-pulse flex flex-col gap-2">
              <div className="h-3.5 bg-surface-variant rounded-md w-11/12"></div>
              <div className="h-2.5 bg-surface-variant rounded-md w-1/4"></div>
            </div>
            <div className="p-3 bg-surface-container-lowest rounded-lg animate-pulse flex flex-col gap-2">
              <div className="h-3.5 bg-surface-variant rounded-md w-2/3"></div>
              <div className="h-2.5 bg-surface-variant rounded-md w-2/5"></div>
            </div>
          </div>
        </div>

        {/* Divider label */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow bg-surface-container h-[1px]"></div>
          <span className="flex-shrink mx-3 font-code-sm text-code-sm text-on-surface-variant uppercase tracking-wider bg-surface-container-lowest px-2">
            Hydrated Stream Output
          </span>
          <div className="flex-grow bg-surface-container h-[1px]"></div>
        </div>

        {/* (b) Loaded State */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-tertiary text-[18px]">
                check_circle
              </span>
              Resolved Stream (HTML Streamed Directly)
            </span>
            <span className="font-code-sm text-code-sm text-tertiary font-medium">
              3 Posts Ready
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="p-3 bg-surface-container-low rounded-lg flex flex-col gap-1 transition-all hover:bg-surface-container">
              <div className="font-headline-sm text-headline-sm text-on-surface font-medium leading-snug">
                1. Victorious over the storms of data structures
              </div>
              <div className="flex items-center gap-3 font-code-sm text-code-sm text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">
                    schedule
                  </span>{" "}
                  2 min read
                </span>
                <span>•</span>
                <span>10m ago</span>
                <span>•</span>
                <span className="text-tertiary">#algorithms</span>
              </div>
            </div>

            <div className="p-3 bg-surface-container-low rounded-lg flex flex-col gap-1 transition-all hover:bg-surface-container">
              <div className="font-headline-sm text-headline-sm text-on-surface font-medium leading-snug">
                2. Optimizing Next.js 14 Server Actions and Caching
              </div>
              <div className="flex items-center gap-3 font-code-sm text-code-sm text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">
                    schedule
                  </span>{" "}
                  4 min read
                </span>
                <span>•</span>
                <span>42m ago</span>
                <span>•</span>
                <span className="text-tertiary">#nextjs</span>
              </div>
            </div>

            <div className="p-3 bg-surface-container-low rounded-lg flex flex-col gap-1 transition-all hover:bg-surface-container">
              <div className="font-headline-sm text-headline-sm text-on-surface font-medium leading-snug">
                3. Understanding React 19 Concurrent Rendering Primitives
              </div>
              <div className="flex items-center gap-3 font-code-sm text-code-sm text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">
                    schedule
                  </span>{" "}
                  6 min read
                </span>
                <span>•</span>
                <span>2h ago</span>
                <span>•</span>
                <span className="text-tertiary">#react</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
