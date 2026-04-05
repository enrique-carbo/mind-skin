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
    const iconElement = row.querySelector(".mood-icon");

    if (dayElement && moodValue) {
      const mood = parseInt(moodValue);
      let label = "";
      let icon = "";

      // Mapear puntaje a descripción y emoji
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

  // Estilos mejorados para la impresión
  const styles = `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
        padding: 40px;
        background: white;
        color: #1e293b;
      }

      .print-container {
        max-width: 900px;
        margin: 0 auto;
      }

      .print-header {
        text-align: center;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 2px solid #e2e8f0;
      }

      .print-header h1 {
        font-size: 28px;
        color: #1e293b;
        margin-bottom: 8px;
      }

      .print-header p {
        color: #64748b;
        font-size: 14px;
      }

      /* Tabla de estado de ánimo */
      .mood-table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }

      .mood-table th {
        text-align: left;
        padding: 12px 8px;
        background: #f8fafc;
        font-weight: 600;
        color: #475569;
        border-bottom: 2px solid #e2e8f0;
      }

      .mood-table td {
        padding: 12px 8px;
        border-bottom: 1px solid #e2e8f0;
        vertical-align: middle;
      }

      /* Columna de día */
      .col-day {
        width: 80px;
        font-weight: 500;
      }

      /* Columna de icono y valor */
      .col-icon {
        width: 100px;
        text-align: center;
      }

      .mood-icon-value {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .mood-emoji {
        font-size: 24px;
      }

      .mood-number {
        font-weight: 700;
        font-size: 18px;
        min-width: 30px;
      }

      /* Barra de progreso */
      .col-progress {
        flex: 1;
      }

      .progress-bar-container {
        background: #f1f5f9;
        border-radius: 12px;
        height: 32px;
        overflow: hidden;
        position: relative;
      }

      .progress-bar-fill {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 12px;
        color: white;
        font-size: 12px;
        font-weight: 600;
        transition: width 0.3s ease;
      }

      .progress-bar-fill.high {
        background: linear-gradient(90deg, #22c55e, #16a34a);
      }

      .progress-bar-fill.medium {
        background: linear-gradient(90deg, #eab308, #ca8a04);
      }

      .progress-bar-fill.low {
        background: linear-gradient(90deg, #ef4444, #dc2626);
      }

      .progress-bar-fill.very-low {
        background: linear-gradient(90deg, #f97316, #ea580c);
      }

      .progress-label {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 600;
        color: #1e293b;
        pointer-events: none;
      }

      /* Resumen */
      .summary {
        margin-top: 30px;
        padding: 20px;
        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        border-radius: 16px;
        text-align: center;
      }

      .summary-grid {
        display: flex;
        justify-content: center;
        gap: 40px;
        flex-wrap: wrap;
      }

      .summary-item {
        text-align: center;
      }

      .summary-label {
        font-size: 12px;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .summary-value {
        font-size: 32px;
        font-weight: 700;
        color: #1e293b;
      }

      .summary-trend {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 18px;
        font-weight: 600;
      }

      .trend-up { color: #22c55e; }
      .trend-down { color: #ef4444; }
      .trend-stable { color: #64748b; }

      /* Footer */
      .footer {
        margin-top: 40px;
        padding-top: 20px;
        text-align: center;
        font-size: 11px;
        color: #94a3b8;
        border-top: 1px solid #e2e8f0;
      }

      @media print {
        body {
          padding: 20px;
        }

        .progress-bar-fill {
          background-color: #22c55e !important;
          print-color-adjust: exact;
        }
      }
    </style>
  `;

  // Obtener la tendencia del elemento original
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
    } else {
      trendText = "Estable";
      trendIcon = "➡️";
    }
  }

  // Función para obtener clase de color según puntaje
  const getBarClass = (score: number) => {
    if (score >= 4) return "high";
    if (score === 3) return "medium";
    if (score === 2) return "low";
    return "very-low";
  };

  const printWindow = window.open("", "_blank");

  if (printWindow) {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>MindSkin - Reporte de Estado de Ánimo</title>
          ${styles}
        </head>
        <body>
          <div class="print-container">
            <div class="print-header">
              <h1>🧠 MindSkin - Reporte de Estado de Ánimo</h1>
              <p>Generado el ${new Date().toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })} a las ${new Date().toLocaleTimeString("es-ES")}</p>
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
                        <div
                          class="progress-bar-fill ${getBarClass(data.mood)}"
                          style="width: ${(data.mood / 5) * 100}%"
                        >
                          ${data.mood >= 3 ? `${Math.round((data.mood / 5) * 100)}%` : ""}
                        </div>
                        <div class="progress-label">
                          ${data.label}
                        </div>
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
                  <div class="summary-label">Promedio de Ánimo</div>
                  <div class="summary-value">${average} / 5</div>
                </div>
                <div class="summary-item">
                  <div class="summary-label">Días registrados</div>
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
              <p>Los datos son privados y se almacenan solo en tu dispositivo</p>
              <p>www.mindskin.medicodermatologo.com.ar</p>
            </div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  }

  document.title = originalTitle;
};
