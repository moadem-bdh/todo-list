import { Link, useLocation, useNavigate } from "react-router";
import StickyIcon from "../assets/Sticky.svg";
import Delete from "../assets/delete.svg";
import Edit from "../assets/Rename.svg";
import { useState, useEffect } from "react";
import { useStickyWalls } from "../Contexts/StickyWallContext";
import { useToggle } from "../CustomHooks/useToggle";
import Arrow from "../assets/arrow.svg";
import { useForm } from "../CustomHooks/useForm";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function EventOption({ Title = "Sticky Name", stickyId }) {
  const [isHovered, setIsHovered] = useState(false);
  const { setStickyWalls, stickyWalls } = useStickyWalls();
  const [isRenam, setIsRenam] = useToggle();
  const location = useLocation();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const triggerShake = () => setShakeKey((prev) => prev + 1);
  const currentStickyWall = stickyWalls.find((sticky) => sticky.id == stickyId);
  const safeStickyWall = currentStickyWall ?? {
    id: stickyId,
    stickyName: Title,
    notes: [],
  };
  const [
    renamedSticky,
    setRenamedSticky,
    resetRenamedSticky,
    baseRenamedSticky,
  ] = useForm({
    stickyName: safeStickyWall.stickyName,
    id: safeStickyWall.id,
    notes: safeStickyWall.notes,
  });

  useEffect(() => {
    const handleEditSticky = () => {
      if (window.__pendingEditStickyId === stickyId) {
        window.__pendingEditStickyId = null;
        baseRenamedSticky({
          stickyName: currentStickyWall.stickyName,
          id: currentStickyWall.id,
          notes: currentStickyWall.notes,
        });
        setIsError(false);
        setIsRenam();
      }
    };

    window.addEventListener("editSticky", handleEditSticky);
    return () => window.removeEventListener("editSticky", handleEditSticky);
  }, [stickyId, currentStickyWall, baseRenamedSticky, setIsRenam]);

  if (!currentStickyWall) {
    return null;
  }

  const handelDeleteClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setStickyWalls((prev) => {
      const AfterDeletedSticky = prev.filter((sticky) => sticky.id != id);
      const isCurrentWall = location.pathname === `/sticky-wall/${stickyId}`;

      if (isCurrentWall) {
        if (AfterDeletedSticky.length > 0) {
          navigate(`/sticky-wall/${AfterDeletedSticky[0].id}`);
        } else {
          navigate(`/sticky-wall`);
        }
      }
      return AfterDeletedSticky;
    });
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    baseRenamedSticky({
      stickyName: currentStickyWall.stickyName,
      id: currentStickyWall.id,
      notes: currentStickyWall.notes,
    });
    setIsError(false);
    setIsRenam();
  };

  const handleRenamClick = () => {
    const trimSticky = {
      ...currentStickyWall,
      stickyName: renamedSticky.stickyName.trim(),
    };

    if (!trimSticky.stickyName) {
      setIsError(true);
      triggerShake();
    } else {
      setIsError(false);
      setStickyWalls((prev) =>
        prev.map((sticky) => (sticky.id == stickyId ? trimSticky : sticky)),
      );
      resetRenamedSticky();
      setIsRenam();
    }
  };

  return (
    <>
      {isRenam ? (
        <>
          <motion.div
            key={shakeKey}
            animate={isError ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.35 }}
            className="pl-2 py-[3px] flex items-center w-full gap-1.5"
          >
            <img className="h-[18px]  " src={StickyIcon} alt="Sticky Icon" />
            <input
              autoFocus
              value={renamedSticky.stickyName}
              onChange={(e) => {
                setRenamedSticky(e);
                if (isError) setIsError(false);
              }}
              name="stickyName"
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
        <Link to={`/sticky-wall/${stickyId}`} className="w-full">
          <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="hover:bg-[#2F090B]  w-full rounded-lg cursor-pointer flex justify-between "
          >
            <div className=" px-2 py-[3px] flex items-center w-full gap-2 ">
              <img src={StickyIcon} alt="Sticky Icon" className=" h-[15px]  " />
              <p className=" text-white text-[18px] w-42 whitespace-nowrap text-ellipsis font-normal font-poppins overflow-hidden ">
                {Title}
              </p>
            </div>

            {isHovered && (
              <div className=" flex items-center gap-0.5 pr-1 ">
                <button
                  onClick={(e) => handleEditClick(e)}
                  className=" p-0.5 rounded-sm hover:bg-[#5b2f2f] opacity-30 "
                >
                  <img src={Edit} alt="Edite Icon" className="w-4.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handelDeleteClick(e, stickyId);
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
