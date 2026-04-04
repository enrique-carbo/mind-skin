export type MoodEntry = {
  date: string;
  score: number;
  emoji: string;
};

export const MOOD_CONFIG = [
  { score: 1, icon: "Frown", label: "Muy mal", color: "text-red-500" },
  { score: 2, icon: "Annoyed", label: "Mal", color: "text-orange-500" },
  { score: 3, icon: "Meh", label: "Regular", color: "text-yellow-500" },
  { score: 4, icon: "Smile", label: "Bien", color: "text-green-400" },
  { score: 5, icon: "Laugh", label: "Excelente", color: "text-green-600" },
];

// Grounding steps
export const GROUNDING_STEPS = [
  { id: 5, sense: "VISTA", items: "5 cosas que puedes ver", icon: "👁️" },
  { id: 4, sense: "TACTO", items: "4 cosas que puedes tocar", icon: "✋" },
  { id: 3, sense: "OÍDO", items: "3 cosas que puedes oír", icon: "👂" },
  { id: 2, sense: "OLFATO", items: "2 cosas que puedes oler", icon: "👃" },
  { id: 1, sense: "GUSTO", items: "1 cosa que puedes saborear", icon: "👅" },
];

// Educational content cards
export const EDUCATION_CARDS = [
  {
    id: 1,
    title: "Cortisol e Inflamación",
    icon: "🔬",
    content:
      "El estrés crónico eleva los niveles de cortisol, lo que aumenta la inflamación en todo el cuerpo, incluyendo la piel. Esto puede desencadenar brotes de acné, eccema y psoriasis.",
    tips: [
      "Practica meditación 10 minutos diarios",
      "Establece rutinas de sueño regulares",
      "Identifica y reduce tus factores de estrés",
    ],
  },
  {
    id: 2,
    title: "El Ciclo del Rascado",
    icon: "🤲",
    content:
      "El rascado provoca una sensación de alivio temporal, pero libera histamina y aumenta la inflamación, causando más picazón. Es un ciclo difícil de romper sin herramientas.",
    tips: [
      "Usa la técnica STOP ante el impulso",
      "Aplica compresas frías para aliviar la picazón",
      "Mantén las uñas cortas y limpias",
    ],
  },
  {
    id: 3,
    title: "Piel y Autoestima",
    icon: "💙",
    content:
      "Las condiciones de la piel pueden afectar profundamente la autoimagen. La aceptación corporal es un camino que reduce el estrés psicológico y, paradójicamente, mejora la piel.",
    tips: [
      "Practica el Body Scan adaptado",
      "Focus en la función de tu piel (protección) no solo en apariencia",
      "Evita comparaciones constantes",
    ],
  },
  {
    id: 4,
    title: "Sueño y Regeneración",
    icon: "🌙",
    content:
      "Durante el sueño, la piel se repara y regenera. La falta de sueño interrumpe este proceso y aumenta los marcadores de inflamación.",
    tips: [
      "Apaga pantallas 1 hora antes de dormir",
      "Mantén la habitación fresca y oscura",
      "Usa esta app antes de dormir para relajarte",
    ],
  },
  {
    id: 5,
    title: "Alimentación Anti-Inflamatoria",
    icon: "🥗",
    content:
      "Los alimentos que comemos influyen directamente en la salud de la piel. Una dieta rica en antioxidantes y omega-3 ayuda a reducir la inflamación sistémica.",
    tips: [
      "Aumenta consumo de pescado, nueces y semillas",
      "Incluye frutas y verduras de colores",
      "Reduce azúcares refinados y procesados",
    ],
  },
  {
    id: 6,
    title: "Comunicación con tu Dermatólogo",
    icon: "👨‍⚕️",
    content:
      "El bienestar emocional es información valiosa para tu tratamiento. Comparte tus niveles de estrés con tu especialista para un enfoque integral.",
    tips: [
      "Lleva un registro de tu estado de ánimo",
      "Nota si los brotes coinciden con períodos de estrés",
      "Pregunta sobre terapias complementarias",
    ],
  },
];

export const MOOD_STORAGE_KEY = "mindskin_mood_data";
export const SETTINGS_STORAGE_KEY = "mindskin_settings";

export const saveMoodData = (data: MoodEntry[]) => {
  localStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(data));
};

export const loadMoodData = (): MoodEntry[] => {
  const stored = localStorage.getItem(MOOD_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Sonido de campana (Tibetan bell)
export const playBell = () => {
  const audioContext = new (
    window.AudioContext || (window as any).webkitAudioContext
  )();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.frequency.value = 432;
  oscillator.type = "sine";
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 3,
  );
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 3);
};
