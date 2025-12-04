import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useLoadingStore } from "@/hooks/useLoadingStore";


export default function Loader({ onStart }) {
  const { progress } = useLoadingStore()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (progress >= 100) {
      setReady(true)
    }
  }, [progress])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="w-32 h-32 rounded-full border-4 border-white flex items-center justify-center"
          style={{
            background: "radial-gradient(circle, #fff 5%, #000 70%)",
            boxShadow: "0 0 40px 15px rgba(255,255,255,0.1)",
          }}
        >
          <div className="w-16 h-16 rounded-full bg-black" />
        </motion.div>

        <p className="mt-6 text-lg tracking-widest font-mono">
          {progress.toFixed(0)}%
        </p>

        {ready ? (
          <motion.button
            onClick={onStart}
            className="mt-6 px-6 py-3 border border-white rounded-full text-white uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Start
          </motion.button>
        ) : (
          <motion.p
            className="mt-2 text-sm text-gray-400 font-light uppercase"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading Universe...
          </motion.p>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
