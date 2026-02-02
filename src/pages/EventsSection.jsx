import EventBigTitele from "../components/EventBigTitele";
import TaskCards from "../components/TaskCards";
import FilterAndAdd from "../components/FilterAndAdd";
import { Link, Outlet, useLocation, useParams } from "react-router";
import { useEventsAndTasks } from "../Contexts/EventsContex";
import { useState, useEffect } from "react";
import Close from "../assets/close.svg";
import List3 from "../assets/List3.svg";
import Button from "../components/Button";
import Delete from "../assets/delete.svg";
import Rename from "../assets/Rename.svg";
import Right from "../assets/Right.svg";

export default function EventsSection() {
  const { eventId } = useParams();
  const { eventsAndTasks, setEventsAndTasks } = useEventsAndTasks();
  const [priority, setPriority] = useState("All Tasks");
  const currentEvent = eventsAndTasks.find((event) => event?.id == eventId);
  const location = useLocation();
  const bgLocation = location.state?.bgLocation;

  const handleDeleteEvent = (e, eventIdToDelete) => {
    e.preventDefault();
    e.stopPropagation();
    setEventsAndTasks((prev) =>
      prev.filter((event) => event.id !== eventIdToDelete),
    );
  };

  const handleAddNewEvent = () => {
    window.__pendingOpenAddEvent = true;
    window.dispatchEvent(new Event("openSidebar"));
    setTimeout(() => {
      window.dispatchEvent(new Event("openAddEvent"));
    }, 50);
  };

  const handleEditEvent = (e, eventId) => {
    e.stopPropagation();
    window.__pendingEditEventId = eventId;
    window.dispatchEvent(new Event("openSidebar"));
    setTimeout(() => {
      window.dispatchEvent(new Event("editEvent"));
    }, 100);
  };

  // ===================================
  useEffect(() => {
    setPriority("All Tasks");
  }, [eventId]);
  // ===================================
  return (
    <>
      <main className=" relative flex min-h-screen w-full  px-[30px] py-[26px] flex-col items-end gap-8  bg-[#F6F8FA] ">
        <EventBigTitele
          Event={currentEvent?.Name}
          time={currentEvent?.time}
          location={currentEvent?.location}
        />
        {currentEvent ? (
          <>
            <FilterAndAdd onChange={setPriority} value={priority} />
            <TaskCards priority={priority} />
          </>
        ) : (
          <div className="flex flex-col w-full text-center">
            {eventsAndTasks.length > 0 ? (
              <>
                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">
                  Events
                </h2>
                <p className="text-lg text-gray-600 mb-6 font-poppins">
                  Pick one of your events to view its tasks.
                </p>
                <ul className="grid w-full grid-cols-[repeat(auto-fill,minmax(310px,1fr))] gap-x-4 gap-y-8 items-start">
                  {eventsAndTasks.map((event) => {
                    return (
                      <li key={event.id} className="relative">
                        <div className="w-full min-h-max gap-[10px] rounded-[20px] py-5.5 px-[18px] bg-white shadow-[0_0_6px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_0_10px_5px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-200">
                          <Link to={`/events/${event.id}`} className="block">
                            <div className="flex w-full justify-between items-start gap-3">
                              <div className="flex gap-3 items-start">
                                <img
                                  src={List3}
                                  alt="List Icon"
                                  className="w-6 mt-2"
                                />
                                <p className="text-black font-poppins text-[24px] font-semibold">
                                  {event.Name}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-3 mt-3 items-center text-black font-poppins text-sm">
                              <span>
                                {event.Tasks?.length || 0}{" "}
                                {event.Tasks?.length === 1 ? "Task" : "Tasks"}
                              </span>
                              {event.location && (
                                <>
                                  <span>•</span>
                                  <span>{event.location}</span>
                                </>
                              )}
                            </div>
                          </Link>
                          <div className="flex justify-between gap-2 w-full items-center mt-4">
                            <div className="flex items-center gap-[6px]">
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteEvent(e, event.id);
                                }}
                                icon={Delete}
                                label="Delete"
                                bg="bg-[#D7303A]"
                                hover="hover:bg-[#b32530]"
                              />
                              <Button
                                onClick={(e) => handleEditEvent(e, event.id)}
                                icon={Rename}
                                label="Edit"
                                bg="bg-[#308CD7]"
                                hover="hover:bg-[#2577b8]"
                              />
                            </div>
                            <Link to={`/events/${event.id}`}>
                              <Button
                                onClick={() => {
                                  // Navigation handled by Link
                                }}
                                icon={Right}
                                label="See Tasks"
                                bg="bg-[#1E9E5F]"
                                hover="hover:bg-[#198a52]"
                              />
                            </Link>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">
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
              </>
            )}
          </div>
        )}

        {bgLocation && <Outlet />}
      </main>
    </>
  );
}
