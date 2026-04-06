// src/components/react/EducationSection.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Icon } from "@/components/Icon";
import { ArrowRight, CheckCircle2, BookOpen } from "lucide-react";
import { EDUCATION_CARDS } from "@/components/react/utils/helpers";

export default function EducationSection() {
  const [currentCard, setCurrentCard] = useState(0);

  return (
    <div className="space-y-6">
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Educación
          </CardTitle>
          <CardDescription>
            Aprende cómo el estrés afecta tu piel y cómo cuidarte mejor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Navigation Arrows */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() =>
                  setCurrentCard((prev) =>
                    prev > 0 ? prev - 1 : EDUCATION_CARDS.length - 1,
                  )
                }
                disabled={currentCard === 0}
                className="h-8 w-8 rounded-md border border-slate-300 bg-white flex items-center justify-center disabled:opacity-50 hover:bg-slate-100 transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180 text-slate-700" />
              </button>
              <div className="flex gap-1">
                {EDUCATION_CARDS.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentCard ? "bg-blue-600" : "bg-slate-300"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() =>
                  setCurrentCard((prev) =>
                    prev < EDUCATION_CARDS.length - 1 ? prev + 1 : 0,
                  )
                }
                disabled={currentCard === EDUCATION_CARDS.length - 1}
                className="h-8 w-8 rounded-md border border-slate-300 bg-white flex items-center justify-center disabled:opacity-50 hover:bg-slate-100 transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-slate-700" />
              </button>
            </div>

            {/* Current Card */}
            <div className="bg-linear-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
              {/* En móvil: columna, en md+: fila */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="text-4xl md:text-5xl">
                  <Icon
                    name={EDUCATION_CARDS[currentCard].icon}
                    className="text-3xl"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    {EDUCATION_CARDS[currentCard].title}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {EDUCATION_CARDS[currentCard].content}
                  </p>

                  <div className="bg-white p-4 rounded-lg border border-blue-200 text-left">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Tips prácticos:
                    </h4>
                    <ul className="space-y-2">
                      {EDUCATION_CARDS[currentCard].tips.map((tip, index) => (
                        <li
                          key={index}
                          className="text-sm text-slate-700 flex items-start gap-2"
                        >
                          <span className="text-blue-500 mt-1">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Counter */}
            <div className="text-center mt-4 text-sm text-slate-500">
              Tarjeta {currentCard + 1} de {EDUCATION_CARDS.length}
            </div>
          </div>

          {/* All Topics Overview */}
          <div className="mt-8">
            <h4 className="font-semibold text-slate-800 mb-4">
              Todos los temas:
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {EDUCATION_CARDS.map((card, index) => (
                <Button
                  key={card.id}
                  variant={currentCard === index ? "default" : "outline"}
                  onClick={() => setCurrentCard(index)}
                  className={`h-auto py-3 flex flex-col items-center gap-2 ${
                    currentCard === index ? "bg-blue-600 hover:bg-blue-700" : ""
                  }`}
                >
                  <Icon name={card.icon} className="text-3xl" />
                  <span className="text-xs text-center">{card.title}</span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
        <p className="text-lg text-amber-800">
          <strong>Aviso:</strong> Esta aplicación es una herramienta
          complementaria de educación y bienestar. No reemplaza el consejo
          médico profesional. Siempre consulta con tu médico para el tratamiento
          de condiciones de la piel.
        </p>
      </div>
    </div>
  );
}
