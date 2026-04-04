// src/components/DynamicIcon.tsx
import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

interface Props extends LucideProps {
  name: string; // El nombre que definimos en MOOD_CONFIG
}

export const DynamicIcon = ({ name, ...props }: Props) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.HelpCircle {...props} />;
  return <IconComponent {...props} />;
};
