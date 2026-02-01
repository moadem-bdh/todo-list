import React, { useEffect, useState } from "react";
import SideBare from "./pages/SideBare";
import StickyWallSection from "./pages/StickyWallsSection";
import TaskFormModal from "./components/modals/TaskFormModal";
import StickyFormModal from "./components/modals/StickyFormModal";
import HomePage from "./pages/HomePage";
import { EventsProvider } from "./Contexts/EventsContex";
import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import EventsSection from "./pages/EventsSection";
import { StickyWallprovider } from "./Contexts/StickyWallContext";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleOpenSidebar = () => setIsSidebarOpen(true);
    window.addEventListener("openSidebar", handleOpenSidebar);
    return () => window.removeEventListener("openSidebar", handleOpenSidebar);
  }, []);

  return (
    <EventsProvider>
      <StickyWallprovider>
        <div className=" w-full  h-max flex ">
          <SideBare
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen((prev) => !prev)}
          />

          <div
            className={`w-full transition-[margin] duration-300 ${
              isSidebarOpen ? "ml-[300px]" : "ml-[64px]"
            }`}
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
          </div>
        </div>
      </StickyWallprovider>
    </EventsProvider>
  );
}

export default App;
