import { useContext } from "react";
import { IoCart } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";
import useCart from "../../../hooks/useCart";
import { AuthContext } from "../../../providers/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import { RiArrowDropDownLine } from "react-icons/ri";

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
      {cart.length > 0 && (
        <li>
          <NavLink to="/dashboard/cart">
            <button className="btn px-2 relative">
              <IoCart className="text-3xl" />
              <div className="badge badge-secondary absolute text-sm -top-2 -right-4">+{cart.length}</div>
            </button>
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-opacity-30 fixed z-10 text-white bg-black">
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
        <NavLink to="/" className="btn btn-ghost text-xl">
          <img className="w-10" src={logo} alt="" />
          Bistro Boss
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex items-center">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-hover relative">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost border-2 border-white m-1 rounded-none"
            >
              {user?.displayName}
              <RiArrowDropDownLine className="text-3xl" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-black bg-opacity-40 rounded-none z-[1] w-52 p-4 shadow absolute right-0 text-white space-y-2"
            >
              <li>
                {user && isAdmin && (
                  <NavLink
                    className="p-0 btn btn-ghost rounded-none bg-[#D1A054] hover:bg-[#D1A054] hover:bg-opacity-80"
                    to="/dashboard/adminHome"
                  >
                    Dashboard
                  </NavLink>
                )}
                {user && !isAdmin && (
                  <NavLink
                    className="p-0 btn btn-ghost rounded-none bg-[#D1A054] hover:bg-[#D1A054] hover:bg-opacity-80"
                    to="/dashboard/userHome"
                  >
                    Dashboard
                  </NavLink>
                )}
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="btn btn-ghost rounded-none bg-red-500 hover:bg-red-500 hover:bg-opacity-80"
                >
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <button className="btn">
            <NavLink to="/login">Login</NavLink>
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
