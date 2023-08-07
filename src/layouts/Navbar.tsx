import React from "react";
import { Link } from "react-router-dom";
import logo from "../../src/assets/images/bookify.png";
import wishlist from "../../src/assets/images/wishlist.png";

const Navbar = () => {
  const user: boolean = false;
  const menuItems = (
    <React.Fragment>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
    </React.Fragment>
  );
  return (
    <div className="navbar bg-neutral sticky top-0 border-b-2 border-secondary z-30 backdrop-blur bg-transparent shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="flex items-center justify-center btn btn-ghost">
          <span className="normal-case text-3xl font-bold font-serif ">
            Bookify
          </span>
          <img className="w-[30px]" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>

      <div className="navbar-end">
        {!user ? (
          <Link to="/signin" className="btn btn-sm btn-outline btn-primary">
            Sign In
          </Link>
        ) : (
          <a className="btn btn-sm btn-outline btn-primary">Logout</a>
        )}

        <label className="btn btn-ghost btn-circle">
          <div className="indicator">
            <img className="w-[40px]" src={wishlist} alt="wishlist" />
            <span className="badge badge-sm indicator-item">8</span>
          </div>
        </label>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="avatar online placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                <span className="text-xl">JO</span>
              </div>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
