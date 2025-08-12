export default function PriorityTeller({ label="Urgent", bg ,text, border }) {
  return (
    <div
      className={`gap-1 min-w-max inline-flex rounded-xl px-[6px] pt-1 pb-0.5 text-[10px] items-center font-medium font-poppins border-1 ${text} ${border} ${bg}`}
    >
      
        {label}

      <div className={` rounded-4xl border-3 ${border} `}></div>
    </div>
  );
}
