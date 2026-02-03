import Button from "./Button";
import Delete from "../assets/delete.svg";
import Rename from "../assets/Rename.svg";
import Right from "../assets/Right.svg";
import List3 from "../assets/List3.svg";
import PriorityTeller from "./PriorityTeller";
import Eye from "../assets/eye.svg";
import Pin1 from "../assets/pin1.svg";
import ViewTaskNotesModal from "./modals/ViewTaskNotesModal";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEventsAndTasks } from "../Contexts/EventsContex";

export default function TaskCard({
  Priority = "Priority",
  TaskName = "",
  Notes = "",
  id,
}) {
  const Buttons = [
    {
      icon: Delete,
      label: "Delete",
      bg: "bg-[#D7303A]",
      hover: "hover:bg-[#b32530]",
    },
    {
      icon: Rename,
      label: "Edite",
      bg: "bg-[#308CD7]",
      hover: "hover:bg-[#2577b8]",
    },
    {
      icon: Right,
      label: "Complete",
      bg: "bg-[#1E9E5F]",
      hover: "hover:bg-[#198a52]",
    },
  ];

  const Pr = {
    Urgent: {
      label: "Urgent",
      bg: "bg-[#FF8F8F]",
      border: "border-[#FF0A0A]",
      text: "text-[#FF0A0A]",
    },
    NotUrgent: {
      label: "Not Urgent",
      bg: "bg-[#FFD1A3]",
      border: "border-[#FF740A]",
      text: "text-[#FF740A]",
    },
    CanWait: {
      label: "Can Wait",
      bg: "bg-[#C8E6C9]",
      border: "border-[#0EB74C]",
      text: "text-[#0EB74C]",
    },
  }[Priority];

  const navigate = useNavigate();
  const location = useLocation();
  const { eventId } = useParams();
  const { setEventsAndTasks } = useEventsAndTasks();

  // State for the notes modal
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);

  const handleEditClick = () => {
    navigate(`/events/${eventId}/task/${id} `, {
      state: { bgLocation: location },
    });
  };

  const handleSeeAllNotesClick = () => {
    setIsNotesModalOpen(true);
  };

  const handleCloseNotesModal = () => {
    setIsNotesModalOpen(false);
  };
  const handleDeleteClick = (taskId) => {
    setEventsAndTasks((prev) => {
      return prev.map((event) => {
        if (event.id != eventId) {
          return event;
        }

        return {
          ...event,
          Tasks: event.Tasks.filter((task) => task.id != taskId),
        };
      });
    });
  };

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -2 }}
      className="w-full min-h-max gap-3 rounded-[16px] sm:rounded-[20px] py-4 sm:py-5.5 px-4 sm:px-[18px] bg-white flex items-end flex-col shadow-[0_0_6px_3px_rgba(0,0,0,0.08)]"
    >
      <div className=" flex w-full justify-between items-start gap-5">
        <div className="flex gap-3 items-start h-17">
          <img src={List3} alt="List Icon" className="w-5 sm:w-6 mt-2" />
          <p className="text-black font-poppins text-lg sm:text-xl lg:text-[24px] font-semibold line-clamp-2 text-ellipsis">
            {TaskName}
          </p>
        </div>
        <PriorityTeller
          bg={Pr.bg}
          label={Pr.label}
          border={Pr.border}
          text={Pr.text}
        />
      </div>

      <div className=" w-full flex pt-[5px] flex-col items-start gap-1.5 ">
        <div className="flex gap-1 text-[#D7303A] font-poppins text-[10px] sm:text-xs font-medium">
          <img src={Pin1} alt="Pin Icon" className="w-[12px] sm:w-[13px]" />
          Notes :
        </div>

        <p className="text-black font-poppins text-[10px] sm:text-xs font-normal min-h-[2.5rem] px-1.5 w-full line-clamp-3">
          {Notes}
        </p>
      </div>

      <button
        onClick={handleSeeAllNotesClick}
        className="pb-[5px] flex gap-[6px] items-center font-poppins text-black font-medium text-[10px] sm:text-xs hover:text-[#D7303A] transition-colors cursor-pointer"
      >
        <img src={Eye} alt="Eye Icon" className="w-[12px] sm:w-[14px]" /> See
        All Notes
      </button>
      <div className=" flex justify-between gap-2 w-full items-center  ">
        <div className=" flex items-center gap-[6px] ">
          <Button
            onClick={() => handleDeleteClick(id)}
            icon={Buttons[0].icon}
            label={Buttons[0].label}
            bg={Buttons[0].bg}
            hover={Buttons[0].hover}
          />
          <Button
            onClick={handleEditClick}
            icon={Buttons[1].icon}
            label={Buttons[1].label}
            bg={Buttons[1].bg}
            hover={Buttons[1].hover}
          />
        </div>
        <Button
          onClick={() => handleDeleteClick(id)}
          icon={Buttons[2].icon}
          label={Buttons[2].label}
          bg={Buttons[2].bg}
          hover={Buttons[2].hover}
        />
      </div>

      <ViewTaskNotesModal
        isOpen={isNotesModalOpen}
        onClose={handleCloseNotesModal}
        TaskName={TaskName}
        Notes={Notes}
        Priority={Priority}
      />
    </motion.div>
  );
}
