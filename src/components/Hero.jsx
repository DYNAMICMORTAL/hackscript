import React, { useState, useEffect } from "react";
import "./Hero.css";

export default function Hero() {
  const calculateTimeLeft = () => {
    const difference = +new Date("2025-03-07T08:00:00") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="hero-container">
      <div className="verticalDiv">
        <div className="heroSection">
          <div className="leftHero">
            <div className="heroText">
              <h3 className="heroSubtitle">
                Code at <br />
                FULL <span>THROTTLE!</span>
              </h3>
            </div>
            <div className="countdown">
              <div className="time">
                {timeLeft.days} <span>Days</span>
              </div>
              <div className="time">
                {timeLeft.hours} <span>Hours</span>
              </div>
              <div className="time">
                {timeLeft.minutes} <span>Minutes</span>
              </div>
              <div className="time">
                {timeLeft.seconds} <span>Seconds</span>
              </div>
            </div>
            <div className="registerButtonContainer">
              <button onClick={openModal} className="registerButton">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Rules and Conditions</h2>
            <div className="modal-content text-sm leading-6">
              <p>
                📋 How to Enter the Track (Form Filling Guide):<br></br>
                🏎 Team Details:<br></br> Choose your team name (make it
                race-inspired if you like!) and list all members clearly.
                <br></br>
                🔧 Personal Information:<br></br> Full names, contact numbers,
                and valid email IDs to keep you updated throughout the event.
                <br></br>
                🏁 College Details:<br></br> Mention your college name, state,
                and course details accurately.<br></br>✅ Final Pit Stop:
                <br></br> Double-check all entries before submitting. Incomplete
                or incorrect information might slow down your chances of
                participation.<br></br>
                ⚠️ Important Notes:<br></br>
                👥 Team Size: Minimum 3, maximum 4 members.
              </p>
            </div>
            <button onClick={closeModal} className="closeButton">
              Close
            </button>
            <a target="_blank"
              href="https://forms.gle/HXeknNFsoy6iWnXe8"
              className="registerButton"
            >
              Register Now
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
