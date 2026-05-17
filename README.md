# Accelerate

SvelteKit app for the Accelerate program.

## Local development

```sh
npm install
npm run dev
```

## Vercel deployment

This repo is configured for Vercel serverless via `@sveltejs/adapter-vercel`.

Required environment variables are listed in [.env.example](/Users/sh/Documents/GitHub/accelerate/.env.example:1). Set the same values in Vercel for `Preview` and `Production` before deploying.

Useful commands:

```sh
vercel pull --yes --environment=preview
vercel build --yes
vercel deploy --prebuilt
```

## Notes

- The app depends on external backend and OAuth services, so local `vercel build` needs the same env vars that Coolify used.
- No local filesystem persistence is required by the app routes, which keeps the runtime compatible with serverless functions.
