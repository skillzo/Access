import React from "react";

interface props {
  type: string;
  placeholder: string;
  value?: string;
  styleProps?: string;
}
export default function Input({ type, placeholder, value, styleProps }: props) {
  return (
    <div>
      <input
        type={type}
        className={`w-full px-[1em] py-[0.8em]  rounded-sm outline-none border border-[#bbbcbc8e] focus:border-[#173f80] ${styleProps}`}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}
