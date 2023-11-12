import {
  useGetAllTasksQuery,
  useDeleteOneTaskMutation,
  useCreateOneTaskMutation,
} from "../store/API/taskAPI";
import Task from "../Components/Tasks/Task";
import { toast } from "react-toastify";
import CreateModal from "../Components/Modal/CreateModal";
import React from "react";
import { ITaskProps } from "../types/interface";

const Tasks = () => {
  const [newTask, setNewTask] = React.useState<
    Pick<ITaskProps, "deadline" | "description" | "label" | "status" | "title">
  >({
    deadline: "",
    description: "",
    label: "",
    status: "",
    title: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });

  const { data, isError, isFetching, isLoading } = useGetAllTasksQuery(null);
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
    toast.promise(createOneTask(newTask).unwrap(), {
      pending: "Creating task...",
      success: "Task created successfully",
      error: "Error creating task",
    });
  };

  if (isLoading || isFetching) {
    return <div className="">Loading please wait....</div>;
  }
  if (isError) {
    return <div className="">Error, please try again</div>;
  }
  return (
    <div className="row">
      <CreateModal
        button={<button className="btn btn-primary">Create Task</button>}
        title="Create Task"
        onCancel={() => console.log("cancel")}
        onClose={() => console.log("close")}
        onConfirm={onSubmit}
      >
        <div className="w-1/3"> {/* Set the width to 33% of the container */}
          <form
            onSubmit={(e: React.ChangeEvent<HTMLFormElement>) =>
              e.preventDefault()
            }
          >
            <div className="mb-4">
              <label htmlFor="title" className="block">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="form-input text-black"
                onChange={handleInput}
                name="title"
                value={newTask?.title}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="deadline" className="block">
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                className="form-input text-black"
                onChange={handleInput}
                name="deadline"
                value={newTask?.deadline}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block">
                Description
              </label>
              <input
                type="text"
                id="description"
                className="form-input text-black"
                onChange={handleInput}
                name="description"
                value={newTask?.description}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="status" className="block">
                Status
              </label>
              <input
                type="text"
                id="status"
                className="form-input text-black"
                onChange={handleInput}
                name="status"
                value={newTask?.status}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="label" className="block">
                Label
              </label>
              <input
                type="text"
                id="label"
                className="form-input text-black"
                onChange={handleInput}
                name="label"
                value={newTask?.label}
              />
            </div>
          </form>
        </div>
      </CreateModal>



      {data?.map((task) => {
        return <Task key={task.id} {...task} deleteTask={deleteTask} />;
      })}
    </div>
  );
};

export default Tasks;
