import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { div } from "framer-motion/client";
function Navbar() {
  return (
    <div>
      <div className=" text-primary py-6 px-3 lg:px-0 max-w-screen-lg mx-auto w-full flex justify-between items-center bg-white ">
        <div className="text-xl md:text-3xl font-f1-bold">Hackscript 6.0</div>
        <Sidebar />
      </div>
    </div>
  );
}
export default Navbar;
