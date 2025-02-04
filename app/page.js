"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold mb-6">I am a</h1>
      <div className="space-y-4">
        {/* Patient Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/patient")}
          className="flex items-center justify-between bg-white text-black w-64 p-4 rounded-lg shadow-lg transition-all"
        >
          Patient
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <ArrowRight size={24} />
          </motion.div>
        </motion.button>

        {/* Doctor Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/doctor")}
          className="flex items-center justify-between bg-white-500 text-black w-64 p-4 rounded-lg shadow-lg transition-all"
        >
          Doctor
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <ArrowRight size={24} />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}
