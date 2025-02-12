import { useState, useEffect } from "react";
import { motion, animate } from "framer-motion";

const ScrollSpeedIndicator = () => {
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 3,
      onUpdate: (latest) => setSpeed(Math.round(latest)),
    });

    return () => controls.stop();
  }, []);

  return (
    <div className="fixed right-4 bottom-4 bg-black p-2 md:p-4 rounded-lg border-2 border-red-500 shadow-xl z-[9999] pointer-events-none">
      <div className="text-red-500 md:font-bold text-sm md:text-xl flex items-center">
        <span className="text-sm mr-2">SPEED</span>
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {speed}
        </motion.span>
        <span className="text-sm ml-1">KM/H</span>
      </div>
    </div>
  );
};

export default ScrollSpeedIndicator;
