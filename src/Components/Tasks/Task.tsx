import { FC } from "react";
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
  return (
    <div className="bg-white p-4 rounded shadow-md m-2 max-w-md">
      <div className="font-semibold text-xl">{title}</div>
      <div className="flex items-center gap-3 mb-3 text-gray-600">
        <BsClock />
        {dayjs(deadline).format("dddd, MMMM D, YYYY")}
      </div>
      <p className="text-gray-800">{description}</p>
      <div className="flex gap-2">
        {status == StatusEnum.INCOMPLETE && (
          <span className="bg-yellow-400 text-white px-4 py-1 rounded-full">
            {status}
          </span>
        )}
        {status == StatusEnum.CANCELLED && (
          <span className="bg-red-500 text-white px-4 py-1 rounded-full">
            {status}
          </span>
        )}
        <span className="bg-green-500 text-white px-4 py-1 rounded-full">
          <BsPencil />
        </span>

        <DeleteModal
          button={
            <span className="bg-red-500 text-white px-4 py-1 rounded-full">
              <BsTrash />
            </span>
          }
          title="Delete Task"
          description="Are you sure you want to delete this task?"
          onCancel={() => console.log("cancel")}
          onConfirm={() => deleteTask(id)}
          onClose={() => console.log("close")}
        />
      </div>
    </div>
  );
};

export default Task;
