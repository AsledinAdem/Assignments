import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen p-5 mt-10 text-center">
      <h2 className="text-2xl font-semibold text-slate-300">
        Opportunity not found
      </h2>
      <p className="text-slate-400 mt-2">
        This opportunity does not exist or was removed.
      </p>
      <Link
        href="/opportunities"
        className="text-amber-400 underline mt-5 inline-block"
      >
        Back to opportunities
      </Link>
    </div>
  );
}
