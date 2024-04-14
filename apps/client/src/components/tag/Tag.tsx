import React, { useState } from "react";
import checkmark from "../../assets/checkmark.svg";
import close from "../../assets/close.svg";

export const Tag = ({
  text,
  onClick,
  value,
}: {
  text: string;
  value: string;
  onClick: (value?: string) => void;
}) => {
  const [clicked, setClicked] = useState(false);

  return (
    <span
      className={`py-1 px-3 h-full gap-1 inline-flex rounded-full ${
        clicked
          ? "bg-primary text-white cursor-pointer transition duration-300 ease-in-out"
          : "bg-gray-200 text-gray-700 cursor-pointer transition duration-300 ease-in-out"
      } hover:bg-opacity-75`}
      onClick={() => {
        setClicked((prev) => !prev);
        onClick?.(value);
      }}
    >
      {text}
      <img width="10" src={!clicked ? checkmark : close} />
    </span>
  );
};
