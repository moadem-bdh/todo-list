import Close from "../../assets/close.svg";
import List3 from "../../assets/List3.svg";
import Pin1 from "../../assets/pin1.svg";
import PriorityTeller from "../PriorityTeller";
import { createPortal } from "react-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function ViewTaskNotesModal({
  isOpen,
  onClose,
  TaskName = "",
  Notes = "",
  Priority = "Priority",
}) {
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

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 h-screen w-screen flex items-center justify-center bg-black/40 p-4"
        >
          <motion.div
            initial={{ y: 24, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 24, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
            className="bg-white rounded-[20px] w-full sm:w-[85%] md:w-2/5 md:min-w-[500px] max-w-[600px] mx-auto p-4 sm:p-6 shadow-lg max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold font-poppins text-[#D7303A]">
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
            <div className="w-full min-h-max gap-[10px] rounded-[20px] py-4 sm:py-5 px-3 sm:px-[18px] bg-gray-50 flex items-end flex-col shadow-[0_0_6px_3px_rgba(0,0,0,0.08)]">
              {/* Task Header */}
              <div className="flex w-full justify-between items-start gap-2 sm:gap-5">
                <div className="flex gap-2 sm:gap-3 items-start h-17">
                  <img
                    src={List3}
                    alt="List Icon"
                    className="w-5 sm:w-6 mt-2"
                  />
                  <p className="text-black font-poppins text-lg sm:text-[24px] font-semibold">
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
            <div className="flex justify-end gap-3 mt-4 sm:mt-6">
              <button
                onClick={onClose}
                className="px-4 sm:px-6 py-2 rounded-xl bg-white border-2 border-[#D7303A]  text-[#D7303A] font-semibold font-poppins hover:bg-[#FFF0F0] transition-colors text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
