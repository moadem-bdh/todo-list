import { Link } from "react-router";
import { useEventsAndTasks } from "../Contexts/EventsContex";
import { useStickyWalls } from "../Contexts/StickyWallContext";
import MoademLogo from "../assets/moademLogo.svg";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function HomePage() {
  const { eventsAndTasks } = useEventsAndTasks();
  const { stickyWalls } = useStickyWalls();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-gradient-to-br from-[#F6F8FA] to-[#E8EAED] flex flex-col items-center py-14 justify-center px-8"
    >
      <div className="text-center max-w-4xl">
        {/* Logo/Title Section */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src={MoademLogo} alt="Moadem Logo" className="w-16 invert" />
            <h1 className="text-6xl font-bold text-black font-poppins">
              Todo List
            </h1>
          </div>

          <p className="text-2xl text-[#5A5A5A] font-poppins">
            Welcome to Your Ultimate Task Management Solution
          </p>
        </div>

        {/* Welcome Message */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border-2 border-[#FF8F8F]">
          <h2 className="text-3xl  font-semibold text-[#D7303A] mb-4 font-poppins">
            Welcom
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed font-poppins">
            Organize your life with our powerful todo list application. Create
            events, manage tasks with priorities, and keep track of everything
            with our intuitive sticky wall feature.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
            <Link
              to={
                eventsAndTasks.length > 0
                  ? `/events/${eventsAndTasks[0]?.id}`
                  : "/events"
              }
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-[#FF8F8F] hover:bg-[#E5E7EB] transition-colors duration-200 cursor-pointer block"
            >
              <h3 className="text-xl font-semibold text-black mb-2 font-poppins">
                📅 Events
              </h3>
              <p className="text-3xl font-bold text-[#D7303A] font-poppins">
                {eventsAndTasks.length}
              </p>
              <p className="text-gray-600 font-poppins">
                {eventsAndTasks.length === 1
                  ? "Event Created"
                  : "Events Created"}
              </p>
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
            <Link
              to={
                stickyWalls.length > 0
                  ? `/sticky-wall/${stickyWalls[0]?.id}`
                  : "/sticky-wall"
              }
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-[#FF8F8F] hover:bg-[#E5E7EB] transition-colors duration-200 cursor-pointer block"
            >
              <h3 className="text-xl font-semibold text-black mb-2 font-poppins">
                📌 Sticky Walls
              </h3>
              <p className="text-3xl font-bold text-[#D7303A] font-poppins">
                {stickyWalls.length}
              </p>
              <p className="text-gray-600 font-poppins">
                {stickyWalls.length === 1 ? "Wall Created" : "Walls Created"}
              </p>
            </Link>
          </motion.div>
        </div>

        {/* Divider */}
        <hr className="w-full border-t-2 border-[#D7303A] my-16" />

        {/* Features List */}
        <div className="mt-12 text-left">
          <h1 className="text-4xl font-semibold text-black mb-6 text-center font-poppins">
            Features
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg p-6 shadow-md hover:bg-[#E5E7EB] transition-colors duration-200"
            >
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-semibold text-black mb-2 font-poppins">
                Task Priorities
              </h4>
              <p className="text-gray-600 text-sm font-poppins">
                Organize tasks by priority: Urgent, Not Urgent, or Can Wait
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg p-6 shadow-md hover:bg-[#E5E7EB] transition-colors duration-200"
            >
              <div className="text-3xl mb-3">📋</div>
              <h4 className="font-semibold text-black mb-2 font-poppins">
                Event Management
              </h4>
              <p className="text-gray-600 text-sm font-poppins">
                Create and manage events with multiple tasks and deadlines
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg p-6 shadow-md hover:bg-[#E5E7EB] transition-colors duration-200"
            >
              <div className="text-3xl mb-3">📝</div>
              <h4 className="font-semibold text-black mb-2 font-poppins">
                Sticky Notes
              </h4>
              <p className="text-gray-600 text-sm font-poppins">
                Quick notes and reminders on customizable sticky walls
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
