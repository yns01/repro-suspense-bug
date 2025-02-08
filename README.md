## Getting Started

First, run the development server:

```bash
npm run build && npm run start
```

Open [http://localhost:3000](http://localhost:3000)

## Description

⚠️ Only with the production build, `npm run build && npm run start`! ⚠️

After using `revalidatePath('/dashboard')` in a server action, navigating to a static page (`/dashboard`) will ignore the suspense boundary and not show the loading indicator. Instead, the navigation will be blocked.

## Expected:

After revalidating, navigation should be instant and display the loading.

## Routes:

- `/dashboard`: Static page aggregating invoice data wrapped in a Suspense boundary using loading.js
- `/invoices`: Dynamic page fetching all invoices
- `/invoices/create`: Form to create invoices

## Notes:

- Issue seem to be present only with the production build
- Changing the `/dashboard` route to be dynamic, using `cookies()` fixes the problem.
