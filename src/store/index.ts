import { configureStore } from "@reduxjs/toolkit";
import searchUsersReducer from "@/features/SearchUsersSlice";

export const store = configureStore({
  reducer: {
    users: searchUsersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
