import React from "react";
import "./ScrollingBanner.css"; // Import the CSS file

const ScrollingBanner = () => {
  return (
    <div className="banner-container">
      {/* Neon Accent Lines */}
      <div className="neon-line neon-purple"></div>
      <div className="neon-line neon-green"></div>

      {/* Scrolling Text */}
      <div className="scrolling-text">
        <div className="marquee">
          {Array(10)
            .fill("• APSIT HACKATHON '25 • HACKSCRIPT • 6.0")
            .map((text, i) => (
              <span key={i} className="marquee-item">{text}</span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingBanner;
