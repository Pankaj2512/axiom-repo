# Axiom — Crack Your Dream Role 🚀

An AI-powered preparation platform for engineers targeting **SDE 2**, **Senior AI/ML**, and **Fresher SDE** roles at top-tier companies.

## Features

### Phase 1 (Current)
- 📊 **Dashboard** — Track progress, streaks, and daily analytics
- 📚 **Multi-track Syllabus** — DSA (Striver 450), HLD, LLD, CS Fundamentals
- 🔄 **Spaced Repetition** — SM-2 algorithm with weekly revision days
- 📝 **Notes & Solutions** — Save code, notes, and complexity analysis per question
- 📋 **Custom Lists** — Create personal question lists ("Mock Failures", "Must Revise")
- 🔥 **Streak Tracking** — GitHub-style activity heatmap
- 🔐 **Auth** — Google + GitHub sign-in via Firebase

### Coming Soon
- 🤖 **AI Mentor** — Gemini-powered study assistant with RAG
- 🔮 **Forecaster** — Smart timeline prediction based on pace & target
- 🧪 **Mock Interviews** — AI-simulated technical interviews
- 📊 **Code Review Agent** — Automated solution analysis

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS + Custom Design System
- **Auth/DB:** Firebase (Auth + Firestore)
- **AI:** Gemini API + Firebase Vector Search
- **Icons:** Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Firebase config

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your Firebase configuration:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## License

MIT © Pankaj Kumar
