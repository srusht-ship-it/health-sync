"use client";
import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Animated Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
      >
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {children}
      </motion.div>
    </div>
  );
}

interface DialogHeaderProps {
  children: ReactNode;
}

export function DialogHeader({ children }: DialogHeaderProps) {
  return <div className="mb-4">{children}</div>;
}

interface DialogTitleProps {
  children: ReactNode;
}

export function DialogTitle({ children }: DialogTitleProps) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

interface DialogDescriptionProps {
  children: ReactNode;
}

export function DialogDescription({ children }: DialogDescriptionProps) {
  return <p className="text-gray-500 text-sm">{children}</p>;
}

interface DialogContentProps {
  children: ReactNode;
  className?: string;
}

export function DialogContent({ children, className }: DialogContentProps) {
  return <div className={`mt-4 ${className}`}>{children}</div>;
}
