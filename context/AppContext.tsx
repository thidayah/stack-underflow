import React, { createContext, ReactNode, useReducer } from "react";
import { appReducer, AppState } from "./appReducer";

const initialState: AppState = {
  user: null,
  questions: [
    {
      id: "1",
      title: "Perbedaan React Native expo dan CLI?",
      description: "Saya ingin tahu alasan teknisnya...",
      status: "open",
      createdAt: new Date().toISOString(),
      author: "admin",
      comments: [],
    },
  ],
};

export const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
