import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LuFacebook } from "react-icons/lu";
import { LuInstagram } from "react-icons/lu";
import { LuTwitter } from "react-icons/lu";
import { LuLinkedin } from "react-icons/lu";
import EditProfileSheet from "@/components/Sheet/EditProfileSheet";
import { User } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { IUpdateUser } from "@/types/interface";
import { RootState, useUpdateUserProfileMutation } from "@/store";
import { useSelector } from "react-redux";
import { useUploadImageMutation } from "@/store/API/storageAPI";

const Profile = () => {
  const [uploadImage] = useUploadImageMutation();

  // const navigate = useNavigate();
  const user = useSelector((state: RootState
    ) => state.user);
  // const [logout] = useLogoutMutation();
  const initialState: Pick<IUpdateUser, "name" | "photoURL" | "phoneNumber"> = {
    name: "Random Name",
    photoURL:
      "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/piw9n7scle0b3so65dzq.png",
    phoneNumber: "78234ghdsfgh",
  };
  const [data, setData] = useState(initialState);
  const [updateUserProfile] = useUpdateUserProfileMutation
  ();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    formData: IUpdateUser
  ) => {
    console.log("form clicked");
    e.preventDefault();
    await toast
      .promise(updateUserProfile(formData).unwrap(), {
        pending: "Updating profile...",
        success: "Profile updated",
        error: "Profile update failed",
      })
      // .then((res: IUpdateUser) => dispatch(loginSuccess(res)))
      .catch((err) => toast.error(err));
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  //   setData({ ...data, [e.target.name]: e.target.value });


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
    <section
      key="1"
      className="w-full py-6 px-4 md:py-12 md:px-6 lg:py-16 lg:px-12 xl:py-24 xl:px-24"
    >
      <div className="container grid items-center justify-center gap-4 lg:gap-6 xl:gap-8 border border-gray-200 dark:border-gray-700 shadow-md rounded-lg p-6 max-w-md mx-auto">
        <Avatar className="h-64 w-64">
        <img
                className="mb-3"
                style={{
                  width: "120px",
                }}
                src={
                  user?.photoURL
                    ? user?.photoURL
                    : "/images/blank-profile-picture.svg"
                }
                alt=""
              />
          {/* <AvatarImage alt="Profile picture" src="/placeholder-avatar.jpg" /> */}
          <AvatarFallback>
            <div className="mt-2">
              <Label className="text-base" htmlFor="avatarUpload">
                Upload Image
              </Label>
              <Input className="mt-1" id="avatarUpload" type="file" />
            </div>
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">{user?.name}</h2>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Address:
              </span>
              <p className="text-lg text-gray-500 dark:text-gray-400">
              {user?.name}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Phone:
              </span>
              <p className="text-lg text-gray-500 dark:text-gray-400">
              {user?.phoneNumber}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Email:
              </span>
              <p className="text-lg text-gray-500 dark:text-gray-400">
              {user?.email}
              </p>
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <Link className="hover:text-blue-600 dark:hover:text-blue-400" to="#">
            <LuFacebook className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link className="hover:text-blue-400 dark:hover:text-blue-300" to="#">
            <LuTwitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link className="hover:text-pink-600 dark:hover:text-pink-400" to="#">
            <LuInstagram className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link className="hover:text-blue-700 dark:hover:text-blue-500" to="#">
            <LuLinkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
        <div className="mt-4">
          <Button
            className="px-4 py-2 text-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            variant="outline"
          >
            <EditProfileSheet
              icon={
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" style={{ fill: "green" }} />
                  {/* <span>Edit Profile</span> */}
                </div>
              }
              profileData={data}
              onEdit={handleSubmit}
            />
            Edit Profile
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Profile;