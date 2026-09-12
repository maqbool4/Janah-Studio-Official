import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, type = "success", isVisible }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95, x: "-50%" }}
          animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
          exit={{ opacity: 0, y: 20, scale: 0.95, x: "-50%" }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="fixed bottom-8 left-1/2 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-xl border border-[rgba(57,167,255,0.25)] bg-[#0d1627] shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-w-[320px] max-w-[90%]"
        >
          {type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-[#20e0dc] shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-[#ff4e4e] shrink-0" />
          )}
          <span className="text-sm font-medium text-slate-900 leading-relaxed">
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
