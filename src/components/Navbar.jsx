import React from "react";
import "./Hero.css";
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
        <img src="/f1pixel1-unscreen.gif" alt="GIF" className="gif" />
      </div>
      <div className="rightHalf">
        <Sidebar />
      </div>
    </nav>
  );
};

export default Navbar;
