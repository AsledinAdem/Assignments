import type { Employee, Post } from "@/types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getUser(userId: number): Promise<Employee> {
  const res = await fetch(`${BASE_URL}/users/${userId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}

export async function getUserPosts(userId: number): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}
