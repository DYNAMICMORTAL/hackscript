import React from "react";
import "./hero.css"; // Assuming you will create a CSS file for styling
import Sidebar from "./Sidebar";

const Navbar = () => {
  return (
    <nav className="navigation">
      <div className="leftHalf">
        <img src="/logos/nav_logo.png" alt="APSIT Logo" />
        {/* <img src="/hs6_fav.png" alt="Hackscript Logo" /> */}
      </div>
      <div className="Midtext">
        <h3 className="byText">HACKSCRIPT 6.0</h3>
      </div>
      <div className="rightHalf">
        <Sidebar />
      </div>
    </nav>
  );
};

export default Navbar;
