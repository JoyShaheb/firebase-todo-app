import { CreditCard, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuMoreHorizontal } from "react-icons/lu";
import ConfirmModal from "../Modal/ConfirmModal";
import { FC } from "react";
import EditTaskSheet from "../Sheet/EditTaskSheet";
import { ITaskProps } from "@/types/interface";

interface ITaskMenuProps {
  onDelete: (id: string) => Promise<void>;
  taskData: ITaskProps;
  onEdit: (data: ITaskProps) => Promise<void>;
}

const TaskMenu: FC<ITaskMenuProps> = ({ onDelete, taskData, onEdit }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <LuMoreHorizontal className="w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <EditTaskSheet
              taskData={taskData}
              onEdit={onEdit}
              icon={
                <div className="flex items-center px-2">
                  <User className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </div>
              }
            />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <ConfirmModal
              deleteFn={onDelete}
              icon={
                <div className="flex items-center px-2">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </div>
              }
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskMenu;
