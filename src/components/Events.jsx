import MenuTiteles from "./MenuTiteles";
import EventOption from "./EventOption";
import { useEventsAndTasks } from "../Contexts/EventsContex";
import Task from "../assets/task.svg";
import Arrow from "../assets/arrow.svg";
import { useForm } from "../CustomHooks/useForm";
import { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

export default function Events({ onNavigate = () => {} }) {
  const { eventsAndTasks, setEventsAndTasks } = useEventsAndTasks();
  const [isAdding, setIsAdding] = useState(false);
  const [isError, setIsError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const triggerShake = () => setShakeKey((prev) => prev + 1);
  const inputRef = useRef(null);
  const [newEvent, setNewEvent, resetNewEvent] = useForm({
    id: 0,
    Name: "",
    Tasks: [],
    time: "",
    location: "",
  });

  useEffect(() => {
    const handleOpenAddEvent = () => {
      setIsAdding(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    };

    if (window.__pendingOpenAddEvent) {
      window.__pendingOpenAddEvent = false;
      handleOpenAddEvent();
    }

    window.addEventListener("openAddEvent", handleOpenAddEvent);
    return () => window.removeEventListener("openAddEvent", handleOpenAddEvent);
  }, [setIsAdding]);

  const addEvent = (Event) => {
    setEventsAndTasks((prev) => [...prev, Event]);
  };

  const handleOnClick = () => {
    const systemTime = new Date().toLocaleString();
    const { locale, timeZone } = Intl.DateTimeFormat().resolvedOptions();
    const regionCode = new Intl.Locale(locale).region;
    const countryName = regionCode
      ? new Intl.DisplayNames([locale], { type: "region" }).of(regionCode)
      : "";
    const timeZoneRegion =
      timeZone?.split("/").pop()?.replaceAll("_", " ") ?? "";
    const systemLocation = [countryName, timeZoneRegion]
      .filter(Boolean)
      .join(", ");
    const trimEvent = {
      ...newEvent,
      Name: newEvent.Name.trim(),
      id: crypto.randomUUID(),
      time: newEvent.time || systemTime,
      location: newEvent.location || systemLocation,
    };

    if (!trimEvent.Name) {
      setIsError(true);
      triggerShake();
    } else {
      setIsError(false);
      addEvent(trimEvent);
      setIsAdding(false);
      resetNewEvent();
    }
  };

  return (
    <div className="flex w-full md:w-[300px] px-4 md:px-5 flex-col gap-2 items-center justify-start">
      <MenuTiteles
        onClick={() => {
          setIsAdding((prev) => !prev);
          setIsError(false);
          resetNewEvent();
        }}
      />
      <div className="flex flex-col w-full md:w-[260px] items-center justify-start gap-2 md:gap-1 h-[220px] md:h-[182px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-amber-50 pr-2 overflow-auto [scrollbar-gutter:stable]">
        {isAdding && (
          <>
            <motion.div
              key={shakeKey}
              animate={isError ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.35 }}
              className="pl-2 py-2 flex items-center w-full gap-2"
            >
              <img className="h-5 md:h-[18px]" src={Task} alt="Add Icon" />
              <input
                ref={inputRef}
                autoFocus
                name="Name"
                value={newEvent.Name}
                onChange={(e) => {
                  setNewEvent(e);
                  if (isError) setIsError(false);
                }}
                className="text-white text-lg md:text-[18px] w-full font-normal font-poppins focus:outline-0 focus:bg-[#100c0c]"
                placeholder="Enter event name"
              />
              <button
                onClick={handleOnClick}
                className="hover:bg-[#321b1b] hover:outline-3 hover:outline-[#321b1b] rounded-sm cursor-pointer p-1.5 md:p-1"
              >
                <img
                  className="rotate-90 w-8 md:w-4.5"
                  src={Arrow}
                  alt="Add Icon"
                />
              </button>
            </motion.div>
            {isError && (
              <p className="text-sm pl-6 font-base w-full font-poppins text-[#fe0011cc]">
                Fields must not be empty
              </p>
            )}
          </>
        )}
        <AnimatePresence mode="popLayout">
          {eventsAndTasks.map((event) => (
            <motion.div
              layout
              key={event.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="w-full"
            >
              <EventOption
                Title={event.Name}
                eventId={event.id}
                onNavigate={onNavigate}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
