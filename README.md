# ChatFusion

A cross-platform mobile messaging app with real-time translation, AI-powered suggestive text, and media sharing — built with React Native and Firebase.

---

## Features

- **Real-time messaging** — text, images, videos, and documents
- **Live translation** — translate messages between English, French, and Spanish instantly
- **AI suggestive text** — OpenAI-powered message suggestions as you type
- **Authentication** — Google sign-in and email/password via Firebase Auth
- **Media sharing** — send images, videos, and documents in chat
- **Admin panel** — built with React and Next.js; admins can enable/disable users and manage accounts
- **Cross-platform** — runs on both iOS and Android

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile app | React Native, Expo |
| Styling | NativeBase, Tailwind |
| Database | Firebase Firestore |
| Auth | Firebase Authentication (Google + email/password) |
| AI | OpenAI API (suggestive text) |
| Translation | Translation API |
| Admin panel | React, Next.js, Node.js, Express |
| Architecture | MVC (Model View Controller) |

---

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Firebase account
- OpenAI API key
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/darsh1829/ChatFusion.git
   cd ChatFusion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```
  FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
OPENAI_API_KEY=your_openai_api_key
GOOGLE_TRANSLATION_API_KEY=your_translation_api_key
   ```

4. **Start the app**
   ```bash
   npx expo start
   ```

### Admin Panel Setup

```bash
cd admin-panel
npm install
npm run dev
```

---

## Project Structure

```
ChatFusion/
├── ChatApp/          # React Native mobile app
└── Admin Panel/      # Next.js admin dashboard
```

---

## Admin Panel

A separate web dashboard for administrators to manage the platform:

- View and manage all registered users
- Enable or disable user accounts
- Built with React, Next.js, and Firebase Firestore

---

## Team

Built by a team of 4 as a college project at Seneca College.

---

## License

MIT
