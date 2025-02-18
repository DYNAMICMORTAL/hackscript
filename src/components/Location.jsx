import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"; // Import social media icons
import './Location.css';
const Formula1Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-black text-white py-10 relative overflow-hidden"
    >
      <div className="w-[90%] max-w-5xl mx-auto flex flex-col gap-2 md:flex-row justify-between items-start p-6 bg-opacity-80 bg-gray-900 rounded-2xl shadow-lg transition-transform transform hover:shadow-xl">
        {/* Left Section - Event Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold text-red-600 uppercase">
            Venue
          </h3>
          <p className="text-gray-300 text-sm md:text-base">
            A. P. Shah Institute Of Technology <br />
            Survey No, 12, Ghodbunder Rd, opp. Hypercity Mall Bhawani Nagar,
            Kasarvadavali, Thane West, Thane, Maharashtra 400615
          </p>
          <p className="text-gray-300 text-sm">
            📧{" "}
            <a
              href="mailto:hackwave@apsit.edu.in"
              className="text-red-500 hover:text-white transition"
            >
              hackscript@apsit.edu.in
            </a>
          </p>
          <p className="text-gray-300 text-xs md:text-sm">
            📞 Abhishek Thormothe:{" "}
            <a
              href="tel:+918369098056"
              className="text-red-500 hover:text-white"
            >
              +91 83690 98056
            </a>{" "}
            <br />
            📞 Ritik Pandey:{" "}
            <a
              href="tel:+99372904186"
              className="text-red-500 hover:text-white"
            >
              +91 93729 04186
            </a>{" "}
            <br />
            📞 Shrey Nagda:{" "}
            <a
              href="tel:+919405321984"
              className="text-red-500 hover:text-white"
            >
              +919405321984
            </a>
            <br />
            📞 Rishi Mane:{" "}
            <a
              href="tel:+919004913599"
              className="text-red-500 hover:text-white"
            >
              +91 90049 13599
            </a>
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a
              href="#"
              className="text-red-500 text-2xl hover:text-white transition"
            >
              <FaGithub />
            </a>
            <a
              href="#"
              className="text-red-500 text-2xl hover:text-white transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              className="text-red-500 text-2xl hover:text-white transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        
          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            <h3 className="text-2xl md:text-3xl font-bold text-red-600 uppercase mb-3">
              Event Location
            </h3>
            <iframe
              className="w-full h-48 md:h-60 rounded-lg shadow-md border-4 border-red-600"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.329490413092!2d72.96466957441031!3d19.268032481976487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bba2e15f6c7b%3A0x20e1357d640bef7e!2sA.%20P.%20Shah%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1739259488677!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
              </div>

              {/* Racing Track & Effects */}
      <div className="absolute bottom-[-30px] w-full flex justify-center items-center">
        <div
          className="w-[60px] md:w-[80px] h-[30px] md:h-[40px] bg-cover bg-center shadow-lg transform rotate-45 animate-spin"
          style={{
            backgroundImage:
              "url('https://upload.wikimedia.org/wikipedia/commons/d/d3/Checkered_flag.svg')",
          }}
        ></div>
        <div className="absolute w-full h-[8px] md:h-[10px] bg-gradient-to-r from-red-600 via-white to-red-600 animate-pulse"></div>
      </div>
    </footer>
  );
};

export default Formula1Footer;
