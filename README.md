# Tofu Frontend Coding challenge

Built with [Next.js](https://nextjs.org/).

## For local dev

```commandline
yarn
yarn run dev
```

The app will be available at http://localhost:3000/

You will need to add a `env.local` file to your project root with the following:

```
API_SERVER=https://dev.api.tofuhq.com/api
USER_TOKEN= ----- PROVIDED TO YOU VIA EMAIL -----
```

## What Went Well ⭐️

- **Modular React architecture** – breaking the UI into composable hooks (`useFetchContentGroup`, `useUpdateContentGroup`, etc.) and pure components allowed rapid iteration and reuse across Web & Settings panes.
- **Optimistic UI with TanStack Query** – the cache-merge strategy (`mergeWithOverride`) gave users instant feedback when selecting/un-selecting components and when injecting generated variations.
- **Iframe injection logic** – injecting highlights *and* generated results directly into the embedded landing-page HTML created a seamless WYSIWYG experience without a full reload.
- **Headless UI dropdown** – using `@headlessui/react`’s `Listbox` produced an accessible, keyboard-friendly target selector with very little code.

## What Didn’t Go So Well / To Improve ⚠️

| Area | Current state | Improvement idea |
|------|---------------|------------------|
| **State duplication** | Selected components live both in React state *and* inside the iframe DOM. | Introduce a single global store (Context/Zustand) or generate the DOM directly from state. |
| **Error surfaces** | API failures are logged to `console.error`. | Replace with toast notifications + retry helpers. |
| **Tests** | No Jest / RTL coverage yet. | Add unit tests for hooks and iframe mutations. |

## What I Learned 📚

1. **Deep merge pitfalls** – merging arrays inside TanStack Query’s `onMutate` needs `lodash/mergeWith` with a customiser; plain `merge` silently overwrites.
2. **Iframe reactivity** – updating an iframe’s DOM from React requires refs + effect ordering to avoid stale closures.
3. **Backend schema quirks** – the `targets` payload had to be an *object of objects* (not a list) to satisfy the Django `.keys()` expectation.

## Future UX Enhancements 🛠️

1. Real-time diff view so users can preview multiple variation options before committing.
2. Undo / redo stack for component selection and generation actions.
3. Persisted panel widths and theme preferences per user.
4. Global toast / snackbar system for unified feedback.

## API Feedback & Suggestions 📮

| Endpoint | Feedback | Improvement Suggestions |
|----------|----------|-------------------------|
| `PATCH /content/{id}/` | Requires `targets` to be an object. When shape is wrong the server returns a 500 with a Django stack trace. | Respond with `400` JSON that includes the expected schema. |
| `POST /content/{id}/gen/` | Silent failure if targets aren’t set first; the error message isn’t actionable. | Validate prerequisites and return a descriptive message. |
| **Environment reset** | During development we occasionally needed the backend team to *manually* reset our saved targets/content. | Provide a **`POST /admin/reset-db`** (or similar) endpoint guarded by auth so devs can reset data without ops intervention. |
| CORS | Every request triggers a preflight. | Add `Access-Control-Max-Age` to CORS responses. |