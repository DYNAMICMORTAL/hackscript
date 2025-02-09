import React from "react";
import Sponsors from "./Sponsors";
import { motion } from "framer-motion";

export default function About() {
  const organizers = [
    "src/assets/logos/csa_dept_logo.png",
    "src/assets/logos/itsa_dept_logo.png",
    "src/assets/logos/ds_dept_logo.png",
    "src/assets/logos/aiml_dept_logo.png",
  ];
  return (
    <div
      id="about"
      className="border-t flex flex-col items-center justify-start bg-background p-4 md:p-4 overflow-y-hidden"
    >
      <div className="text-xl underline underline-offset-8 mb-5 p-6">
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
      <Sponsors />

      <div className="text-xl underline underline-offset-8 mb-5 p-6">
        Powered By
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-6 w-full">
        {organizers.map((o, idx) => (
          <motion.div
            className="flex items-center justify-center "
            key={idx}
            initial={{ y: "60%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 1, delay: idx * 0.2 }}
          >
            <img
              src={o}
              className="md:w-32 w-20 hover:scale-105 cursor-pointer transition-all"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
