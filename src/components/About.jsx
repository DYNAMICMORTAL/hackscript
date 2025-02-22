import React from "react";
import Sponsors from "./Sponsors";
import { motion } from "framer-motion";
import "./../index.css";
import { LuBrainCircuit } from "react-icons/lu";
import { TbHealthRecognition } from "react-icons/tb";

export default function About() {
  const organizers = [
    "/logos/iic_logo.png",
    "/logos/csa_dept_logo.png",
    "/logos/itsa_dept_logo.png",
    "/logos/ds_dept_logo.png",
    "/logos/aiml_dept_logo.png",
  ];
  return (
    <div
      id="about"
      className="mt-[80px] flex flex-col items-center justify-start bg-background p-4 md:p-4 overflow-x-hidden overflow-y-hidden about "
    >
      <div className="text-2xl md:text-4xl text-red-500 underline underline-offset-8 mb-10 p-6">
        About Hackscript 6.0
      </div>
      <div className="max-w-screen-md">
        <p>
          HackScript 6.0 is a national-level 24-hour hackathon organized by A.
          P. Shah Institute of Technology (APSIT). As the 6th edition of this
          prestigious event, HackScript continues to bring together some of the
          brightest minds in technology, innovation, and problem-solving.
        </p>
        <p className="hidden md:block">
          This hackathon is designed for developers, designers, and tech
          enthusiasts to collaborate, innovate, and build groundbreaking
          solutions in a high-energy, competitive environment. With a Formula 1
          racing theme, HackScript 6.0 embodies the spirit of speed, precision,
          and strategy, pushing participants to accelerate their ideas from
          concept to execution within just 24 hours.
        </p>
      </div>
      <div className="text-xl underline underline-offset-8 mb-5 mt-3 p-6">
        Our Domain
      </div>
      <div className="domains">
        <div className="w-full flex flex-col md:flex-row items-center justify-around gap-3 domainIconDiv">
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, x: "-60%", scale: 1 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", duration: 0.5, damping: 8 }}
          >
            <LuBrainCircuit className="md:text-9xl text-7xl" />
            <p>Innovation in AI</p>
          </motion.div>
        </div>
        <motion.div 
          className="domainDescText"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h2>1Domain</h2>
          <h2>2ProblemStatements</h2>
        </motion.div>
      </div>
      <Sponsors />

      <div className="text-xl underline underline-offset-8 mb-5 p-6">
        Powered By
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-5 p-6 w-full">
        {organizers.map((o, idx) => (
          <motion.div
            className={`flex items-center justify-center ${
              idx === 0
                ? "col-span-2 md:col-span-2 md:justify-center"
                : "col-span-1"
            }`}
            key={idx}
            initial={{ y: "60%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              duration: 1,
              delay: idx * 0.2,
              damping: 8,
            }}
          >
            <img
              src={o}
              className={`md:w-32 w-20 hover:scale-105 cursor-pointer transition-all ${
                idx === 0 && "md:w-44 w-32"
              }`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
