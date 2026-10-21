import Link from "next/link.js";
import opportunities from "../../data/opportunities.js";
const page = () => {
  return (
    <div className="min-h-full mt-10 mx-auto max-w-300 flex flex-col item-center space-y-10 px-10 overflow-hidden ">
      <div className="flex flex-wrap gap-5 mt-10 mx-auto max-w-325 px-5 ">
        {opportunities.map((oportunity) => (
          <Link href={`/opportunities/${oportunity.id}`} key={oportunity.id}>
            <div className="flex flex-col gap-5 bg-slate-800/50 rounded-lg shadow-lg text-slate-400 p-5 sm:max-w-80 cursor-pointer hover:bg-slate-700/40 transition-color duration-300 w-full border border-slate-700/50 hover:scale-98 hover:border-amber-500">
              <h1 className="text-lg text-slate-300 font-semibold">
                {oportunity.title}
              </h1>
              <p className="text-amber-400">{oportunity.company}</p>
              <p className="text-blue-500">{oportunity.location}</p>
              <p>{oportunity.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
