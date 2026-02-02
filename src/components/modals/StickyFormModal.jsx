import Close from "../../assets/close.svg";
import ArrWBlack from "../../assets/arrowBlack.svg";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { useForm } from "../../CustomHooks/useForm";
import { useStickyWalls } from "../../Contexts/StickyWallContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
export default function StickyFormModal() {
  const colors = [
    { bg: "bg-[#98A7FD]", id: 1 },
    { bg: "bg-[#AAFFBA]", id: 2 },
    { bg: "bg-[#D1EAED]", id: 3 },
    { bg: "bg-[#FDF2B3]", id: 4 },
    { bg: "bg-[#FFB1B3]", id: 5 },
    { bg: "bg-[#FFC2EC]", id: 6 },
    { bg: "bg-[#FFD4A9]", id: 7 },
    { bg: "bg-[#FFDADA]", id: 8 },
  ];
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState({ bg: "bg-[#98A7FD]", id: 1 });
  const [isError, setIsError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const triggerShake = () => setShakeKey((prev) => prev + 1);
  const { stickyId } = useParams();
  const handleColorClick = (id) => {
    setBgColor(() => colors.find((color) => color.id == id));
  };
  const { setStickyWalls } = useStickyWalls();
  const [newNote, setNewNote] = useForm({
    title: "",
    details: "",
    id: "0",
    bgColor: "bg-[#98A7FD]",
  });

  const handleAddNoteClick = () => {
    const trimNote = {
      ...newNote,
      title: newNote.title.trim(),
      details: newNote.details.trim(),
      id: crypto.randomUUID(),
      bgColor: bgColor.bg,
    };
    if (!trimNote.title || !trimNote.details) {
      setIsError(true);
      triggerShake();
    } else {
      setStickyWalls((prev) => {
        return prev.map((note) => {
          if (note.id != stickyId) {
            return note;
          }

          return { ...note, notes: [...note.notes, trimNote] };
        });
      });
      navigate(-1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className=" min-h-max fixed inset-0 z-50 h-full flex items-center justify-center bg-black/40 transition-colors duration-75 ease-in-out "
    >
      <motion.div
        initial={{ y: 24, scale: 0.98, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 24, scale: 0.98, opacity: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
        className={`flex flex-col my-8 min-w-0 w-[95%] sm:w-[85%] md:w-2/5 sm:min-w-120 max-w-95/100 gap-10 ${bgColor.bg}`}
      >
        {/* Colors  */}
        <div className=" flex ">
          {colors.map((bgSelect) => (
            <button
              onClick={() => handleColorClick(bgSelect.id)}
              className={`flex-1 h-10  ${
                bgSelect.id == bgColor.id ? "" : "border-b-[1.60px]"
              } ${bgSelect.bg} ${
                bgSelect.id == 1 ? "" : "border-l-[1.60px]"
              } transition-all duration-75 cursor-pointer ease-in-out `}
              key={bgSelect.id}
            ></button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={shakeKey}
          animate={isError ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.35 }}
          className="   flex flex-col items-center justify-between w-full h-95 px-4 sm:px-10 pb-10"
        >
          {isError && (
            <p className="text-red-600 font-poppins text-sm font-medium mb-2">
              Fields must not be empty
            </p>
          )}
          <div className=" justify-between flex  w-full items-start ">
            <textarea
              autoFocus
              name="title"
              onChange={(e) => {
                setNewNote(e);
                if (isError) setIsError(false);
              }}
              value={newNote.title}
              type="text"
              className="resize-none min-h-max font-poppins text-[40px] font-semibold max-w-2/3 h-[100px] scrollbar-thin focus:outline-0 scrollbar-thumb-[#98A7FD] scrollbar-track-[#98A7FD] "
              placeholder="Task Name"
            />
            <button
              className=" hover:bg-[#00000030] rounded-4xl p-0.5 cursor-pointer  "
              onClick={() => navigate(-1)}
            >
              <img src={Close} alt="Close Icon" className=" w-[38px] " />
            </button>
          </div>

          <textarea
            name="details"
            onChange={(e) => {
              setNewNote(e);
              if (isError) setIsError(false);
            }}
            value={newNote.details}
            className=" resize-none min-h-[120px] w-full font-poppins text-[20px] focus:outline-0 scrollbar-thin scrollbar-thumb-[#98A7FD] scrollbar-track-[#98A7FD] "
            placeholder="Write your notes here"
          />

          <button
            onClick={handleAddNoteClick}
            className="flex cursor-pointer rounded-2xl flex-col w-max p-2 items-center gap-2 font-poppins text-4xl font-semibold mt-2 text-[#000000b8] hover:text-black hover:translate-y-2 transition-all duration-400 ease-in-out   "
          >
            Stick
            <img src={ArrWBlack} alt="Arrow Icon" />
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
