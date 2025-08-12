import React, { useState, useEffect, useMemo } from "react";
import Arrow from "../assets/arrow.svg";

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
    [FirstLabel]
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
    <div className={`relative ${width} `}>
      <button
        type="button"
        className={` ${height} justify-between  w-full ${
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

      {open && (
        <div className="absolute left-0 top-full w-full bg-white border-2 overflow-hidden  border-[#FF8F8F] rounded-md shadow-md z-10">
          {options.map((opt) => (
            <div
              key={opt.value}
              className="px-3 py-2  text-sm cursor-pointer hover:bg-[#FFF0F0] hover:rounded-md"
              onClick={() => handleSelect(opt)}
              style={{ minWidth: "124px" }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
