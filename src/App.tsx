// import getCurrentDate from "./utils/calender";

import dayjs from "dayjs";
import BookingSlot, { TimeSlot } from "./components/BookingSlot/BookingSlot";
import Calender from "./components/Calender/Calender";
import { generateDate } from "./utils/calender";
import { useEffect, useState } from "react";

export interface AllSlots {
  date: string;
  slots: TimeSlot[];
}

function App() {
  generateDate();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [bookings, setBookings] = useState<AllSlots[]>(() => {
    const savedBookings = localStorage.getItem("bookings");
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  useEffect(() => {
    const savedBookings = localStorage.getItem("bookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, [selectedDate]);

  const updateMeets = (meet: any) => {
    const updatedBooking = { ...bookings, [selectedDate]: meet };
    setBookings(updatedBooking);
    localStorage.setItem("bookings", JSON.stringify(updatedBooking));
  };

  const getSelectedDate = (date: dayjs.Dayjs) => {
    const formattedDate = date.format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
  };

  return (
    <>
      <div className="grid lg:grid-cols-10 p-5">
        <Calender
          eventData={bookings}
          className="lg:col-span-3"
          getSelectedDate={getSelectedDate}
        />
        <BookingSlot
          className="lg:col-span-7"
          date={selectedDate}
          slots={bookings}
          updateMeets={updateMeets}
        />
      </div>
    </>
  );
}

export default App;
