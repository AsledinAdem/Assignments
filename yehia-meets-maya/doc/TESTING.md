# Employee Explorer Dashboard - Testing Guide

## Overview
The Employee Explorer Dashboard demonstrates the architectural distinction between **React Server Components (RSC)**, **Server Components with Suspense**, and **Client Components ('use client')**.

## Target Stitch Screen
- **Project**: Employee Explorer Dashboard (ID: `14815357498308641657`)
- **Screen**: Generating Screen... (ID: `7730964643467737935`)
- **Screenshot Location**: `doc/design/screen_7730964643467737935.png`

---

## Interactive Feature Test Matrix

### 1. Section 4 · Posts Explorer (Client Component)

#### Scenario Simulation Selector
1. **Success (default)**
   - Click **"Load posts"**.
   - Notice simulated fetch delay (~700ms) with spinner banner and pulsing skeleton placeholders.
   - Transitions to **Success state** with 3 hydrated posts, latency timing badge (`HTTP 200 OK • ~700ms`), post IDs, and JSONPlaceholder attribution tags.
2. **Slow (3s delay)**
   - Select **"Slow (3s delay)"** from the dropdown.
   - Click **"Load posts"**.
   - Button enters disabled loading state (`Loading...`).
   - Skeletons pulse smoothly for 3 seconds before resolving to the loaded post list.
3. **HTTP error (500)**
   - Select **"HTTP error (500)"**.
   - Click **"Load posts"**.
   - Resolves to **Error state** with error banner, upstream network transport diagnosis, HTTP 500 origin report (`Origin: /api/posts?userId=2`), and an interactive **"Retry"** button.
4. **Empty (0 records)**
   - Select **"Empty (0 records)"**.
   - Click **"Load posts"**.
   - Resolves to **Empty state** (`No posts found`) with a **"Reset Query"** action button.

#### State Showcase Segment Selector (Reviewer Fast-Switch)
Clicking any of the 5 tabs provides instant state previews:
- **1. Idle**: Initial un-fetched client component with call-to-action button.
- **2. Loading**: Active client fetch spinner with 2 animated skeleton cards.
- **3. Success**: Fully rendered posts with response time badge and tags.
- **4. Empty**: Empty folder illustration with "Reset Query" button.
- **5. Error**: HTTP 500 alert box with diagnostic metadata and retry action.

---

### 2. Dual Architecture Grid View

Switch views using the header toggle or top switcher:
- **Section 4 Focus** (Default): Faithfully replicates Stitch Screen `7730964643467737935`.
- **Full Architecture**: Expands into a 12-column responsive layout:
  - **Left Column (5 Cols)**:
    - **Section 2 · Employee Profile**: Server Component (0 KB client bundle) with Ervin Howell's profile details and a Server Error State fallback UI.
    - **Section 3 · Recent Posts Preview**: Server Component with Suspense streaming chunk fallback and direct HTML stream output.
  - **Right Column (7 Cols)**:
    - **Section 4 · Posts Explorer**: The complete interactive client component.
  - **Bottom**:
    - **Key Takeaways Banner**: Summary of bundle size, streamability, and interactivity tradeoffs.
