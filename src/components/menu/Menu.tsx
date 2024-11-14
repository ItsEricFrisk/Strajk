import { Link } from "react-router-dom";
import { toggleMenu } from "../../zustand/store";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Menu() {
  // Zustand
  const menu: boolean = toggleMenu((state) => state.menu);
  let setToggle = toggleMenu((state) => state.setToggle);

  // Framer animation variant
  const toggle = {
    openMenu: { x: 0 },
    closedMenu: { x: "-100%" },
  };

  // Toggle overflow so scroll doesnt work behind menu
  useEffect((): void => {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menu]);

  return (
    <AnimatePresence>
      {menu && (
        <motion.section
          key="menu"
          initial="closedMenu"
          animate="openMenu"
          exit="closedMenu"
          variants={toggle}
          transition={{
            duration: 0.5,
            ease: "easeIn",
          }}
          className={`w-full h-screen bg-[#1C1919] flex flex-col items-center justify-center fixed top-0 left-0 z-40 overflow-x-hidden`}
        >
          <Link
            to={"/"}
            className="text-3xl text-primaryColor mb-5 font-bold hover:underline"
            onClick={(): void => setToggle()}
          >
            BOOKING
          </Link>
          <Link
            to={"/confirmation"}
            className="text-3xl text-primaryColor mt-5 font-bold hover:underline"
            onClick={(): void => setToggle()}
          >
            CONFIRMATION
          </Link>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
