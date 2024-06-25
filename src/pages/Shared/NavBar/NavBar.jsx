import { NavLink } from "react-router-dom";
import logo from '../../../assets/logo.png'

const NavBar = () => {
    const navLinks = <>
     <li><NavLink to="/">Home</NavLink></li>
     <li><NavLink to="/menu">Our Menu</NavLink></li>
     <li><NavLink to="/order">Order Food</NavLink></li>
     <li><NavLink to="/4">Item 4</NavLink></li>
    </>
    
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
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-black bg-opacity-60 rounded-box z-[1] mt-3 w-52 p-2 shadow">
             {navLinks}
            </ul>
          </div>
          <NavLink to="/" className="btn btn-ghost text-xl">
            <img className="w-10" src={logo} alt="" />
            Bistro Boss
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
           {navLinks}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    );
};

export default NavBar;