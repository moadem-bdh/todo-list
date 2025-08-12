import MenuTitele from "../components/MenuTitele";
import StickyWalls from "../components/StickyWalls";
import Events from "../components/Events";
import Reminder from "../components/Reminder";

export default function SideBare() {
  return (
    <nav className=" w-[300px] fixed top-0 left0 min-h-max h-screen bg-[#0C0E0B] py-[13px] flex-col items-center justify-between flex">
      <div className=" flex flex-col items-center gap-[15px] ">
        <div className=" gap-5 flex flex-col w-full px-4 justify-between items-center ">
          <MenuTitele />
          <hr  className=" w-[280px] border-1 border-white rounded " />
        </div>
        <Events />
        <StickyWalls />
      </div>
      <Reminder />
    </nav>
  );
}
