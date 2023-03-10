import React from "react";

interface props {
  children: React.ReactNode;
}

export default function Wrapper({ children }: props) {
  return <div className="px-[1em] py-[2em] space-y-[2em]">{children}</div>;
}
