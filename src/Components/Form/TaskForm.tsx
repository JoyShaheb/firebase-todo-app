import React from "react";

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
      <div className="mb-4">
        <label htmlFor="title" className="block text-black w-full">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="form-control bg-gray-400 text-black w-full"
          onChange={handleInput}
          name="title"
          value={title}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="deadline" className="block text-black w-full">
          Deadline
        </label>
        <input
          type="date"
          id="deadline"
          className="form-control bg-gray-400 text-black w-full"
          onChange={handleInput}
          name="deadline"
          value={deadline}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-black w-full">
          Description
        </label>
        <input
          type="text"
          id="description"
          className="form-control bg-gray-400 text-black w-full"
          onChange={handleInput}
          name="description"
          value={description}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-black w-full">
          Status
        </label>
        <input
          type="text"
          id="status"
          className="form-control bg-gray-400 text-black w-full"
          onChange={handleInput}
          name="status"
          // value={status}
          value="incomplete"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="label" className="block text-black w-full">
          Label
        </label>
        <input
          type="text"
          id="label"
          className="form-control bg-gray-400 text-black w-full"
          onChange={handleInput}
          name="label"
          value={label}
        />
      </div>
    </form>
  );
};

export default TaskForm;
