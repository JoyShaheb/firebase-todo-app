import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialStateProps {
  userUid: string;
}

export const initialState: InitialStateProps = {
  userUid: "",
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    changeValue(state, action: PayloadAction<InitialStateProps>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetUserData: () => initialState,
  },
});

export const { changeValue, resetUserData } = userDataSlice.actions;
