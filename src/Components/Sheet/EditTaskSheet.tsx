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
import TaskForm from "../Form/TaskForm";
import { ITaskProps } from "@/types/interface";
import { useState } from "react";

const EditTaskSheet = ({
  icon,
  taskData,
  onEdit,
}: {
  icon: React.ReactNode;
  taskData: ITaskProps;
  onEdit: (data: ITaskProps) => Promise<string>;
}) => {
  const [localdata, setLocalData] = useState(taskData);

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
            e.preventDefault();
          }}
        >
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <TaskForm {...localdata} handleInput={handleInput} />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button onClick={() => onEdit(localdata)} type="submit">
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditTaskSheet;
