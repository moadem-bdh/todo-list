import StickyBlack from "../assets/StickyBlack.svg";
import Clock from "../assets/Clock.svg";

export default function StickyBigTitele({
  sticky = "Sticky Walls",
  time = "Anyday, Today",
  location = "Anywhere You Are",
}) {
  const systemTime = new Date().toLocaleString();
  const { locale, timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const regionCode = new Intl.Locale(locale).region;
  const countryName = regionCode
    ? new Intl.DisplayNames([locale], { type: "region" }).of(regionCode)
    : "";
  const timeZoneRegion = timeZone?.split("/").pop()?.replaceAll("_", " ") ?? "";
  const systemLocation = [countryName, timeZoneRegion]
    .filter(Boolean)
    .join(", ");
  const displayTime = time || systemTime;
  const displayLocation = location || systemLocation;
  return (
    <section className="flex flex-col items-start w-full gap-4 sm:gap-[18px]">
      <div className="w-full flex flex-col items-center gap-[-10px]">
        <div className="flex w-full gap-3 items-center">
          <img src={StickyBlack} alt="List Icon" className="w-6 sm:w-7" />
          <hr className="border-3 rounded h-6 sm:h-7" />

          <h6 className="text-[#0C0E0B] font-poppins line-clamp-2 text-ellipsis text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-semibold overflow-hidden max-w-full">
            {sticky}
          </h6>
        </div>
        <div className="flex gap-2 items-center w-full pl-10 sm:pl-14 flex-wrap">
          <img src={Clock} alt="Clock Icon" className="w-5 sm:w-6" />
          <p className="text-[#0C0E0B] text-xs sm:text-base">{displayTime}</p>
          <p className="text-[#0C0E0B] text-xs sm:text-base">
            {displayLocation}
          </p>
        </div>
      </div>

      <hr className=" w-full border-3 rounded border-[#D7303A] " />
    </section>
  );
}
