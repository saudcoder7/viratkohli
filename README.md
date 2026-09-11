<div align="center">

# 🏏 King Kohli: The Journey

### An unofficial, fully animated tribute to Virat Kohli's cricket career

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?logo=greensock)](https://gsap.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Backend-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com/)

[Live Site](https://viratkohli2.vercel.app) · [Report a Bug](../../issues) · [Request a Feature](../../issues)

</div>

---

> ⚠️ **Unofficial fan project.** This site is not affiliated with, endorsed by, or connected to Virat Kohli, the BCCI, the IPL, or any cricket board or franchise. Built for educational and portfolio purposes. All trademarks and player likeness belong to their respective owners.

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Site Structure](#-site-structure)
- [Getting Started](#-getting-started)
- [Backend Setup (Firebase)](#-backend-setup-firebase)
- [Content & Media Disclaimer](#-content--media-disclaimer)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

## 🎯 About the Project

**King Kohli: The Journey** tells the complete story of Virat Kohli's career — debut to present, across Test, ODI, T20I, and IPL cricket. Not just a highlight reel: it includes the slumps, the lost finals, the captaincy resignations, and the comebacks, alongside the record-breaking centuries and the titles. 55 career moments in total, each with its own place in the story.

The homepage presents a browsable Career Highlights grid; each format also has its own dedicated "story mode" page presenting that format's complete chronological arc as a full-bleed, crossfade-animated sequence.

## ✨ Features

- 🎥 **Cinematic hero** — muted, autoplaying video of Kohli's six off Haris Rauf (T20 World Cup 2022), with a live stat strip
- 📊 **Career Highlights grid** — 55 moments across all four formats, filterable, each linking directly to its exact position in the full format timeline
- 🏏 **Dedicated format story pages** (`/test`, `/odi`, `/t20i`, `/ipl`) — complete chronological career arcs, full-bleed photo/video with crossfade transitions
- 📈 **Live stats** — ODI and IPL numbers refresh automatically via a scheduled Cloud Function (Kohli is still active in both); Test and T20I are permanently fixed since his retirement from both formats
- 🏆 **Awards & Honors** — Arjuna Award, Padma Shri, Khel Ratna, and the full list of ICC honors
- 🎥 **Gallery** — captioned photos and videos, organized by match/context
- 💬 **Fan Zone** — a live message wall and a "Best Kohli Knock Ever?" poll, backed by Firestore
- 🎨 **Dark, premium theme** with consistent motion design — blur/glide text reveals, staggered card entrances, and hover micro-interactions throughout
- 📱 **Fully responsive** across desktop and mobile

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Scroll Animation | [GSAP](https://gsap.com/) + ScrollTrigger |
| UI Motion | [Framer Motion](https://www.framer.com/motion/) |
| Backend / Database | [Firebase](https://firebase.google.com/) (Firestore, Auth, Cloud Functions, Hosting) |
| Live Sports Data | [CricketData.org](https://cricketdata.org) API |
| Fonts | Bebas Neue, Playfair Display, Inter |
| Deployment | [Vercel](https://vercel.com/) |

## 📁 Site Structure

```
/                   Homepage — hero, Career Highlights grid, stats summary,
                    Awards Wall, Gallery, Fan Zone, footer
/test               Full Test career story (16 moments, debut → retirement)
/odi                Full ODI career story (16 moments, debut → active/present)
/t20i               Full T20I career story (11 moments, debut → retirement)
/ipl                Full IPL career story (12 moments, 2008 → 2026 title defense)
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A [Firebase](https://firebase.google.com/) project (free tier is sufficient)
- A [CricketData.org](https://cricketdata.org) API key (free tier available)

### Installation

```bash
git clone https://github.com/<your-username>/king-kohli-journey.git
cd king-kohli-journey
npm install
cp .env.example .env.local
# fill in your Firebase config values
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view it locally.

### Environment Variables

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

> 🔒 The CricketData.org API key belongs only in the Cloud Function's environment config — never in client-side code or committed to the repo.

## ☁️ Backend Setup (Firebase)

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com/)
2. Enable **Firestore Database** and **Anonymous Authentication**
3. Deploy the scheduled Cloud Function that refreshes ODI and IPL stats from CricketData.org:
   ```bash
   cd functions
   npm install
   firebase deploy --only functions
   ```
4. Apply the Firestore security rules in `firestore.rules` — fan wall/poll writes are open to anonymous auth but not editable by other users; cached stats documents are read-only from the client
5. Seed Firestore with the initial career data (stats, milestones, awards)

## 📜 Content & Media Disclaimer

All player photos, video content, and career statistics are used for **non-commercial, fan-tribute purposes only**. Video is embedded via the official YouTube iframe player — no video files are hosted in this repository. Images are sourced from Wikimedia Commons, Openverse, and official public archives (e.g. PIB India for award-ceremony photos). This project claims no ownership over Virat Kohli's name, image, likeness, or any associated trademarks.

## 📄 License

Distributed under the MIT License for the **codebase only**. See [`LICENSE`](./LICENSE). This does **not** extend to third-party media (photographs, video, player likeness, or trademarks) referenced within the project.

## 🙏 Acknowledgements

- Career statistics and milestones compiled from [ESPNcricinfo](https://www.espncricinfo.com/), [Wikipedia](https://en.wikipedia.org/), and the [official IPL website](https://www.iplt20.com/)
- Built with [Next.js](https://nextjs.org/), [GSAP](https://gsap.com/), and [Firebase](https://firebase.google.com/)

---

<div align="center">

© 2026 King Kohli: The Journey — Made by **Saud Faisal**, greatest fan of Virat Kohli

</div>
