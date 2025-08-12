import { Link, useLocation, useNavigate } from "react-router";
import StickyIcon from "../assets/Sticky.svg";
import Delete from "../assets/delete.svg";
import Edit from "../assets/Rename.svg";
import { useState } from "react";
import { useStickyWalls } from "../Contexts/StickyWallContext";
import { useToggle } from "../CustomHooks/useToggle";
import Arrow from "../assets/arrow.svg";
import { useForm } from "../CustomHooks/useForm";

export default function EventOption({ Title = "Sticky Name", stickyId }) {
  const [isHovered, setIsHovered] = useState(false);
  const { setStickyWalls, stickyWalls } = useStickyWalls();
  const [isRenam, setIsRenam] = useToggle();
  const location = useLocation();
  const navigate = useNavigate();
  const isFound = location.pathname.includes(String(stickyId));
  const [isError, setIsError] = useState(false);
  const currentStickyWall = stickyWalls.find((sticky) => sticky.id == stickyId)
  const [
    
    renamedSticky,
    setRenamedSticky,
    resetRenamedSticky,
  ] = useForm({
    stickyName: currentStickyWall.stickyName,
    id: currentStickyWall.id,
    notes: currentStickyWall.notes,
  });
  
  const handelDeleteClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setStickyWalls((prev) => {
      const AfterDeletedSticky = prev.filter((sticky) => sticky.id != id);
      const isNotUndefined = AfterDeletedSticky[0]?.id
      isFound && navigate(`/sticky-wall/${isNotUndefined}`);
      !isNotUndefined && navigate(`/`);
      return AfterDeletedSticky;
    });
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRenam();
  
  };

  const handleRenamClick = () => {
    const trimSticky = {
      ...renamedSticky,
      stickyName: renamedSticky.stickyName.trim(),
    };

    if (!trimSticky.stickyName) {
      setIsError(true);
    } else {
      setIsError(false);
      setStickyWalls((prev) =>
        prev.map((sticky) => (sticky.id == stickyId ? trimSticky : sticky))
      );
      resetRenamedSticky();
      setIsRenam();
    }
  };

  return (
    <>
      {isRenam ? (
        <>
          <div className=" pl-2  py-[3px] flex items-center w-full gap-1.5 ">
            <img className="h-[18px]  " src={StickyIcon} alt="Sticky Icon" />
            <input
              autoFocus
              value={renamedSticky.stickyName}
              onChange={setRenamedSticky}
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
          </div>
          {isError && (
            <p className="text-sm pl-6 font-base w-full font-poppins text-[#fe0011cc]">
              Event name must be filled
            </p>
          )}
        </>
      ) : (
        <Link to={`/sticky-wall/${stickyId}`} className="w-full">
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
                  onClick={(e) => handelDeleteClick(e, stickyId)}
                  className=" p-0.5 rounded-sm hover:bg-[#5b2f2f] opacity-30 "
                >
                  <img src={Delete} alt="Delete Icon" className="w-4.5" />
                </button>
              </div>
            )}
          </div>
        </Link>
      )}
    </>
  );
}
