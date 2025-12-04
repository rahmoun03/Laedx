import { AnimatePresence, motion } from "framer-motion";
import { useScrollStore } from "@/hooks/useScrollStore";
import BNButton from '@/components/ui/BNButton';
import NoveXperience from '@/pages/NoveXperience';
import HiveXperience from '@/pages/HiveXperience';
import Enter from '@/pages/Enter';

export default function ScrollUI({ pages = 12 }) {
  const scrollOffset = useScrollStore((state) => state.scrollOffset);
  const currentPage = Math.floor(scrollOffset * pages);

  // Define page mapping
  const pageMap = {
    0: <Enter key="enter" />,
    3: <NoveXperience key="nove" />,
    5: <HiveXperience key="hive" />,
    12: <BNButton key="BNButton" />,
  };

  // Determine which page to show
  let pageToShow = null;
  if (scrollOffset <= 0.01) pageToShow = pageMap[0];
  else if (currentPage === 3) pageToShow = pageMap[3];
  else if (currentPage === 5) pageToShow = pageMap[5];
  else if (scrollOffset >= 0.95) pageToShow = pageMap[12];

  return (
    <div className="absolute top-0 left-0 w-full h-full no-scrollbar">
      <AnimatePresence exitBeforeEnter>
        {pageToShow && (
          <motion.div
            key={pageToShow.key}  // important for AnimatePresence
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="absolute w-full h-full"
          >
            {pageToShow}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
