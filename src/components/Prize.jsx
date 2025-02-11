import React, { useState, useEffect } from "react";
import { FaTrophy, FaFlagCheckered } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import Confetti from "react-dom-confetti";
import { useSpring } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

const PrizeBox = ({
  position,
  prize,
  delay,
  color,
  isWinning,
  shouldAnimate,
}) => {
  const [amount, setAmount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const { number } = useSpring({
    from: { number: 0 },
    to: { number: prize },
    delay: delay,
    config: { duration: 2000 }, // 2 seconds duration
  });

  useEffect(() => {
    if (!shouldAnimate) return; // Only animate when section is in view

    let intervalId;
    const animatePrize = () => {
      intervalId = setInterval(() => {
        setAmount((prev) => {
          if (prev < prize) return prev + Math.ceil(prize / 50);
          clearInterval(intervalId);
          setShowConfetti(true);
          return prize;
        });
      }, 20);
    };

    setTimeout(() => {
      setIsLoaded(true);
      animatePrize();
    }, delay);

    return () => clearInterval(intervalId);
  }, [prize, delay, shouldAnimate]); // Add shouldAnimate as dependency

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={shouldAnimate ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className={`relative flex flex-col items-center justify-center text-white p-4 md:p-6 rounded-lg w-full h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 border-4 shadow-lg md:shadow-2xl transition-all duration-300 hover:scale-105 ${color}`}
    >
      <div className="absolute -top-6 md:-top-8">
        <Confetti
          active={showConfetti}
          config={{ elementCount: 30, spread: 50 }}
        />
      </div>

      <div className="absolute -top-4 md:-top-6 bg-white text-black px-3 py-1 rounded-full font-bold text-sm md:text-xl shadow-md">
        #{position.split(" ")[0]}
      </div>

      <FaTrophy className="text-3xl md:text-5xl lg:text-7xl mb-1 md:mb-2 animate-float" />

      <h3 className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
        {position}
      </h3>

      <div className="text-xl md:text-3xl lg:text-4xl font-bold text-yellow-400 mt-1 md:mt-2">
        ₹{amount.toLocaleString("en-IN")}
      </div>

      {/* Animated Track Lines */}
      <div className="absolute inset-0 flex justify-between opacity-30">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-1 bg-white animate-marqueeVertical" />
        ))}
      </div>
    </motion.div>
  );
};

const Prize = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="prizes"
      ref={sectionRef}
      className="relative bg-black py-12 md:py-20 text-center text-white overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"
        style={{ scale, rotate }}
      />

      {/* Moving Checkered Pattern - Reduced count on mobile */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-12 h-12 md:w-20 md:h-20 border-2 md:border-4 border-white"
            style={{
              left: `${(i * 25) % 100}%`,
              top: `${(i * 10) % 100}%`,
              animation: `moveDiagonal 20s linear infinite`,
              animationDelay: `${i * -2}s`,
            }}
          />
        ))}
      </div>

      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-2xl md:text-4xl lg:text-6xl font-bold text-red-500 mb-8 md:mb-12 relative z-10 px-4"
      >
        <FaFlagCheckered className="inline mr-2 md:mr-4 text-xl md:text-3xl animate-checkered" />
        <span className="underline underline-offset-4 text-2xl md:text-4xl md:underline-offset-8">
          Championship Prizes
        </span>
        <FaFlagCheckered className="inline ml-2 md:ml-4 text-xl md:text-3xl animate-checkered" />
      </motion.h2>

      {/* 3D Podium Structure - Stack vertically on mobile */}
      <div className="relative flex flex-col md:flex-row justify-center items-end gap-4 md:gap-8 z-10 perspective-1000 px-4">
        {/* 2nd Place - Mobile first column order */}
        <motion.div
          className="relative bg-gradient-to-b from-gray-900 to-gray-700 w-full md:w-48 h-48 md:h-72 lg:w-64 lg:h-96 rounded-t-xl transform hover:rotate-2 hover:scale-105 transition-all duration-300 shadow-xl order-2 md:order-1"
          whileHover={{ y: -20 }}
        >
          <div className="absolute bottom-0 w-full h-16 md:h-24 bg-gradient-to-t from-gray-800 to-gray-600" />
          <PrizeBox
            position="2nd Place"
            prize={10000}
            delay={500}
            color="border-silver"
            isWinning={false}
            shouldAnimate={inView}
          />
        </motion.div>

        {/* 1st Place - Center on mobile */}
        <motion.div
          className="relative bg-gradient-to-b from-yellow-600 to-red-800 w-full md:w-48 h-64 md:h-96 lg:w-64 lg:h-[450px] rounded-t-xl transform hover:-translate-y-5 hover:scale-110 transition-all duration-300 shadow-2xl order-1 md:order-2"
          whileHover={{ y: -30 }}
        >
          <div className="absolute bottom-0 w-full h-20 md:h-32 bg-gradient-to-t from-yellow-500 to-red-700" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 md:-translate-y-8 text-2xl md:text-4xl text-yellow-400">
            🏁
          </div>
          <PrizeBox
            position="1st Place"
            prize={15000}
            delay={200}
            color="border-gold"
            isWinning={true}
            shouldAnimate={inView}
          />
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          className="relative bg-gradient-to-b from-orange-700 to-amber-900 w-full md:w-48 h-40 md:h-64 lg:w-64 lg:h-80 rounded-t-xl transform hover:-rotate-2 hover:scale-105 transition-all duration-300 shadow-xl order-3"
          whileHover={{ y: -10 }}
        >
          <div className="absolute bottom-0 w-full h-12 md:h-20 bg-gradient-to-t from-orange-600 to-amber-800" />
          <PrizeBox
            position="3rd Place"
            prize={5000}
            delay={800}
            color="border-bronze"
            isWinning={false}
            shouldAnimate={inView}
          />
        </motion.div>
      </div>

      {/* Animated Track Elements - Smaller on mobile */}
      <div className="absolute bottom-0 w-full h-24 md:h-32 bg-gradient-to-t from-trasnparent to-black/85 z-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute h-6 md:h-8 w-16 md:w-24 bg-red-500 clip-triangle"
            style={{
              left: `${(i * 25) % 100}%`,
              animation: `moveRight 20s linear infinite`,
              animationDelay: `${i * -2}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Trophies - Fewer on mobile */}
      {[...Array(3)].map((_, i) => (
        <FaTrophy
          key={i}
          className="absolute text-2xl md:text-4xl text-yellow-400 opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float 15s infinite ease-in-out`,
            animationDelay: `${i * 3}s`,
          }}
        />
      ))}
    </section>
  );
};

export default Prize;
