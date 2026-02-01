import MenuIcon from "../assets/menu.svg";
import Close from "../assets/close.svg";
import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function MenuTitele({ isOpen = true, onToggle = () => {} }) {
  return (
    <div
      className={`flex w-full items-center ${isOpen ? "justify-between px-4" : "justify-center px-0 "}`}
    >
      {isOpen && (
        <Link
          to="/"
          className="text-white font-poppins text-[32px] font-bold hover:text-[#d7303acc] transition-colors duration-200"
        >
          <motion.span
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0, maxWidth: isOpen ? 200 : 0 }}
            transition={{ duration: 0.2 }}
            className="block overflow-hidden whitespace-nowrap"
          >
            Menu
          </motion.span>
        </Link>
      )}
      <button
        onClick={onToggle}
        className={`rounded-md hover:bg-white/10 transition-colors flex items-center justify-center p-0.5 ${isOpen ? "" : "mb-2"}`}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <img
          src={isOpen ? Close : MenuIcon}
          alt={isOpen ? "Close Icon" : "Menu Icon"}
          className={`w-8 h-8 ${isOpen ? "invert" : ""}`}
        />
      </button>
    </div>
  );
}
