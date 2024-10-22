import React, { useEffect, useState } from "react";
import Chip from "./Chip";

interface IPropsEmailInputWithChips {
  placeholder?: string;
  hint?: String;
  getInputChips: (chips: string[]) => void;
  data?: string[];
}

const EmailInputWithChips: React.FC<IPropsEmailInputWithChips> = ({
  placeholder,
  hint,
  getInputChips,
  data,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [emails, setEmails] = useState<string[]>(() => (data ? data : []));
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    getInputChips && getInputChips(emails);
  }, [emails]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.trim() === "") {
      setError(null);
    }
    setInputValue(e.target.value);
  };

  const handleAddEmail = () => {
    const email = inputValue.trim();

    if (!validateEmail(email)) {
      setError("Enter a valid email");
      return;
    }
    if (!emails.includes(email)) {
      setEmails((prevEmails) => [...prevEmails, email]);
    }
    setError(null);
    setInputValue("");
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails((prevEmails) =>
      prevEmails.filter((email) => email !== emailToRemove)
    );
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddEmail();
    }
  };

  return (
    <>
      <div className="flex py-1 px-2 rounded-md border border-[#84CAFF] gap-1 font-medium text-xs">
        <div className="flex gap-1 max-w-[70%] overflow-y-scroll flex-wrap">
          {emails.map((email, index) => (
            <Chip
              removeable={true}
              key={index}
              email={email}
              onRemove={handleRemoveEmail}
            />
          ))}
        </div>

        <input
          className="outline-none grow text-[#32383F] font-normal text-base mx-1"
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="text-red-500 font-medium text-xs">{error}</div>
      {!error && (
        <div className="text-[#6E7781] font-medium text-xs mb-1">{hint}</div>
      )}
    </>

    //   <div className="flex flex-wrap gap-2">
    //     {emails.map((email, index) => (
    //       <Chip key={index} email={email} onRemove={handleRemoveEmail} />
    //     ))}
    //   </div>

    //   <div className="flex mt-4">
    //     <input
    //       type="email"
    //       className="border border-gray-300 rounded-lg p-2 w-full"
    //       placeholder="Enter email and press Enter"
    //       value={inputValue}
    //       onChange={handleInputChange}
    //       onKeyDown={handleKeyDown} // Add email on pressing Enter
    //     />
    //     <button
    //       onClick={handleAddEmail}
    //       className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
    //     >
    //       Add Email
    //     </button>
    //   </div>

    // </div>
  );
};

export default EmailInputWithChips;
