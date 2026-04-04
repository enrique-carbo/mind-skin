// src/components/MeditationSection.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";
import { playBell } from "@/components/react/utils/helpers";

export default function MeditationSection() {
  const [meditationTime, setMeditationTime] = useState(1);
  const [meditationRunning, setMeditationRunning] = useState(false);
  const [meditationElapsed, setMeditationElapsed] = useState(0);
  const [bellPlayed, setBellPlayed] = useState(false);

  const resetMeditation = () => {
    setMeditationRunning(false);
    setMeditationElapsed(0);
    setBellPlayed(false);
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (meditationRunning) {
      interval = setInterval(() => {
        setMeditationElapsed((prev) => {
          const newElapsed = prev + 1;
          if (newElapsed >= meditationTime * 60) {
            setMeditationRunning(false);
            playBell();
            return 0;
          }
          return newElapsed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [meditationRunning, meditationTime]);

  // Play bell at start
  useEffect(() => {
    if (meditationRunning && !bellPlayed) {
      playBell();
      setBellPlayed(true);
    }
  }, [meditationRunning, bellPlayed]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const remainingSeconds = meditationTime * 60 - meditationElapsed;
  const progress = (meditationElapsed / (meditationTime * 60)) * 100;
  const displayTime =
    meditationRunning || meditationElapsed > 0
      ? formatTime(remainingSeconds)
      : `${meditationTime}:00`;

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <div className="relative inline-block">
          <div
            className={`w-48 h-48 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
              meditationRunning
                ? "border-blue-500 bg-blue-50"
                : "border-slate-200"
            }`}
          >
            <div className="text-center">
              <div className="text-5xl font-bold text-slate-800 mb-2">
                {displayTime}
              </div>
              <div className="text-sm text-slate-500">
                {meditationRunning
                  ? "tiempo restante"
                  : meditationElapsed > 0
                    ? "en pausa"
                    : "duración"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selector de duración: solo visible si no se ha iniciado ninguna sesión */}
      {!meditationRunning && meditationElapsed === 0 && (
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-700">
            Duración de la sesión
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 5, 10, 20].map((time) => (
              <Button
                key={time}
                variant={meditationTime === time ? "default" : "outline"}
                onClick={() => setMeditationTime(time)}
                className={
                  meditationTime === time ? "bg-blue-600 hover:bg-blue-700" : ""
                }
              >
                <Clock className="w-4 h-4 mr-2" />
                {time} min
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center gap-4">
        {!meditationRunning ? (
          <Button
            size="lg"
            onClick={() => setMeditationRunning(true)}
            className="bg-blue-600 hover:bg-blue-700 w-48"
          >
            <Play className="w-5 h-5 mr-2" />
            {meditationElapsed > 0 ? "Reanudar" : "Comenzar"}
          </Button>
        ) : (
          <>
            <Button
              size="lg"
              onClick={() => setMeditationRunning(false)}
              variant="outline"
              className="w-24"
            >
              <Pause className="w-5 h-5 mr-2" /> Pausar
            </Button>
            <Button
              size="lg"
              onClick={resetMeditation}
              variant="outline"
              className="w-24"
            >
              <RotateCcw className="w-5 h-5 mr-2" /> Reiniciar
            </Button>
          </>
        )}
      </div>

      {/* Barra de progreso visible si hay tiempo transcurrido (aunque esté en pausa) */}
      {(meditationRunning || meditationElapsed > 0) && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-center text-sm text-slate-600">
            Respira profundamente y deja pasar tus pensamientos...
          </p>
        </div>
      )}
    </div>
  );
}
