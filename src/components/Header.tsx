// src/components/Header.tsx

import EmergencyDialog from "@/components/EmergencyDialog";

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y Título */}
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="MindSkin Logo" className="w-8 h-8" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-800">
                MindSkin
              </h1>
              <p className="text-xs md:text-sm text-slate-500">
                Mente Sana, Piel Sana
              </p>
            </div>
          </div>

          {/* Badges y Acciones */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1 text-xs font-medium">
              Privado y Local
            </span>

            {/* Componente extraído */}
            <EmergencyDialog />
          </div>
        </div>
      </div>
    </header>
  );
}
