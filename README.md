# Minimal Blog with Next.js and Supabase

This is a minimal blog built with [Next.js](https://nextjs.org) and [Supabase](https://supabase.com). It features a clean, Notion-like design and an API endpoint for creating new posts.

## Getting Started

### 1. Configure Supabase

1.  Create a new project on [Supabase](https://supabase.com).
2.  Run the SQL commands from `schema.sql` in your Supabase SQL Editor to create the `posts` table and set up policies.
3.  Copy the example environment file:
    ```bash
    cp .env.local.example .env.local
    ```
4.  Update `.env.local` with your Supabase Project URL and Anon Key.

### 2. Run the Development Server

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the blog.

## API Usage

You can create new posts by sending a POST request to `/api/new-post`.

**Example using curl:**

```bash
curl -X POST http://localhost:3000/api/new-post \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Hello World",
    "content": "This is my first post on the new minimal blog.",
    "tags": ["intro", "minimalism"]
  }'
```

The new post will immediately appear on the main page.

## Project Structure

- `app/page.tsx`: The main page displaying the grid of blog posts.
- `app/api/new-post/route.ts`: The API endpoint for creating posts.
- `components/PostCard.tsx`: The component for rendering individual post cards.
- `lib/supabase.ts`: Supabase client initialization.
- `schema.sql`: Database schema definition.
