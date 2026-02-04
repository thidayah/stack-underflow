# 📱 Stack Underflow (React Native)

**Stack Underflow** is a lightweight Q&A mobile application built with **React Native (Expo)**, inspired by Stack Overflow.  
The app runs entirely on the frontend with **no backend**, and all data is stored in memory during runtime.

---

## ▶️ Getting Started

### 1. Install dependencies

```bash
yarn install
```

### 2. Start the development server

```bash
yarn start
```

Then open the app using:

- Expo Go on a physical device, or
- Android Emulator / iOS Simulator

---

## ✨ Features

### 🔐 Mock Login

- Users can log in using **any username and password**
- No real authentication or backend integration
- Login state is stored in global state and resets when the app reloads

### ❓ Questions

Users can:

- View a list of questions
- Create a new question
- View question details
- Change the status of their own questions (`open`, `answered`, `closed`)

### 💬 Comments

Users can:

- Add a comment
- Edit their own comments

All updates reflect immediately in the UI without reloading the app.

---

## 🧱 Architecture & Approach

### 🧠 State Management

The app uses **React Context + useReducer** for global state management.

Global state stores:

- The currently logged-in user
- The list of questions and their comments

This approach was chosen because:

- No additional libraries are required
- It is suitable for small to medium-sized apps
- It provides clear and centralized state update logic (login, add question, add/edit comment, etc.)

### 🧭 Navigation

Navigation is handled using **Expo Router** with file-based routing.

Main structure:

```
app/
├── index.tsx           → Login Screen
├── questions/
│ ├── index.tsx         → Question List Screen
│ ├── ask.tsx           → Ask Question Screen
│ └── [id].tsx          → Question Detail & Comments
└── _layout.tsx         → Root layout + Context Provider
```

Additional Folder Structure

```
context/
├── AppContext.tsx
└── appReducer.ts
```

This context layer acts as an in-memory data store since the app does not use a backend.

---

### 📦 Main Libraries Used

- **React Native (Expo)**
- **Expo Router** – File-based navigation
- **React Context + useReducer** – Global state management
- **moment** - Date and time formatter

### ⚠️ Assumptions & Limitations

- No backend or persistent storage is used
- All data is lost when the app reloads or is force closed
- Input validation is minimal
- Delete functionality for questions/comments is not implemented (focus is on core required features)
