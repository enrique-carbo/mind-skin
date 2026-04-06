// src/components/react/utils/printHelpers.ts

export const printChart = (elementSelector: string, title?: string) => {
  const element = document.querySelector(elementSelector);
  if (!element) {
    console.error("Elemento no encontrado:", elementSelector);
    return;
  }

  const originalTitle = document.title;
  document.title = title || "MindSkin - Reporte de Estado de Ánimo";

  const printContent = element.cloneNode(true) as HTMLElement;

  // Extraer datos de las filas del gráfico
  const rows = printContent.querySelectorAll(".mood-chart-row");
  const chartData: Array<{
    day: string;
    mood: number;
    icon: string;
    label: string;
  }> = [];

  rows.forEach((row) => {
    const dayElement = row.querySelector(".mood-day-name");
    const moodValue = row.querySelector(".mood-value")?.textContent;

    if (dayElement && moodValue) {
      const mood = parseInt(moodValue);
      let label = "";
      let icon = "";

      switch (mood) {
        case 1:
          label = "Muy mal";
          icon = "😢";
          break;
        case 2:
          label = "Mal";
          icon = "😔";
          break;
        case 3:
          label = "Regular";
          icon = "😐";
          break;
        case 4:
          label = "Bien";
          icon = "🙂";
          break;
        case 5:
          label = "Excelente";
          icon = "😊";
          break;
        default:
          label = "Sin registro";
          icon = "❓";
      }

      chartData.push({
        day: dayElement.textContent || "",
        mood: mood,
        icon: icon,
        label: label,
      });
    }
  });

  const average =
    chartData.length > 0
      ? (
          chartData.reduce((sum, d) => sum + d.mood, 0) / chartData.length
        ).toFixed(1)
      : "0";

  // Obtener la tendencia
  const trendElement = element.querySelector(".mood-trend");
  let trendText = "Estable";
  let trendIcon = "➡️";

  if (trendElement) {
    const trendHtml = trendElement.innerHTML;
    if (trendHtml.includes("Mejorando")) {
      trendText = "Mejorando";
      trendIcon = "📈";
    } else if (trendHtml.includes("Necesita atención")) {
      trendText = "Necesita atención";
      trendIcon = "📉";
    }
  }

  const getBarClass = (score: number) => {
    if (score >= 4) return "high";
    if (score === 3) return "medium";
    if (score === 2) return "low";
    return "very-low";
  };

  try {
    // Abrir ventana
    const printWindow = window.open("", "_blank", "width=800,height=600");

    if (!printWindow) {
      alert(
        "Por favor, permite las ventanas emergentes (pop-ups) para imprimir el reporte.",
      );
      return;
    }

    // Construir el HTML de forma segura sin document.write
    const doc = printWindow.document;

    // 1. Crear y añadir el meta viewport y charset
    const metaCharset = doc.createElement("meta");
    metaCharset.setAttribute("charset", "UTF-8");
    doc.head.appendChild(metaCharset);

    const metaViewport = doc.createElement("meta");
    metaViewport.name = "viewport";
    metaViewport.content = "width=device-width, initial-scale=1.0";
    doc.head.appendChild(metaViewport);

    // 2. Título
    doc.title = "MindSkin - Reporte";

    // 3. Estilos (usando un elemento style)
    const styleElement = doc.createElement("style");
    styleElement.textContent = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      body {
        font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
        padding: 20px;
        background: white;
        color: #1e293b;
        font-size: 14px;
      }
      .print-container {
        max-width: 800px;
        margin: 0 auto;
      }
      .print-header {
        text-align: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 2px solid #e2e8f0;
      }
      .print-header h1 {
        font-size: 24px;
        color: #1e293b;
        margin-bottom: 5px;
      }
      .print-header p {
        color: #64748b;
        font-size: 12px;
      }
      .mood-table {
        width: 100%;
        border-collapse: collapse;
        margin: 15px 0;
      }
      .mood-table th {
        text-align: left;
        padding: 10px 5px;
        background: #f8fafc;
        font-weight: 600;
        color: #475569;
        border-bottom: 2px solid #e2e8f0;
        font-size: 12px;
      }
      .mood-table td {
        padding: 10px 5px;
        border-bottom: 1px solid #e2e8f0;
        vertical-align: middle;
      }
      .col-day {
        width: 60px;
        font-weight: 500;
        font-size: 12px;
      }
      .col-icon {
        width: 80px;
        text-align: center;
      }
      .mood-icon-value {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
      }
      .mood-emoji {
        font-size: 20px;
      }
      .mood-number {
        font-weight: 700;
        font-size: 14px;
      }
      .col-progress {
        width: 100%;
      }
      .progress-bar-container {
        background: #f1f5f9;
        border-radius: 8px;
        height: 24px;
        overflow: hidden;
        position: relative;
      }
      .progress-bar-fill {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 8px;
        color: white;
        font-size: 10px;
        font-weight: 600;
      }
      .progress-bar-fill.high { background: linear-gradient(90deg, #22c55e, #16a34a); }
      .progress-bar-fill.medium { background: linear-gradient(90deg, #eab308, #ca8a04); }
      .progress-bar-fill.low { background: linear-gradient(90deg, #ef4444, #dc2626); }
      .progress-bar-fill.very-low { background: linear-gradient(90deg, #f97316, #ea580c); }
      .progress-label {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: 600;
        color: #1e293b;
        pointer-events: none;
      }
      .summary {
        margin-top: 20px;
        padding: 15px;
        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        border-radius: 12px;
        text-align: center;
      }
      .summary-grid {
        display: flex;
        justify-content: space-around;
        gap: 10px;
        flex-wrap: wrap;
      }
      .summary-item {
        text-align: center;
        min-width: 80px;
      }
      .summary-label {
        font-size: 10px;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .summary-value {
        font-size: 24px;
        font-weight: 700;
        color: #1e293b;
      }
      .summary-trend {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        font-size: 14px;
        font-weight: 600;
      }
      .trend-up { color: #22c55e; }
      .trend-down { color: #ef4444; }
      .trend-stable { color: #64748b; }
      .footer {
        margin-top: 30px;
        padding-top: 15px;
        text-align: center;
        font-size: 10px;
        color: #94a3b8;
        border-top: 1px solid #e2e8f0;
      }
      @media print {
        body { padding: 0; background: white; }
        .print-container { width: 100%; max-width: none; }
      }
      @media screen and (max-width: 600px) {
        body { padding: 10px; }
        .print-header h1 { font-size: 20px; }
        .summary-grid { flex-direction: column; gap: 15px; }
      }
    `;
    doc.head.appendChild(styleElement);

    // 4. Cuerpo del documento
    const bodyContent = `
      <div class="print-container">
        <div class="print-header">
          <h1>🧠 MindSkin - Reporte de Ánimo</h1>
          <p>${new Date().toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>

        <table class="mood-table">
          <thead>
            <tr>
              <th>Día</th>
              <th>Estado</th>
              <th>Progreso</th>
            </tr>
          </thead>
          <tbody>
            ${chartData
              .map(
                (data) => `
              <tr>
                <td class="col-day">${data.day}</td>
                <td class="col-icon">
                  <div class="mood-icon-value">
                    <span class="mood-emoji">${data.icon}</span>
                    <span class="mood-number">${data.mood}/5</span>
                  </div>
                </td>
                <td class="col-progress">
                  <div class="progress-bar-container">
                    <div class="progress-bar-fill ${getBarClass(data.mood)}" style="width: ${(data.mood / 5) * 100}%"></div>
                    <div class="progress-label">${data.label}</div>
                  </div>
                </td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>

        <div class="summary">
          <div class="summary-grid">
            <div class="summary-item">
              <div class="summary-label">Promedio</div>
              <div class="summary-value">${average} / 5</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Registros</div>
              <div class="summary-value">${chartData.filter((d) => d.mood > 0).length} / 7</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Tendencia</div>
              <div class="summary-trend">
                <span>${trendIcon}</span>
                <span class="trend-${trendText === "Mejorando" ? "up" : trendText === "Necesita atención" ? "down" : "stable"}">
                  ${trendText}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="footer">
          <p>🧘 MindSkin - Mente Sana, Piel Sana</p>
          <p>www.mindskin.medicodermatologo.com.ar</p>
        </div>
      </div>
    `;

    doc.body.innerHTML = bodyContent;

    // 5. Imprimir
    // Pequeño timeout para asegurar que el DOM está renderizado
    setTimeout(() => {
      printWindow.focus(); // Crucial para iOS
      printWindow.print();
      // No cerramos automáticamente para permitir al usuario ver el preview o guardar
    }, 250);
  } catch (error) {
    console.error("Error al intentar imprimir:", error);
    alert("Hubo un error al generar el reporte.");
  } finally {
    document.title = originalTitle;
  }
};
