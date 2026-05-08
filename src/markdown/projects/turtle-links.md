---
name: 'Turtle Links'
git: 'https://github.com/chandertech/turtlelinks'
skills: 'Svelte, Supabase, Tailwind'
---

I was contracted to build Turtle Links, a replacement for Google's deprecated [Dynamic Links](https://firebase.google.com/docs/dynamic-links) feature. I built the front end with [Svelte](https://kit.svelte.dev/) and [Tailwind](https://tailwindcss.com/), and wired it into a [Supabase](https://supabase.com/) backend.

I implemented the main product flows: accounts, organizations, organization-scoped dynamic links, and domain setup/cleanup through [Vercel's Domains API](https://vercel.com/templates/next.js/domains-api).

One interesting part of the project was letting the client call Supabase directly. That worked because the database tables were protected with custom [row level security policies](https://supabase.com/docs/guides/auth/row-level-security), so authorization was enforced from the browser all the way down to the database.
