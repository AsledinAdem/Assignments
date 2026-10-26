import React from "react";
import ViewModeContainer from "@/components/ViewModeContainer";
import type { Employee } from "@/types";

async function getEmployee(): Promise<Employee | undefined> {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/2", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return undefined;
    return await res.json();
  } catch {
    return undefined;
  }
}

export default async function Page() {
  // Real Server Component data fetching on the server
  const employee = await getEmployee();

  return <ViewModeContainer initialEmployee={employee} />;
}