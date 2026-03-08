# Sam's Portfolio Website

A clean, responsive personal portfolio built with **Next.js + Tailwind CSS**. This repository is a lightweight starter for showcasing projects, experience, and contact details with subtle animations and mobile-friendly layout.

This English README is adapted and condensed from the project閳ユ獨 original README.&#x20;

---

## 閴?Key Features

* Responsive layout for desktop and mobile
* Animated UI bits via Framer Motion (smooth, subtle interactions)
* Sections for projects, experience/timeline, and contact
* Example integrations: icon libraries, simple email/contact pattern, and optional bundle analysis for builds
* Easy to customize: Tailwind + utility classes make style adjustments straightforward

---

## 棣冩憹 Installation & Local Development

1. Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd <project-directory>
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open your browser to:

```
http://localhost:3000
```

---

## Contact Form Setup

To enable the contact form, create a local env file from `.env.local.example` and provide these values:

```bash
RESEND_API_KEY="your_resend_api_key"
CONTACT_TO_EMAIL="your_email@example.com"
CONTACT_FROM_EMAIL="Portfolio Contact <onboarding@resend.dev>"
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="optional_recaptcha_site_key"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Notes:

* `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are required for sending email.
* `CONTACT_FROM_EMAIL` can stay as the default while testing with Resend.
* `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is optional. If omitted, the form still works but without spam protection.
* For production, set `NEXT_PUBLIC_SITE_URL` to your deployed domain.

---
## 棣冩畬 Build & Production

Build and run the production bundle:

```bash
npm run build
npm start
```

Analyze bundle sizes (optional):

```bash
ANALYZE=true npm run build
```

If analysis is enabled, the report will be available at `.next/analyze/client.html`.

---

## 棣冃?Main Dependencies (examples)

* `next` 閳?React framework (SSR / SSG)
* `react`, `react-dom` 閳?React core
* `tailwindcss` 閳?Utility-first CSS
* `framer-motion` 閳?Animations
* `@heroicons/react`, `react-icons` 閳?Icon sets

(For the full and exact versions, check `package.json`.)

---

## 棣冩礈 Development Tips

* Centralize color & theme variables (CSS variables / global stylesheet) to change site-wide color quickly.
* If you change `tailwind.config.js`, restart the dev server so Tailwind can regenerate classes.
* Use your browser devtools to live-edit CSS variables when experimenting with palettes.

---

## 棣冩 Roadmap / TODO

* [ ] Polish light/dark theme switching and persistence
* [ ] Improve mobile UX and accessibility
* [ ] Add multilingual support (i18n)
* [ ] Enhance the music player / media components (if used)

---

## 棣冾檪 Contributing

Contributions, issues, and pull requests are welcome. Feel free to:

* Open an issue to discuss a change
* Submit a small PR for style, copy, or minor functionality improvements

Before contributing, please ensure your code follows existing styles and that you explain the purpose of changes in the PR description.

---

## 棣冩 Acknowledgements

Big thanks to the projects and authors that inspired this repo:

* `https://github.com/Rickyoung221/my-portfolio` 閳?Thanks to this repository for structure and stylistic inspiration. (Author: Rickyoung221)

Also thanks to various open-source libraries used throughout the project.&#x20;

---

## 棣冩惈 License

Include a `LICENSE` file in your repository to declare the project license (e.g., MIT). If you want, I can add a standard MIT license text for you.
