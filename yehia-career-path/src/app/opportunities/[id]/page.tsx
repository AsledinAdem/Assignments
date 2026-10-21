import Link from "next/link";
import { notFound } from "next/navigation";
import opportunities from "../../../data/opportunities.js";

const SingleOpportunity = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const opportunity = opportunities.find((item) => String(item.id) === id);

  if (!opportunity) {
    notFound();
  }

  return (
    <div className="h-screen w-full p-5">
      <Link
        href="/opportunities"
        className="w-fit p-5 cursor-pointer hover:text-amber-500 transition-colors duration-300"
      >
        Back to opportunities
      </Link>

      <div className="mt-5 bg-slate-800/50 border border-slate-700/50 shadow-lg rounded-lg p-5">
        <div className="flex flex-col gap-5 text-slate-400 w-full mb-5">
          <h1 className="text-lg text-slate-300 font-semibold">
            {opportunity.title}
          </h1>
          <p className="text-amber-400">{opportunity.company}</p>
          <p className="text-blue-500">{opportunity.location}</p>
          <p>{opportunity.description}</p>
        </div>

        <button className="px-5 bg-amber-500 w-20 h-10 rounded-md text-slate-800 cursor-pointer">
          Apply
        </button>
      </div>
    </div>
  );
};

export default SingleOpportunity;
