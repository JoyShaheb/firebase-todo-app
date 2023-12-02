import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskForm from "../Form/TaskForm";
import { FC } from "react";
import { NewTaskType } from "@/types/types";

interface TaskModalProps {
  newTask: NewTaskType;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createTaskFn: () => Promise<void>;
  handleDateChange: (date: Date) => void; 
}

const TaskModal: FC<TaskModalProps> = ({
  handleInput,
  newTask,
  createTaskFn,
  handleDateChange,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createTaskFn();
          }}
        >
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Create A new task here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <TaskForm {...newTask} handleInput={handleInput} handleDateChange={handleDateChange} />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
