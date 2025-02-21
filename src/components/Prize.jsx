import React, { useState, useEffect } from "react";
import { FaTrophy, FaFlagCheckered, FaGift } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import Confetti from "react-dom-confetti";
import { useSpring } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

const PrizeBox = ({ position, prize, delay, color, shouldAnimate }) => {
  const [amount, setAmount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!shouldAnimate) return;

    let intervalId = setInterval(() => {
      setAmount((prev) => {
        if (prev < prize) return prev + Math.ceil(prize / 50);
        clearInterval(intervalId);
        setShowConfetti(true);
        return prize;
      });
    }, 20);

    return () => clearInterval(intervalId);
  }, [prize, shouldAnimate]);

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={shouldAnimate ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className={`relative flex flex-col items-center justify-center text-white p-6 rounded-lg w-full h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 border-4 shadow-lg hover:scale-105 ${color}`}
    >
      <Confetti
        active={showConfetti}
        config={{ elementCount: 30, spread: 50 }}
      />
      {/* <div className="absolute -top-6 bg-white text-black px-4 py-1 rounded-full font-bold text-lg shadow-md">
        #{position.split(" ")[0]}
      </div> */}
      <FaTrophy className="text-4xl md:text-6xl mb-2 text-yellow-400" />
      {/* <h3 className="text-xl md:text-2xl font-bold">{position}</h3> */}
      <div className="text-2xl md:text-3xl font-bold text-yellow-400 mt-2">
        ₹{amount.toLocaleString("en-IN")}
      </div>
    </motion.div>
  );
};

const Prize = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  const [sectionRef, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="prizes"
      ref={sectionRef}
      className="relative bg-black py-12 md:py-20 text-center text-white overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"
        style={{ scale, rotate }}
      />
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl md:text-5xl font-bold text-red-500 mb-10 relative z-10"
      >
        <FaFlagCheckered className="inline mr-4 text-2xl md:text-4xl" />
        Prize Pool
        <FaFlagCheckered className="inline ml-4 text-2xl md:text-4xl" />
      </motion.h2>
      <div className="relative flex flex-col justify-center items-center gap-8 z-10 px-4">
        {/* 2nd Place
        <motion.div
          className="relative bg-gray-700 w-full md:w-56 h-48 md:h-64 rounded-t-xl transform hover:scale-105 transition-all duration-300 shadow-lg"
          whileHover={{ y: -10 }}
        >
          <PrizeBox
            position="2nd Place"
            prize={10000}
            delay={500}
            color="border-silver"
            shouldAnimate={inView}
          />
        </motion.div> */}
        {/* 1st Place */}
        <motion.div
          className="relative bg-yellow-700 w-full md:w-56 h-64 md:h-80 rounded-t-xl transform hover:scale-110 transition-all duration-300 shadow-2xl"
          whileHover={{ y: -20 }}
        >
          <PrizeBox
            position="1st Place"
            prize={80000}
            delay={200}
            color="border-gold"
            shouldAnimate={inView}
          />
        </motion.div>
        <p className="flex items-start justify-center md:gap-2 text-lg">
          <FaGift className="text-yellow-400 md:text-3xl text-2xl" />
          <p className="text-sm md:text-lg">
            Exclusive Goodies for Each Participant
          </p>
        </p>
      </div>
    </section>
  );
};

export default Prize;
