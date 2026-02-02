import { useLocation, useNavigate, useParams } from "react-router";
import Add1 from "../assets/Add1.svg";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function AddstickyNote() {
  const navigate = useNavigate();
  const location = useLocation();
  const { stickyId } = useParams();
  return (
    <motion.button
      layout="position"
      onClick={() =>
        navigate(`/sticky-wall/${stickyId}/note/new`, {
          state: { bgLocation: location },
        })
      }
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={` flex w-full h-[150px] px-5 justify-center items-center rounded-1 bg-[#c3c3c3] transition-colors duration-50 cursor-pointer ease-in-out hover:bg-[#9f9f9f] `}
    >
      <img src={Add1} alt="Add Icon" className="w-23 " />
    </motion.button>
  );
}
