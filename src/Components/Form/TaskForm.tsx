import { FC } from "react";
import InputFieldWithLabel from "./InputFieldWithLabel";
import { NewTaskTypeForm } from "@/types/types";

const TaskForm: FC<NewTaskTypeForm> = ({
  deadline,
  description,
  label,
  status,
  title,
  handleInput,
}) => {
  return (
    <>
      <InputFieldWithLabel
        onChange={handleInput}
        type="text"
        value={title}
        placeholder="Add task title"
        label="Title"
        name="title"
        required
      />
      <InputFieldWithLabel
        onChange={handleInput}
        type="text"
        value={deadline}
        placeholder="Add project deadline"
        label="Deadline"
        name="deadline"
        required={false}
      />
      <InputFieldWithLabel
        onChange={handleInput}
        type="text"
        value={label}
        placeholder="Add tak label"
        label="Label"
        name="label"
        required
      />
      <InputFieldWithLabel
        onChange={handleInput}
        type="text"
        value={status}
        placeholder="Add status to project"
        label="Status"
        name="status"
        required
      />
      <InputFieldWithLabel
        onChange={handleInput}
        type="text"
        value={description}
        placeholder="Add Task description"
        label="Description"
        name="description"
        required
      />
    </>
  );
};

export default TaskForm;
