import React from "react";

interface IconProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = "md",
  className = "",
}) => {
  const sizeClass = {
    sm: "material-icons-sm",
    md: "material-icons-md",
    lg: "material-icons-lg",
  }[size];

  return (
    <span className={`material-symbols-outlined ${sizeClass} ${className}`}>
      {name}
    </span>
  );
};
