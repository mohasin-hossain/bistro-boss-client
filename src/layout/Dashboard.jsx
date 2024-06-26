import { FaHome, FaShoppingBag } from "react-icons/fa";
import { FaTowerObservation } from "react-icons/fa6";
import { GiWallet } from "react-icons/gi";
import { GoCodeReview } from "react-icons/go";
import { IoCart, IoMailOutline, IoMenu } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Dashboard Sidebar */}
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4 rounded-box space-y-2">
          <li>
            <NavLink to="/dashboard/userHome">
              <FaHome className="text-2xl" />
              User Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/reservation">
              <FaTowerObservation className="text-2xl" />
              Reservation
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/payment">
              <GiWallet className="text-2xl" />
              Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">
              <IoCart className="text-2xl" />
              My Cart
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/review">
              <GoCodeReview className="text-2xl" />
              Add Review
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/booking">
              <SlCalender className="text-2xl" />
              My Booking
            </NavLink>
          </li>
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
      </div>

      {/* Dashboard Content */}
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
