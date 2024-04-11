import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./settings.css"; 

const Settings = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const dropdownElement = dropdownRef.current;
    if (dropdownElement) {
      const dropdownMenuElement = dropdownElement.querySelector(".dropdown-menu");
      dropdownMenuElement.style.width = `${dropdownElement.offsetWidth}px`;
    }
  }, []);

  return (
    <div>
      <div className="dropdown"  ref={dropdownRef}>
        <Link
          className="btn bg-white text-danger  dropdown-toggle"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="true"
        >
          Setting
        </Link>

        <ul className="dropdown-menu">
          <li>
            <Link className="btn bg-white text-danger" to={"/profile"}>
              Profile
            </Link>
          </li>
          <li>
            <Link className="btn bg-white text-danger" to={"/changepassword"}>
              Change Password
            </Link>
          </li>
          <li>
            <Link
              className="btn bg-white text-danger mx-1"
              onClick={handleLogout}
            >
              LogOut
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;