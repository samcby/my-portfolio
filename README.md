# Sam Chen's Portfolio

Personal portfolio for Sam Chen, an IC design and computer architecture
engineer pursuing an M.S. in Electrical and Computer Engineering at UCLA.

Live site: [samchen.vercel.app](https://samchen.vercel.app/)

## Highlights

- Responsive portfolio pages for projects, experience, education, hobbies, and contact
- Searchable and filterable project collection
- Accessible light and dark themes
- On-demand interactive 3D model
- Server-side contact endpoint using Resend
- SEO metadata, sitemap, and robots configuration

## Technology

- Next.js App Router
- React
- Tailwind CSS
- Framer Motion
- React Three Fiber
- Resend

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Contact Form

Create `.env.local` from `.env.local.example` and provide:

```bash
RESEND_API_KEY="your_resend_api_key"
CONTACT_TO_EMAIL="your_email@example.com"
CONTACT_FROM_EMAIL="Portfolio Contact <onboarding@resend.dev>"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

`CONTACT_FROM_EMAIL` may use Resend's onboarding sender while testing. A
verified domain is recommended for production delivery.

## Quality Checks

```bash
npm run lint
npm run build
```

## Deployment

The production site is deployed through Vercel from the `main` branch.
