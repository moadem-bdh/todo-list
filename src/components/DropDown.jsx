import React, { useState, useEffect, useMemo } from "react";
import Arrow from "../assets/arrow.svg";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function DropDown({
  onChange,
  width = "w-[150px]",
  height = "",
  value,
  FirstLabel = "Select",
}) {
  const options = useMemo(
    () => [
      { value: FirstLabel, label: FirstLabel },
      { value: "Urgent", label: "Urgent" },
      { value: "NotUrgent", label: "Not Urgent" },
      { value: "CanWait", label: "Can Wait" },
    ],
    [FirstLabel],
  );

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const handleSelect = (opt) => {
    setSelected(opt);
    setOpen(false);
    if (onChange) onChange(opt.value);
  };

  useEffect(() => {
    if (value) {
      const foundOption = options.find((opt) => opt.value == value);
      if (foundOption) {
        setSelected(foundOption);
      }
    }
  }, [value, options]);

  return (
    <div className={`relative ${width} z-30`}>
      <button
        type="button"
        className={` ${height} justify-between cursor-pointer  w-full ${
          open ? "focus:border-[#FF8F8F]" : "focus:border-[#D7303A]"
        }    border-2 border-[#FF8F8F] rounded-md py-1 px-3 text-m font-medium bg-white flex min-w-max items-center focus:outline-none hover:bg-[#FFF0F0] transition-colors duration-150`}
        onClick={() => setOpen((o) => !o)}
      >
        {selected.label}
        <img
          src={Arrow}
          alt="Arrow Icon"
          className={`h-4  transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              mass: 0.8,
            }}
            className="absolute left-0 top-full w-full bg-white border-2 overflow-hidden border-[#FF8F8F] rounded-md shadow-lg z-50"
          >
            {options.map((opt, index) => (
              <motion.div
                key={opt.value}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.08,
                  ease: [0.4, 0, 0.2, 1],
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.15 },
                }}
                whileTap={{ scale: 0.98 }}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-[#FFF0F0] rounded-sm"
                onClick={() => handleSelect(opt)}
                style={{ minWidth: "124px" }}
              >
                {opt.label}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
