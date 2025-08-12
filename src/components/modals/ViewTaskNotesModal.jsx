import Close from "../../assets/close.svg";
import List3 from "../../assets/List3.svg";
import Pin1 from "../../assets/Pin1.svg";
import PriorityTeller from "../PriorityTeller";

export default function ViewTaskNotesModal({
  isOpen,
  onClose,
  TaskName = "",
  Notes = "",
  Priority = "Priority",
}) {
  if (!isOpen) return null;

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

  return (
    <div className="fixed min-h-max inset-0 z-50 h-screen flex items-center justify-center bg-black/40">
      <div className="bg-white my-8 rounded-[20px] w-2/5 min-w-120 max-w-95/100 p-6 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold font-poppins text-[#D7303A]">
            Task Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
          >
            <img src={Close} alt="Close" className="w-5 h-5" />
          </button>
        </div>

        {/* Task Card Content */}
        <div className="w-full min-h-max gap-[10px] rounded-[20px] py-5 px-[18px] bg-gray-50 flex items-end flex-col shadow-[0_0_6px_3px_rgba(0,0,0,0.08)]">
          {/* Task Header */}
          <div className="flex w-full justify-between items-start gap-5">
            <div className="flex gap-3 items-start h-17">
              <img src={List3} alt="List Icon" className="w-6 mt-2" />
              <p className="text-black font-poppins text-[24px] font-semibold">
                {TaskName}
              </p>
            </div>
            <PriorityTeller
              bg={Pr?.bg}
              label={Pr?.label}
              border={Pr?.border}
              text={Pr?.text}
            />
          </div>

          {/* Notes Section */}
          <div className="w-full flex pt-[5px] flex-col items-start gap-1.5">
            <div className="flex gap-1 text-[#D7303A] font-poppins text-xs font-medium">
              <img src={Pin1} alt="Pin Icon" className="w-[13px]" />
              Notes :
            </div>

            {/* Full Notes - No line clamp */}
            <div className="text-black font-poppins text-sm font-normal px-1.5 w-full scrollbar-thin bg-gray-50 rounded-lg p-3 min-h-[150px] max-h-[300px] overflow-y-auto ">
              {Notes || "No notes available for this task."}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-white border-2 border-[#D7303A]  text-[#D7303A] font-semibold font-poppins hover:bg-[#FFF0F0] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
