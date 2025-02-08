## Getting Started

First, run the development server:

```bash
npm run build && npm run start
```

Open [http://localhost:3000](http://localhost:3000)

## Description

⚠️ Only with the production build, `npm run build && npm run start`! ⚠️

After using `revalidatePath('/dashboard')` in a server action, navigating to a static page (`/dashboard`) will ignore the suspense boundary and not show the loading indicator. Instead, the navigation will be blocked until data is fetched.

## Expected:

After revalidating, navigation should be instant and display the loading while data is fetched.

## How to reproduce

- `npm run build && npm run start`
- Open http://localhost:3000/dashboard/invoices/create, create a new invoice
- Click on the dashboard link, observe that navigation is blocked

## Routes:

- `/dashboard`: Static page aggregating invoice data wrapped in a Suspense boundary using loading.js
- `/invoices`: Dynamic page fetching all invoices
- `/invoices/create`: Form to create invoices calling a server action

## Notes:

- /dashboard route is slowed using `setTimeout(resolve, 2000)` to simulate a slow SQL query.
- Issue seems to be present only with the production build
- Changing the `/dashboard` route to be dynamic, using `cookies()` fixes the problem.
