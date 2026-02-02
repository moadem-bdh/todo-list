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
  rotation = 0,
}) {
  const { setStickyWalls } = useStickyWalls();
  const { stickyId } = useParams();

  const rotations = [-0.5, 0.3, -0.3, 0.5, -0.4];
  const rotationDegree = rotations[rotation % rotations.length];

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
      layout="position"
      initial={{ opacity: 0, y: 18, scale: 0.98, rotate: rotationDegree }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: rotationDegree }}
      exit={{ opacity: 0, y: 10, scale: 0.98, rotate: rotationDegree }}
      whileHover={{
        scale: 1.02,
        rotate: 0,
        boxShadow: "8px 8px 20px rgba(0,0,0,0.25)",
      }}
      transition={{ duration: 0.2, layout: { duration: 0.3 } }}
      className={`flex w-full min-h-32 sm:min-h-42 px-4 sm:px-5 pt-4 sm:pt-5 pb-8 sm:pb-12 flex-col items-center gap-[10px] rounded-1 ${bgColor} shadow-[4px_4px_12px_rgba(0,0,0,0.15)]`}
    >
      <div className="flex w-full justify-between items-center font-poppins text-lg sm:text-2xl font-semibold text-black">
        {NoteName}

        <button
          onClick={() => handleDeleteClick(id)}
          className="cursor-pointer rounded-2xl hover:bg-[#61616126]"
        >
          <img src={Close} alt="Close Icon" className="w-6 sm:w-8" />
        </button>
      </div>

      <p className="text-black w-full font-poppins text-[10px] sm:text-xs font-normal">
        {NoteContent}
      </p>
    </motion.div>
  );
}
