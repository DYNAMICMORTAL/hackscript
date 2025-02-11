import React, { useState, useEffect } from "react";
import { FaTrophy, FaFlagCheckered } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import Confetti from 'react-dom-confetti';

const PrizeBox = ({ position, prize, delay, color, isWinning }) => {
  const [amount, setAmount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
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
  }, [prize, delay]);

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className={`relative flex flex-col items-center justify-center text-white p-6 rounded-lg w-48 h-48 md:w-64 md:h-64 border-4 shadow-2xl transition-all duration-300 hover:scale-105 ${
        isWinning ? "z-20" : "z-10"
      } ${color}`}
    >
      <div className="absolute -top-8">
        <Confetti active={showConfetti} config={{ elementCount: 50, spread: 70 }} />
      </div>
      
      {/* Racing Number Plate */}
      <div className="absolute -top-6 bg-white text-black px-4 py-1 rounded-full font-bold text-xl shadow-md">
        #{position.split(' ')[0]}
      </div>
      
      <FaTrophy className="text-5xl md:text-7xl mb-2 animate-float" />
      <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
        {position}
      </h3>
      <div className="text-3xl md:text-5xl font-bold text-yellow-400 mt-2">
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

  return (
    <section className="relative bg-black py-20 text-center text-white overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"
        style={{ scale, rotate }}
      />
      
      {/* Moving Checkered Pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-20 h-20 border-4 border-white"
            style={{
              left: `${(i * 15) % 100}%`,
              top: `${(i * 7) % 100}%`,
              animation: `moveDiagonal 20s linear infinite`,
              animationDelay: `${i * -2}s`
            }}
          />
        ))}
      </div>

      <motion.h2 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-xl md:text-6xl font-bold text-red-500 mb-12 relative z-10"
      >
        <FaFlagCheckered className="inline mr-4 animate-checkered" />
        <span className="underline underline-offset-8">Championship Prizes</span>
        <FaFlagCheckered className="inline ml-4 animate-checkered" />
      </motion.h2>

      {/* 3D Podium Structure */}
      <div className="relative flex justify-center items-end gap-8 z-10 perspective-1000">
        {/* 2nd Place */}
        <motion.div 
          className="relative bg-gradient-to-b from-gray-700 to-gray-900 w-48 h-72 md:w-64 md:h-96 rounded-t-xl transform hover:rotate-2 hover:scale-105 transition-all duration-300 shadow-xl"
          whileHover={{ y: -20 }}
        >
          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-gray-600 to-gray-800" />
          <PrizeBox 
            position="2nd Place" 
            prize={10000} 
            delay={500} 
            color="border-silver"
            isWinning={false}
          />
        </motion.div>

        {/* 1st Place */}
        <motion.div 
          className="relative bg-gradient-to-b from-yellow-600 to-red-800 w-48 h-96 md:w-64 md:h-[450px] rounded-t-xl transform hover:-translate-y-5 hover:scale-110 transition-all duration-300 shadow-2xl"
          whileHover={{ y: -30 }}
        >
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-yellow-500 to-red-700" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 text-4xl text-yellow-400">
            🏁
          </div>
          <PrizeBox 
            position="1st Place" 
            prize={15000} 
            delay={200} 
            color="border-gold"
            isWinning={true}
          />
        </motion.div>

        {/* 3rd Place */}
        <motion.div 
          className="relative bg-gradient-to-b from-orange-700 to-amber-900 w-48 h-64 md:w-64 md:h-80 rounded-t-xl transform hover:-rotate-2 hover:scale-105 transition-all duration-300 shadow-xl"
          whileHover={{ y: -10 }}
        >
          <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-orange-600 to-amber-800" />
          <PrizeBox 
            position="3rd Place" 
            prize={5000} 
            delay={800} 
            color="border-bronze"
            isWinning={false}
          />
        </motion.div>
      </div>

      {/* Animated Track Elements */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-800 to-transparent z-0">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-8 w-24 bg-red-500 clip-triangle"
            style={{
              left: `${(i * 15) % 100}%`,
              animation: `moveRight 20s linear infinite`,
              animationDelay: `${i * -2}s`
            }}
          />
        ))}
      </div>

      {/* Floating Trophies */}
      {[...Array(5)].map((_, i) => (
        <FaTrophy 
          key={i}
          className="absolute text-4xl text-yellow-400 opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float 15s infinite ease-in-out`,
            animationDelay: `${i * 3}s`
          }}
        />
      ))}
    </section>
  );
};

export default Prize;