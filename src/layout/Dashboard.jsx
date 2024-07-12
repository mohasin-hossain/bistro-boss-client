import { BiTask } from "react-icons/bi";
import {
  FaBook,
  FaHome,
  FaList,
  FaShoppingBag,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { GoCodeReview } from "react-icons/go";
import { IoCart, IoMailOutline, IoMenu } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import Logo from "../assets/Logo Bistro Boss.png";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { TfiMenuAlt } from "react-icons/tfi";

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [isAdmin] = useAdmin();

  // Making sidebar closed by default in smaller devices
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    // Initialize the state based on screen size
    handleResize();

    // Added resize event listener to check whether the user resize the screen or not, if resize then trigger the handleResize again
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex font-cinzel font-medium">
      <div
        onClick={() => setOpen(!open)}
        className={`p-1 absolute z-20 transition-all duration-500 ${open ? "left-56" : "left-0"}`}
      >
        <button className="p-2 bg-gradient-to-r from-[#835D23] to-[#B58130] text-white hover:bg-opacity-90 rounded-none">
          {open ? (
            <IoMdClose className="text-2xl" />
          ) : (
            <TfiMenuAlt className="text-2xl" />
          )}
        </button>
      </div>

      {/* Dashboard Sidebar */}
      <div
        className={`bg-[#D1A054] absolute z-10 md:static min-h-screen transition-all duration-500 ${
          open ? "w-64 opacity-100" : "w-0 opacity-0"
        }`}
      >
        {open && (
          <>
            {" "}
            <Link to="/">
              <img className="w-44 mt-10 mb-4 mx-auto" src={Logo} alt="" />
            </Link>
            <ul className="menu p-4 rounded-box space-y-2">
              {isAdmin ? (
                <>
                  <li>
                    <NavLink to="/dashboard/adminHome">
                      <FaHome className="text-2xl" />
                      Admin Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/addItems">
                      <FaUtensils className="text-2xl" />
                      Add Items
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manageItems">
                      <FaList className="text-2xl" />
                      Manage Items
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manageBookings">
                      <FaBook className="text-2xl" />
                      Manage Bookings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manageOrders">
                      <GiWallet className="text-2xl" />
                      Manage Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/users">
                      <FaUsers className="text-2xl" />
                      All Users
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/dashboard/userHome">
                      <FaHome className="text-2xl" />
                      User Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/cart">
                      <IoCart className="text-2xl" />
                      My Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/myOrders">
                      <GiWallet className="text-2xl" />
                      My Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/reservation">
                      <BiTask className="text-2xl" />
                      Reservation
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/myBooking">
                      <SlCalender className="text-2xl" />
                      My Booking
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/review">
                      <GoCodeReview className="text-2xl" />
                      Add Review
                    </NavLink>
                  </li>
                </>
              )}

              {/* Shared Nav Links */}
              <div className="divider"></div>
              <li>
                <NavLink to="/">
                  <FaHome className="text-2xl" />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/menu">
                  <IoMenu className="text-2xl" />
                  Menu
                </NavLink>
              </li>
              <li>
                <NavLink to="/order/salad">
                  <FaShoppingBag className="text-2xl" />
                  Order
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact">
                  <IoMailOutline className="text-2xl" />
                  Contact
                </NavLink>
              </li>
            </ul>
          </>
        )}
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 max-w-7xl mx-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
