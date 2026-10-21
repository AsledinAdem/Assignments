"use client";

import Link from "next/link";
import { useState } from "react";

type Task = { id: string; label: string; checked?: boolean };
type Milestone = {
  title: string;
  description: string;
  tasks: Task[];
};

const milestones: Milestone[] = [
  {
    title: "Milestone 1: Prepare",
    description:
      "Improve your CV, organize your portfolio, and choose a target role.",
    tasks: [
      { id: "cv", label: "Update CV", checked: true },
      { id: "portfolio", label: "Create Portfolio", checked: true },
      { id: "linkedin", label: "Add LinkedIn Profile" },
      { id: "target-role", label: "Choose Target Role" },
      { id: "professional-summary", label: "Write Professional Summary" },
    ],
  },
  {
    title: "Milestone 2: Practice",
    description: "Strengthen relevant skills and prepare for interviews.",
    tasks: [
      { id: "html-css", label: "HTML and CSS" },
      { id: "javascript", label: "JavaScript" },
      { id: "react", label: "React" },
      { id: "nextjs", label: "Next.js" },
      { id: "interview-questions", label: "Interview Questions" },
      { id: "mock-interviews", label: "Mock Interviews" },
    ],
  },
  {
    title: "Milestone 3: Apply",
    description: "Now you can select the job and apply for it.",
    tasks: [],
  },
];

const initialChecked: Record<string, boolean> = Object.fromEntries(
  milestones.flatMap((m) => m.tasks.map((t) => [t.id, !!t.checked])),
);

const totalTasks = milestones.reduce((sum, m) => sum + m.tasks.length, 0);
const lastMilestone = milestones.length - 1;

const PlanPage = () => {
  const [currentMilestone, setCurrentMilestone] = useState<number>(0);
  const [checked, setChecked] =
    useState<Record<string, boolean>>(initialChecked);

  const completedCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((completedCount / totalTasks) * 100);

  const milestone = milestones[currentMilestone];

  function nextButtonHandler() {
    setCurrentMilestone((prev) => Math.min(prev + 1, lastMilestone));
  }

  function backButtonHandler() {
    setCurrentMilestone((prev) => Math.max(prev - 1, 0));
  }

  function handleCheckboxChange(id: string, isChecked: boolean) {
    setChecked((prev) => ({ ...prev, [id]: isChecked }));
  }

  return (
    <div className="min-h-screen mt-10 mx-auto max-w-300 flex flex-col items-center space-y-10 px-10 overflow-hidden">
      {/* title of page */}
      <div className="w-full">
        <h1 className="text-3xl font-semibold text-white mb-3">
          Career Success Plan.
        </h1>
        <p>
          Follow these three milestones to prepare yourself, improve your
          skills, and land your next job.
        </p>
      </div>

      <div className="w-full flex flex-col gap-5 bg-slate-800 rounded-lg border border-slate-500 p-5">
        {/* progress bar */}
        <div className="md:w-125 w-full flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2>
              Overall Progress
              <span className="text-amber-400 ml-3 text-xl">{progress}%</span>
            </h2>
            <p className="text-xl">100%</p>
          </div>

          <div className="relative">
            <div className="w-full bg-slate-300 rounded-full h-2"></div>
            <div
              className="bg-amber-500 rounded-full h-2 absolute top-0 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Current milestone */}
        <div className="w-full bg-slate-800 rounded-lg border border-slate-500 p-5">
          <h2 className="text-2xl font-semibold mb-2">{milestone.title}</h2>
          <p>{milestone.description}</p>

          {milestone.tasks.length > 0 && (
            <div className="mt-10 flex flex-col space-y-3">
              {milestone.tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={task.id}
                    name={task.id}
                    className="w-5 h-5 accent-amber-500 cursor-pointer"
                    checked={!!checked[task.id]}
                    onChange={(e) =>
                      handleCheckboxChange(task.id, e.target.checked)
                    }
                  />
                  <label htmlFor={task.id} className="text-xl cursor-pointer">
                    {task.label}
                  </label>
                </div>
              ))}
            </div>
          )}

          {currentMilestone === lastMilestone && (
            <Link
              href="/opportunities"
              className="mt-5 mb-20 inline-block bg-amber-500 text-slate-800 rounded-lg p-2 text-xl hover:bg-amber-600 transition-colors duration-300 w-fit px-3"
            >
              Apply Now
            </Link>
          )}
        </div>

        {/* buttons */}
        <div className="flex flex-row gap-5">
          {currentMilestone > 0 && (
            <button
              className="bg-amber-500 text-slate-800 rounded-lg h-10 w-full md:w-52 text-xl cursor-pointer hover:bg-amber-600 transition-colors duration-300"
              onClick={backButtonHandler}
            >
              Back
            </button>
          )}
          {currentMilestone < lastMilestone && (
            <button
              className="bg-amber-500 text-slate-800 rounded-lg h-10 w-full md:w-52 text-xl cursor-pointer hover:bg-amber-600 transition-colors duration-300"
              onClick={nextButtonHandler}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
