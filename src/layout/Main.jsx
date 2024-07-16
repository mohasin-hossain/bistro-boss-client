import { useEffect, useLayoutEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Loader from "../pages/Loader/Loader";
import Footer from "../pages/Shared/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";
import AOS from "aos";
import "aos/dist/aos.css";

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

  useEffect(() => {
    AOS.init();
  });

  // sliding to top on page change
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
