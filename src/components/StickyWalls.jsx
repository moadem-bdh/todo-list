import { useState, useEffect, useRef } from "react";
import { useStickyWalls } from "../Contexts/StickyWallContext";
import MenuTiteles from "./MenuTiteles";
import StickyOption from "./StickyOption";
import { useForm } from "../CustomHooks/useForm";
import Arrow from "../assets/arrow.svg";
import StickyIcon from "../assets/Sticky.svg";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

export default function StickyWalls() {
  const { stickyWalls, setStickyWalls } = useStickyWalls();
  const [isAdding, setIsAdding] = useState(false);
  const [isError, setIsError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const triggerShake = () => setShakeKey((prev) => prev + 1);
  const inputRef = useRef(null);
  const [newSticky, setNewSticky, resetNewSticky] = useForm({
    stickyName: "",
    id: "0",
    notes: [],
    time: "",
    location: "",
  });

  useEffect(() => {
    const handleOpenAddStickyWall = () => {
      setIsAdding(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    };

    if (window.__pendingOpenAddStickyWall) {
      window.__pendingOpenAddStickyWall = false;
      handleOpenAddStickyWall();
    }

    window.addEventListener("openAddStickyWall", handleOpenAddStickyWall);
    return () =>
      window.removeEventListener("openAddStickyWall", handleOpenAddStickyWall);
  }, []);

  const handleAddclick = () => {
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
    const trimForm = {
      ...newSticky,
      stickyName: newSticky.stickyName.trim(),
      id: crypto.randomUUID(),
      time: newSticky.time || systemTime,
      location: newSticky.location || systemLocation,
    };
    if (!trimForm.stickyName) {
      setIsError(true);
      triggerShake();
    } else {
      setIsError(false);
      setStickyWalls((prev) => [...prev, trimForm]);
      setIsAdding(false);
      resetNewSticky();
    }
  };

  return (
    <div className=" flex w-[300px] px-5 flex-col gap-[6px] items-center justify-start ">
      <MenuTiteles
        titele="sticky walls"
        onClick={() => {
          setIsAdding((prev) => !prev);
          setIsError(false);
          resetNewSticky();
        }}
      />
      <div className=" flex flex-col w-[260px] items-center justify-start gap-1 h-[182px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-amber-50 pr-2 overflow-auto [scrollbar-gutter:stable] ">
        {isAdding && (
          <>
            <motion.div
              key={shakeKey}
              animate={isError ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.35 }}
              className="pl-2 py-[3px] flex items-center w-full gap-1.5"
            >
              <img className="h-[18px]  " src={StickyIcon} alt="Sticky Icon" />
              <input
                ref={inputRef}
                autoFocus
                name="stickyName"
                value={newSticky.stickyName}
                onChange={(e) => {
                  setNewSticky(e);
                  if (isError) setIsError(false);
                }}
                className=" text-white text-[18px] w-full font-normal font-poppins focus:outline-0 focus:bg-[#100c0c]  "
                placeholder="Enter sticky name"
              />
              <button
                onClick={handleAddclick}
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
        )}

        <AnimatePresence mode="popLayout">
          {stickyWalls.map((sticky) => (
            <motion.div
              layout
              key={sticky.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="w-full"
            >
              <StickyOption Title={sticky.stickyName} stickyId={sticky.id} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
