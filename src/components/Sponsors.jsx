import React from "react";
import { motion } from "framer-motion";

function SponsorCard({ sponsor, index }) {
  const { name, image } = sponsor;
  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-white text-background p-4 rounded-md cursor-pointer w-56"
      initial={{ opacity: 0, x: index == 0 ? "-60%" : "60%", scale: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", duration: 0.5, damping: 8 }}
      exit={{ scale: 0 }}
    >
      <img src={image} />
      <div className="pt-4 text-lg md:text-xl">{name}</div>
    </motion.div>
  );
}

export default function Sponsors() {
  const sponsors = [
    { name: "Data Science Wizards", image: "https://placehold.co/300" },
    { name: "Exceller Tech", image: "https://placehold.co/300" },
  ];
  return (
    <>
      <div className="text-xl underline underline-offset-8 mb-5 p-6 pt-10">
        Our Sponsors
      </div>
      <div className="w-4/5 flex flex-col p-2 md:p-4 md:flex-row items-center md:justify-around gap-2 md:gap-4">
        {sponsors.map((sponsor, index) => (
          <SponsorCard sponsor={sponsor} key={index} index={index} />
        ))}
      </div>
    </>
  );
}
