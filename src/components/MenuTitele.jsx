import List from "../assets/List.svg";
import { Link } from "react-router";

export default function MenuTitele() {
  return (
    <div className="  flex w-full justify-between items-center">
      <Link
        to="/"
        className="text-white pl-2 font-poppins text-[32px] font-bold hover:text-[#d7303acc] transition-colors duration-200"
      >
        Menu
      </Link>
      <img src={List} alt="List Icon" className=" w-[26px]  " />
    </div>
  );
}
