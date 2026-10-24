# Name: Asledin Adem

# e-mail: asledinautomation@gmail.com

# Asta's Preparation Dashboard

A single-screen training dashboard for Asta's preparation to face Lucifero. Mark
the three predefined tasks complete or incomplete and follow the calculated
task count and preparation percentage.

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Progress behaviour

Task completion is held in page state only. Progress resets to zero and all
tasks return to incomplete when the page is refreshed; it is not saved between
sessions.

The preparation percentage is the number of completed tasks divided by three,
rounded to the nearest whole number. Every task counts equally.
