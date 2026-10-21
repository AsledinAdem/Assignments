import Link from "next/link";

const app = () => {
  return (
    <div className=" h-screen  w-full px-5">
      <div className="flex flex-col justify-center gap-5 mt-10 mx-auto max-w-300">
        <h1 className="text-3xl font-semibold text-slate-200">
          Job application management <span className="text-amber-500"></span>
        </h1>

        <p className="max-w-150 leading-7 mb-5">
          This app is guide you to your goal and remember your path before you
          chase every opportunity, you need to remember your goal. You start
          with a clear goal.
        </p>

        <div className="flex gap-5">
          <Link
            href={"/plan"}
            className="bg-amber-500 hover:bg-amber-600 transition-colors duration-300 text-slate-900 rounded-md px-5 py-1"
          >
            Plan
          </Link>
          <Link
            href={"/opportunities"}
            className="border border-amber-500 rounded-md px-6 py-1 transition-colors duration-300 hover:bg-amber-500 hover:text-slate-900"
          >
            Opportunities
          </Link>
        </div>
      </div>
    </div>
  );
};

export default app;
