import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function Nav() {
  const isAdmin = useSelector((state) => state.isAdmin.value);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <header>
      <nav className="flex w-100 justify-between">
        <div className="flex flex-row w-100 justify-center mx-auto">
          <ul className=" flex list-none space-x-[3rem]">
            <li>
              <Link to="/" className="no-underline  ">
                Home
              </Link>
            </li>
            {isHomePage && (
              <>
                <li className="">
                  <Link to="/#about" className="no-underline ">
                    About
                  </Link>
                </li>

                <li className="">
                  <Link to="/#projects" className="no-underline ">
                    Projects
                  </Link>
                </li>

                <li className="">
                  <Link to="/#contact" className="no-underline ">
                    Message Me
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/book" className="no-underline no-wrap ">
                Book Reviews
              </Link>
            </li>
          </ul>
        </div>

        {!isAdmin && (
          <div className="">
            <ul className=" list-none ">
              <li>
                <Link to="/login" className="no-underline no-wrap ">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Nav;
