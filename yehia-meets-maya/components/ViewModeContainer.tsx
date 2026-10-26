"use client";

import React, { useState } from "react";
import Header from "./Header";
import PostsExplorer from "./PostsExplorer";
import EmployeeProfileServer from "./EmployeeProfileServer";
import RecentPostsSuspense from "./RecentPostsSuspense";
import EducationalBanner from "./EducationalBanner";
import Footer from "./Footer";
import type { Employee, ViewMode } from "@/types";

interface ViewModeContainerProps {
  initialEmployee?: Employee;
}

export default function ViewModeContainer({
  initialEmployee,
}: ViewModeContainerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("focus");

  return (
    <div className="min-h-full bg-surface text-on-surface flex flex-col">
      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full pt-20 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col w-full">
            {/* Top Intro */}
            <section className="mb-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm tracking-wide uppercase">
                    <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                    Next.js App Router Architecture Demo
                  </div>
                  <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mt-2">
                    server-side and client-side data Explorer
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                    A learning demo comparing server-side and client-side data
                    fetching. Explore hydration boundaries, asynchronous
                    streaming fallbacks, and real-time state transitions.
                  </p>
                </div>

                {/* Architecture Switcher */}
                <div className="flex items-center gap-2 self-start md:self-auto">
                  <div className="inline-flex items-center p-1 bg-surface-container rounded-xl gap-1 shadow-xs">
                    <button
                      type="button"
                      onClick={() => setViewMode("dual")}
                      className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm transition-all cursor-pointer ${
                        viewMode === "dual"
                          ? "bg-surface-container-lowest text-primary font-semibold shadow-xs"
                          : "text-on-surface-variant hover:text-on-surface font-medium"
                      }`}
                    >
                      Dual Architecture Mode
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("focus")}
                      className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm transition-all cursor-pointer ${
                        viewMode === "focus"
                          ? "bg-surface-container-lowest text-primary font-semibold shadow-xs"
                          : "text-on-surface-variant hover:text-on-surface font-medium"
                      }`}
                    >
                      Section 4 (Screen 7730964643467737935)
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Layout Mode 1: Exact Screen 7730964643467737935 */}
            {viewMode === "focus" && (
              <div className="grid grid-cols-1 gap-8 items-start">
                <div className="w-full flex flex-col gap-8">
                  <PostsExplorer />
                </div>
              </div>
            )}

            {/* Layout Mode 2: Full Dual-Column Architecture Mode */}
            {viewMode === "dual" && (
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-1  gap-8 items-start">
                  {/* Left Column: Server Architecture (5 Cols) */}
                  <div className="lg:col-span-5 flex flex-col gap-8">
                    <EmployeeProfileServer employee={initialEmployee} />
                    <RecentPostsSuspense />
                  </div>
                </div>

                <EducationalBanner />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
