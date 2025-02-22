import React from "react";
import { motion } from "framer-motion";

function SponsorCard({ sponsor, index }) {
  const { name, image } = sponsor;
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-background p-4 rounded-md cursor-pointer md:w-96 w-72"
      initial={{ opacity: 0, y: "60%", scale: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", duration: 0.5, damping: 8 }}
      exit={{ scale: 0 }}
    >
      <img src={image} />
    </motion.div>
  );
}

export default function Sponsors() {
  const sponsors = [
    { name: "Data Science Wizards", image: "/logos/dsw_logo.png" },
  ];
  return (
    <>
      <div className="text-xl underline underline-offset-8 mb-5 p-6 pt-10">
        Sponsored By
      </div>
      <div className="w-4/5 flex flex-col p-2 md:p-4 md:flex-row items-center md:justify-around gap-2 md:gap-4">
        {sponsors.map((sponsor, index) => (
          <SponsorCard sponsor={sponsor} key={index} index={index} />
        ))}
      </div>
    </>
  );
}
