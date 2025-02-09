import React from "react";

export default function Hero() {
  return (
    <div className="min-h-screen font-f1 flex flex-col justify-center items-center h-full px-2 md:px-0">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="src/assets/background1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/85"></div>

      {/* Content */}
      <div className="relative space-y-2 md:space-y-4 font-f1 text-white text-center">
        <div className="flex md:flex-col gap-2 flex-row items-center justify-center">
          <img src="src/assets/logos/apsit_Logo.png" className="w-12 md:w-32" />
          <div>
            <div className="text-[0.8rem] md:text-xl">
              A. P. Shah Institute of Technology
            </div>
            <div className="text-xs md:text-lg">presents</div>
          </div>
        </div>
        <div className="text-3xl md:text-5xl font-f1-bold">Hackscript 6.0</div>
        <div className="text-sm md:text-lg mb-2">Code at Full Throttle!</div>
        <button
          type="button"
          className="px-4 py-2 bg-primary rounded-md text-sm"
        >
          Register Now
        </button>
        <div className="text-xl md:text-2xl">
          8<sup>th</sup> & 9<sup>th</sup> March
        </div>
      </div>
    </div>
  );
}
