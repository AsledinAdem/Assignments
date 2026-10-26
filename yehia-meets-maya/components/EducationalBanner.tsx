import React from "react";

export default function EducationalBanner() {
  return (
    <section className="mt-8 bg-surface-container-low rounded-2xl p-6 sm:p-7 shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="font-headline-md text-headline-md text-on-surface font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">
              architecture
            </span>
            Key Takeaways: Server vs. Client Components
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Server Components keep zero bundle overhead on the client while Suspense prevents slow endpoints from blocking the full page paint. Client components retain interactivity and granular state.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 font-code-sm text-code-sm text-on-surface-variant">
          <div className="px-3 py-1.5 bg-surface-container-lowest rounded-lg shadow-sm">
            RSC: Zero Bundle
          </div>
          <div className="px-3 py-1.5 bg-surface-container-lowest rounded-lg shadow-sm">
            Suspense: Streamed HTML
          </div>
          <div className="px-3 py-1.5 bg-surface-container-lowest rounded-lg shadow-sm">
            &apos;use client&apos;: Full Interactivity
          </div>
        </div>
      </div>
    </section>
  );
}
