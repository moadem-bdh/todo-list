import { useParams } from "react-router";
import Close from "../assets/close.svg";
import { useStickyWalls } from "../Contexts/StickyWallContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function StickyWall({
  NoteName = "Note Name",
  NoteContent = "",
  bgColor = "bg-[#98A7FD]",
  id,
}) {
  const { setStickyWalls } = useStickyWalls();
  const { stickyId } = useParams();

  const handleDeleteClick = (noteId) => {
    setStickyWalls((prev) => {
      return prev.map((sticky) => {
        if (sticky.id != stickyId) {
          return sticky;
        }

        const newNotes = sticky.notes.filter((note) => note.id != noteId);
        return { ...sticky, notes: newNotes };
      });
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      className={` flex w-full min-h-42 px-5 pt-5 pb-12 flex-col items-center gap-[10px] rounded-1 ${bgColor} shadow-[0_0_6px_3px_rgba(0,0,0,0.08)] `}
    >
      <div className=" flex w-full justify-between items-center font-poppins text-2xl font-semibold text-black  ">
        {NoteName}

        <button
          onClick={() => handleDeleteClick(id)}
          className="cursor-pointer rounded-2xl hover:bg-[#61616126] "
        >
          <img src={Close} alt="Close Icon" className=" w-8 " />
        </button>
      </div>

      <p className=" text-black w-full font-poppins text-xs font-normal  ">
        {NoteContent}
      </p>
    </motion.div>
  );
}
