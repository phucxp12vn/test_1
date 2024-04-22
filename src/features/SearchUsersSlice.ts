import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "./SearchUsers.type";

type ApiStatus = "IDLE" | "PENDING" | "SUCCESS" | "ERROR";

export type UsersState = {
  users: User[];
  fetchUsersStatus: ApiStatus;
};

const initialState: UsersState = {
  users: [],
  fetchUsersStatus: "IDLE",
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", (_: string) => {
  console.log("call api search user");
  const dummyData = [
    {
      id: 1,
      login: "octocat",
      avatar_url: "https://avatars.githubusercontent.com/u/1272629?s=80&v=4",
      type: "User",
    },
  ] as User[];
  return dummyData;
});
export const searchUsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, _action) => {
      state.fetchUsersStatus = "PENDING";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.fetchUsersStatus = "SUCCESS";
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, _action) => {
      state.fetchUsersStatus = "ERROR";
    });
  },
});

export const { clearUsers } = searchUsersSlice.actions;

export default searchUsersSlice.reducer;
