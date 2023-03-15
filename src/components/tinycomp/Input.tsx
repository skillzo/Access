import React, { ChangeEvent } from "react";

interface props {
  type: string;
  placeholder: string;
  value?: string;
  styleProps?: string;
  max?: number;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function Input({
  type,
  placeholder,
  value,
  max,
  styleProps,
  disabled,
  onChange,
}: props) {
  return (
    <div>
      <input
        type={type}
        className={`w-full px-[1em] py-[0.8em]  rounded-sm outline-none border border-[#bbbcbc8e] focus:border-p-blue ${styleProps}`}
        placeholder={placeholder}
        value={value}
        maxLength={max}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}
