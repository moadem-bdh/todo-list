import { useParams } from "react-router";
import StickyWall from "../components/StickyWall";
import { useStickyWalls } from "../Contexts/StickyWallContext";
import AddstickyNote from "./AddStickyNote";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

export default function StickyWallNotes() {
  const { stickyWalls } = useStickyWalls();
  const { stickyId } = useParams();
  const currentNotes = stickyWalls.find((sticky) => sticky.id == stickyId);

  return (
    <section className="w-full grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(310px,1fr))] gap-x-4 gap-y-6 sm:gap-y-8 items-start">
      {currentNotes?.notes && currentNotes.notes.length > 0 ? (
        <>
          <AnimatePresence initial={false}>
            {currentNotes.notes.map((note, index) => (
              <StickyWall
                key={note.id}
                NoteName={note.title}
                NoteContent={note.details}
                id={note.id}
                bgColor={note.bgColor}
                rotation={index}
              />
            ))}
          </AnimatePresence>
          <AddstickyNote />
        </>
      ) : (
        <AddstickyNote />
      )}
    </section>
  );
}
