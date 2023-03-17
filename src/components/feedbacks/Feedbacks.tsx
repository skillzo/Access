import React from "react";
interface types {
  children: React.ReactNode;
}

export default function Feedbacks({ children }: types) {
  return (
    <div className="fixed top-[-2em] left-0 h-screen w-full bg-[#dbdbee67] z-10 flex justify-center items-center">
      {children}
    </div>
  );
}
