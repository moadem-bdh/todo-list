import StickyBlack from "../assets/StickyBlack.svg";
import Clock from "../assets/Clock.svg";




export default function StickyBigTitele({
  sticky = "Sticky Name",
  time = "27/05/2025",
  location = "Algiers, Algeria",
}) {
  return (
    <section className=" flex flex-col items-start w-full  gap-[18px]">



      <div className="   w-full flex flex-col items-center gap-[-10px] ">
        <div className=" flex w-full  gap-3 items-center ">
          <img src={StickyBlack} alt="List Icon" />
          <hr className=" border-3 rounded h-7 " />

          <h6 className=" text-[#0C0E0B] font-poppins line-clamp-2 text-ellipsis text-[48px] font-semibold overflow-hidden max-w-full ">
            {sticky}
          </h6>
        </div>
        <div className=" flex gap-2 items-center w-full pl-14 ">
          <img src={Clock} alt="Clock Icon" className=" w-[24px] " />
          <p className=" text-[#0C0E0B] text-base  ">{time}</p>
          <p className=" text-[#0C0E0B] text-base  ">{location}</p>
        </div>
      </div>

      <hr className=" w-full border-3 rounded border-[#D7303A] " />
    </section>
  );
}
