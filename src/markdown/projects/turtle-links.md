---
title: 'Turtle Links'
git: 'https://github.com/chandertech/turtlelinks'
skills: 'Svelte, Supabase, Tailwind'
---

I was contracted to build Turtle Links, which serves as a replacement for Google's deprecated [Dynamic Links](https://firebase.google.com/docs/dynamic-links) feature. The entire front-end for this service was built using [Svelte](https://kit.svelte.dev/) and [Tailwind](https://tailwindcss.com/). The back-end was hosted via [Supabase](https://supabase.com/).

The application allows for the creation of accounts, organizations, and dynamic links within those organizations. It uses [Vercel's Domains API](https://vercel.com/templates/next.js/domains-api) to handle the creation and deletion of the dynamic links.

One interesting design aspect is that the client front-end is able to make direct calls to the Supabase database. This is because each database table had custom [row level security policies](https://supabase.com/docs/guides/auth/row-level-security) to ensure end-to-end verification from the browser to the database.

<Img src="ex1.jpg" />

<Img src="ex2.jpg" />
