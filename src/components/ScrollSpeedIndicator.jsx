import { useState, useEffect, useRef } from "react";

const ScrollSpeedDisplay = () => {
  const [speed, setSpeed] = useState(0);
  const lastScrollY = useRef(window.scrollY);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    let animationFrameId;

    const updateSpeed = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const timeDiff = (currentTime - lastTime.current) / 1000; // Convert ms to seconds
      const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);

      if (timeDiff > 0) {
        const currentSpeed = Math.min((scrollDiff / timeDiff).toFixed(2), 200);
        setSpeed(currentSpeed);
      }

      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;
      animationFrameId = requestAnimationFrame(updateSpeed);
    };

    animationFrameId = requestAnimationFrame(updateSpeed);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="fixed right-4 bottom-4 bg-blue-900 p-3 rounded-lg border-2 border-blue-500 text-white shadow-xl z-[9999] pointer-events-none">
      <div className="text-white font-bold text-lg flex items-center">
        <span className="text-sm mr-2">SCROLL SPEED:</span>
        {speed} px/sec
      </div>
    </div>
  );
};

export default ScrollSpeedDisplay;
