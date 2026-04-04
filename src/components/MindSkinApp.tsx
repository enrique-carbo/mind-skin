// src/components/MindSkinApp.tsx
import { useState } from "react";
import Header from "@/components/Header";
import MeditationSection from "@/components/MeditationSection";
import BreathingSection from "@/components/BreathingSection";
import MoodSection from "@/components/MoodSection";
import EducationSection from "@/components/EducationSection";
import { Brain, Heart, Smile, BookOpen } from "lucide-react";

export default function MindSkinApp() {
  const [activeTab, setActiveTab] = useState<
    "meditation" | "breathing" | "mood" | "education"
  >("meditation");

  const tabs = [
    { id: "meditation", label: "Meditar", icon: Brain },
    { id: "breathing", label: "Respirar", icon: Heart },
    { id: "mood", label: "Ánimo", icon: Smile },
    { id: "education", label: "Aprender", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6 bg-white p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col items-center gap-1 py-3 rounded-md transition-colors ${activeTab === tab.id ? "bg-blue-100 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-4">
          {activeTab === "meditation" && <MeditationSection />}
          {activeTab === "breathing" && <BreathingSection />}
          {activeTab === "mood" && <MoodSection />}
          {activeTab === "education" && <EducationSection />}
        </div>
      </main>
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-sm text-slate-500">
        © 2025 MindSkin - Mente Sana, Piel Sana
      </footer>
    </div>
  );
}
