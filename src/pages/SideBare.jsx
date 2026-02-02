import MenuTitele from "../components/MenuTitele";
import StickyWalls from "../components/StickyWalls";
import Events from "../components/Events";
import Reminder from "../components/Reminder";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router";
import TaskIcon from "../assets/task.svg";
import StickyIcon from "../assets/Sticky.svg";
import HomeIcon from "../assets/home.svg";
import MoademLogo from "../assets/moademLogo.svg";

export default function SideBare({ isOpen = true, onToggle }) {
  const handleIconClick = () => {
    if (!isOpen) {
      onToggle();
    }
  };

  return (
    <motion.nav
      initial={false}
      animate={{ width: isOpen ? 300 : 64 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className=" fixed top-0 left-0 min-h-max h-screen bg-[#0C0E0B] py-[13px] flex-col items-center justify-between flex overflow-hidden "
    >
      <div className=" flex flex-col items-center gap-[15px] w-full ">
        <div
          className={`${isOpen ? "gap-5" : ""} flex flex-col w-full justify-between items-center `}
        >
          <MenuTitele isOpen={isOpen} onToggle={onToggle} />
          <hr className=" w-full border-1 border-white/60 rounded " />
        </div>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="sidebar-open"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <Events />
              <StickyWalls />
            </motion.div>
          ) : (
            <motion.div
              key="sidebar-compact"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-6 pt-2"
            >
              <Link
                to="/"
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                title="Home"
              >
                <img src={HomeIcon} alt="Home" className="w-7 h-7" />
              </Link>
              <Link
                to="/events"
                onClick={handleIconClick}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                title="Events"
              >
                <img src={TaskIcon} alt="Events" className="w-6 h-6" />
              </Link>
              <Link
                to="/sticky-wall"
                onClick={handleIconClick}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                title="Sticky Walls"
              >
                <img src={StickyIcon} alt="Sticky Walls" className="w-6 h-6" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="reminder-open"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
          >
            <Reminder />
          </motion.div>
        ) : (
          <motion.div
            key="reminder-compact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-3"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <img src={MoademLogo} alt="Moadem Logo" className="w-6 h-6" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
