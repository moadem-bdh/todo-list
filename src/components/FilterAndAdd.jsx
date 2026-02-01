import { useLocation, useNavigate, useParams } from "react-router";
import Add from "../assets/Add.svg";
import Filter from "../assets/filter.svg";
import DropDown from "./DropDown";

export default function FilterAndAdd({ onChange, value }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId } = useParams();
  return (
    <div className=" flex w-2/3 justify-between items-center min-w-max gap-4 overflow-visible">
      <div className=" flex gap-[10px] ">
        <img src={Filter} alt="Filter Icon " className="w-[20px] " />

        <DropDown FirstLabel="All Tasks" value={value} onChange={onChange} />
      </div>

      <button
        onClick={() =>
          navigate(`/events/${eventId}/task/new`, {
            state: { bgLocation: location },
          })
        }
        className=" flex items-center gap-2.5 min-w-max hover:outline-1 hover:bg-[#FFF0F0] hover:outline-[#FF8F8F]   pt-[5px] pb-[4px] px-2.5 rounded-lg cursor-pointer"
      >
        <p className=" font-poppins text-[#d7303acc] text-[20px] min-w-max ">
          Add Task
        </p>
        <img src={Add} alt="Add Icon" className=" w-[30px] opacity-80 " />
      </button>
    </div>
  );
}
