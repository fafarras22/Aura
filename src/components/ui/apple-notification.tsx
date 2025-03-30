
import React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AppleNotificationProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  isVisible: boolean;
  className?: string;
}

export function AppleNotification({
  title,
  description,
  icon,
  onClose,
  isVisible,
  className,
}: AppleNotificationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full backdrop-blur-xl bg-white/90 dark:bg-black/80 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl",
            className
          )}
        >
          <div className="flex items-start p-4">
            {icon && <div className="flex-shrink-0 mr-3">{icon}</div>}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-black dark:text-white">{title}</h4>
              {description && (
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">{description}</p>
              )}
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="ml-3 flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
