import { FC, useEffect, useState } from "react";
import { ITaskProps } from "../../types/interface";
import { StatusEnum } from "../../types/enum";
import { BsPencil, BsTrash, BsClock } from "react-icons/bs";
import DeleteModal from "../Modal/DeleteModal";
import dayjs from "dayjs";

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
  const initialStatus = localStorage.getItem(`status_${id}`) || StatusEnum.INCOMPLETE;
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);

  const toggleStatus = () => {
    const newStatus = selectedStatus === StatusEnum.INCOMPLETE ? StatusEnum.COMPLETE : StatusEnum.INCOMPLETE;
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
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
          {label}
        </span>
      </div>
      <div className="flex items-center gap-3 text-gray-600 mb-3">
        <BsClock />
        {dayjs(deadline).format("dddd, MMMM D, YYYY")}
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">{description}</p>
      <div className="flex gap-2">
        <button
          className={`bg-${selectedStatus === StatusEnum.INCOMPLETE ? "yellow-400" : "green-500"} text-white px-4 py-1 rounded-full`}
          onClick={toggleStatus}
        >
          {selectedStatus === StatusEnum.INCOMPLETE ? "Incomplete" : "Completed"}
        </button>
        <span className="bg-blue-800 text-white px-4 py-1 rounded-full">
          <BsPencil />
        </span>
        <DeleteModal
          title="Delete Task"
          description="Are you sure you want to delete this task?"
          onCancel={() => console.log("cancel")}
          onConfirm={() => deleteTask(id)}
          onClose={() => console.log("close")}
          button={
            <span className="bg-red-500 text-white px-4 py-1 rounded-full">
              <BsTrash />
            </span>
          }
        />
      </div>
    </div>
  );
};

export default Task;
