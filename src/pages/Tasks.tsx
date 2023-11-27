import {
  useGetAllTasksQuery,
  useDeleteOneTaskMutation,
  useCreateOneTaskMutation,
} from "../store/API/taskAPI";
import { toast } from "react-toastify";
import TaskModal from "../components/Modal/TaskModal";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { NewTaskType } from "../types/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ConfirmModal from "@/components/Modal/ConfirmModal";

const Tasks = () => {
  const userID = useSelector((state: RootState) => state.user.uid);
  const initialState: NewTaskType = {
    deadline: "",
    description: "",
    label: "",
    status: "",
    title: "",
    userOwner: userID,
  };
  const [newTask, setNewTask] = React.useState<NewTaskType>(initialState);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  const { data, isError, isFetching, isLoading } = useGetAllTasksQuery({
    userID,
  });
  const [deleteOneTask] = useDeleteOneTaskMutation();
  const [createOneTask] = useCreateOneTaskMutation();
  const deleteTask = async (id: string) => {
    toast.promise(deleteOneTask({ id }).unwrap(), {
      pending: "Deleting task...",
      success: "Task deleted successfully",
      error: "Error deleting task",
    });
  };

  const onSubmit = () => {
    toast
      .promise(createOneTask(newTask).unwrap(), {
        pending: "Creating task...",
        success: "Task created successfully",
        error: "Error creating task",
      })
      .then(() => setNewTask(initialState));
  };

  if (isLoading || isFetching) {
    return <div className="">Loading please wait....</div>;
  }
  if (isError) {
    return <div className="">Error, please try again</div>;
  }
  return (
    <div className="row">
      {/* <TaskModal
        button={
          <div className="flex justify-center">
            <button className="btn btn-primary bg-blue-700 p-2 rounded-full mt-5 mx-auto">
              Create Task
            </button>
          </div>
        }
        title="Create Task"
        onCancel={() => console.log("cancel")}
        onClose={() => console.log("close")}
        onConfirm={onSubmit}
      >
        <TaskForm {...newTask} handleInput={handleInput} />
      </TaskModal> */}

      <TaskModal button={<button>Create Task</button>} onConfirm={onSubmit} title="Create Task"/>

      {/* {data?.map((task) => {
        return <Task key={task.id} {...task} deleteTask={deleteTask} />;
      })} */}
      <Table>
        <TableCaption>A list of your toDo.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">title</TableHead>
            <TableHead>deadline</TableHead>
            <TableHead>label</TableHead>
            <TableHead>description</TableHead>
            <TableHead>status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((task) => (
            <TableRow style={{backgroundColor: "black"}} key={task?.id}>
              <TableCell className="font-medium">{task?.title}</TableCell>
              <TableCell>{task?.deadline}</TableCell>
              <TableCell>{task?.label}</TableCell>
              <TableCell>{task?.description}</TableCell>
              <TableCell>{task?.status}</TableCell>
              <TableCell className="text-right">
                <ConfirmModal deleteFn={()=> deleteTask(task?.id)}/>
                {/* <button onClick={()=>deleteTask(task?.id)}>Delete</button> */}
              </TableCell>
              <TableCell className="text-right"><button onClick={()=>deleteTask(task?.id)}>Edit</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  );
};

export default Tasks;
