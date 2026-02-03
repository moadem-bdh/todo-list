import { useLocation, useNavigate, useParams } from "react-router";
import Add from "../assets/Add.svg";
import Filter from "../assets/filter.svg";
import DropDown from "./DropDown";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function FilterAndAdd({ onChange, value }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId } = useParams();

  return (
    <div className="flex w-full md:w-full flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 overflow-visible">
      <div className="flex gap-[10px] items-center w-full sm:w-auto justify-center sm:justify-start">
        <img src={Filter} alt="Filter Icon " className="w-[18px] sm:w-[20px]" />

        <DropDown FirstLabel="All Tasks" value={value} onChange={onChange} />
      </div>

      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        onClick={() =>
          navigate(`/events/${eventId}/task/new`, {
            state: { bgLocation: location },
          })
        }
        className="flex items-center justify-center  sm:justify-start gap-4 md:gap-2.5 w-full sm:w-auto min-w-max hover:outline-1 hover:bg-[#FFF0F0] hover:outline-[#FF8F8F] pt-[5px] pb-[4px] px-2.5 rounded-lg cursor-pointer"
      >
        <p className="font-poppins text-[#d7303acc] ml-8 md:ml-0 text-base sm:text-[20px] min-w-max">
          Add Task
        </p>
        <motion.img
          whileHover={{ rotate: 90, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          src={Add}
          alt="Add Icon"
          className="w-[24px] sm:w-[30px] opacity-80"
        />
      </motion.button>
    </div>
  );
}
