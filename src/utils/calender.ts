import dayjs from "dayjs";

export const generateDate = (
  month: number = dayjs().month(),
  year: number = dayjs().year()
) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const dateArray = [];

  // prefix dates
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    dateArray.push({
      date: firstDateOfMonth.subtract(firstDateOfMonth.day() - i, "day"),
      isCurrentMonth: false,
      isToday: false,
    });
  }

  // current dates
  for (let i = 1; i <= lastDateOfMonth.date(); i++) {
    const currentDate = dayjs().year(year).month(month).date(i);
    dateArray.push({
      date: currentDate,
      isCurrentMonth: true,
      isToday: currentDate.isSame(dayjs(), "day"),
    });
  }

  // remaining days
  const remainingDays = 42 - dateArray.length;
  for (let i = 1; i <= remainingDays; i++) {
    dateArray.push({
      date: lastDateOfMonth.add(i, "day"),
      isCurrentMonth: false,
      isToday: false,
    });
  }

  return dateArray;
};
