// src/components/Header.tsx
import { Brain, Activity } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">MindSkin</h1>
              <p className="text-xs text-slate-500">Mente Sana, Piel Sana</p>
            </div>
          </div>
          <div className="bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1 text-xs flex items-center gap-1">
            <Activity className="w-3 h-3" />
            Privado y Local
          </div>
        </div>
      </div>
    </header>
  );
}
