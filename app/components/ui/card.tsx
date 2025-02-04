// components/ui/card.tsx
import React from "react";

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white shadow-lg rounded-lg p-6 ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="border-b pb-2">{children}</div>
);

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold text-black">{children}</h3>
);

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="pt-2">{children}</div>
);
