import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
}

export const initialState: UserState = {
  uid: "",
  name: "",
  email: "",
  photoURL: "",
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
