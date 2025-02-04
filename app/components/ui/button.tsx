// components/ui/button.tsx
import React from "react";

export const Button = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={`py-2 px-4 rounded-lg text-white ${className}`}
  >
    {children}
  </button>
);
