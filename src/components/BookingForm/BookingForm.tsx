import React, { useState } from "react";
import EmailInputWithChips from "../InputWithChip/InputWithChip";
import Button from "../Button/Button";
import { BookingDetails } from "../BookingSlot/BookingSlot";

interface IPropsBookingForm {
  getbookingDetails: (details: any) => void;
  data?: BookingDetails;
}

const BookingForm: React.FC<IPropsBookingForm> = ({
  getbookingDetails,
  data = {
    title: "",
    emails: [],
  },
}) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>(data);

  const getInputChips = (emails: string[]) => {
    setBookingDetails({ ...bookingDetails, emails });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex py-1 px-2 rounded-md border border-[#84CAFF] gap-1 font-medium text-xs">
        <input
          className="outline-none grow text-[#32383F] font-normal text-base mx-1"
          type="text"
          placeholder="Add Title"
          value={bookingDetails.title}
          onChange={(e) =>
            setBookingDetails({ ...bookingDetails, title: e.target.value })
          }
        />
      </div>

      <EmailInputWithChips
        data={bookingDetails.emails}
        placeholder="Add Guests"
        hint="Enter email and press Enter"
        getInputChips={getInputChips}
      />

      <Button
        onClick={() => {
          getbookingDetails(bookingDetails);
          setBookingDetails({
            title: "",
            emails: [],
          });
        }}
      >
        Book Slot
      </Button>
    </div>
  );
};

export default BookingForm;
