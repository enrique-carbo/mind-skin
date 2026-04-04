import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/DynamicIcon";

const bodyParts = [
  {
    name: "Pies",
    instruction: "Siente tus pies en contacto con el suelo.",
    icon: "Footprints",
  },
  {
    name: "Tobillos",
    instruction: "Mueve suavemente tus tobillos.",
    icon: "Bone",
  },
  {
    name: "Piernas",
    instruction: "Siente el peso de tus piernas.",
    icon: "Leg",
  },
  { name: "Caderas", instruction: "Relaja tus caderas.", icon: "Circle" },
  {
    name: "Abdomen",
    instruction: "Respira profundamente hacia tu abdomen.",
    icon: "Wind",
  },
  { name: "Pecho", instruction: "Siente tu corazón latiendo.", icon: "Heart" },
  { name: "Espalda", instruction: "Relaja tu espalda.", icon: "MoveUp" },
  { name: "Hombros", instruction: "Deja caer tus hombros.", icon: "Grip" },
  {
    name: "Brazos",
    instruction: "Siente el peso de tus brazos.",
    icon: "Armchair",
  },
  { name: "Manos", instruction: "Abre y cierra tus manos.", icon: "Hand" },
  {
    name: "Cuello",
    instruction: "Relaja tu cuello y mandíbula.",
    icon: "Neck",
  },
  { name: "Cara", instruction: "Siente tu piel facial.", icon: "Smile" },
  { name: "Cabeza", instruction: "Siente tu cuero cabelludo.", icon: "Brain" },
];

export default function BodyScan() {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (active) {
      interval = setInterval(() => {
        setStep((prev) => {
          if (prev >= bodyParts.length - 1) {
            setActive(false);
            return 0;
          }
          return prev + 1;
        });
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [active]);

  if (!active) {
    return (
      <div className="border border-teal-200 rounded-lg p-4 mt-4 bg-teal-50">
        <div className="flex items-center gap-2 text-teal-700 mb-3">
          <DynamicIcon name="Scan" size={20} />
          <h3 className="font-semibold">Body Scan</h3>
        </div>
        <Button
          onClick={() => {
            setActive(true);
            setStep(0);
          }}
          className="w-full bg-teal-600 hover:bg-teal-700"
        >
          <DynamicIcon name="Play" size={16} className="mr-2" />
          Iniciar Body Scan
        </Button>
      </div>
    );
  }

  const part = bodyParts[step];
  return (
    <div className="border border-teal-200 rounded-lg p-4 mt-4 bg-teal-50">
      <div className="text-center py-4">
        <DynamicIcon
          name={part.icon}
          size={48}
          className="mx-auto mb-4 text-teal-700"
        />
        <h3 className="text-xl font-bold text-slate-800 mb-2">{part.name}</h3>
        <p className="text-sm text-slate-600">{part.instruction}</p>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500">
          <DynamicIcon name="Circle" size={12} />
          {step + 1} de {bodyParts.length}
        </div>
        <Button
          onClick={() => setActive(false)}
          variant="outline"
          className="mt-4"
        >
          Terminar
        </Button>
      </div>
    </div>
  );
}
