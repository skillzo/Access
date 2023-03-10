import React from "react";

interface props {
  children: React.ReactNode;
  disabled?: boolean;
}

export default function Button({ children, disabled }: props) {
  return (
    <button
      className={`text-white ${
        disabled ? "bg-[#bebfbf]" : "bg-[#fe8101]"
      } text-sm font-semibold py-[1em] w-full`}
    >
      {children}
    </button>
  );
}
