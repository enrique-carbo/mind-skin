// src/components/react/PrintButton.tsx
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface PrintButtonProps {
  targetSelector: string;
  title?: string;
  variant?: "default" | "outline";
  size?: "default" | "lg";
  className?: string;
}

export default function PrintButton({
  targetSelector,
  title,
  variant = "outline",
  size = "default",
  className = "",
}: PrintButtonProps) {
  const handlePrint = async () => {
    // Importación dinámica para mejorar rendimiento
    const { printChart } =
      await import("@/components/react/utils/printHelpers");
    printChart(targetSelector, title);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handlePrint}
      className={className}
      title="Imprimir reporte"
    >
      <Printer className="w-4 h-4" />
    </Button>
  );
}
