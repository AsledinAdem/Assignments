import opportunities from "../../../../data/applications.js";

const detailApplication = async ({
  params,
}: {
  params: Promise<{ status: string }>;
}) => {
  const { status: rawStatus } = await params;
  const status = decodeURIComponent(rawStatus);
  const filtered = opportunities.filter((app) => app.status === status);

  return (
    <div className="min-h-screen mt-10 mx-auto md:max-w-325 px-10 py-5 w-full">
      <div className="flex flex-wrap gap-5 mt-10 w-full px-5">
        {filtered.length === 0 && <p>No applications with this status.</p>}
        {filtered.map((select) => (
          <div
            key={select.id}
            className="flex flex-col gap-5 bg-slate-800/50 rounded-lg shadow-lg text-slate-400 p-5 w-full border border-slate-700/50"
          >
            <h1 className="text-lg text-slate-300 font-semibold">
              {select.title}
            </h1>
            <p className="text-amber-400">{select.company}</p>
            <p className="text-blue-500">{select.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default detailApplication;
