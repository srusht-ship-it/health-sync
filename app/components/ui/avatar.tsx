// components/ui/avatar.tsx
import React from "react";

export const Avatar = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`rounded-full overflow-hidden ${className}`}>
    {children}
  </div>
);
