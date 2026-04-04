// src/components/react/StopExercise.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Hand } from "lucide-react";

export default function StopExercise() {
  const [stopStep, setStopStep] = useState<
    "idle" | "stop" | "take" | "observe" | "proceed"
  >("idle");
  const [stopTimer, setStopTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (stopStep !== "idle") {
      interval = setInterval(() => {
        setStopTimer((prev) => {
          const next = prev + 1;
          if (stopStep === "stop" && next >= 3) {
            setStopStep("take");
            return 0;
          }
          if (stopStep === "take" && next >= 5) {
            setStopStep("observe");
            return 0;
          }
          if (stopStep === "observe" && next >= 5) {
            setStopStep("proceed");
            return 0;
          }
          if (stopStep === "proceed" && next >= 5) {
            setStopStep("idle");
            return 0;
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [stopStep]);

  const startSTOP = () => {
    setStopStep("stop");
    setStopTimer(0);
  };

  const stepContent = {
    idle: {
      emoji: "🛑",
      title: "STOP",
      desc: "Herramienta de emergencia para interrumpir el impulso de rascarse",
    },
    stop: { emoji: "🛑", title: "STOP", desc: "Detente. No te rasques." },
    take: {
      emoji: "🌬️",
      title: "TOMA",
      desc: "Respira profundamente 3 veces...",
    },
    observe: {
      emoji: "👁️",
      title: "OBSERVA",
      desc: "Observa lo que sientes sin juzgar...",
    },
    proceed: {
      emoji: "✨",
      title: "PROSIGUE",
      desc: "Elige una respuesta consciente...",
    },
  };

  const current = stepContent[stopStep];

  return (
    <div className="border border-amber-200 rounded-lg p-4 mt-4">
      <div className="flex items-center gap-2 text-amber-700 mb-3">
        <Hand className="w-5 h-5" />
        <h3 className="font-semibold">Ejercicio STOP</h3>
      </div>
      {stopStep === "idle" ? (
        <Button
          onClick={startSTOP}
          className="w-full bg-amber-600 hover:bg-amber-700"
        >
          Iniciar Ejercicio STOP
        </Button>
      ) : (
        <div className="text-center py-4">
          <div className="text-6xl mb-4">{current.emoji}</div>
          <h4 className="text-2xl font-bold text-slate-800">{current.title}</h4>
          <p className="text-slate-600">{current.desc}</p>
          <div className="mt-4 text-3xl font-bold text-blue-600">
            {5 - stopTimer}
          </div>
        </div>
      )}
    </div>
  );
}
