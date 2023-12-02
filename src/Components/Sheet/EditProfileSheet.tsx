import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProfileForm from "../Form/ProfileForm";
import { IUpdateUser } from "@/types/interface";
import { useState } from "react";

const EditProfileSheet = ({
  icon,
  profileData,
  onEdit,
}: {
  icon: React.ReactNode;
  profileData: IUpdateUser;
  onEdit: (
    e: React.FormEvent<HTMLFormElement>,
    data: IUpdateUser
  ) => Promise<void>;
}) => {
  const [localdata, setLocalData] = useState(profileData);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalData({
      ...localdata,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{icon}</SheetTrigger>
      <SheetContent>
        <form
          onSubmit={(e) => {
            onEdit(e, localdata);
          }}
        >
          <SheetHeader>
            <SheetTitle>Edit Profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <ProfileForm {...localdata} handleInput={handleInput} />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditProfileSheet;
