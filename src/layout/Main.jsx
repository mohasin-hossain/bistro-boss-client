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
    AOS.init();
  });

  useEffect(() => {
    const hasShownLoader = sessionStorage.getItem("hasShownLoader");

    if (location.pathname === "/" && !hasShownLoader) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasShownLoader", true);
        AOS.refresh();
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!loading) {
      AOS.refresh();
    }
  }, [loading, location.pathname]);

  // sliding to top on page change
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      {loading && location.pathname === "/" ? (
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
