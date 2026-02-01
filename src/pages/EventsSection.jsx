import EventBigTitele from "../components/EventBigTitele";
import TaskCards from "../components/TaskCards";
import FilterAndAdd from "../components/FilterAndAdd";
import { Outlet, useLocation, useParams } from "react-router";
import { useEventsAndTasks } from "../Contexts/EventsContex";
import { useState, useEffect } from "react";

export default function EventsSection() {
  const { eventId } = useParams();
  const { eventsAndTasks } = useEventsAndTasks();
  const [priority, setPriority] = useState("All Tasks");
  const currentEvent = eventsAndTasks.find((event) => event?.id == eventId);
  const location = useLocation();
  const bgLocation = location.state?.bgLocation;

  const handleAddNewEvent = () => {
    window.__pendingOpenAddEvent = true;
    window.dispatchEvent(new Event("openSidebar"));
    setTimeout(() => {
      window.dispatchEvent(new Event("openAddEvent"));
    }, 50);
  };

  // ===================================
  useEffect(() => {
    setPriority("All Tasks");
  }, [eventId]);
  // ===================================
  return (
    <>
      <main className=" relative flex min-h-screen w-full  px-[30px] py-[26px] flex-col items-end gap-8  bg-[#F6F8FA] ">
        <EventBigTitele Event={currentEvent?.Name} />
        {currentEvent ? (
          <>
            <FilterAndAdd onChange={setPriority} value={priority} />
            <TaskCards priority={priority} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full min-h-[60vh] text-center">
            <h2 className="text-3xl font-bold text-[#2F090B] mb-4 font-poppins">
              No Events Available
            </h2>
            <p className="text-lg text-gray-600 mb-6 font-poppins">
              Create your first event to get started with task management.
            </p>
            <button
              type="button"
              onClick={handleAddNewEvent}
              className="px-6 py-3 bg-[#D7303A] text-white font-semibold font-poppins rounded-xl hover:bg-[#b32530] transition-colors"
            >
              Add New Event
            </button>
          </div>
        )}

        {bgLocation && <Outlet />}
      </main>
    </>
  );
}
