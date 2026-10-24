"use client";

import { useState } from "react";

type TrainingTask = {
  id: string;
  title: string;
  description: string;
  status: string;
  completed: boolean;
};

const initialTasks: TrainingTask[] = [
  {
    id: "physical-endurance",
    title: "Physical Endurance",
    description:
      "Improve stamina and physical conditioning through focused training.",
    status: "Very High",
    completed: false,
  },
  {
    id: "team-coordination",
    title: "Team Coordination",
    description: "Improve communication and coordination with the Black Bulls.",
    status: "Medium",
    completed: false,
  },
  {
    id: "sword-control",
    title: "Sword Control",
    description: "Improve sword handling, precision, and control.",
    status: "Very High",
    completed: false,
  },
];

export default function TrainingDashboard() {
  const [tasks, setTasks] = useState(initialTasks);
  const completedCount = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = Math.round((completedCount / totalTasks) * 100);

  function toggleTask(taskId: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  return (
    <main className="min-h-screen bg-dashboard text-white">
      <div className="mx-auto w-full max-w-360 px-4 pb-10 pt-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 bg-gold" />
            <p className="truncate text-sm font-bold tracking-tight text-slate-200 sm:text-base">
              ASTA&apos;S PREPARATION DASHBOARD
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-sm bg-panel px-2 py-1 text-[10px] font-bold tracking-wide text-amber-300 sm:inline-flex">
              <span className="h-1.5 w-1.5 bg-gold" aria-hidden="true" />
              STATUS: IN TRAINING
            </span>
            <span className="rounded-sm bg-panel px-2 py-1 text-[10px] font-bold tracking-wide text-rose-300">
              <span
                className="mr-1.5 inline-block h-1.5 w-1.5 bg-rose-500"
                aria-hidden="true"
              />
              ADVERSARY: LUCIFERO
            </span>
          </div>
        </header>

        <section
          aria-labelledby="dashboard-title"
          className="flex flex-col justify-between gap-5 py-9 sm:flex-row sm:items-end"
        >
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-amber-300">
              <span
                className="mr-2 inline-block h-1.5 w-1.5 bg-gold align-middle"
                aria-hidden="true"
              />
              Pre-combat operational protocol
              <span className="mx-2 text-slate-500">•</span>
              Operative: Asta preparation dashboard
            </p>
            <h1
              className="mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl"
              id="dashboard-title"
            >
              Tactical Training Readiness
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-5 text-stone-300">
              Three focused training tasks to prepare for the challenge ahead.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="progress-title"
          className="rounded-md border border-white/5 bg-panel p-5 shadow-lg shadow-black/10 sm:p-6"
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-300">
                  Core objective metric
                </p>
                <span className="bg-[#292a2c] px-1.5 py-0.5 text-[10px] font-bold text-amber-300">
                  Task completion only
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <strong className="text-5xl font-extrabold leading-none tracking-tight text-emerald-400 sm:text-6xl">
                  {progressPercentage}%
                </strong>
                <h2
                  className="text-lg font-semibold tracking-tight text-stone-300"
                  id="progress-title"
                >
                  Training Plan Completion
                </h2>
              </div>
              <p className="mt-2 max-w-2xl text-xs leading-4 text-stone-400">
                This measures completed tasks only. It does not predict combat
                ability or the outcome against Lucifero.
              </p>
            </div>
            <div
              aria-live="polite"
              className="flex min-h-16 items-center gap-3 rounded-sm bg-[#171a22] px-4 py-3 lg:min-w-52"
            >
              <strong className="text-3xl font-bold tabular-nums text-emerald-300">
                {completedCount}
              </strong>
              <span className="text-sm text-stone-300">
                / {totalTasks} tasks complete
              </span>
            </div>
          </div>

          <div className="mt-6">
            <div
              aria-label="Training plan completion"
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={progressPercentage}
              className="h-3 overflow-hidden rounded-full bg-[#0d1016]"
              role="progressbar"
            >
              <span
                className="block h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-300 to-emerald-300 transition-[width] duration-300 ease-out motion-reduce:transition-none"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] font-semibold text-stone-400">
              <span>0% · Begin</span>
              <span>100% · All tasks complete</span>
            </div>
          </div>
        </section>

        <section aria-labelledby="tasks-title" className="mt-7">
          <div className="mb-3 flex items-end justify-between gap-4">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <h2
                className="text-lg font-bold tracking-tight text-slate-200"
                id="tasks-title"
              >
                Prescribed Combat Drills
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wide text-stone-400">
                {totalTasks} total tasks
              </span>
            </div>
            <p className="hidden text-[11px] text-stone-400 sm:block">
              Select a task to toggle completion.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tasks.map((task, index) => (
              <li
                className={`flex min-h-72 flex-col rounded-md border bg-panel p-4 transition-colors duration-200 ${
                  task.completed
                    ? "border-emerald-400/30"
                    : "border-white/5 hover:border-gold/50"
                }`}
                key={task.id}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-stone-300">
                    Drill 0{index + 1} <span className="text-stone-500">/</span>{" "}
                    Training
                  </p>
                  <div className="flex gap-3 items-center">
                    <span
                      aria-label={`Status: ${task.status}`}
                      className={`inline-flex shrink-0 items-center bg-[#292a2c] px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${
                        task.status === "Very High"
                          ? "bg-red-600 text-white"
                          : "bg-emerald-700 text-emerald-400"
                      }`}
                    >
                      {task.status}
                    </span>
                    <span
                      className={`shrink-0 px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${
                        task.completed
                          ? "bg-emerald-400/15 text-emerald-300"
                          : "bg-amber-400/15 text-amber-300"
                      }`}
                    >
                      {task.completed ? "Complete" : "Incomplete"}
                    </span>
                  </div>
                </div>

                <h3 className="mt-6 text-2xl font-bold leading-tight tracking-tight text-slate-100">
                  {task.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-300">
                  {task.description}
                </p>

                <div className="mt-auto pt-7">
                  <button
                    aria-label={`Mark ${task.title} ${task.completed ? "incomplete" : "complete"}`}
                    className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-sm px-4 py-3 text-xs font-bold uppercase tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${
                      task.completed
                        ? "bg-emerald-400/15 text-emerald-200 hover:bg-emerald-400/25"
                        : "bg-gold text-[#15130d] hover:bg-amber-300"
                    }`}
                    onClick={() => toggleTask(task.id)}
                    type="button"
                  >
                    <span aria-hidden="true">{task.completed ? "✓" : "◉"}</span>
                    Mark task {task.completed ? "incomplete" : "complete"}
                  </button>
                  <p
                    aria-live="polite"
                    className={`mt-2 text-center text-[10px] font-semibold ${
                      task.completed ? "text-emerald-300" : "text-amber-300"
                    }`}
                  >
                    {task.completed
                      ? "Training complete"
                      : "Training in progress"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
