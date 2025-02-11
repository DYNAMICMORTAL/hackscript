import { useState, useEffect, useRef } from "react";

const ScrollSpeedIndicator = () => {
  const [speed, setSpeed] = useState(0);
  const lastScroll = useRef(window.pageYOffset);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const timeDiff = now - lastTime.current;
      const scrollPos = window.pageYOffset;
      const scrollDiff = Math.abs(scrollPos - lastScroll.current);

      const currentSpeed = Math.min(
        Math.round((scrollDiff / timeDiff) * 1000),
        200
      );
      setSpeed(currentSpeed);

      lastScroll.current = scrollPos;
      lastTime.current = now;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-4 bottom-4 bg-black p-2 md:p-4 rounded-lg border-2 border-red-500 shadow-xl z-[9999] pointer-events-none">
      <div className="text-red-500 md:font-bold text-sm md:text-xl flex items-center">
        <span className="text-sm mr-2">SCROLL SPEED</span>
        {speed}
        <span className="text-sm ml-1">KM/H</span>
      </div>
    </div>
  );
};

export default ScrollSpeedIndicator;
