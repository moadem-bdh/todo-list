import { useState, useEffect } from "react";
import TaskIcon from "../assets/task.svg";
import Delete from "../assets/delete.svg";
import Edit from "../assets/Rename.svg";
import { useEventsAndTasks } from "../Contexts/EventsContex";
import { Link, useLocation, useNavigate } from "react-router";
import { useToggle } from "../CustomHooks/useToggle";
import Task from "../assets/task.svg";
import Arrow from "../assets/arrow.svg";
import { useForm } from "../CustomHooks/useForm";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
export default function EventOption({ Title = "Task Name", eventId }) {
  const { setEventsAndTasks, eventsAndTasks } = useEventsAndTasks();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [rename, setRenam] = useToggle();
  const [isError, setIsError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const triggerShake = () => setShakeKey((prev) => prev + 1);
  const currentEvent = eventsAndTasks.find((event) => event.id == eventId);
  const safeEvent = currentEvent ?? {
    id: eventId,
    Name: Title,
    Tasks: [],
  };
  const [renamForm, setRenamForm, resetRenamForm, BaseRenamForm] = useForm({
    id: safeEvent.id,
    Name: safeEvent.Name,
    Tasks: safeEvent.Tasks,
  });
  const location = useLocation();

  useEffect(() => {
    const handleEditEvent = () => {
      if (window.__pendingEditEventId === eventId) {
        window.__pendingEditEventId = null;
        BaseRenamForm({
          id: currentEvent.id,
          Name: currentEvent.Name,
          Tasks: currentEvent.Tasks,
        });
        setIsError(false);
        setRenam();
      }
    };

    window.addEventListener("editEvent", handleEditEvent);
    return () => window.removeEventListener("editEvent", handleEditEvent);
  }, [eventId, currentEvent, BaseRenamForm, setRenam]);

  if (!currentEvent) {
    return null;
  }
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setEventsAndTasks((prev) => {
      const remaining = prev.filter((event) => event.id != eventId);
      const isCurrentEvent = location.pathname === `/events/${eventId}`;

      if (isCurrentEvent) {
        if (remaining.length > 0) {
          navigate(`/events/${remaining[0].id}`);
        } else {
          navigate(`/events`);
        }
      }
      return remaining;
    });
  };
  const handleEditClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    BaseRenamForm({
      id: currentEvent.id,
      Name: currentEvent.Name,
      Tasks: currentEvent.Tasks,
    });
    setIsError(false);
    setRenam();
  };
  const handleRenamClick = () => {
    const trimForm = {
      ...currentEvent,
      Name: renamForm.Name.trim(),
    };

    if (!trimForm.Name) {
      setIsError(true);
      triggerShake();
    } else {
      setIsError(false);
      setEventsAndTasks((prev) =>
        prev.map((event) => (event.id == eventId ? trimForm : event)),
      );
      setRenam();
      resetRenamForm();
    }
  };

  return (
    <>
      {rename ? (
        <>
          <motion.div
            key={shakeKey}
            animate={isError ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.35 }}
            className="pl-2 py-[3px] flex items-center w-full gap-1.5"
          >
            <img className="h-[18px]  " src={Task} alt="Add Icon" />
            <input
              autoFocus
              value={renamForm.Name}
              onChange={(e) => {
                setRenamForm(e);
                if (isError) setIsError(false);
              }}
              name="Name"
              className=" text-white text-[18px] w-full font-normal font-poppins focus:outline-0 focus:bg-[#100c0c]  "
              placeholder="Enter event name"
            />
            <button
              onClick={handleRenamClick}
              className="hover:bg-[#321b1b] hover:outline-3 hover:outline-[#321b1b]   rounded-sm  cursor-pointer "
            >
              <img className=" rotate-90" src={Arrow} alt="Add Icon" />
            </button>
          </motion.div>
          {isError && (
            <p className="text-sm pl-6 font-base w-full font-poppins text-[#fe0011cc]">
              Fields must not be empty
            </p>
          )}
        </>
      ) : (
        <Link to={`/events/${eventId}`} className="w-full ">
          <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="hover:bg-[#2F090B]  w-full rounded-lg cursor-pointer flex justify-between "
          >
            <div className=" px-2 py-[3px] flex items-center w-full gap-2 ">
              <img src={TaskIcon} alt="Task" className=" h-[15px]  " />
              <p className=" text-white text-[18px] w-42 whitespace-nowrap text-ellipsis font-normal font-poppins overflow-hidden ">
                {Title}
              </p>
            </div>

            {isHovered && (
              <div className=" flex items-center gap-0.5 pr-1 ">
                <button
                  onClick={handleEditClick}
                  className=" p-0.5 rounded-sm hover:bg-[#5b2f2f] opacity-30 "
                >
                  <img src={Edit} alt="Edite Icon" className="w-4.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(e);
                  }}
                  className=" p-0.5 rounded-sm hover:bg-[#5b2f2f] opacity-30 "
                >
                  <img src={Delete} alt="Delete Icon" className="w-4.5" />
                </button>
              </div>
            )}
          </motion.div>
        </Link>
      )}
    </>
  );
}
