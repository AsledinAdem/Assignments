# Asta’s Preparation Dashboard — Product Requirements Document (PRD)

## 1. Project Overview

**Project Name:** Asta’s Preparation Dashboard
**Product Type:** Single-page web dashboard
**Status:** Initial Version (MVP)
**Technology Stack:** Next.js, TypeScript, Tailwind CSS

### Description

Asta’s Preparation Dashboard is a simple web application that helps Asta, a fictional fighter preparing to face Lucifero, organize his training tasks and monitor his preparation progress.

The dashboard provides three predefined training tasks. Asta can mark each task as complete or incomplete and view his overall progress through a progress bar, completed-task count, and percentage.

The application focuses on simplicity, clarity, and a dark fantasy visual style.

---

## 2. Target User

### Primary User: Asta

Asta is a fictional fighter preparing for a major battle against Lucifero.

He needs a straightforward way to track his training activities without searching through scattered training notes.

### User Needs

- View all training tasks in one place.
- Understand which tasks are complete and which remain unfinished.
- Mark tasks as complete when training is finished.
- Undo completion when a task needs to be marked incomplete again.
- See overall preparation progress at a glance.

The initial version is designed for one user and does not require an account.

---

## 3. Problem Statement

Asta’s training notes are scattered, making it difficult to understand his current preparation status.

Without a central dashboard, he may forget training activities, lose track of completed tasks, or struggle to measure his progress before facing Lucifero.

A simple dashboard will bring his training tasks together and provide a clear overview of his preparation.

---

## 4. Project Goal

Build a beginner-friendly, responsive dashboard that allows Asta to manage three predefined training tasks and monitor his preparation progress.

### Success Criteria

The MVP is successful when:

- All three training tasks are displayed.
- Every task starts as incomplete.
- Asta can complete and undo each task.
- The completed-task count updates correctly.
- The progress percentage is calculated automatically.
- The progress bar reflects the current completion percentage.
- The dashboard works on desktop and mobile screens.

---

## 5. Core Features

### Feature 1: Training Task Cards

Display the following three predefined tasks as individual cards:

| Task               | Description                                            |
| ------------------ | ------------------------------------------------------ |
| Sword Control      | Improve sword handling, precision, and control.        |
| Physical Endurance | Improve stamina and physical conditioning.             |
| Team Coordination  | Improve communication and coordination with teammates. |

Each task card must include:

- Task title.
- Short description.
- Current completion status.
- A button to complete or undo completion.

#### Task Behavior

- All tasks start as incomplete when the application initializes.
- Clicking the completion button marks the selected task as complete.
- The button changes to an option such as **Mark Incomplete** when the task is complete.
- Clicking it again returns the task to the incomplete state.
- Completing one task must not change the status of other tasks.

Task descriptions provide context only. The application does not simulate training or verify that an activity was physically performed.

### Feature 2: Task Completion Summary

Display a summary of Asta’s training progress.

The summary includes:

- Number of completed tasks.
- Total number of tasks.
- Completion percentage.

Example:

**2 of 3 tasks completed — 67%**

The completed count must be calculated from the actual task states.

Formula:

`Completed Tasks = Number of tasks marked complete`

`Total Tasks = 3`

`Progress Percentage = (Completed Tasks / Total Tasks) × 100`

The displayed percentage should be rounded to the nearest whole number.

Examples:

| Completed | Total | Progress |
| --------: | ----: | -------: |
|         0 |     3 |       0% |
|         1 |     3 |      33% |
|         2 |     3 |      67% |
|         3 |     3 |     100% |

The summary must update immediately whenever a task is completed or returned to incomplete.

### Feature 3: Preparation Progress Bar

Display a visual progress bar showing Asta’s overall preparation task completion.

#### Requirements

- The bar starts at 0%.
- Its fill increases when a task is completed.
- Its fill decreases when a completed task is marked incomplete.
- It reaches 100% when all three tasks are complete.
- The displayed percentage and bar fill must always match.
- The progress bar must animate smoothly when its value changes, without delaying the actual state update.

The progress bar measures task completion only. It does not measure physical strength, combat ability, or the likelihood of defeating Lucifero.

---

## 6. User Stories

### User Story 1: View Training Tasks

**As Asta,** I want to see all three training tasks on one dashboard so that I can understand what I need to work on.

**Acceptance Criteria:**

- All three task cards are visible on the dashboard.
- Each card displays its title and description.
- Each task starts as incomplete.

### User Story 2: Complete a Training Task

**As Asta,** I want to mark a training task as complete so that I can track the work I have finished.

**Acceptance Criteria:**

- Each incomplete task has a completion button.
- Clicking the button marks only that task as complete.
- The task's visual status updates immediately.
- The completed-task count, percentage, and progress bar update automatically.

### User Story 3: Undo Task Completion

**As Asta,** I want to mark a completed task as incomplete so that I can correct its status when necessary.

**Acceptance Criteria:**

- A completed task displays an option to mark it incomplete.
- Clicking that option returns the task to its incomplete state.
- The completion count decreases accordingly.
- The progress percentage and bar decrease accordingly.

### User Story 4: Monitor Overall Progress

**As Asta,** I want to see my overall preparation progress so that I can understand how many training tasks remain.

**Acceptance Criteria:**

- The dashboard displays the completed-task count and total task count.
- The dashboard displays the completion percentage.
- The progress bar reflects the same percentage.
- All progress indicators update immediately after a task status changes.

---

## 7. Functional Requirements

| ID    | Requirement                                             | Priority            |
| ----- | ------------------------------------------------------- | ------------------- |
| FR-01 | Display three predefined training tasks.                | Must have           |
| FR-02 | Initialize every task as incomplete.                    | Must have           |
| FR-03 | Allow each task to be marked complete.                  | Must have           |
| FR-04 | Allow completion to be undone.                          | Must have           |
| FR-05 | Calculate the completed-task count automatically.       | Must have           |
| FR-06 | Calculate the completion percentage automatically.      | Must have           |
| FR-07 | Display a progress bar based on completion percentage.  | Must have           |
| FR-08 | Update all progress indicators when task states change. | Must have           |
| FR-09 | Support desktop and mobile screen sizes.                | Must have           |
| FR-10 | Allow task state to reset after a page refresh.         | Accepted limitation |

---

## 8. Design Requirements

### 8.1 Visual Direction

Use a **dark fantasy** visual style inspired by Asta’s determination, sword-based fighting, and preparation for a powerful opponent.

The interface should feel bold and focused while remaining clean, readable, and easy to use.

Avoid excessive decorative effects that distract from task management.

### 8.2 Color Palette

Use a dark background with gold accents.

Suggested colors:

| Purpose          | Color         | Hex       |
| ---------------- | ------------- | --------- |
| Main background  | Deep charcoal | `#111318` |
| Card background  | Dark slate    | `#1B1E26` |
| Primary accent   | Gold          | `#D4AF37` |
| Primary text     | Off-white     | `#F5F5F5` |
| Secondary text   | Muted gray    | `#A1A1AA` |
| Completed status | Green         | `#22C55E` |
| Borders          | Dark gray     | `#343844` |

Gold should highlight important actions, progress, and selected elements. Green should communicate completed tasks clearly.

These colors are starting recommendations and may be adjusted during implementation while preserving the overall visual direction.

### 8.3 Dashboard Layout

The dashboard should contain the following sections in order:

1. **Header**

   - Application title: Asta’s Preparation Dashboard.
   - Subtitle: Prepare. Train. Overcome.
   - A small visual reference to the upcoming challenge against Lucifero.

2. **Progress Overview**

   - Completed tasks versus total tasks.
   - Completion percentage.
   - Overall progress bar.

3. **Training Tasks**

   - Three individual task cards.
   - Task title and description.
   - Completion status.
   - Complete or undo-completion button.

The entire experience must remain on one dashboard page.

### 8.4 Task Card Design

Each card should have:

- A dark card background.
- A subtle border and rounded corners.
- Clear task title and description.
- A visible completion status.
- A clearly identifiable action button.
- A visual distinction between complete and incomplete states.

Completed tasks may use a checkmark and green status indicator. Incomplete tasks should remain visually distinct without appearing disabled.

### 8.5 Buttons and Interaction

- Use gold as the primary action color.
- Use clear button labels, such as **Mark Complete** and **Mark Incomplete**.
- Provide visible hover and keyboard-focus states.
- Ensure buttons have adequate click and touch targets.
- Update the interface immediately without requiring a page reload.

### 8.6 Typography and Accessibility

- Use readable typography with a clear heading hierarchy.
- Maintain sufficient contrast between text and background.
- Do not communicate completion status through color alone.
- Use semantic HTML elements and accessible button labels.
- Provide an accessible label for the progress bar, including its current value.
- Ensure all actions can be operated using a keyboard.

### 8.7 Responsive Design

**Desktop:**

- Display the three task cards in a three-column layout when space permits.
- Keep the progress summary prominent above the cards.

**Tablet:**

- Use a two-column card layout when appropriate.

**Mobile:**

- Stack the task cards vertically.
- Keep the progress summary readable without horizontal scrolling.
- Ensure buttons remain easy to tap.

Tailwind CSS responsive utilities should be used to implement the layouts.

---

## 9. Technical Requirements

### 9.1 Technology Stack

- **Next.js:** Application framework.
- **TypeScript:** Type safety and clearer data structures.
- **Tailwind CSS:** Styling, responsive layouts, and visual design.

Use the Next.js App Router and implement the dashboard as the application's main page.

### 9.2 State Management

Use React state to track whether each task is complete.

A simple task data structure may look like this:

```ts
type TrainingTask = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};
```

Initialize the task list with the three predefined tasks and set `completed` to `false` for each one.

Use a state update to toggle the selected task without modifying the other tasks.

### 9.3 Calculated Values

Derive the completed-task count from the current task state.

Calculate the progress percentage using:

```ts
const completedCount = tasks.filter(
  (task) => task.completed
).length;

const totalTasks = tasks.length;

const progressPercentage = Math.round(
  (completedCount / totalTasks) * 100
);
```

Use these calculated values for the summary and progress bar rather than maintaining separate, manually updated counters.

This ensures that the displayed values remain consistent.

### 9.4 Persistence

No persistent storage is required.

- Do not use a database.
- Do not require localStorage or sessionStorage.
- Do not require an API for task management.
- Allow the initial task state to be restored when the page is refreshed.

### 9.5 Suggested Project Structure

```text
asta-preparation-dashboard/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── DashboardHeader.tsx
│   ├── ProgressOverview.tsx
│   ├── ProgressBar.tsx
│   └── TaskCard.tsx
├── docs/
│   └── PRD.md
├── public/
├── package.json
└── tsconfig.json
```

This is a suggested structure, not a requirement to create every component as a separate file. Keep the implementation simple and avoid unnecessary abstraction.

---

## 10. Acceptance Criteria

The MVP is considered complete when all the following conditions are met.

### Initial Dashboard

- [ ] The main dashboard loads successfully.
- [ ] Sword Control, Physical Endurance, and Team Coordination are displayed.
- [ ] All three tasks initially show an incomplete status.
- [ ] The completed count is `0 of 3`.
- [ ] The progress percentage is `0%`.
- [ ] The progress bar is empty.

### Task Completion

- [ ] Each task can be marked complete independently.
- [ ] Completing a task changes its visible status.
- [ ] Completing one task does not affect the other tasks.
- [ ] The completed count and progress indicators update immediately.
- [ ] Completing all three tasks produces `3 of 3` and `100%`.

### Undo Completion

- [ ] A completed task can be marked incomplete again.
- [ ] The task's visual status returns to incomplete.
- [ ] The completed count decreases by one.
- [ ] The progress percentage and progress bar update correctly.
- [ ] Undoing all tasks returns the dashboard to `0 of 3` and `0%`.

### Calculation Accuracy

- [ ] One completed task produces `33%`.
- [ ] Two completed tasks produce `67%`.
- [ ] Three completed tasks produce `100%`.
- [ ] The progress bar value matches the displayed percentage.
- [ ] Progress values never fall below `0%` or exceed `100%`.

### Design and Technical Quality

- [ ] The dashboard uses the dark fantasy color palette.
- [ ] The layout adapts to desktop, tablet, and mobile screens.
- [ ] Buttons have clear labels and accessible focus states.
- [ ] No login, database, or backend service is required.
- [ ] Refreshing the page may reset the task states.
- [ ] No additional routes or unrelated features are introduced.

---

## 11. Assumptions

1. Asta is a fictional character, and Lucifero is the opponent he is preparing to face.
2. The three training tasks are fixed and predefined.
3. Users do not need to create, edit, or delete tasks.
4. The dashboard is designed for a single user without authentication.
5. Task completion is controlled manually by clicking a button.
6. Preparation progress represents completed tasks, not actual combat readiness.
7. All tasks begin incomplete whenever the application initializes.
8. The dashboard does not need persistent data storage.
9. The project is an MVP intended to demonstrate a functional and visually polished dashboard.
10. The application will use the Next.js App Router, TypeScript, and Tailwind CSS.

---

## 12. Limitations

- Task states may reset when the page is refreshed.
- Task completion is not synchronized across browsers or devices.
- Only three predefined tasks are available.
- The dashboard cannot verify whether Asta has completed a real-world training activity.
- The progress percentage measures task completion only.
- There is no user account or personal profile.
- No backend or database is available to store historical progress.
- The dashboard does not predict battle outcomes or evaluate fighting ability.

These limitations are intentional for the initial version.

---

## 13. Out-of-Scope Features

The following features must not be implemented in this MVP:

- User registration and login.
- Authentication or authorization.
- Database integration.
- Persistent task storage.
- Backend APIs.
- Creating, editing, or deleting training tasks.
- Custom task creation.
- Task deadlines, calendars, or reminders.
- Training schedules or workout plans.
- Combat simulations or battle predictions.
- AI chatbot or virtual training assistant.
- Payments or subscriptions.
- Team accounts or multi-user collaboration.
- Notifications or messaging.
- Additional dashboard pages or application routes.
- Analytics beyond the task count, percentage, and progress bar.
- External integrations.
- Complex state management libraries when basic React state is sufficient.

---

## 14. Definition of Done

The project is complete when:

1. The dashboard is implemented using Next.js, TypeScript, and Tailwind CSS.
2. All three training task cards are displayed.
3. Tasks can be completed and returned to incomplete.
4. The completed count, percentage, and progress bar are calculated correctly.
5. All acceptance criteria pass manual testing.
6. The interface is responsive, accessible, and visually consistent.
7. No out-of-scope features have been added.
8. The final implementation remains simple enough for a beginner to understand and maintain.

---

## 15. Final MVP Summary

Asta’s Preparation Dashboard is a single-page training tracker with three predefined tasks and real-time preparation progress.

Its three core features are:

1. **Training Task Cards:** View and toggle the completion status of each task.
2. **Task Completion Summary:** See the number of completed tasks, total tasks, and completion percentage.
3. **Preparation Progress Bar:** Visualize overall task completion.

The goal is to deliver a clean, functional dark fantasy dashboard with no unnecessary complexity.

**Build the smallest complete version first.** Ensure that task toggles and progress calculations work correctly before adding decorative polish.
