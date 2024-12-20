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
    const hasShownLoader = sessionStorage.getItem("hasShownLoader");

    if (location.pathname === "/" && !hasShownLoader) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasShownLoader", true);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    AOS.init();
  });

  // Refresh AOS on every route change
  useLayoutEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

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
          <Outlet key={location.pathname}></Outlet>
          {noHeaderFooter || <Footer></Footer>}
        </>
      )}
    </div>
  );
};

export default Main;
