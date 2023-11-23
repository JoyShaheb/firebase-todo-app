import { useSelector } from "react-redux";
import { RootState } from "../store";
// import InputField from "../components/Form/InputField";

const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div>
      <img className="w-[100px] h-[100px]" src={user?.profileImage} alt="" />
      <div className="">
        <div className="">{user?.name}</div>
        <div className="">{user?.email}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
