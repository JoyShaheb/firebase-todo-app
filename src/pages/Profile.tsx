import { useState } from "react";
import { toast } from "react-toastify";
import { loginSuccess, useUpdateUserProfileMutation } from "../store";
import { useDispatch } from "react-redux";
import { IUpdateUser } from "../types/interface";

const Profile = () => {
  const initialState: Pick<IUpdateUser, "name" | "photoURL"> = {
    name: "sssssssssss",
    photoURL:
      "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/piw9n7scle0b3so65dzq.png",
  };
  const [data, setData] = useState(initialState);
  const dispatch = useDispatch();
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await toast
      .promise(updateUserProfile(data).unwrap(), {
        pending: "Updating profile...",
        success: "Profile updated",
        error: "Profile update failed",
      })
      .then((res: IUpdateUser) => dispatch(loginSuccess(res)))
      .catch((err) => toast.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" />
      <br />
      <br />
      <input type="text" />
      <button type="submit">change something</button>
    </form>
  );
};

export default Profile;
