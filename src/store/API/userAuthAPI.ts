import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth, googleProvider } from "../../Config/firebase-config";
import {
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export interface IUserSignInData {
  email: string;
  password: string;
}

export const userAuthAPI = createApi({
  reducerPath: "userAuthAPI",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    logout: builder.mutation<void, null>({
      queryFn: async () => {
        try {
          await signOut(auth);
          return {
            data: undefined,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
    emailSignup: builder.mutation<UserCredential, IUserSignInData>({
      queryFn: async (user: IUserSignInData) => {
        try {
          const { email, password } = user;
          const response: UserCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          return {
            data: response, // Corrected the return type to match QueryReturnValue
          };
        } catch (err) {
          return {
            error: (err as Error)?.message, // Added type assertion to access message property
          };
        }
      },
      invalidatesTags: ["User"],
    }),
    emailLogin: builder.mutation<UserCredential, IUserSignInData>({
      queryFn: async (user: IUserSignInData) => {
        try {
          const { email, password } = user;
          const response: UserCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          return {
            data: response,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
    googleSignup: builder.mutation<UserCredential, null>({
      queryFn: async () => {
        try {
          const response = await signInWithPopup(auth, googleProvider);
          return {
            data: response,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useEmailSignupMutation,
  useEmailLoginMutation,
  useGoogleSignupMutation,
  useLogoutMutation,
} = userAuthAPI;
