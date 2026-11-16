import { getUser } from "@/lib/api";

export default async function UserProfile() {
  const user = await getUser(1);

  return (
    <section>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.username}</p>
    </section>
  );
}
