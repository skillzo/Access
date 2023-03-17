import React from "react";

interface types {
  comp: React.ReactNode;
  text: string;
}
export default function CTA({ comp, text }: types) {
  return (
    <div className="bg-[#f5f6f7] w-[48%] p-5 space-y-4 active:bg-[#e3e4e7]">
      <div className="bg-[#e3e4e7] p-3 w-[60px] h-[60px] mx-auto rounded-full flex justify-center items-center">
        {comp}
      </div>
      <p className="text-sm">{text}</p>
    </div>
  );
}
