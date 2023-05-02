import React, { ChangeEvent } from "react";

type props = {
  type: string;
  placeholder: string;
  value?: string;
  styleProps?: string;
  max?: number;
  disabled?: boolean;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  type,
  placeholder,
  value,
  max,
  styleProps,
  disabled,
  name,
  onChange,
  onBlur,
  ...rest
}: props) {
  return (
    <input
      type={type}
      className={`w-full px-[1em] py-[0.8em]  rounded-sm outline-none border border-[#bbbcbc8e] focus:border-p-blue ${styleProps}`}
      placeholder={placeholder}
      value={value}
      maxLength={max}
      name={name}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      {...rest}
    />
  );
}
