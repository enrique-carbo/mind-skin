import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/DynamicIcon";
import { GROUNDING_STEPS } from "@/components/react/utils/helpers";

export default function Grounding54321() {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (active) {
      interval = setInterval(() => {
        setStep((prev) => {
          if (prev >= GROUNDING_STEPS.length - 1) {
            setActive(false);
            return 0;
          }
          return prev + 1;
        });
      }, 15000);
    }
    return () => clearInterval(interval);
  }, [active]);

  if (!active) {
    return (
      <div className="border border-purple-200 rounded-lg p-4 mt-4 bg-purple-50">
        <div className="flex items-center gap-2 text-purple-700 mb-3">
          <DynamicIcon name="Eye" size={20} />
          <h3 className="font-semibold">Técnica de Grounding 5-4-3-2-1</h3>
        </div>
        <Button
          onClick={() => {
            setActive(true);
            setStep(0);
          }}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          <DynamicIcon name="Play" size={16} className="mr-2" />
          Iniciar Grounding
        </Button>
      </div>
    );
  }

  const current = GROUNDING_STEPS[step];
  return (
    <div className="border border-purple-200 rounded-lg p-4 mt-4 bg-purple-50">
      <div className="text-center py-4">
        <DynamicIcon
          name={current.icon}
          size={48}
          className="mx-auto mb-4 text-purple-700"
        />
        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          {current.sense}
        </h3>
        <p className="text-lg text-purple-700 font-semibold">{current.items}</p>
        <div className="mt-4 text-sm text-slate-500">Paso {step + 1} de 5</div>
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
