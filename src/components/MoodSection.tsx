// src/components/react/MoodSection.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "@/components/DynamicIcon";
import PrintButton from "@/components/PrintButton";
import { CheckCircle2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  type MoodEntry,
  MOOD_CONFIG,
  MOOD_STORAGE_KEY,
  SETTINGS_STORAGE_KEY,
  saveMoodData,
  loadMoodData,
} from "@/components/react/utils/helpers";

export default function MoodSection() {
  const [moodData, setMoodData] = useState<MoodEntry[]>([]);
  const [todayMood, setTodayMood] = useState<number | null>(null);

  useEffect(() => {
    const data = loadMoodData();
    setMoodData(data);
    const today = new Date().toISOString().split("T")[0];
    const settings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (settings) {
      const { lastMoodDate, todayMood: saved } = JSON.parse(settings);
      if (lastMoodDate === today) setTodayMood(saved);
    }
  }, []);

  const handleMoodSelect = (score: number) => {
    const today = new Date().toISOString().split("T")[0];
    const emoji = MOOD_CONFIG.find((m) => m.score === score)?.icon || "😐";
    const newEntry: MoodEntry = { date: today, score, emoji };
    const newData = [...moodData.filter((m) => m.date !== today), newEntry];
    setMoodData(newData);
    setTodayMood(score);
    saveMoodData(newData);
    localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({ lastMoodDate: today, todayMood: score }),
    );
  };

  const getLast7Days = () => {
    const last7 = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const mood = moodData.find((m) => m.date === dateStr);

      // Obtener el icono y label según el puntaje
      let icon = "❓";
      let label = "Sin registro";
      if (mood?.score) {
        const config = MOOD_CONFIG.find((m) => m.score === mood.score);
        if (config) {
          icon = config.icon;
          label = config.label;
        }
      }

      last7.push({
        date: dateStr,
        dayName: d.toLocaleDateString("es-ES", { weekday: "short" }),
        mood: mood?.score || 0,
        icon: icon,
        label: label,
      });
    }
    return last7;
  };

  const getAverageMood = () => {
    if (moodData.length === 0) return "0";
    const sum = moodData.reduce((a, b) => a + b.score, 0);
    return (sum / moodData.length).toFixed(1);
  };

  const getTrend = () => {
    if (moodData.length < 2) return "stable";
    const last = moodData[moodData.length - 1].score;
    const prev = moodData[moodData.length - 2].score;
    if (last > prev) return "up";
    if (last < prev) return "down";
    return "stable";
  };

  const trend = getTrend();
  const last7Days = getLast7Days();

  return (
    <div className="space-y-6">
      {/* Sección de check-in diario */}
      <div>
        <h3 className="font-semibold text-xl mb-3 mt-5">
          ¿Cómo te sientes hoy?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {MOOD_CONFIG.map((mood) => (
            <Button
              key={mood.score}
              variant={todayMood === mood.score ? "default" : "outline"}
              onClick={() => handleMoodSelect(mood.score)}
              className="flex flex-col items-center gap-2 py-6 h-auto"
            >
              <DynamicIcon name={mood.icon} size={32} className={mood.color} />
              <span className="text-md">{mood.label}</span>
            </Button>
          ))}
        </div>
        {todayMood && (
          <div className="mt-4 text-center text-sm text-green-600">
            <CheckCircle2 className="w-4 h-4 inline mr-1" /> ¡Estado de ánimo
            registrado para hoy!
          </div>
        )}
      </div>

      {/* Sección del gráfico con id para imprimir */}
      <div id="mood-chart-print" className="mood-chart-section">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Últimos 7 días</h3>
          <div className="flex gap-2">
            <Badge variant="outline" className="mood-average">
              Promedio: {getAverageMood()}
            </Badge>
            <PrintButton
              targetSelector="#mood-chart-print"
              title="MindSkin - Reporte de Estado de Ánimo"
              variant="outline"
              size="default"
            />
          </div>
        </div>

        <div className="space-y-2">
          {last7Days.map((day) => (
            <div
              key={day.date}
              className="flex items-center gap-3 mood-chart-row"
            >
              <div className="w-12 text-sm font-medium mood-day-name">
                {day.dayName}
              </div>
              <div className="flex-1 h-8 bg-slate-100 rounded-lg overflow-hidden relative">
                {day.mood > 0 && (
                  <>
                    <div
                      className={`h-full rounded-lg ${
                        day.mood >= 4
                          ? "bg-green-500"
                          : day.mood === 3
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${(day.mood / 5) * 100}%` }}
                    />
                    {/* Valor numérico oculto para extracción en impresión */}
                    <span className="hidden mood-value">{day.mood}</span>
                    <span className="hidden mood-label">{day.label}</span>
                  </>
                )}
                <div className="absolute inset-0 flex items-center justify-center text-xl mood-icon">
                  {day.mood > 0 && (
                    <DynamicIcon
                      name={day.icon}
                      size={20}
                      className="text-white drop-shadow-sm"
                    />
                  )}
                  {day.mood === 0 && (
                    <span className="text-slate-400 text-sm">—</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contenedor de tendencia con clase para impresión */}
        <div className="mt-4 flex justify-center gap-4 p-3 bg-slate-50 rounded-lg mood-summary mood-trend">
          <span className="text-sm">Tendencia:</span>
          {trend === "up" && (
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" /> Mejorando
            </div>
          )}
          {trend === "down" && (
            <div className="flex items-center gap-1 text-red-600">
              <TrendingDown className="w-4 h-4" /> Necesita atención
            </div>
          )}
          {trend === "stable" && (
            <div className="flex items-center gap-1 text-slate-600">
              <Minus className="w-4 h-4" /> Estable
            </div>
          )}
        </div>
      </div>

      {/* Aviso de privacidad */}
      <div className="bg-green-50 p-4 rounded-lg text-sm text-green-800">
        <strong>Tus datos son privados:</strong> Se guardan solo en tu
        dispositivo.
      </div>
    </div>
  );
}
