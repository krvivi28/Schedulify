import React, { ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  shape?: "circle" | "square";
}

const Button: React.FC<IButtonProps> = ({
  children,
  shape = "square",
  ...props
}) => {
  const btnClass = {
    circle: "rounded-full p-2",
    square: "rounded-md py-2 px-3 bg-[#1570EF]",
  };
  return (
    <button
      className={`${btnClass[shape]} flex items-center justify-center text-base font-semibold text-white shadow hover:bg-blue-600`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
