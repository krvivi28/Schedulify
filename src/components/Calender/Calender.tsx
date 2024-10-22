import { useEffect, useState } from "react";
import { generateDate } from "../../utils/calender";
import prevIcon from "../../assets/icons/prevChevron.svg";
import nextIcon from "../../assets/icons/nextChevron.svg";
import dayjs from "dayjs";
import { days, isEventScheduled, months } from "./utils";
import Button from "../Button/Button";
import Dot from "./Dot";

interface ICalenderProps {
  getSelectedDate: (date: any) => void;
  className?: string;
  eventData?: any;
}

const Calendar: React.FC<ICalenderProps> = ({
  getSelectedDate,
  className = "",
  eventData,
}) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  useEffect(() => {
    getSelectedDate(currentDate);
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const handleDateSelect = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
    getSelectedDate(date);
  };

  const isSameDay = (date1: dayjs.Dayjs, date2: dayjs.Dayjs) => {
    return date1.isSame(date2, "day");
  };

  return (
    <div
      className={`${className} flex flex-col rounded-lg border border-[#EAECF0] shadow-md w-[350px] px-6 py-5 gap-4`}
    >
      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <Button shape="circle" onClick={handlePrevMonth}>
          <img src={prevIcon} alt="Previous Month" />
        </Button>

        <span className="text-[#57606A] font-semibold text-base">
          {months[currentDate.month()]} {currentDate.year()}
        </span>

        <Button shape="circle" onClick={handleNextMonth}>
          <img src={nextIcon} alt="Next Month" />
        </Button>
      </div>

      {/* Weekdays Header */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <span
            className="text-[#57606A] text-base font-medium grid place-content-center"
            key={day}
          >
            {day}
          </span>
        ))}
      </div>

      {/* Dates Grid */}
      <div className="grid grid-cols-7 gap-2 text-base font-normal">
        {generateDate(currentDate.month(), currentDate.year()).map(
          ({ date, isCurrentMonth, isToday }, index) => {
            const isSelected = selectedDate && isSameDay(selectedDate, date);
            const dateClass = isToday
              ? "bg-[#1570EF] text-white"
              : isSelected
              ? "bg-black text-white"
              : isCurrentMonth
              ? "text-[#57606A]"
              : "text-[#8C959F]";

            return (
              <div key={index} className="relative">
                <button
                  onClick={() => handleDateSelect(date)}
                  className={`${dateClass} rounded-full w-8 h-8 flex items-center justify-center transition-all hover:text-white hover:bg-black cursor-pointer`}
                >
                  {date.date()}
                </button>
                {isEventScheduled(date, eventData) && (
                  <Dot className="absolute right-4 bottom-[-6px]" />
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Calendar;
