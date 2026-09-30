# Kalea Coffee & Roastery

<p align="center">
	<img src="public/og-image.jpg" alt="Kalea Coffee & Roastery website preview" width="100%" />
</p>

<p align="center">
	<img alt="Next.js 16.3.3" src="https://img.shields.io/badge/Next.js-16.3.3-000000?logo=next.js&logoColor=white" />
	<img alt="TypeScript 5.7.3" src="https://img.shields.io/badge/TypeScript-5.7.3-3178C6?logo=typescript&logoColor=white" />
	<img alt="Tailwind CSS 4" src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white" />
</p>

A responsive café website for exploring the menu and preparing pickup, dine-in, or delivery orders. Menu items are loaded from Supabase, and customers can send an order summary through WhatsApp.

> **Demo Notice:** This is a demonstration website, not a live café ordering service. Menu items, prices, and contact details are illustrative. Do not use it to place real orders or share personal information; orders are not confirmed or fulfilled through this demo.

## Features

- Browse, search, and filter coffee, tea, pastry, brunch, and main-course menu items.
- Add items to a cart, adjust quantities, and review the order subtotal and tip.
- Choose dine-in, takeaway, or delivery and enter relevant order details.
- Keep cart and order details in the browser between visits using local storage.
- Send the completed order summary to WhatsApp.
- View the café story, visit information, and social links.

## Built With

- Next.js App Router and React
- TypeScript
- Tailwind CSS
- Supabase for menu data
- Zustand with persist middleware for cart state and local storage persistence

## Getting Started

### Requirements

- Node.js 20.9 or newer
- npm
- A Supabase project with menu data

Clone the repository from GitHub, then install dependencies from the project directory:

```bash
npm install
```

Create a `.env.local` file in the project root with the Supabase project URL and anon/publishable key:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-or-publishable-key
```

> **Security Note:** `NEXT_PUBLIC_` values are included in client-side application code. Use only the Supabase anon/publishable key here; never put a service-role key or other private secret in a `NEXT_PUBLIC_` variable. Configure these variables in Vercel for each deployment environment.

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase Menu Data

The home page reads menu records from the `menu_items` table. The interface uses these fields. The types below are suggested schema types, not a migration included in this repository:

| Field | Suggested type | Purpose |
| --- | --- | --- |
| `id` | `uuid` or `bigint` | Stable item identifier; keep numeric IDs within JavaScript's safe integer range |
| `title` | `text` | Menu item name |
| `description` | `text` | Menu item description |
| `category` | `text` | Menu filter category, such as `Coffee`, `Teas`, `Pastries`, `Brunch`, or `Main Course` |
| `price` | `numeric` | Price in ETB |
| `image_url` | `text` | Image URL for the menu item |
| `tag` | `text`, nullable | Optional promotional or dietary label |

The public client needs read access to the menu. Configure Supabase Row Level Security and policies to allow only the intended public reads; do not expose privileged credentials in this application.

## Useful Commands

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm start         # Serve the production build
npx tsc --noEmit  # Check TypeScript types
```

## Deploying to Vercel

> **Before the first deployment:** Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the Vercel project's **Settings > Environment Variables**. Select the environments where they should be available. If a build has already failed because they were missing, save the variables and redeploy.

1. Push this repository to GitHub and import it into Vercel.
2. Deploy using the default Next.js build settings.
3. Confirm the production menu loads and verify the WhatsApp order destination and business contact details before launch.

The cart is stored in the customer's browser; this project does not create a server-side order record.
