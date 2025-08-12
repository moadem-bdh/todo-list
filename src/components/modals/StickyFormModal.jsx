import Close from "../../assets/close.svg";
import ArrWBlack from "../../assets/arrowBlack.svg";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { useForm } from "../../CustomHooks/useForm";
import { useStickyWalls } from "../../Contexts/StickyWallContext";
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
  const {stickyId} = useParams()
  const handleColorClick = (id) => {
    setBgColor(() => colors.find((color) => color.id == id));
  };
const {setStickyWalls} = useStickyWalls()
  const [newNote, setNewNote] = useForm({
    title: "",
    details: "",
    id: "0",
    bgColor : "bg-[#98A7FD]"
  });

  const handleAddNoteClick = () => {
    const trimNote = {
      ...newNote,
      title: newNote.title.trim(),
      details: newNote.details.trim(),
      id: crypto.randomUUID(),
      bgColor : bgColor.bg
    };
    if (!trimNote.title || !trimNote.details) {
      setIsError(true);
    }else{

setStickyWalls((prev)=>{
 return prev.map((note)=>{
if(note.id != stickyId ){return note}

return {...note , notes : [...note.notes ,trimNote  ]}


})

})
navigate(-1)

    }
  };

  return (
    <div className=" min-h-max fixed inset-0 z-50 h-full flex items-center justify-center bg-black/40 transition-colors duration-75 ease-in-out ">
      <div
        className={`flex flex-col my-8 min-w-120 w-2/5 max-w-95/100  gap-10  ${bgColor.bg}`}
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
        <div className="   flex flex-col items-center justify-between w-full h-95 px-10 pb-10">
          <div className=" justify-between flex  w-full items-start ">
            <textarea
              autoFocus
              name="title"
              onChange={setNewNote}
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
            onChange={setNewNote}
            value={newNote.details}
            className=" resize-none min-h-[120px] w-full font-poppins text-[20px] focus:outline-0 scrollbar-thin scrollbar-thumb-[#98A7FD] scrollbar-track-[#98A7FD] "
            placeholder="Write your notes here"
          />

          {/* Error Message */}
          <div className="h-6 w-full">
            {isError && (
              <p className="text-sm text-red-600 font-semibold font-poppins text-center">
                All fields must be filled
              </p>
            )}
          </div>

          <button onClick={handleAddNoteClick} className="flex cursor-pointer rounded-2xl flex-col w-max p-2 items-center gap-2 font-poppins text-4xl font-semibold mt-2 text-[#000000b8] hover:text-black hover:translate-y-2 transition-all duration-400 ease-in-out   ">
            Stick
            <img src={ArrWBlack} alt="Arrow Icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
