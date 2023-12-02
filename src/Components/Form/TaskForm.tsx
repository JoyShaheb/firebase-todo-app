import { FC } from "react";
import InputFieldWithLabel from "./InputFieldWithLabel";
import { NewTaskTypeForm } from "@/types/types";
import DateCalendar from "../Calendar/DateCalendar";
import { Label } from "../ui/label";
import StatusPopover from "../Modal/StatusPopover";

const TaskForm: FC<NewTaskTypeForm> = ({
  deadline,
  description,
  label,
  status,
  title,
  handleInput,
  handleDateChange,
  handleStatusChange,
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
      <div className="flex flex-col gap-2">
        <Label>Deadline</Label>
        <DateCalendar date={deadline} setDate={handleDateChange} />
      </div>

      <InputFieldWithLabel
        onChange={handleInput}
        type="text"
        value={label}
        placeholder="Add tak label"
        label="Label"
        name="label"
        required
      />
      <div className="flex flex-col gap-2">
        <Label>Status</Label>
        <StatusPopover value={status} setValue={handleStatusChange} />
      </div>
      {/* <InputFieldWithLabel
        onChange={handleInput}
        type="text"
        value={status}
        placeholder="Add status to project"
        label="Status"
        name="status"
        required
      /> */}
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
