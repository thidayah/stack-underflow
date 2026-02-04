export type Comment = {
  id: string;
  content: string;
  author: string;
  createdAt: string;
};

export type Question = {
  id: string;
  title: string;
  description: string;
  status: "open" | "answered" | "closed";
  createdAt: string;
  author: string;
  comments: Comment[];
};

export type AppState = {
  user: string | null;
  questions: Question[];
};

export type Action =
  | { type: "LOGIN"; payload: string }
  | { type: "LOGOUT" }
  | { type: "ADD_QUESTION"; payload: Question }
  | { type: "UPDATE_QUESTION"; payload: Question }
  | { type: "ADD_COMMENT"; payload: { questionId: string; comment: Comment } }
  | { type: "UPDATE_COMMENT"; payload: { questionId: string; comment: Comment } }

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload
      };

    case "LOGOUT":
      return {
        ...state,
        user: null
      };

    case "ADD_QUESTION":
      return {
        ...state,
        questions: [action.payload, ...state.questions]
      };

    case "UPDATE_QUESTION":
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.payload.id ? action.payload : q
        ),
      };

    case "ADD_COMMENT":
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.payload.questionId
            ? { ...q, comments: [...q.comments, action.payload.comment] }
            : q
        ),
      };

    case "UPDATE_COMMENT":
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.payload.questionId
            ? {
              ...q,
              comments: q.comments.map((c) =>
                c.id === action.payload.comment.id ? action.payload.comment : c
              ),
            }
            : q
        ),
      };

    default:
      return state;
  }
}
