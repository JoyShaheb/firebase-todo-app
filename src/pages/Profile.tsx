import { toast } from "react-toastify";
import {
  RootState,
  loginSuccess,
  useLogoutMutation,
  useUpdateUserProfileMutation,
} from "../store";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IUpdateUser } from "../types/interface";
import { useState } from "react";
import EditProfileForm from "../components/Form/EditProfileForm";
import EditProfileModal from "../components/Modal/EditProfileModal";
import { useUploadImageMutation } from "../store/API/storageAPI";

const Profile = () => {
  const [uploadImage] = useUploadImageMutation();

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [logout] = useLogoutMutation();
  const initialState: Pick<IUpdateUser, "name" | "photoURL" | "phoneNumber"> = {
    name: "Random Name",
    photoURL:
      "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/piw9n7scle0b3so65dzq.png",
    phoneNumber: "78234ghdsfgh",
  };
  const [data, setData] = useState(initialState);
  const dispatch = useDispatch();
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("form clicked");
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const appSignout = async () =>
    await toast
      .promise(logout(null).unwrap, {
        pending: "Logging out...",
        success: "Logout successful",
        error: "Logout failed",
      })
      // .then(() => setIsMenuOpen(false))
      .then(() => navigate("/login"));

  const [file, setFile] = useState({});

  const uploadImages = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      console.log("Uploading file:", file);
      await toast.promise(uploadImage(file).unwrap(), {
        pending: "Uploading image...",
        success: "Image uploaded",
        error: "Image upload failed",
      });
    }
  };

  return (
    <div className="">
      <h3>Welcome {user?.name}</h3>
      <p>email: @ {user?.email}</p>
      <p>phone number: {user?.phoneNumber}</p>
      <img
        className="mb-3"
        style={{
          width: "120px",
        }}
        src={
          user?.photoURL ? user?.photoURL : "/images/blank-profile-picture.svg"
        }
        alt=""
      />
      <EditProfileModal
        button={
          <div className="flex justify-center">
            <button className="btn btn-primary bg-blue-700 p-2 rounded-full mt-5 mx-auto">
              Edit Profile
            </button>
          </div>
        }
        title="Edit Profile"
        onConfirm={handleSubmit}
        onCancel={() => console.log("cancel")}
        onClose={() => console.log("close")}
      >
        <EditProfileForm {...data} handleInputChange={handleInputChange} />
      </EditProfileModal>
      <br />
      <button onClick={appSignout}>click to logout</button>

      <form onSubmit={uploadImages}>
        {file?.name}
        <input
          type="file"
          name=""
          id=""
          value=""
          onChange={(e) => setFile(e.target.files![0])}
        />

        <button type="submit">Upload image</button>
      </form>
    </div>
  );
};

export default Profile;
