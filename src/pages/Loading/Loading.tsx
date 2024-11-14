import { motion } from "framer-motion";
import strajkImage from "../../assets/logo.svg";
import { useLoadingStore } from "../../zustand/store";
import "../../index.css";

export default function Loading() {
  // Zustand
  let setLoading = useLoadingStore((state) => state.setLoading); //Function to change state of loading

  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      <motion.img
        animate={{ y: [-200, 0, -20, 0, -10, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5, delay: 1 }}
        src={strajkImage}
        alt="Logo"
      />
      <motion.h2
        animate={{ scale: [0, 1], opacity: [0, 1] }}
        transition={{ duration: 0.2, delay: 2 }}
        className="text-5xl font-bold text-primaryColor tracking-widest"
      >
        STRAJK
      </motion.h2>
      <motion.p
        animate={{ scale: [0, 1], opacity: [0, 1] }}
        transition={{ duration: 0.4, delay: 2.5 }}
        className="tracking-[6px] text-3xl"
      >
        BOWLING
      </motion.p>
      <motion.button
        animate={{ scale: [0, 1], opacity: [0, 1] }}
        transition={{ duration: 0.4, delay: 3 }}
        className="px-8 py-2 text-white bg-primaryColor mt-10 rounded-sm"
        /* Set Loading to false */
        onClick={(): void => setLoading()}
      >
        Start Booking
      </motion.button>
    </main>
  );
}
