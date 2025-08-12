import MenuTiteles from "./MenuTiteles";
import EventOption from "./EventOption";
import { useEventsAndTasks } from "../Contexts/EventsContex";
import { useToggle } from "../CustomHooks/useToggle";
import Task from "../assets/task.svg";
import Arrow from "../assets/arrow.svg";
import { useForm } from "../CustomHooks/useForm";
import { useState } from "react";

export default function Events() {
  const { eventsAndTasks, setEventsAndTasks } = useEventsAndTasks();
  const [isAdding, setIsAdding] = useToggle();
  const [isError, setIsError] = useState(false);
  const [newEvent, setNewEvent, resetNewEvent] = useForm({
    id: 0,
    Name: "",
    Tasks: [],
  });

  const addEvent = (Event) => {
    setEventsAndTasks((prev) => [...prev, Event]);
  };

  const handleOnClick = () => {
    const trimEvent = {
      ...newEvent,
      Name: newEvent.Name.trim(),
      id: crypto.randomUUID(),
    };

    if (!trimEvent.Name) {
      setIsError(true);
    } else {
      setIsError(false);
      addEvent(trimEvent);
      setIsAdding();
      resetNewEvent();
    }
  };

  return (
    <div className=" flex w-[300px] px-5 flex-col gap-[6px] items-center justify-start ">
      <MenuTiteles
        onClick={() => {
          setIsAdding();
          setIsError(false);
          resetNewEvent();
        }}
      />
      <div className=" flex flex-col w-[260px] items-center justify-start gap-1 min-h-[48px] max-h-[182px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-amber-50 pr-2 overflow-auto ">
        {isAdding && (
          <>
            <div className=" pl-2  py-[3px] flex items-center w-full gap-1.5 ">
              <img className="h-[18px]  " src={Task} alt="Add Icon" />
              <input
                autoFocus
                name="Name"
                value={newEvent.Name}
                onChange={setNewEvent}
                className=" text-white text-[18px] w-full font-normal font-poppins focus:outline-0 focus:bg-[#100c0c]  "
                placeholder="Enter event name"
              />
              <button
                onClick={handleOnClick}
                className="hover:bg-[#321b1b] hover:outline-3 hover:outline-[#321b1b]   rounded-sm  cursor-pointer "
              >
                <img className=" rotate-90" src={Arrow} alt="Add Icon" />
              </button>
            </div>
            {isError && (
              <p className="text-sm pl-6 font-base w-full font-poppins text-[#fe0011cc]">
                Event name must be filled
              </p>
            )}
          </>
        )}
        {eventsAndTasks.map((event) => (
          
            <EventOption key={event.id} Title={event.Name} eventId={event.id} />
          
        ))}
      </div>
    </div>
  );
}
