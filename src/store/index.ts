import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { sysmtemSlice, resetSystem, themeSwitch } from "./Slices/systemSlice";
import { userDataSlice, loginSuccess, logoutSuccess } from "./Slices/userSlice";
import { taskAPI } from "./API/taskAPI";
import {
  userAuthAPI,
  useEmailSignupMutation,
  useEmailLoginMutation,
  useGoogleSignupMutation,
  useLogoutMutation,
  useSendResetPassWordEmailMutation,
  useSetNewPassWordMutation,
  useUpdateUserProfileMutation,
} from "./API/userAuthAPI";
import { storageAPI } from "./API/storageAPI";

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
    [taskAPI.reducerPath]: taskAPI.reducer,
    [storageAPI.reducerPath]: storageAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      userAuthAPI.middleware,
      taskAPI.middleware,
      storageAPI.middleware
    ),
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
  useUpdateUserProfileMutation,
  // user auth slice
  loginSuccess,
  logoutSuccess,
};