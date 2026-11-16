import { getUserPosts } from "@/lib/api";

export default async function RecentPosts() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const posts = await getUserPosts(1);

  return (
    <section>
      <h2>Recent Posts</h2>

      {posts.slice(0, 5).map((post: { id: number; title: string }) => (
        <article key={post.id}>
          <h3>{post.title}</h3>
        </article>
      ))}
    </section>
  );
}
