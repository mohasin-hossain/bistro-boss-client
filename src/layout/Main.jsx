import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";
import { useEffect, useState } from "react";
import Loader from "../pages/Loader/Loader";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") ||
    location.pathname.includes("register");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {noHeaderFooter || <NavBar></NavBar>}
          <Outlet></Outlet>
          {noHeaderFooter || <Footer></Footer>}
        </>
      )}
    </div>
  );
};

export default Main;
