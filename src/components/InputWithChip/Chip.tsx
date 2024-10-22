import React from "react";
import closeIcon from "../../assets/icons/cross.svg";

interface IChipProps {
  email: string;
  onRemove?: (email: string) => void;
  removeable?: boolean;
  color?: "primary" | "success";
}

const Chip: React.FC<IChipProps> = ({
  email,
  onRemove,
  removeable = true,
  color = "primary",
}) => {
  const chipColor = {
    primary: "border-[#B2DDFF] bg-[#EFF8FF] text-[#175CD3]",
    success: "border-[#ABEFC6] bg-[#ECFDF3] text-[#067647]",
  };

  return (
    <div
      className={`flex items-center justify-center border  rounded-lg px-2 py-1 gap-1 ${chipColor[color]}`}
    >
      <span>{email}</span>
      {removeable && (
        <button
          onClick={() => onRemove && onRemove(email)}
          className="flex items-center justify-center p-1"
        >
          <img src={closeIcon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Chip;
