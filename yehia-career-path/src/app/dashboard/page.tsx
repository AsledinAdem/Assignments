import applications from "../../data/applications.js";
import Link from "next/link";

const Dashboard = () => {
  const statusCounts = applications.reduce<Record<string, number>>(
    (acc, app) => {
      acc[app.status] = (acc[app.status] ?? 0) + 1;
      return acc;
    },
    {},
  );

  const uniqueStatuses = Array.from(
    new Map(applications.map((app) => [app.status, app])).values(),
  );

  return (
    <div className="min-h-screen mt-10 mx-auto md:max-w-325 px-10 py-5 w-full">
      {/* welcome txt */}
      <div className="flex flex-col justify-center gap-2 mt-10 mx-auto max-w-300">
        <h1 className="text-3xl font-semibold text-slate-200">
          Welcome <span className="text-amber-500">Yehia,</span>
        </h1>

        <p className="max-w-150 leading-7 mb-5">
          This app is guide you to your goal and rember your path before you
          chase every opportunity, you need to remember your goal. You start
          with a clear goal.
        </p>
      </div>

      {/* cards place */}

      <div>
        <div className="flex flex-col gap-1 mb-5">
          <h2>Status of your submitted Summary.</h2>
          <p>
            Keep going! Every application brings you closer to your next
            opportunity.
          </p>
        </div>
        {/* cards container */}
        <div className="grid grid-cols-2 w-full md:grid-cols-3 lg:grid-cols-4 gap-5">
          {/* card */}
          {uniqueStatuses.map((application) => {
            console.log(application.status);
            const Icon = application.icon;

            return (
              <Link
                href={`/dashboard/applications/${application.status}`}
                key={application.status}
                className="border border-slate-600 rounded-lg p-3 bg-slate-800 h-fit"
              >
                <div className="text-amber-500 flex items-center justify-between px-2">
                  <div className="flex items-center gap-1">
                    <Icon size={25} />
                    <h2>{application.status}</h2>
                  </div>
                  <h1>{statusCounts[application.status]}</h1>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
