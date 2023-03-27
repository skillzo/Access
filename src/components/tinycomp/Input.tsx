import React, { ChangeEvent } from "react";
import { TbMoneybag } from "react-icons/tb";

interface props {
  type: string;
  placeholder: string;
  value?: string;
  styleProps?: string;
  max?: number;
  disabled?: boolean;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function Input({
  type,
  placeholder,
  value,
  max,
  styleProps,
  disabled,
  name,
  onChange,
}: props) {
  return (
    <div className="flex space-x-2 px-[1em] py-[0.8em]  rounded-sm border border-[#bbbcbc8e] focus:border-p-blue">
      <div>
        <TbMoneybag />
      </div>
      <input
        type={type}
        className={`bg-transparent w-full outline-none  ${styleProps}`}
        placeholder={placeholder}
        value={value}
        maxLength={max}
        name={name}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}
