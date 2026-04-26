<div align="center">

# 📷 Leica Gallery

**A full-stack photo gallery application built for photographers who care about craft.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-▶%20View%20App-black?style=for-the-badge&logo=vercel)](https://leica-gallery-4qm8-i66vxku8z-jgamez17s-projects.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/JGamez17/Leica-Gallery)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

</div>

---

## 🌐 Live Demo

🔗 **[https://leica-gallery-4qm8-i66vxku8z-jgamez17s-projects.vercel.app/](https://leica-gallery-4qm8-i66vxku8z-jgamez17s-projects.vercel.app/)**

---

## 📸 Screenshots

> _Screenshots coming soon — the gallery is live and accepting new photos._

| Home / Gallery Grid                                                                       | Photo Lightbox / Modal                                                                   |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| ![Gallery Grid](https://via.placeholder.com/600x380/111111/ffffff?text=Gallery+Grid+View) | ![Lightbox](https://via.placeholder.com/600x380/111111/ffffff?text=Photo+Lightbox+Modal) |

| Upload Flow                                                                       | Mobile View                                                                                      |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| ![Upload](https://via.placeholder.com/600x380/111111/ffffff?text=Photo+Upload+UI) | ![Mobile](https://via.placeholder.com/600x380/300x380/111111/ffffff?text=Responsive+Mobile+View) |

---

## 🛠 Tech Stack

### Frontend

| Technology                                      | Version | Purpose                              |
| ----------------------------------------------- | ------- | ------------------------------------ |
| [Next.js](https://nextjs.org/)                  | 15      | App Router, SSR, API Routes          |
| [React](https://react.dev/)                     | 19      | UI Component Library                 |
| [TypeScript](https://www.typescriptlang.org/)   | 5       | Static Typing & Type Safety          |
| [Tailwind CSS](https://tailwindcss.com/)        | 3.4     | Utility-First Styling                |
| [Framer Motion](https://www.framer.com/motion/) | 11      | Animations & Transitions             |
| [Radix UI](https://www.radix-ui.com/)           | 1.1     | Accessible Dialog & Modal Primitives |

### Backend & Data

| Technology                              | Version | Purpose                                    |
| --------------------------------------- | ------- | ------------------------------------------ |
| [Prisma ORM](https://www.prisma.io/)    | 5.22    | Database Schema & Type-Safe Queries        |
| [PostgreSQL (Neon)](https://neon.tech/) | —       | Serverless Cloud Database                  |
| [Cloudinary](https://cloudinary.com/)   | 2.8     | Image Storage, Optimization & CDN Delivery |

### Infrastructure & Tooling

| Technology                      | Purpose                      |
| ------------------------------- | ---------------------------- |
| [Vercel](https://vercel.com/)   | CI/CD, Serverless Deployment |
| [ESLint](https://eslint.org/)   | Code Quality & Linting       |
| [PostCSS](https://postcss.org/) | CSS Processing               |

---

## ✨ Features

- **📤 Photo Upload** — Upload photos directly from the browser; images are stored and optimized via Cloudinary's CDN
- **🗃️ Persistent Storage** — Photo metadata (title, URL, timestamps) is persisted in a PostgreSQL database via Prisma ORM
- **🎞️ Animated Gallery Grid** — Responsive masonry-style grid with Framer Motion entrance animations on load
- **🔍 Lightbox Modal** — Click any photo to open a full-screen accessible modal built with Radix UI Dialog
- **📱 Fully Responsive** — Mobile-first layout that adapts gracefully from phone to widescreen
- **⚡ Optimized Delivery** — Cloudinary handles image transformation, resizing, and CDN delivery automatically
- **🔒 Secure Credentials** — API keys and database URLs managed via environment variables (`.env.local`), never committed to source control
- **🚀 Serverless API Routes** — Next.js App Router API routes handle upload and fetch logic server-side

---

## 🗂️ Project Structure

```
leica-gallery/
├── prisma/
│   ├── schema.prisma       # Database schema (Photo model)
│   └── seed.ts             # Seed script for local dev
├── public/
│   └── photos/             # Static local photo assets
├── src/
│   ├── app/
│   │   ├── api/            # Next.js API routes (upload, photos)
│   │   ├── components/     # Reusable UI components
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Gallery home page
│   └── lib/
│       ├── cloudinary.ts   # Cloudinary SDK config
│       └── prisma.ts       # Prisma client singleton
├── .env.local              # Environment variables (not committed)
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Cloudinary](https://cloudinary.com/) account (free tier works)
- A [Neon](https://neon.tech/) PostgreSQL database (free tier works)

### 1. Clone the repo

```bash
git clone https://github.com/JGamez17/Leica-Gallery.git
cd Leica-Gallery
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Database (Neon PostgreSQL)
DATABASE_URL=your_neon_connection_string
```

### 4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🌍 Deployment

This project is deployed on **Vercel** with automatic CI/CD from the `main` branch.

The build command runs `prisma generate` before `next build` to ensure the Prisma client is always in sync with the schema:

```json
"build": "prisma generate && next build"
```

Environment variables are configured in the Vercel project dashboard — never in the codebase.

---

## 🔮 Roadmap

- [ ] Add photo categories / tags for filtering
- [ ] Admin authentication for protected upload route
- [ ] Infinite scroll pagination
- [ ] EXIF metadata display (camera, lens, settings)
- [ ] Dark / light mode toggle

---

## 👩‍💻 Author

**Jessica Gamez**
Full-Stack Engineer · QA Specialist · Photographer

[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-black?style=flat-square)](https://portfolio-timeline-jgamez17s-projects.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/jpgamez/)
[![GitHub](https://img.shields.io/badge/GitHub-JGamez17-181717?style=flat-square&logo=github)](https://github.com/JGamez17)

---

<div align="center">
  <sub>Built with ☕, Next.js, and a Leica lens. © 2025 Jessica Gamez</sub>
</div>
