// src/components/BreathingSection.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import StopExercise from "@/components/StopExercise";
import BodyScan from "@/components/BodyScan";
import Grounding54321 from "@/components/Grounding54321";

type BreathingPhase = "inhale" | "hold1" | "exhale" | "hold2";

export default function BreathingSection() {
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] =
    useState<BreathingPhase>("inhale");
  const [breathingCycle, setBreathingCycle] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (breathingActive) {
      interval = setInterval(() => {
        setBreathingPhase((prev) => {
          if (prev === "inhale") return "hold1";
          if (prev === "hold1") return "exhale";
          if (prev === "exhale") return "hold2";
          return "inhale";
        });
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [breathingActive]);

  useEffect(() => {
    if (breathingPhase === "inhale") {
      setBreathingCycle((c) => c + 1);
    }
  }, [breathingPhase]);

  const phaseInfo = {
    inhale: { label: "Inhala", emoji: "🌬️", seconds: 4 },
    hold1: { label: "Sostén", emoji: "⏸️", seconds: 4 },
    exhale: { label: "Exhala", emoji: "💨", seconds: 4 },
    hold2: { label: "Sostén", emoji: "⏸️", seconds: 4 },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center py-12">
        <div
          className={`w-48 h-48 rounded-full flex items-center justify-center transition-all duration-[4000ms] ease-in-out ${
            breathingPhase === "inhale"
              ? "scale-150 bg-blue-100"
              : breathingPhase === "hold1"
                ? "scale-150 bg-blue-200"
                : breathingPhase === "exhale"
                  ? "scale-100 bg-blue-50"
                  : "scale-100 bg-blue-100"
          }`}
        >
          <div className="text-center">
            <div className="text-4xl mb-2">
              {phaseInfo[breathingPhase].emoji}
            </div>
            <div className="text-2xl font-bold text-slate-800">
              {phaseInfo[breathingPhase].label}
            </div>
            <div className="text-sm text-slate-500 mt-1">
              {phaseInfo[breathingPhase].seconds} segundos
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <Button
          size="lg"
          onClick={() => setBreathingActive(!breathingActive)}
          className={`w-48 ${breathingActive ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {breathingActive ? (
            <>
              <Pause className="w-5 h-5 mr-2" /> Detener
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" /> Comenzar
            </>
          )}
        </Button>
      </div>
      {breathingActive && (
        <div className="text-center">
          <p className="text-sm text-slate-600">
            Ciclos completados:{" "}
            <span className="font-bold text-blue-600">{breathingCycle}</span>
          </p>
        </div>
      )}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800">Cómo funciona:</h4>
        <ul className="text-sm text-blue-700 space-y-1 mt-1">
          <li>• Inhala (4s) → Sostén (4s) → Exhala (4s) → Sostén (4s)</li>
        </ul>
      </div>

      {/* Ejercicios complementarios */}
      <StopExercise />
      <BodyScan />
      <Grounding54321 />
    </div>
  );
}
