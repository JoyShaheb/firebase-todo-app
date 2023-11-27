import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { firebaseStorage } from "../../Config/firebase-config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export const storageAPI = createApi({
  reducerPath: "storageAPI",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Storage"],
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      queryFn: async (file) => {
        try {
          const storageRef = ref(firebaseStorage, `files/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          return {
            data: getDownloadURL(uploadTask.snapshot.ref),
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["Storage"],
    }),
  }),
});

export const { useUploadImageMutation } = storageAPI;
