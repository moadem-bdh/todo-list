import { useState } from "react";

export const useToggle = () => {
  const [toggle, setToggle] = useState(false);

  const Toggle = () => {
    setToggle((prev) => !prev);
  };
  return [toggle, Toggle];
};
