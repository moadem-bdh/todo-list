import React, { useEffect, useState } from "react";
import SideBare from "./pages/SideBare";
import StickyWallSection from "./pages/StickyWallsSection";
import TaskFormModal from "./components/modals/TaskFormModal";
import StickyFormModal from "./components/modals/StickyFormModal";
import HomePage from "./pages/HomePage";
import { EventsProvider } from "./Contexts/EventsContex";
import { Routes, Route, useLocation } from "react-router";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import EventsSection from "./pages/EventsSection";
import { StickyWallprovider } from "./Contexts/StickyWallContext";
import MenuIcon from "./assets/menu.svg";
import CloseIcon from "./assets/close.svg";

function App() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false,
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const location = useLocation();

  useEffect(() => {
    const handleOpenSidebar = () => setIsSidebarOpen(true);
    window.addEventListener("openSidebar", handleOpenSidebar);
    return () => window.removeEventListener("openSidebar", handleOpenSidebar);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const handleChange = (e) => setIsMobile(e.matches);
    setIsMobile(media.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return (
    <EventsProvider>
      <StickyWallprovider>
        <div className="w-full h-max flex">
          <button
            type="button"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="md:hidden fixed top-4 right-4 z-50 p-2  rounded-lg bg-white shadow-md"
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            <img
              src={isSidebarOpen ? CloseIcon : MenuIcon}
              alt={isSidebarOpen ? "Close menu" : "Open menu"}
              className="w-6 invert h-6"
            />
          </button>
          <SideBare
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen((prev) => !prev)}
          />

          <motion.div
            initial={false}
            animate={{
              marginLeft: isMobile ? 0 : isSidebarOpen ? "300px" : "64px",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="w-full min-w-0 overflow-x-hidden"
          >
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />

                <Route path="/events" element={<EventsSection />} />
                <Route path="/events/:eventId" element={<EventsSection />}>
                  <Route
                    path="task/new"
                    element={<TaskFormModal isEdit={false} />}
                  />
                  <Route
                    path="task/:taskId"
                    element={<TaskFormModal isEdit={true} />}
                  />
                </Route>

                <Route path="/sticky-wall" element={<StickyWallSection />} />

                <Route
                  path="/sticky-wall/:stickyId"
                  element={<StickyWallSection />}
                >
                  <Route path="note/new" element={<StickyFormModal />} />
                </Route>
              </Routes>
            </AnimatePresence>
          </motion.div>
        </div>
      </StickyWallprovider>
    </EventsProvider>
  );
}

export default App;
