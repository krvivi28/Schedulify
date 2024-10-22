import React, { useEffect, useState } from "react";
import BookingForm from "../BookingForm/BookingForm";
import Chip from "../InputWithChip/Chip";

import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";

export interface BookingDetails {
  title: string;
  emails: string[];
}

export interface TimeSlot {
  time: string;
  isBooked: boolean;
  bookingDetails?: BookingDetails;
}

const generateTimeSlots = (startHour: number, endHour: number) => {
  const slots: TimeSlot[] = [];
  for (let i = startHour; i < endHour; i++) {
    slots.push({ time: `${i}:00`, isBooked: false });
    slots.push({ time: `${i}:30`, isBooked: false });
  }
  return slots;
};

interface IPropsBookingSlot {
  date: string;
  slots: any;
  updateMeets: (updatedMeet: any) => void;
  className?: string;
}

const BookingSlot: React.FC<IPropsBookingSlot> = ({
  date,
  slots,
  updateMeets,
  className = "",
}) => {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookedSlots, setBookedSlots] = useState<TimeSlot[]>(
    generateTimeSlots(9, 17)
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedBookings = slots[date];

    savedBookings
      ? setBookedSlots(savedBookings)
      : setBookedSlots(generateTimeSlots(9, 17));
    setSelectedSlot(null);
    setIsEditing(false);
  }, [date]);

  const handleSlotClick = (slot: TimeSlot) => {
    if (selectedSlot?.time === slot.time) {
      setSelectedSlot(null);
      return;
    }
    setSelectedSlot(slot);
  };

  const handleNewBooking = (bookingDetails: any) => {
    const updatedSlots = bookedSlots.map((slot) =>
      slot.time === selectedSlot?.time
        ? { ...slot, isBooked: true, bookingDetails }
        : slot
    );

    setBookedSlots(updatedSlots);
    setSelectedSlot({
      ...selectedSlot,
      isBooked: true,
      bookingDetails,
    } as TimeSlot);
    setIsEditing(false);

    updateMeets(updatedSlots);
  };

  const modifyBooking = (action: "edit" | "delete") => {
    switch (action) {
      case "delete":
        const updatedSlots = bookedSlots.map((slot) =>
          slot.time === selectedSlot?.time
            ? { time: slot.time, isBooked: false }
            : slot
        );
        setBookedSlots(updatedSlots);
        setSelectedSlot(null);
        updateMeets(updatedSlots);
        break;
      case "edit":
        setIsEditing(!isEditing);
        break;
      default:
        return;
    }
  };

  return (
    <div className={`${className} container mx-auto`}>
      <h1 className="text-2xl font-semibold mb-4">Book a Time Slot: {date}</h1>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {bookedSlots.map((slot, index) => (
          <button
            key={index}
            onClick={() => handleSlotClick(slot)}
            className={`border rounded-lg w-full h-12 flex items-center justify-center transition-all ${
              slot.isBooked
                ? "bg-gray-300"
                : selectedSlot?.time === slot.time
                ? "bg-blue-500 text-white"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {slot.time}
          </button>
        ))}
      </div>

      {((selectedSlot && !selectedSlot?.isBooked) || isEditing) && (
        <BookingForm
          btnLabel={isEditing ? "Update Slot" : "Book Slot"}
          data={
            isEditing
              ? selectedSlot?.bookingDetails
              : {
                  title: "",
                  emails: [],
                }
          }
          getbookingDetails={handleNewBooking}
        />
      )}

      {selectedSlot?.isBooked && (
        <div className="mt-4 bg-green-50 p-4 rounded-lg relative">
          <div className="absolute top-2 right-2 flex gap-1">
            <img
              onClick={() => modifyBooking("edit")}
              className="cursor-pointer"
              src={editIcon}
              alt=""
            />
            <img
              onClick={() => modifyBooking("delete")}
              className="cursor-pointer"
              src={deleteIcon}
              alt=""
            />
          </div>
          <p className="font-semibold">Booking Confirmed!</p>
          <p>Time: {selectedSlot.time}</p>
          <p>Title: {selectedSlot.bookingDetails?.title}</p>

          <div className="flex items-center gap-1">
            <span>Invited: </span>
            {selectedSlot.bookingDetails?.emails &&
              selectedSlot.bookingDetails?.emails.map((email) => (
                <Chip
                  key={email}
                  removeable={false}
                  color="success"
                  email={email}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSlot;
