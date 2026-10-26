import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low shadow-[0_-1px_8px_rgba(0,0,0,0.02)] py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Fictional data from JSONPlaceholder. Demo scenarios are simulated.
        </p>
        <div className="flex items-center gap-2 text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px]">school</span>
          <span className="font-label-sm text-label-sm font-medium">
            React Server Components vs. Client Hydration
          </span>
        </div>
      </div>
    </footer>
  );
}
