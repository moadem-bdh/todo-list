import React from "react";
import SideBare from "./pages/SideBare";
import StickyWallSection from "./pages/StickyWallsSection";
import TaskFormModal from "./components/modals/TaskFormModal";
import StickyFormModal from "./components/modals/StickyFormModal";
import HomePage from "./pages/HomePage";
import { EventsProvider } from "./Contexts/EventsContex";
import { Routes, Route } from "react-router";
import EventsSection from "./pages/EventsSection";
import { StickyWallprovider } from "./Contexts/StickyWallContext";

function App() {
  return (
    <EventsProvider>
      <StickyWallprovider>
        <div className=" w-full  h-max flex ">
          <SideBare />

          <div className="w-full ml-[300px]">
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/events" element={<EventsSection />}/>
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



              <Route
                path="/sticky-wall"
                element={<StickyWallSection />}
              />


              <Route
                path="/sticky-wall/:stickyId"
                element={<StickyWallSection />}
              >
                <Route path="note/new" element={<StickyFormModal />} />
              </Route>
            </Routes>
          </div>
        </div>
      </StickyWallprovider>
    </EventsProvider>
  );
}

export default App;
