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

What Went Well ⭐️

Modular React architecture: Breaking the UI into composable hooks (useFetchContentGroup, useUpdateContentGroup, etc.) and pure components allowed rapid iteration and reuse across Web & Settings panes.

Optimistic UI with TanStack Query: The cache merge strategy (mergeWithOverride) gave users instant feedback when selecting/un‑selecting components and when injecting generated variations.

Iframe injection logic: Injecting highlights and generated results directly into the embedded landing‑page HTML created a seamless WYSIWYG experience without needing a page reload.

Headless UI dropdown: Using Headless UI’s Listbox produced an accessible, fully keyboard‑navigable target selector with minimal code.

What Needs Improvement ⚠️

State duplication: Selected components live both in React state and inside the iframe DOM.  A single source of truth (e.g. Context or zustand store) would simplify lifecycle bugs.

Error handling: API calls currently log to console.error; user‑visible toasts and retry logic are still TODO.

Unit tests: No Jest/React‑Testing‑Library coverage yet for hooks or iframe injection.

What I Learned 📚

Deep merge pitfalls: When merging arrays inside TanStack Query’s onMutate, lodash/mergeWith with a customiser is safer than plain merge.

Iframe reactivity: Updating an iframe’s DOM from React requires careful use of refs + mutation observers to avoid stale closures.

Backend schema quirks: The targets payload had to be an object‑of‑objects (not a list) to satisfy the Django .keys() expectation.

Future UX Enhancements 🛠️

Real‑time diff view so users can preview multiple variation options side‑by‑side before committing.

Undo/redo stack for component selection and content generation.

Drag‑resize panels with persisted widths per user.

Global toast system for unified success/error feedback.

API Feedback 📮

Endpoint

Feedback

Improvement Suggestion

PATCH /content/{id}/

Accepts only object‑of‑objects for targets; error message was a Django trace.

Return a 400 JSON with a clear schema hint instead of a 500 stacktrace.

POST /content/{id}/gen/

Requires prior target save; fails silently if pre‑req missing.

Auto‑validate whether content_params.targets exists and include helpful response text.

GET /content/{id}/

Missing CORS max‑age headers → extra preflight on every request.

Add Access‑Control-Max‑Age for better perf.

