import { NavLink } from "react-router-dom";
import { BiTransfer } from "react-icons/bi";
import { MdOutlineManageHistory } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { IconContext } from "react-icons/lib";
import { v4 as uuidv4 } from "uuid";

export default function Footer() {
  const style = {
    inital: "p-3 rounded-full ",
    active: "p-3 rounded-full bg-p-blue text-white",
  };

  const navList = [
    {
      path: "/",
      icon: <BiTransfer />,
    },
    {
      path: "/transactions",
      icon: <MdOutlineManageHistory />,
    },
    {
      path: "/settings",
      icon: <FiSettings />,
    },
  ];
  return (
    <IconContext.Provider value={{ size: "30px" }}>
      <div className="fixed z-1 bottom-0 w-full border-t border bg-white flex justify-center items-center space-x-6 py-[1em]">
        {navList.map((item: any) => {
          return <NavItem key={uuidv4()} icon={item.icon} path={item.path} />;
        })}
      </div>
    </IconContext.Provider>
  );
}

interface props {
  icon: React.ReactNode;
  path: string;
}

const NavItem = ({ icon, path }: props): JSX.Element => {
  const style = {
    inital: "p-3 rounded-full ",
    active: "p-3 rounded-full bg-p-blue text-white",
  };
  return (
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? style.active : style.inital)}
    >
      {icon}
    </NavLink>
  );
};
