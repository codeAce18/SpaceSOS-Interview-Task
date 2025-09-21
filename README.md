SpaceSOS — Newsletter Composer (Frontend Assignment)

A clean, responsive newsletter composer and manager built with Next.js + TypeScript, Tailwind CSS and Shadcn UI, using react-email for building previews and templates. This repo implements the SpacesOS Frontend Developer Tasks (Newsletter Composer) and demonstrates a production-like UI and UX for composing, previewing, saving, and scheduling email campaigns — without a backend (uses localStorage for persistence).

🧩 What this project implements (task summary)

Task: Build a newsletter creation flow where users can compose and preview email campaigns.
Core capabilities implemented:

Newsletter metadata: Subject, (and simple metadata UI: from, preheader).

Newsletter body: 2–3 editable sections with rich-text-like markdown editing (powered by react-email components + markdown editing support).

Add / Remove / Re-order sections (drag handle + up/down buttons).

Predefined layouts: at least two templates (Simple text-only, Header + Content + Footer).

Live Preview Mode: real-time render of the newsletter using react-email templates.

Save & Manage: Save as Draft or Schedule (date/time saved to localStorage), list of saved newsletters with status (Draft / Scheduled / Sent placeholder), preview drawer when clicking an item.

Responsive UI (mobile-first).

All UI components built with shadcn/ui (Radix + Tailwind).

🛠️ Tech Stack

Next.js (App Router) + TypeScript

Tailwind CSS

shadcn/ui (Radix + Tailwind components)

react-email (email templates & preview)

zustand (optional — lightweight client state management)

localStorage for persistence (no backend)

ESLint + Prettier

Vitest (optional — tests)

✨ Features (User-facing)

📝 Create newsletter: subject, preheader, and multiple content sections

➕ Add/remove sections and reorder them

🖋️ Section editor supports markdown / rich text blocks (react-email compatible)

🎨 Choose from multiple templates/layouts (Simple / Header + Content + Footer)

👀 Live preview that updates as you edit (react-email renderer)

💾 Save as Draft or Schedule (pick date/time)

📂 Manage saved newsletters: list, filter by status, open preview drawer

📱 Fully responsive — works well on mobile & desktop

📦 Project structure (high-level)
src/
├── app/                       # Next.js app routes (App Router)
├── components/                # Reusable UI components (Editor, Preview, Drawer, Modals)
├── features/
│   ├── newsletter/            # Newsletter composer state + UI + templates
│   └── manager/               # Saved newsletters list & scheduling UI
├── hooks/                     # Custom hooks (useAutosave, useLocalStorage)
├── lib/                       # helper functions (date utils, storage adapters)
├── styles/                    # tailwind config + global css
├── types/                     # TypeScript types and interfaces
└── pages/api/ (optional)      # placeholder API routes (if needed later)

🔧 Getting started (run locally)

Clone the repository

git clone https://github.com/codeAce18/SpaceSOS-Interview-Task.git
cd SpaceSOS-Interview-Task


Install dependencies

npm install
# or
yarn


Run development server

npm run dev
# or
yarn dev


Open http://localhost:3000 and start composing.

Build for production

npm run build
npm run start


🧑‍💻 Author

Taiwo Joel
GitHub — codeAce18

📄 License
MIT License
