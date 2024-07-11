import { useContext } from "react";
import { IoCart, IoLogInOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";
import useCart from "../../../hooks/useCart";
import { AuthContext } from "../../../providers/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import { RiArrowDropDownLine } from "react-icons/ri";
import LogoBistroBoss from "../../../assets/Logo Bistro Boss White.png";
import { FaRegUserCircle } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";

const NavBar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  const handleSignOut = () => {
    logOutUser()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/menu">Our Menu</NavLink>
      </li>
      <li>
        <NavLink to="/order/salad">Order Food</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact Us</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-opacity-30 fixed z-10 text-white bg-black md:px-10 font-cinzel font-medium">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-black bg-opacity-60 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl flex items-center">
          <img className="w-10 hidden md:block" src={logo} alt="" />
          <img className="w-32 md:w-40" src={LogoBistroBoss} alt="" />
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex items-center">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end">
        {cart.length > 0 && (
            <NavLink to="/dashboard/cart">
              <button className="btn px-2 relative mr-6">
                <IoCart className="text-3xl" />
                <div className="badge badge-secondary absolute text-sm -top-2 -right-4">
                  +{cart.length}
                </div>
              </button>
            </NavLink>
        )}
        {user ? (
          <div className="dropdown  relative">
            <div
              tabIndex={0}
              role="button"
              className="btn border-2 border-white rounded-md"
            >
              
              <span className="hidden md:block">{user?.displayName}</span>
              <span className="block md:hidden"><FaRegUserCircle className="text-2xl" /></span>
              <RiArrowDropDownLine className="text-3xl hidden md:block" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-black bg-opacity-40 rounded-none z-[1] w-52 p-4 shadow absolute right-0 text-white space-y-2 mt-4"
            >
              <li>
                {user && isAdmin && (
                  <NavLink
                    className="px-4 btn btn-ghost rounded-none bg-[#D1A054] hover:bg-[#D1A054] hover:bg-opacity-80 flex justify-between"
                    to="/dashboard/adminHome"
                  >
                    Dashboard
                    <RxDashboard className="text-2xl" />
                  </NavLink>
                )}
                {user && !isAdmin && (
                  <NavLink
                    className="px-4 btn btn-ghost rounded-none bg-[#D1A054] hover:bg-[#D1A054] hover:bg-opacity-80 flex justify-between"
                    to="/dashboard/userHome"
                  >
                    Dashboard
                    <RxDashboard className="text-2xl" />
                  </NavLink>
                )}
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="btn btn-ghost rounded-none bg-red-500 hover:bg-red-500 hover:bg-opacity-80 flex justify-between"
                >
                  LogOut
                  <IoIosLogOut className="text-2xl" />
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink
            className="btn text-xs bg-gradient-to-r from-[#835D23] to-[#B58130] rounded-none text-white md:text-base tracking-wider"
            to="/login"
          >
            Login
            <IoLogInOutline className="text-2xl" />
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default NavBar;
