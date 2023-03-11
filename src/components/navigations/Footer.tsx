import React from "react";
import { BiTransfer } from "react-icons/bi";
import { GrDocumentTime } from "react-icons/gr";
import { IconContext } from "react-icons/lib";
export default function Footer() {
  return (
    <IconContext.Provider value={{ size: "30px", color: "#fff" }}>
      <div className="fixed bottom-0 w-full border-t border bg-white flex justify-center items-center space-x-6 py-[1em]">
        <div className="p-3 rounded-full bg-[#173f80]">
          <BiTransfer />
        </div>
        <div>
          <GrDocumentTime />
        </div>
      </div>
    </IconContext.Provider>
  );
}
