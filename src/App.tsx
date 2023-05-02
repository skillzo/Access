import { BiArrowBack } from "react-icons/bi";
import "./App.css";
import Wrapper from "./components/Wrapper/Wrapper";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/navigations/Footer";
import Dashboard from "./components/Dashboard";
function App() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Wrapper>
        <div className="flex items-center">
          <BiArrowBack onClick={() => navigate(-1)} />
          <p className="text-center text-lg font-medium w-[90%]">
            {location?.pathname === "/"
              ? "Transfer"
              : location.pathname
                  .slice(1, location.pathname.length)
                  .charAt(0)
                  .toUpperCase() +
                location.pathname.slice(2, location.pathname.length)}
          </p>
        </div>
        <Dashboard />
        <Outlet />
      </Wrapper>
      <Footer />
    </>
  );
}

export default App;
