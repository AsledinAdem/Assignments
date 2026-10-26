"use client";

import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex flex-col justify-center gap-0.5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">
              hub
            </span>
            <span className="font-headline-md text-headline-md text-on-surface tracking-tight">
              server-side and client-side Explorer
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-code-sm text-code-sm bg-surface-container-high text-primary font-medium tracking-wide uppercase">
              Demo Lab
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            A learning demo comparing server-side and client-side data fetching
          </p>
        </div>
      </div>
    </header>
  );
}
