import { Link } from "react-router";
import OrgaListLogo from "../assets/orgaListRed.svg";
import Avatar from "../assets/Avatar.png";
import EventIcon from "../assets/event.svg";
import StickyHomeIcon from "../assets/stickyHomeRed.svg";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function HomePage() {
  const handleEventsClick = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) {
      window.dispatchEvent(new Event("openSidebar"));
    }
  };

  const handleStickyWallsClick = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) {
      window.dispatchEvent(new Event("openSidebar"));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-gradient-to-br from-[#F6F8FA] to-[#E8EAED] flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 py-10 md:py-0 relative overflow-hidden"
    >
      {/* Content */}
      <div className="z-10 w-full text-center md:text-left md:flex-1 flex flex-col items-center md:items-start gap-6 md:gap-8 md:mb-0 -mt-28 md:-mt-16">
        {/* Logo */}
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <img
            src={OrgaListLogo}
            alt="OrgaList Logo"
            className="w-16 h-16 sm:w-18 sm:h-18 md:w-18 md:h-18 lg:w-20 lg:h-20"
          />
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black font-poppins">
            OrgaList
          </h1>
        </div>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-4xl xl:text-5xl font-bold text-black font-poppins">
          Welcome to your OrgaList
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-base lg:text-xl text-gray-600 leading-relaxed font-poppins max-w-xl md:max-w-xl lg:max-w-lg xl:max-w-3xl mx-auto md:mx-0">
          This is your space to organize your day, plan your goals, and track
          what matters. Every task is a step forward, and every checkmark is a
          small victory. Stay focused, celebrate your wins, and make today
          productive!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row gap-4 items-center md:items-stretch justify-center md:justify-start w-full md:w-full lg:w-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto md:w-auto lg:w-auto"
          >
            <Link
              to="/events"
              onClick={handleEventsClick}
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-[#D7303A] text-white rounded-xl font-semibold font-poppins text-base md:text-lg hover:bg-[#b32530] transition-colors shadow-lg whitespace-nowrap border-2 border-[#D7303A]"
            >
              <img
                src={EventIcon}
                alt="Events"
                className="w-6 h-6 md:w-8 md:h-8 invert"
              />
              Go to Events
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto md:w-auto lg:w-auto"
          >
            <Link
              to="/sticky-wall"
              onClick={handleStickyWallsClick}
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-white text-[#D7303A] border-2 border-[#D7303A] rounded-xl font-semibold font-poppins text-base md:text-lg hover:bg-[#FFF0F0] transition-colors shadow-lg whitespace-nowrap"
            >
              <img
                src={StickyHomeIcon}
                alt="Sticky Walls"
                className="w-6 h-6 md:w-8 md:h-8"
              />
              Go to Sticky Walls
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Avatar - Desktop only, fixed at bottom right */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute -right-8 lg:-right-20 xl:-right-14 bottom-0 hidden lg:block"
      >
        <img
          src={Avatar}
          alt="Welcome Avatar"
          className="h-[630px] xl:h-[660px] transition-all w-auto object-contain"
        />
      </motion.div>
    </motion.div>
  );
}
