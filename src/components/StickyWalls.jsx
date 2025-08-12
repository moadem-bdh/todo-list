import { useState } from "react";
import { useStickyWalls } from "../Contexts/StickyWallContext";
import { useToggle } from "../CustomHooks/useToggle";
import MenuTiteles from "./MenuTiteles";
import StickyOption from "./StickyOption";
import { useForm } from "../CustomHooks/useForm";
import Arrow from "../assets/arrow.svg";
import StickyIcon from "../assets/Sticky.svg";

export default function StickyWalls() {
  const { stickyWalls, setStickyWalls } = useStickyWalls();
  const [isAdding, setIsAdding] = useToggle();
  const [isError, setIsError] = useState(false);
  const [newSticky, setNewSticky, resetNewSticky] = useForm({
    stickyName: "",
    id: "0",
    notes: [],
  });

  const handleAddclick = () => {
    const trimForm = {
      ...newSticky,
      stickyName: newSticky.stickyName.trim(),
      id: crypto.randomUUID(),
    };
    if (!trimForm.stickyName) {
      setIsError(true);
    } else {
      setIsError(false);
      setStickyWalls((prev) => [...prev, trimForm]);
      setIsAdding();
      resetNewSticky();
    }
  };

  return (
    <div className=" flex w-[300px] px-5 flex-col gap-[6px] items-center justify-start ">
      <MenuTiteles
        titele="sticky walls"
        onClick={() => {
          setIsAdding();
          setIsError(false);
          resetNewSticky();
        }}
      />
      <div className=" flex flex-col w-[260px] items-center justify-start gap-1 min-h-[48px] max-h-[182px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-amber-50 pr-2 overflow-auto ">
        {isAdding && (
          <>
            <div className=" pl-2  py-[3px] flex items-center w-full gap-1.5 ">
              <img className="h-[18px]  " src={StickyIcon} alt="Sticky Icon" />
              <input
                autoFocus
                name="stickyName"
                value={newSticky.stickyName}
                onChange={setNewSticky}
                className=" text-white text-[18px] w-full font-normal font-poppins focus:outline-0 focus:bg-[#100c0c]  "
                placeholder="Enter sticky name"
              />
              <button
                onClick={handleAddclick}
                className="hover:bg-[#321b1b] hover:outline-3 hover:outline-[#321b1b]   rounded-sm  cursor-pointer "
              >
                <img className=" rotate-90" src={Arrow} alt="Add Icon" />
              </button>
            </div>
            {isError && (
              <p className="text-sm pl-6 font-base w-full font-poppins text-[#fe0011cc]">
                Sticky name must be filled
              </p>
            )}
          </>
        )}

        {stickyWalls.map((sticky) => (
          <StickyOption
            key={sticky.id}
            Title={sticky.stickyName}
            stickyId={sticky.id}
          />
        ))}
      </div>
    </div>
  );
}
