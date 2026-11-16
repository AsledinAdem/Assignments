import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PostsExplorer from "@/components/PostsExplorer";

export default function page() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between gap-5 ">
      <Header />
      <PostsExplorer />
      <Footer />
    </div>
  );
}
