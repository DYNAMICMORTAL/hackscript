import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Home, Clock, Trophy, Info, CircleHelp, Contact } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Sidebar Toggle Handler
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Sidebar Navigation Links
  const navItems = [
    { title: "Home", icon: <Home />, link: "#" },
    { title: "About", icon: <Info />, link: "#about" },
    { title: "Timeline", icon: <Clock />, link: "#timeline" },
    { title: "Prizes", icon: <Trophy />, link: "#prizes" },
    { title: "FAQ", icon: <CircleHelp />, link: "#faq" },
    { title: "Contact US", icon: <Contact />, link: "#contact" },
  ];

  return (
    <div className="relative">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-5 right-5 z-50 text-sm md:text-lg text-secondary bg-primary p-2 md:p-3 lg:p-4 rounded-full shadow-lg transition-all duration-500"
      >
        {isOpen ? (
          <X size={20} className="lg:scale-150 md:scale-125" />
        ) : (
          <Menu size={20} className="lg:scale-150 md:scale-125" />
        )}
      </button>

      {/* Full-Screen Sidebar */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="fixed top-0 right-0 w-full h-screen bg-background text-secondary flex flex-col justify-center items-center z-40"
      >
        {/* Navigation Items */}
        <nav className="space-y-6 text-2xl font-semibold">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="flex items-center space-x-4 p-4 hover:bg-primary transition-all w-full text-center justify-center rounded-lg text-lg md:text-xl"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </a>
          ))}
        </nav>
      </motion.div>
    </div>
  );
};

export default Sidebar;
