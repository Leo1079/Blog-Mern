import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-500 p-4 text-center">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-semibold">
          Blogs Users
        </Link>
        <ul className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/add-blog"
                  className="text-white hover:text-gray-300 text-xl"
                >
                  Add Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-white hover:text-gray-300 text-xl"
                >
                  {user.user}
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-white hover:text-gray-300 text-xl"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <span
                  className="text-white hover:text-gray-300 text-xl cursor-pointer"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </span>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/register"
                  className="text-white hover:text-gray-300 text-xl"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-300 text-xl"
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
