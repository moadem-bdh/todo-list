export default function Button({
  onClick,
  icon,
  label = "Delete",
  bg,
  hover = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`flex py-[6px] px-2 items-center gap-1 text-sm rounded-xl min-w-max font-semibold font-poppins cursor-pointer text-white transition-colors duration-200 ${bg} ${hover}`}
    >
      <img src={icon} alt={` ${label} Icon`} />
      {label}
    </button>
  );
}
