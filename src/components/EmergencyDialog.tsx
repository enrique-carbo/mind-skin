import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function EmergencyDialog() {
  return (
    <Dialog>
      {/* El trigger es el botón visible */}
      <DialogTrigger asChild>
        <button
          className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
          aria-label="Abrir emergencias de salud mental"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="hidden xs:inline">Emergencias</span>
          <span className="xs:hidden">!</span>
        </button>
      </DialogTrigger>

      {/* El contenido del modal */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-700 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Emergencias Salud Mental
          </DialogTitle>
          <DialogDescription className="text-slate-600 font-medium">
            Provincia de Entre Ríos
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
          {/* Card 1: Línea de Orientación */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 hover:bg-slate-100 transition-colors">
            <h3 className="font-semibold text-slate-800 text-base">
              Línea de Orientación (24hs)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Atención gratuita por profesionales de salud mental.
            </p>
            <a
              href="tel:08007772100"
              className="mt-3 flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              0800-777-2100
            </a>
            <p className="text-xs text-slate-500 text-center mt-2">
              No consume crédito / Disponible todo el año.
            </p>
          </div>

          {/* Card 2: Asistencia al Suicida */}
          <div className="border border-red-200 rounded-lg p-4 bg-red-50 hover:bg-red-100 transition-colors">
            <h3 className="font-semibold text-red-900 text-base">
              Asistencia al Suicida
            </h3>
            <p className="text-sm text-red-700 mt-1">
              Contención inmediata y confidencial.
            </p>
            <a
              href="tel:135"
              className="mt-3 flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Llamar al 135
            </a>
          </div>

          {/* Card 3: Centros de Referencia */}
          <div className="border border-slate-200 rounded-lg p-4 bg-white">
            <h3 className="font-semibold text-slate-800 text-base mb-2">
              Centros de Referencia
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="font-bold text-slate-700 min-w-20">
                  Paraná:
                </span>
                <span>
                  Hospital Escuela de Salud Mental (Ambrosetti y Rondeau).
                </span>
              </li>
              <li className="flex gap-2 mt-2 pt-2 border-t border-slate-100 italic text-slate-500">
                <span className="font-bold text-slate-700 min-w-20">
                  Guardias:
                </span>
                <span>Cualquier guardia de hospital público 24hs.</span>
              </li>
            </ul>
          </div>

          {/* Card 4: Cuándo llamar (Alerta) */}
          <div className="border-l-4 border-red-500 bg-red-50/50 p-4 rounded-r-lg">
            <p className="text-sm text-slate-700">
              <strong className="block text-red-800 mb-1">
                ¿Cuándo llamar?
              </strong>
              Ante crisis de angustia severa, riesgo de vida, ideas persistentes
              de daño propio o de terceros, o desorientación total.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={(e) => {
              // Cierra el modal manualmente buscando el botón de cierre nativo de Radix (si usas la versión completa)
              // O simplemente confía en la 'X' superior derecha que ya funciona nativamente.
              const closeBtn = document.querySelector(
                'button[aria-label="Cerrar"]',
              ) as HTMLElement;
              if (closeBtn) closeBtn.click();
            }}
            className="text-sm text-slate-500 hover:text-slate-800 underline px-3 py-1"
          >
            Cerrar ventana
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
