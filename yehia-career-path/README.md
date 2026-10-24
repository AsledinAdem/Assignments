# Career Success Platform

**Author:** Asledin Adem
**Email:** asledin@gmail.com

## Description

A Next.js app that helps job seekers prepare for and apply to jobs. It has a
step-by-step career plan with a progress bar, a list of job opportunities with
a detail page for each one, and a dashboard for tracking submitted applications
by status.

## Run locally

1. Clone the repository and go into the folder:

```bash
   git clone <https://github.com/AsledinAdem/Assignments.git>
   cd <assignment-1-routing>
```

2. Install dependencies:

```bash
   npm install
```

3. Start the development server:

```bash
   npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Questions

### 1. Why did you use `await` when reading `params`?

In current versions of Next.js, `params` is a Promise, not a plain object. The
route value might not be ready yet when the page starts rendering, so I use
`await params` to wait for it and then read the `id` from the result.

### 2. Why is the route ID a string?

The ID comes from the URL, and a URL is just text. Next.js can't know whether
`/opportunities/1` means the number 1 or the text "1", so it always gives me a
string. If my data uses numeric IDs, I have to convert one side before
comparing, for example with `String(item.id) === id` or `Number(id)`.

### 3. What belongs in the dashboard layout, and what belongs in each dashboard page?

The layout holds the parts that stay the same on every dashboard page, such as
the sidebar, the navigation, and the header. It wraps the page through
`children` and doesn't reload when I move between dashboard pages. Each page
holds only the content for its own route,
