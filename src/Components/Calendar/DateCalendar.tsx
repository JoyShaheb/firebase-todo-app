import { format, isValid } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DateCalendar = ({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) => {
  const formattedDate = date && isValid(date) ? format(date, "PPP") : "Pick a date";

  const setDateHandler = (date: Date) => {
    const selectedDate = date || new Date();
    setDate(selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[100%] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formattedDate}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          className="w-auto"
          mode="single"
          selected={date}
          //@ts-ignore
          onSelect={(selectedDate) => setDateHandler(selectedDate)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateCalendar;