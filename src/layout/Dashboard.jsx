import { BiTask } from "react-icons/bi";
import { FaBook, FaHome, FaList, FaShoppingBag, FaUsers, FaUtensils } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { GoCodeReview } from "react-icons/go";
import { IoCart, IoMailOutline, IoMenu } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  // TODO: get isAdmin value from the database
  const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      {/* Dashboard Sidebar */}
      <div className="w-64 min-h-screen bg-[#D1A054]">
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
                <NavLink to="/dashboard/bookings">
                  <FaBook className="text-2xl" />
                  Manage Bookings
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
                <NavLink to="/dashboard/reservation">
                  <BiTask className="text-2xl" />
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
                <NavLink to="/dashboard/myBooking">
                  <SlCalender className="text-2xl" />
                  My Booking
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
      </div>

      {/* Dashboard Content */}
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
