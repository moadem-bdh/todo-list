import AddIcon from "../assets/Add.svg";

export default function MenuTiteles({ titele = "events", onClick }) {
  return (
    <div className="flex w-full md:w-[260px] justify-between items-center px-2 md:px-0">
      <p className="text-[#D7303A] font-poppins font-semibold text-lg md:text-base">
        {titele.toLocaleUpperCase()}
      </p>
      <button onClick={onClick} className="rounded-md hover:bg-[#341c1e] p-1.5">
        <img src={AddIcon} alt="Add Icon" className="w-6 md:w-5" />
      </button>
    </div>
  );
}
