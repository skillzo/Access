import { NavLink } from "react-router-dom";
import { BiTransfer } from "react-icons/bi";
import { MdOutlineManageHistory } from "react-icons/md";
import { IconContext } from "react-icons/lib";

export default function Footer() {
  const style = {
    inital: "p-3 rounded-full ",
    active: "p-3 rounded-full bg-[#173f80] text-white",
  };

  return (
    <IconContext.Provider value={{ size: "30px" }}>
      <div className="fixed bottom-0 w-full border-t border bg-white flex justify-center items-center space-x-6 py-[1em]">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? style.active : style.inital)}
        >
          <BiTransfer />
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }) => (isActive ? style.active : style.inital)}
        >
          <MdOutlineManageHistory />
        </NavLink>
      </div>
    </IconContext.Provider>
  );
}

