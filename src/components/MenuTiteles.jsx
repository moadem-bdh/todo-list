import AddIcon from "../assets/Add.svg"

export default function MenuTiteles({titele = "events" ,onClick }) {
return(
    <div className=" flex w-[260px] justify-between items-center ">
  
<p className=" text-[#D7303A] font-poppins font-semibold ">{titele.toLocaleUpperCase()}</p>
 <button onClick={onClick} className= " rounded-md hover:bg-[#341c1e] "><img src={AddIcon} alt="Add Icon" className=" w-5 "/></button>
    </div>
)

}