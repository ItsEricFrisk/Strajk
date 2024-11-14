import { motion } from "framer-motion";
import { toggleMenu } from "../../zustand/store";

export default function MenuIcon() {
  // Zustand
  const menu: boolean = toggleMenu((state) => state.menu);
  let setToggle = toggleMenu((state) => state.setToggle);

  return (
    <div
      className={` ${
        menu ? "bg-primaryColor" : "bg-red-200"
      } cursor-pointer w-12 h-10 fixed top-4 left-3 flex flex-col justify-between items-start px-1 py-2 rounded-sm bg-opacity-90 transition-all duration-500 z-50`}
      onClick={(): void => setToggle()}
    >
      <motion.div
        className={`${
          menu ? "bg-red-300 w-8" : "bg-primaryColor w-4"
        } h-[3px]  rounded-full transition-all duration-500`}
      ></motion.div>
      <motion.div
        className={`${
          menu ? "bg-red-300" : "bg-primaryColor"
        } w-6 h-[3px] rounded-full transition-all duration-500`}
      ></motion.div>
      <motion.div
        className={`${
          menu ? "bg-red-300 w-4" : "bg-primaryColor w-8"
        }  h-[3px] rounded-full transition-all duration-500`}
      ></motion.div>
    </div>
  );
}
