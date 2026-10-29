"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { tr } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DateRange } from "react-day-picker";

type CalendarProps = React.ComponentPropsWithoutRef<typeof Calendar>;
type RangeCalendarProps = Extract<CalendarProps, { mode: "range" }>;
type CustomDatePickerProps = Omit<
  RangeCalendarProps,
  "mode" | "selected" | "onSelect"
>;

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function CustomDatePicker(rest: CustomDatePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground h-auto justify-start p-3 text-left font-normal"
        >
          <CalendarIcon />
          {date ? formatDate(date.from) : <span>Tarih Seçiniz</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto" align="end">
        <Calendar
          {...rest}
          locale={tr}
          mode="range"
          selected={date}
          onSelect={setDate}
          className="w-full"
        />
      </PopoverContent>
    </Popover>
  );
}

export default CustomDatePicker;

//   const [date, setDate] = React.useState<Date>();
//  return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           data-empty={!date}
//           className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
//         >
//           <CalendarIcon />
//           {date ? format(date, "PPP") : <span>Tarih Seçiniz</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0">
//         <Calendar mode="single" selected={date} onSelect={setDate} />
//       </PopoverContent>
//     </Popover>
//   );
