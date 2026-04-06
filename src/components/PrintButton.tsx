import { Printer } from "lucide-react"; // Asumiendo que usas lucide-react
import { Button } from "@/components/ui/button"; // Asumiendo tu ruta de componentes UI

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
    // Feedback visual inmediato (opcional pero recomendado en móvil)
    // Podrías añadir un estado de carga si la generación de datos fuera pesada

    try {
      const { printChart } =
        await import("@/components/react/utils/printHelpers");
      printChart(targetSelector, title);
    } catch (error) {
      console.error("Error cargando el helper de impresión", error);
    }
  };

  return (
    <Button
      type="button" // Importante: evita submits accidentales
      variant={variant}
      size={size}
      onClick={handlePrint}
      className={className}
      title="Imprimir reporte"
    >
      <Printer className="w-4 h-4 mr-2" />
      <span className="hidden sm:inline">Imprimir</span>{" "}
      {/* Texto opcional en móvil */}
    </Button>
  );
}
