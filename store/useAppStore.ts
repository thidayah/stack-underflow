import { create } from "zustand";


type Comment = {
  id: string;
  content: string;
  author: string;
  createdAt: string;
};

type Question = {
  id: string;
  title: string;
  description: string;
  status: "open" | "answered" | "closed";
  createdAt: string;
  author: string;
  comments: Comment[];
};

type AppState = {
  count: number
  user: string | null
  questions: Question[]

  onIncrement: () => void
  onDecrement: () => void
  onLogin: (username: string) => void
  onLogout: () => void
  onAddQuestion: (payload: Question) => void
}

export const useAppStore = create<AppState>((set) => ({
  // Initial State
  count: 0,
  user: null,
  questions: [
    {
      id: "1",
      title: "Keunggulan React Native dengan multiple platform lainnya?",
      description: "Saya ingin tahu alasan teknisnya...",
      status: "open",
      createdAt: new Date().toISOString(),
      author: "admin",
      comments: [],
    },
  ],

  // Actions
  onIncrement: () =>
    set((state) => ({
      count: state.count + 1,
    })),

  onDecrement: () =>
    set((state) => ({
      count: state.count - 1,
    })),

  onLogin: (username) =>
    set({
      user: username,
    }),

  onLogout: () =>
    set({
      user: null,
    }),

  onAddQuestion: (payload) =>
    set((state) => ({
      questions: [payload, ...state.questions]
    }))
}))
