import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "./SearchUsers.type";
import { fetchUsers as fetchUsersApi } from "@/api/searchUIsersApi";

export enum ApiStatusEnum {
  IDLE = "IDLE",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

type ApiStatus = `${ApiStatusEnum}`;

export type UsersState = {
  users: User[];
  fetchUsersStatus: ApiStatus;
};

const initialState: UsersState = {
  users: [],
  fetchUsersStatus: "IDLE",
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", fetchUsersApi);
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
      state.fetchUsersStatus = ApiStatusEnum.PENDING;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.fetchUsersStatus = ApiStatusEnum.SUCCESS;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, _action) => {
      state.fetchUsersStatus = ApiStatusEnum.ERROR;
    });
  },
});

export const { clearUsers } = searchUsersSlice.actions;

export default searchUsersSlice.reducer;
