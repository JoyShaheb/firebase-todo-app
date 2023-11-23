import React from "react";
import InputField from "./InputField";

const TaskForm = ({
  title,
  deadline,
  status,
  label,
  description,
  handleInput,
}: {
  title: string;
  deadline: string;
  status: string;
  label: string;
  description: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <form
      className="w-80"
      onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => e.preventDefault()}
    >
      <InputField
        label="Task Name"
        onChange={handleInput}
        name="text"
        placeholder="Enter Task Name"
        required
        type="text"
        value={title}
      />
      <InputField
        label="Task deadline"
        onChange={handleInput}
        name="deadline"
        placeholder="Enter Task deadline"
        required
        type="date"
        value={deadline}
      />
      <InputField
        label="Status"
        onChange={handleInput}
        name="status"
        placeholder="Enter Task status"
        required
        type="text"
        value={status}
      />
      <InputField
        label="Label"
        onChange={handleInput}
        name="label"
        placeholder="Label"
        required
        type="text"
        value={label}
      />
      <InputField
        label="Task description"
        onChange={handleInput}
        name="description"
        placeholder="Task description"
        required
        type="text"
        value={description}
      />
    </form>
  );
};

export default TaskForm;
