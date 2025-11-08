# Dropback Take-Home Monorepo

## Prerequisites

- Node.js (v20+ recommended)
- NPM package manager

## Setup

1. Fork this repository, install npm dependencies, etc.

2. Set up Supabase (local PostgresSQL instance):

A database is scaffolded in the `supabase` directory, but you'll need set up and run the Supabase container (check out [this guide](https://supabase.com/docs/guides/local-development)).

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

- **[Supabase Docs](https://supabase.io/docs)**

#### Next.js

- **[Next.js Docs](https://nextjs.org/docs)**

#### Turborepo

- **[Turborepo Docs](https://turborepo.com/docs)**
