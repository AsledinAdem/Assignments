import { getUser, getUserPosts } from "@/lib/api";
import { Employee, Post } from "@/types";
import { Suspense } from "react";
import AllPost from "./AllPost";

async function UserPanel() {
  const user: Employee = await getUser(1);

  return (
    <div className="p-4 bg-surface-container-low rounded-xl flex flex-col gap-1 transition-all hover:shadow-sm border border-surface-container/60 text-gray-500">
      <h2 className="font-bold text-xl text-black">{user.name}</h2>
      <p>User Name: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Compnay Name: {user.company.name}</p>
    </div>
  );
}

async function PostsPanel() {
  const posts: Post[] = await getUserPosts(1);

  return (
    <div className="state-panel flex flex-col gap-3">
      {posts.slice(0, 3).map((post) => (
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
  );
}

export default function PostsExplorer() {
  return (
    <div>
      <section className="flex flex-col gap-4 mx-auto max-w-6xl mt-30 px-6">
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
                Posts Explorer
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                JSONPlaceholder that combine user and posts.
              </span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-surface-container-lowest rounded-xl p-6 sm:p-7 shadow-sm flex flex-col gap-6">
          {/* State Content Area */}

          <div className="min-h-95 flex flex-col  gap-5">
            {/* 3. Success Panel */}
            <p>User</p>
            <Suspense fallback={<p>Loading user .....</p>}>
              <UserPanel />
            </Suspense>
            {/* posts */}
            <p>Posts</p>
            <Suspense fallback={<p>Loading posts .....</p>}>
              <PostsPanel />
            </Suspense>
          </div>
          <AllPost />
        </div>
      </section>
    </div>
  );
}
