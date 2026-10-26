"use client";

import React, { useState, useTransition, useCallback } from "react";
import type { Post, DemoScenario, PanelState } from "@/types";

const DEFAULT_POSTS: Post[] = [
  {
    id: 1,
    userId: 2,
    title: "sunt aut facere repellat provident occaecati excepturi optio",
    body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto.",
  },
  {
    id: 2,
    userId: 2,
    title: "qui est esse repudiandae et dolorum quidem aliquam qui",
    body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis.",
  },
  {
    id: 3,
    userId: 2,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut.",
  },
];

export default function PostsExplorer() {
  const [scenario, setScenario] = useState<DemoScenario>("success");
  const [activeState, setActiveState] = useState<PanelState>("success");
  const [latencyMs, setLatencyMs] = useState<number>(24);
  const [posts, setPosts] = useState<Post[]>(DEFAULT_POSTS);
  const [, startTransition] = useTransition();

  const runScenario = useCallback(
    async (targetScenario?: DemoScenario) => {
      const selected = targetScenario ?? scenario;
      setActiveState("loading");
      const startTime = performance.now();

      try {
        const response = await fetch(
          `/api/posts?userId=2&scenario=${selected}`,
          {
            cache: "no-store",
          },
        );

        const elapsed = Math.round(performance.now() - startTime);
        setLatencyMs(elapsed);

        if (!response.ok) {
          startTransition(() => {
            setActiveState("error");
          });
          return;
        }

        const data: Post[] = await response.json();

        startTransition(() => {
          if (!data || data.length === 0) {
            setPosts([]);
            setActiveState("empty");
          } else {
            setPosts(data);
            setActiveState("success");
          }
        });
      } catch {
        const elapsed = Math.round(performance.now() - startTime);
        setLatencyMs(elapsed);
        startTransition(() => {
          setActiveState("error");
        });
      }
    },
    [scenario],
  );

  const handleScenarioReset = (val: DemoScenario) => {
    setScenario(val);
    runScenario(val);
  };

  return (
    <section className="flex flex-col gap-4">
      {/* Section 4 Header */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">
              devices
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
              Section 4 · Posts Explorer
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Client-side lifecycle, streaming &amp; state transitions
            </span>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-surface-container-lowest rounded-xl p-6 sm:p-7 shadow-sm flex flex-col gap-6">
        {/* Top Scenario Selector & Run Button */}
        <div className="bg-surface-container-low p-4 sm:p-5 rounded-xl border border-surface-container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3 w-full">
            <label
              className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5 flex-shrink-0"
              htmlFor="demo-scenario-select"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">
                tune
              </span>
              Demo scenario:
            </label>
            <div className="relative flex-1 max-w-sm">
              <select
                id="demo-scenario-select"
                value={scenario}
                onChange={(e) => setScenario(e.target.value as DemoScenario)}
                className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-3.5 py-2 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary shadow-sm pr-9"
              >
                <option value="success">Success (default)</option>
                <option value="slow">Slow (3s delay)</option>
                <option value="error">HTTP error (500)</option>
                <option value="empty">Empty (0 records)</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                unfold_more
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant hidden lg:inline-block">
              Simulates next request
            </span>
          </div>
          <button
            id="trigger-load-btn"
            type="button"
            disabled={activeState === "loading"}
            onClick={() => runScenario()}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-medium shadow-md transition-all hover:bg-primary-container active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex-shrink-0 cursor-pointer disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-[18px]">
              play_arrow
            </span>
            <span>
              {activeState === "loading" ? "Loading..." : "Load posts"}
            </span>
          </button>
        </div>

        {/* State Showcase Segment Selector */}
        <div className="flex flex-col gap-2 pt-1">
          <div className="flex items-center justify-between px-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">
                view_carousel
              </span>
              State Showcase Segment Selector
            </span>
            <span className="font-code-sm text-code-sm text-secondary bg-surface-container px-2 py-0.5 rounded-md">
              Interactive Mode Active
            </span>
          </div>
          <div className="grid grid-cols-5 p-1 bg-surface-container rounded-xl gap-1">
            {(
              [
                { id: "idle", label: "1. Idle" },
                { id: "loading", label: "2. Loading" },
                { id: "success", label: "3. Success" },
                { id: "empty", label: "4. Empty" },
                { id: "error", label: "5. Error" },
              ] as const
            ).map((tab) => {
              const isActive = activeState === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveState(tab.id)}
                  className={`state-tab-btn py-2 px-1 text-center font-label-sm text-label-sm rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? "font-semibold bg-surface-container-lowest text-primary shadow-sm"
                      : "font-medium text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* State Content Area */}
        <div className="min-h-95 flex flex-col justify-center">
          {/* 1. Idle Panel */}
          {activeState === "idle" && (
            <div
              id="panel-idle"
              className="state-panel flex flex-col items-center justify-center p-8 text-center bg-surface-container-low rounded-xl"
            >
              <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-3">
                <span className="material-symbols-outlined text-[28px]">
                  touch_app
                </span>
              </div>
              <h4 className="font-headline-md text-headline-md font-semibold text-on-surface">
                Client Component Idle
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mt-1 mb-4">
                Click the button to load posts from JSONPlaceholder via
                client-side fetch lifecycle.
              </p>
              <button
                type="button"
                onClick={() => runScenario("success")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-medium shadow-sm hover:bg-primary-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  download
                </span>
                Load posts
              </button>
            </div>
          )}

          {/* 2. Loading Panel */}
          {activeState === "loading" && (
            <div id="panel-loading" className="state-panel flex flex-col gap-4">
              <div className="p-3.5 bg-surface-container-high text-primary rounded-lg flex items-center gap-3">
                <svg
                  className="animate-spin w-5 h-5 text-primary flex-shrink-0"
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
                <div className="flex-1">
                  <span className="font-label-md text-label-md font-semibold">
                    Client Fetching In Progress
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Fetching posts from JSONPlaceholder via client fetch()...
                  </p>
                </div>
                <button
                  disabled
                  type="button"
                  className="opacity-60 px-3.5 py-1.5 rounded-md bg-primary text-on-primary font-label-sm text-label-sm cursor-not-allowed"
                >
                  Loading...
                </button>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-surface-container-low rounded-xl animate-pulse space-y-2.5">
                  <div className="h-4 bg-surface-variant rounded w-3/4"></div>
                  <div className="h-3 bg-surface-variant rounded w-full"></div>
                  <div className="h-3 bg-surface-variant rounded w-5/6"></div>
                  <div className="flex gap-2 pt-2">
                    <div className="h-5 bg-surface-variant rounded-full w-14"></div>
                    <div className="h-5 bg-surface-variant rounded-full w-20"></div>
                  </div>
                </div>
                <div className="p-4 bg-surface-container-low rounded-xl animate-pulse space-y-2.5">
                  <div className="h-4 bg-surface-variant rounded w-2/3"></div>
                  <div className="h-3 bg-surface-variant rounded w-full"></div>
                  <div className="h-3 bg-surface-variant rounded w-4/5"></div>
                  <div className="flex gap-2 pt-2">
                    <div className="h-5 bg-surface-variant rounded-full w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. Success Panel */}
          {activeState === "success" && (
            <div id="panel-success" className="state-panel flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 px-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  Rendering {posts.length} client-hydrated records
                </span>
                <span className="font-code-sm text-code-sm text-tertiary bg-surface-container-high px-2 py-0.5 rounded">
                  HTTP 200 OK • {latencyMs}ms
                </span>
              </div>

              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 bg-surface-container-low rounded-xl flex flex-col gap-2 transition-all hover:shadow-sm border border-surface-container/60"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      {post.title}
                    </h4>
                    <span className="font-code-sm text-code-sm bg-surface-container px-2 py-0.5 rounded text-on-surface-variant flex-shrink-0">
                      ID: #{post.id}
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

          {/* 4. Empty Panel */}
          {activeState === "empty" && (
            <div
              id="panel-empty"
              className="state-panel flex flex-col items-center justify-center p-8 text-center bg-surface-container-low rounded-xl"
            >
              <div className="w-16 h-16 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-[32px]">
                  folder_off
                </span>
              </div>
              <h4 className="font-headline-md text-headline-md font-semibold text-on-surface">
                No posts found
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mt-1 mb-4">
                The server returned an empty array for this query. No records
                exist for the selected employee ID.
              </p>
              <button
                type="button"
                onClick={() => handleScenarioReset("success")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md font-medium shadow-sm hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">
                  restart_alt
                </span>
                Reset Query
              </button>
            </div>
          )}

          {/* 5. Error Panel */}
          {activeState === "error" && (
            <div
              id="panel-error"
              className="state-panel flex flex-col gap-4 p-6 rounded-xl bg-error-container/40"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-error text-on-error flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">
                    error
                  </span>
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-headline-md text-headline-md font-semibold text-error">
                    Something went wrong while loading posts
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    The client-side fetch operation encountered an upstream
                    failure during network transport.
                  </p>
                </div>
              </div>
              <div className="p-3.5 bg-surface-container-lowest/90 rounded-lg flex items-center justify-between font-code-sm text-code-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-error"></span>
                  <span className="text-error font-semibold">
                    HTTP 500: Internal Server Error
                  </span>
                </div>
                <span className="text-on-surface-variant">
                  Origin: /api/posts?userId=2
                </span>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => runScenario()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-error text-on-error font-label-md text-label-md font-semibold shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    refresh
                  </span>
                  Retry
                </button>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  or switch demo scenario from selector
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
