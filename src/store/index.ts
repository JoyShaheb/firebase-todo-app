import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { sysmtemSlice, resetSystem, themeSwitch } from "./Slices/systemSlice";
import { userDataSlice, changeValue, resetUserData } from "./Slices/userSlice";

import {
  userAuthAPI,
  useEmailSignupMutation,
  useEmailLoginMutation,
  useGoogleSignupMutation,
  useLogoutMutation,
  useSendResetPassWordEmailMutation,
  useSetNewPassWordMutation,
} from "./API/userAuthAPI";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedSystemReducer = persistReducer(
  persistConfig,
  sysmtemSlice.reducer
);

const persistedUserReducer = persistReducer(
  persistConfig,
  userDataSlice.reducer
);

export const store = configureStore({
  reducer: {
    system: persistedSystemReducer,
    user: persistedUserReducer,
    [userAuthAPI.reducerPath]: userAuthAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userAuthAPI.middleware),
});

export const persistedStore = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export {
  // system settings
  resetSystem,
  themeSwitch,

  // user auth
  useEmailSignupMutation,
  useEmailLoginMutation,
  useGoogleSignupMutation,
  useLogoutMutation,
  useSendResetPassWordEmailMutation,
  useSetNewPassWordMutation,

  // user auth slice
  changeValue,
  resetUserData,
};
