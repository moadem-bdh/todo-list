import { useLocation, useNavigate, useParams } from "react-router";
import Add1 from "../assets/Add1.svg";


export default function AddstickyNote(){
const navigate = useNavigate()
const location = useLocation()
const {stickyId} = useParams()
  return (
    <button onClick={()=>navigate(`/sticky-wall/${stickyId}/note/new`  , {state :{bgLocation : location}})}
      className={` flex w-full h-[150px] px-5 justify-center items-center rounded-1 bg-[#c3c3c3] transition-colors duration-50 cursor-pointer ease-in-out hover:bg-[#9f9f9f] `}
    >
     <img src={Add1} alt="Add Icon" className="w-23 " />
    </button>
  );
}
