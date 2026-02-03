import List2 from "../assets/List2.svg";
import Clock from "../assets/Clock.svg";
export default function EventBigTitele({
  Event = "Events",
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
          <img
            src={List2}
            alt="List Icon"
            className="w-8 sm:w-9 md:w-10 lg:w-11"
          />
          <hr className="border-3 rounded h-8 sm:h-9 md:h-10 lg:h-11" />

          <h6 className="text-[#0C0E0B] font-poppins line-clamp-2 text-ellipsis text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-semibold overflow-hidden max-w-full">
            {Event}
          </h6>
        </div>
        <div className="flex gap-2 items-center w-full pl-14 sm:pl-16 md:pl-18 lg:pl-20 flex-wrap">
          <img src={Clock} alt="Clock Icon" className="w-6 sm:w-7 md:w-8" />
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
