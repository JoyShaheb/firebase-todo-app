import { FC, useEffect, useState } from "react";
import { ITaskProps } from "../../types/interface";
import { StatusEnum } from "../../types/enum";
import { BsPencil, BsTrash, BsClock } from "react-icons/bs";
import DeleteModal from "../Modal/DeleteModal";
import dayjs from "dayjs";
import TaskModal from "../Modal/TaskModal";
import TaskForm from "../Form/TaskForm";
import { toast } from "react-toastify";
import { useEditOneTaskMutation } from "../../store/API/taskAPI";

interface ITaskComponentProps extends ITaskProps {
  deleteTask: (id: string) => void;
}

const Task: FC<ITaskComponentProps> = ({
  deadline,
  description,
  id,
  label,
  status,
  title,
  deleteTask,
}) => {
  const [data, setData] = useState({
    id,
    title,
    deadline,
    status,
    label,
    description,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  const [editOneTask] = useEditOneTaskMutation();
  const onSubmit = async () => {
    await toast.promise(editOneTask(data).unwrap(), {
      pending: "Updating task...",
      success: "Task updated successfully",
      error: "Error updating task",
    });
  };
  const initialStatus =
    localStorage.getItem(`status_${id}`) || StatusEnum.INCOMPLETE;
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);

  const toggleStatus = () => {
    const newStatus =
      selectedStatus === StatusEnum.INCOMPLETE
        ? StatusEnum.COMPLETE
        : StatusEnum.INCOMPLETE;
    setSelectedStatus(newStatus);
    localStorage.setItem(`status_${id}`, newStatus);
  };

  useEffect(() => {
    // When the component mounts, retrieve the status from local storage
    const savedStatus = localStorage.getItem(`status_${id}`);
    if (savedStatus) {
      setSelectedStatus(savedStatus);
    }
  }, [id]);

  return (
    <div className="block mt-3 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="flex items-center mb-2">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
          {label}
        </span>
      </div>
      <div className="flex items-center gap-3 text-gray-600 mb-3">
        <BsClock />
        {deadline
          ? dayjs(deadline).format("dddd, MMMM D, YYYY")
          : "No Deadline"}
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
        {description}
      </p>
      <div className="flex gap-2">
        <button
          className={`${
            selectedStatus === StatusEnum.INCOMPLETE
              ? "bg-yellow-400"
              : "bg-green-500"
          } text-white px-4 py-1 rounded-full`}
          onClick={toggleStatus}
        >
          {selectedStatus === StatusEnum.INCOMPLETE
            ? "Incomplete"
            : "Completed"}
        </button>
        <TaskModal
          button={
            <span className="bg-blue-800 text-white px-4 py-1 rounded-full">
              <BsPencil className="inline-block text-xs" />
            </span>
          }
          title="Edit Task"
          onCancel={() => console.log("cancel")}
          onClose={() => console.log("close")}
          onConfirm={onSubmit}
        >
          <TaskForm {...data} handleInput={handleInput} />
        </TaskModal>
        <DeleteModal
          title="Delete Task"
          description="Are you sure you want to delete this task?"
          onCancel={() => console.log("cancel")}
          onConfirm={() => deleteTask(id)}
          onClose={() => console.log("close")}
          button={
            <span className="bg-red-500 text-white px-4 py-1 rounded-full">
              <BsTrash className="inline-block text-xs" />
            </span>
          }
        />
      </div>
    </div>
  );
};

export default Task;
