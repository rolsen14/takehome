# Dropback Take-Home App

## Prerequisites

- Node.js (v18+ recommended)
- NPM package manager

## Setup

1. Fork the repository, clone down your fork, and install dependencies:

```sh
git clone <repository-url>
cd takehome
npm install
```

2. Set up Supabase:

You'll need to set up a local Supabase instance (check out [this guide](https://supabase.com/docs/guides/local-development)). Then add your local anon key to `/apps/web/app/api/supabase.ts`.

3. Start the development server:

```sh
npm run dev
```

4. Happy coding

Find your assignment, at `http://localhost:3001`

Start developing the app, at `http://localhost:3000`

---

## Resources

#### ESPN Hidden API

**ESPN Hidden API**: [Documentation Gist](https://gist.github.com/akeaswaran/b48b02f1c94f873c6655e7129910fc3b)

Here are some useful endpoints for fetching player data. Example Player ID: `5037870`:

Player profile:

```
https://site.web.api.espn.com/apis/common/v3/sports/basketball/mens-college-basketball/athletes/5037870
```

Player splits (stats per game):

```
https://site.web.api.espn.com/apis/common/v3/sports/basketball/mens-college-basketball/athletes/5037870/splits
```

#### Supabase

- **Supabase**: [Docs](https://supabase.io/docs)

#### Next.js

- **Next.js**: [Docs](https://nextjs.org/docs)
# takehome
