import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userUid: string;
  name: string;
  email: string;
  profileImage: string;
}

export const initialState: UserState = {
  userUid: "",
  name: "",
  email: "",
  profileImage: "",
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logoutSuccess: () => initialState,
  },
});

export const { loginSuccess, logoutSuccess } = userDataSlice.actions;
