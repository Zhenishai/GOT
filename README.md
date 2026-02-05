🐺 Game of Thrones — Episodes & Quiz App

A cinematic Game of Thrones fan project built with React, featuring an animated splash screen, episode gallery, authentication, favorites, and a quiz system.

⚔️ Winter is Coming…

📌 About the Project

This project is created for learning purposes only by a fan of Game of Thrones.
It is designed for other fans to explore episodes, test their knowledge, and enjoy an immersive, cinematic UI.

All episode data is sourced from TVMaze.

❄️ This is not an official Game of Thrones product and is not affiliated with HBO.

✨ Features:

🎬 Cinematic UI

Animated splash screen with:
Snowflake canvas animation
Moving icy gradient background
Smooth GSAP title transitions
Dark, cold, GoT-inspired design language

📺 Episodes Gallery

Grid-based episode gallery
Episode codes (S02E07 format)
Click-to-expand episode overlay
External link to TVMaze episode page

❤️ Favorites System

Logged-in users can like / favorite episodes
Favorites stored in Firebase Firestore
Visual heart indicator for liked episodes

🔐 Authentication

Firebase Authentication
Register / Login with email & password
Display user greeting on Home page
Logout option when already logged in

🧠 Quiz Page

10-question Game of Thrones quiz

Score shown after completion

Personalized message:

-“Pepita, you got 7/10 — Great job!”
-Quiz results stored in Firestore
-Returning users see their last score
-New users see encouragement to try the quiz

🛠️ Tech Stack

-React (Vite)
-React Router
-Firebase
-Authentication
-Firestore Database
-GSAP (animations)
-Canvas API (snowflake animation)
-CSS (custom, no UI frameworks)

📂 Project Structure (Simplified)
src/
│
├── auth/              # Firebase auth & Firestore helpers
├── components/        # Reusable UI components
├── pages/             # Pages (Home, Episodes, Quiz, Auth)
├── hooks/             # Custom React hooks
├── context/           # Auth context
├── styles/            # Global & page-specific styles
├── App.jsx
└── main.jsx
