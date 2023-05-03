import React from "react";

interface props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export default function Button({ children, disabled, onClick }: props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="text-white disabled:bg-[#bebfbf] bg-p-orange text-sm font-semibold py-[1em] w-full"
    >
      {children}
    </button>
  );
}
