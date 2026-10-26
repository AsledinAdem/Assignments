import React from "react";
import type { Employee } from "@/types";

interface EmployeeProfileServerProps {
  employee?: Employee;
}

const DEFAULT_EMPLOYEE: Employee = {
  id: 2,
  name: "Ervin Howell",
  username: "Antonette",
  email: "shanna@melissa.tv",
  address: {
    street: "Victor Plains",
    suite: "Suite 879",
    city: "Wisokyburgh",
    zipcode: "90566-7771",
    geo: { lat: "-43.9509", lng: "-34.4618" },
  },
  phone: "010-692-6593 x09125",
  website: "anastasia.net",
  company: {
    name: "Deckow-Crist",
    catchPhrase: "Proactive didactic contingency",
    bs: "synergize scalable supply-chains",
  },
};

export default function EmployeeProfileServer({
  employee = DEFAULT_EMPLOYEE,
}: EmployeeProfileServerProps) {
  const initials = employee.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">
            dns
          </span>
          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
            Section 2 · Employee Profile
          </span>
        </div>
        <span className="font-code-sm text-code-sm text-on-surface-variant">
          runtime: nodejs
        </span>
      </div>

      {/* 2A. Standard RSC Profile Card */}
      <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-5 relative overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-headline-md text-headline-md font-bold shadow-inner">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  {employee.name}
                </h3>
                <span
                  className="material-symbols-outlined text-secondary text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                UID: #JSONP-000{employee.id}
              </p>
            </div>
          </div>

          {/* RSC Paradigm Badge */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low text-tertiary font-label-sm text-label-sm font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
            Server Component
          </span>
        </div>

        {/* Metadata Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="bg-surface-container-low p-3 rounded-lg flex flex-col gap-0.5">
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">mail</span>{" "}
              Email
            </span>
            <span className="font-body-sm text-body-sm text-on-surface font-medium truncate">
              {employee.email}
            </span>
          </div>

          <div className="bg-surface-container-low p-3 rounded-lg flex flex-col gap-0.5">
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">
                domain
              </span>{" "}
              Company
            </span>
            <span className="font-body-sm text-body-sm text-on-surface font-medium truncate">
              {employee.company.name}
            </span>
          </div>

          <div className="bg-surface-container-low p-3 rounded-lg flex flex-col gap-0.5">
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">call</span>{" "}
              Phone
            </span>
            <span className="font-body-sm text-body-sm text-on-surface font-medium">
              {employee.phone}
            </span>
          </div>

          <div className="bg-surface-container-low p-3 rounded-lg flex flex-col gap-0.5">
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">
                public
              </span>{" "}
              Website
            </span>
            <span className="font-body-sm text-body-sm text-primary font-medium">
              {employee.website}
            </span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-on-surface-variant">
          <span className="font-code-sm text-code-sm text-tertiary flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">memory</span>{" "}
            Direct DB / Fetch pre-render
          </span>
          <span className="font-code-sm text-code-sm">RTT: 12ms</span>
        </div>
      </div>

      {/* 2B. Friendly Error Card Variant (Error Boundary Fallback) */}
      <div className="bg-error-container/40 rounded-xl p-5 flex flex-col gap-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-error">
            <span className="material-symbols-outlined text-[20px]">warning</span>
            <h4 className="font-headline-sm text-headline-sm font-semibold">
              Server Error State: Fallback UI
            </h4>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-on-error"></span>
            Server Component • Error Boundary
          </span>
        </div>

        <div className="bg-surface-container-lowest/80 rounded-lg p-4 flex flex-col gap-2">
          <p className="font-body-md text-body-md text-error font-semibold flex items-center gap-1.5">
            We couldn&apos;t load the profile right now
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Simulated backend timeout or failed upstream microservice. No retry
            button rendered for this static server error; request failed before
            HTTP header transmission.
          </p>
        </div>

        <div className="flex items-center justify-between font-code-sm text-code-sm text-on-surface-variant">
          <span>error.tsx caught segment fault</span>
          <span className="text-error font-mono">STATUS: 504_GATEWAY_TIMEOUT</span>
        </div>
      </div>
    </section>
  );
}
