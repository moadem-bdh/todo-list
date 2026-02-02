import { Link } from "react-router";
import { useEventsAndTasks } from "../Contexts/EventsContex";
import { useStickyWalls } from "../Contexts/StickyWallContext";
import OrgaListLogo from "../assets/orgaListRed.svg";
import Avatar from "../assets/Avatar.png";
import EventIcon from "../assets/event.svg";
import StickyHomeIcon from "../assets/stickyHomeRed.svg";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function HomePage() {
  const { eventsAndTasks } = useEventsAndTasks();
  const { stickyWalls } = useStickyWalls();

  const handleEventsClick = () => {
    window.dispatchEvent(new Event("openSidebar"));
  };

  const handleStickyWallsClick = () => {
    window.dispatchEvent(new Event("openSidebar"));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-gradient-to-br from-[#F6F8FA] to-[#E8EAED] flex items-center px-16 relative overflow-hidden"
    >
      {/* Left Content */}
      <div className="flex-1 z-10">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <img src={OrgaListLogo} alt="OrgaList Logo" className="w-20 h-20" />
          <h1 className="text-6xl font-bold text-black font-poppins">
            OrgaList
          </h1>
        </div>

        {/* Heading */}
        <h2 className="text-5xl font-bold text-black mb-8 font-poppins">
          Welcome to your OrgaList
        </h2>

        {/* Description */}
        <p className="text-xl text-gray-600 leading-relaxed font-poppins max-w-2xl mb-10">
          This is your space to organize your day, plan your goals, and track
          what matters. Every task is a step forward, and every checkmark is a
          small victory. Stay focused, celebrate your wins, and make today
          productive!
        </p>

        {/* Action Buttons */}
        <div className="flex gap-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={
                eventsAndTasks.length > 0
                  ? `/events/${eventsAndTasks[0]?.id}`
                  : "/events"
              }
              onClick={handleEventsClick}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#D7303A] text-white rounded-xl font-semibold font-poppins text-lg hover:bg-[#b32530] transition-colors shadow-lg"
            >
              <img src={EventIcon} alt="Events" className="w-8 h-8 invert" />
              Go to Events
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={
                stickyWalls.length > 0
                  ? `/sticky-wall/${stickyWalls[0]?.id}`
                  : "/sticky-wall"
              }
              onClick={handleStickyWallsClick}
              className="inline-flex items-center gap-3 px-[30px] py-[14px] bg-white text-[#D7303A] border-2 border-[#D7303A] rounded-xl font-semibold font-poppins text-lg hover:bg-[#FFF0F0] transition-colors shadow-lg"
            >
              <img
                src={StickyHomeIcon}
                alt="Sticky Walls"
                className="w-8 h-8"
              />
              Go to Sticky Walls
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Right Avatar - Fixed at bottom */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute right-0 bottom-0"
      >
        <img
          src={Avatar}
          alt="Welcome Avatar"
          className="h-[660px] transition-all w-auto object-contain"
        />
      </motion.div>
    </motion.div>
  );
}
