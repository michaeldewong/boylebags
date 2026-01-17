# Boyle Bags Website

A Next.js 14 App Router website for Boyle Bags, a B2B bag solutions company offering quick-ship kits and custom RFQs.

## Features

- **Shop Kits**: Three proven bag kits with transparent pricing and quantity tiers
- **Custom RFQ**: Detailed quote request form with add-ons and options
- **Reorder Program**: Information about recurring order programs
- **Sample Pack**: Request form for sample packs (SoCal priority)
- **Service Information**: Proofing process and service levels
- **Compliance Updates**: California bag compliance information (general, not legal advice)

## Tech Stack

- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS 4
- React 19

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server on port 3001:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

**Stopping the dev server:**
- Press `Ctrl+C` in the terminal to stop the server

**Running on a different port:**
- If port 3001 is in use, use another port: `npm run dev -- -p 3002`

**Windows Troubleshooting:**

If you encounter issues on Windows:

1. **`.next/dev/lock` error**: 
   - Stop the dev server with `Ctrl+C` (wait a few seconds)
   - Delete the `.next` folder: `Remove-Item -Recurse -Force .next`
   - Restart: `npm run dev`

2. **Port already in use (EADDRINUSE)**:
   - Stop other dev servers with `Ctrl+C`
   - Or use a different port: `npm run dev -- -p 3002`

3. **Build errors**: 
   - Clear cache: `Remove-Item -Recurse -Force .next`
   - Reinstall dependencies: `Remove-Item -Recurse -Force node_modules; npm install`

### Build

Build for production:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

- `src/content.ts` - Single source of truth for all content, products, and page data
- `src/components/` - Reusable components (Navbar, Footer, Forms, etc.)
- `src/app/` - Next.js App Router pages and API routes
- `src/app/api/` - API routes for form submissions (RFQ, sample pack, contact)

## Content Architecture

All content is managed in `src/content.ts`:
- Site configuration (name, tagline, navigation, footer)
- Product definitions (3 kits with pricing tiers)
- Add-on definitions (rush, retail ready, split shipment, insert card)
- Page content (sections for each route)

Pages render sections using the `RenderSections` component, which supports:
- Hero sections
- Feature grids
- Steps
- FAQ
- Pricing tables
- Callouts
- Forms
- Legal content

## Forms

Form submissions are handled via `/api/lead`:
- `/custom` - Custom RFQ form (type: "custom")
- `/contact` - Contact form (type: "contact")

Each entry includes a timestamp, type, and payload.

**Local Development:**
- Leads are written to `.data/leads.json`
- The `.data/` directory is created automatically and excluded from git

**Production (Vercel):**
- If `RESEND_API_KEY` and `TO_EMAIL` env vars are set: Leads are sent via email using Resend
- Otherwise: Leads are logged to console (check Vercel function logs)
- File system writes are disabled in production (filesystem is ephemeral on Vercel)

## Products

Three kits available:
1. **Event Saver Kit** - Fast-turn solution (5-7 days standard)
2. **Retail Ready Kit** - Premium finish (7-10 days standard)
3. **Swag Stash Starter** - Program-friendly (7-10 days standard)

Each kit has quantity tiers (50/100/250/500/1000) with per-bag pricing.

## Add-ons

- **Rush**: +$150 flat (reduces lead time by 2-3 days)
- **Retail Ready**: +$1.20 per bag
- **Split Shipment**: +$25 per additional location
- **Insert Card**: +$0.50 per bag

## Terms & Conditions

The Terms page includes 5 required clauses:
1. Proof approval required
2. Includes 1 revision; extra revisions $25 each
3. Rush slots limited; scheduled upon payment
4. Equivalent substitution may apply if out of stock
5. Payment: Rush paid in full; standard deposit + balance due before ship

## Quick Checklist

- [ ] `npm install` - Install dependencies
- [ ] `npm run dev` - Start development server (port 3001)
- [ ] `npm run build` - Build for production
- [ ] All routes return 200 (test navigation)

## Common Fixes

- **Build fails**: Delete `.next` folder and rebuild
- **Port conflict**: Use `npm run dev -- -p 3002`
- **Lock file error**: Stop all Node processes, delete `.next`, restart
- **Type errors**: Run `npm run build` to see detailed TypeScript errors

## Deployment

### Vercel Deployment

1. **Connect your repository:**
   - Push your code to GitHub/GitLab/Bitbucket
   - Import the project in [Vercel](https://vercel.com)
   - Vercel will auto-detect Next.js settings

2. **Environment variables:**
   - For production lead handling, set these in Vercel dashboard:
     - `RESEND_API_KEY` (optional): Your Resend API key for email notifications
     - `TO_EMAIL` (optional): Email address to receive lead submissions
     - `FROM_EMAIL` (optional): Sender email address (default: "Boyle Bags <[email protected]>")
   - If `RESEND_API_KEY` and `TO_EMAIL` are not set, lead submissions will be logged to console in production
   - In local development, leads are saved to `.data/leads.json` (no env vars needed)

3. **Build settings:**
   - Framework Preset: Next.js
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

4. **Lead handling:**
   - **Production**: Set `RESEND_API_KEY` and `TO_EMAIL` to receive leads via email, or check console logs
   - **Local dev**: Leads are saved to `.data/leads.json` automatically
   - Form submission API responses remain the same in both environments

5. **Deploy:**
   - Push to your main branch to trigger automatic deployments
   - Or use `vercel` CLI: `npm i -g vercel && vercel`

### Local Production Build

```bash
npm run build
npm start
```

The production server will run on port 3000 by default.

## License

Copyright © 2026 Boyle & Co., LLC.
