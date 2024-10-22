export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const isEventScheduled = (date: any, eventData: any) => {
  const formattedDate = date.format("YYYY-MM-DD");
  let result = false;
  if (eventData) {
    const events = eventData[formattedDate];
    if (events) {
      return events.some((slot: { isBooked: any }) => slot.isBooked);
    }
  }
  return result;
};
