// epg.js - Generador de EPG XML desde JSON personalizado

const fs = require("fs");
const path = require("path");
const { DateTime } = require("luxon");

// Datos de canales con EPG personalizados
const canales = [
  {
    id: "netflixeventos",
    nombre: "Netflix Eventos",
    epg: [
      { dias: [1], inicio: "20:00", fin: "23:00", titulo: "WWE RAW" },
      { dias: [5], inicio: "20:00", fin: "23:00", titulo: "WWE SmackDown" },
    ],
  },
  {
    id: "kq105tv",
    nombre: "KQ-105 TV",
    epg: [
      { todos: true, inicio: "00:00", fin: "06:00", titulo: "Fuera del Aire" },
      { todos: true, inicio: "06:00", fin: "10:00", titulo: "KQ Al Aire con Héctor Ortiz" },
      { todos: true, inicio: "10:00", fin: "15:00", titulo: "KQOnline con Alex Diaz" },
      { todos: true, inicio: "15:00", fin: "18:00", titulo: "La Tendencia de Molusco con Ali, Pamela y Robert" },
      { todos: true, inicio: "18:00", fin: "19:00", titulo: "KQ Al Aire con Pedro Villegas" },
      { todos: true, inicio: "19:00", fin: "00:00", titulo: "Videos Musicales powered by KQ-105" },
    ],
  },
  {
    id: "ppv01",
    nombre: "PPV 01",
    epg: [
      { todos: true, inicio: "00:00", fin: "00:00", titulo: "Visite mediaiptv.vercel.app para más detalles" },
    ],
  },
  {
    id: "nba",
    nombre: "NBA",
    epg_fechas: [
      { fecha: "2025-06-05", inicio: "20:00", fin: "23:00", titulo: "NBA Finals: Game 1 - Pacers vs Thunder" },
      { fecha: "2025-06-08", inicio: "20:00", fin: "23:00", titulo: "NBA Finals: Game 2 - Pacers vs Thunder" },
      { fecha: "2025-06-11", inicio: "20:00", fin: "23:00", titulo: "NBA Finals: Game 3 - Pacers vs Thunder" },
      { fecha: "2025-06-13", inicio: "20:00", fin: "23:00", titulo: "NBA Finals: Game 4 - Pacers vs Thunder" },
    ],
  },
  {
    id: "mlb",
    nombre: "MLB",
    epg: [
      { todos: true, inicio: "00:00", fin: "00:00", titulo: "Visite mediaiptv.vercel.app para más detalles" },
    ],
  },
  {
    id: "ewotv",
    nombre: "EWO TV",
    epg: [
      { dias: [1, 2, 3, 4, 5], inicio: "00:00", fin: "08:00", titulo: "Fuera del Aire" },
      { dias: [1, 2, 3, 4, 5], inicio: "08:00", fin: "09:30", titulo: "eWo La Verdad Absoluta" },
      { dias: [1, 2, 3, 4, 5], inicio: "09:30", fin: "10:00", titulo: "Cuenta Regresiva para eWo El Update" },
      { dias: [1, 2, 3, 4, 5], inicio: "10:00", fin: "11:00", titulo: "eWo El Update" },
      { dias: [1, 2, 3, 4, 5], inicio: "11:00", fin: "15:00", titulo: "eWo ThrowBack" },
      { dias: [1, 2, 3, 4, 5], inicio: "15:00", fin: "15:30", titulo: "eWo El Perfil" },
      { dias: [1, 2, 3, 4, 5], inicio: "15:30", fin: "17:30", titulo: "eWo 24/7 Retro" },
      { dias: [1, 2, 3, 4, 5], inicio: "17:30", fin: "22:00", titulo: "Fuera del Aire" },
      { dias: [6, 7], inicio: "00:00", fin: "00:00", titulo: "Fuera del Aire" },
    ],
  },
  {
    id: "bsnpr",
    nombre: "BSN PR",
    epg: [
      { todos: true, inicio: "00:00", fin: "00:00", titulo: "Visite mediaiptv.vercel.app para más detalles" },
    ],
  },
];

function formatoEPGTime(dt) {
  return dt.toUTC().toFormat("yyyyLLdd'T'HHmmss") + " +0000";
}

function generarEPG() {
  const now = DateTime.utc();
  const dias = 14;
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<tv>`;

  for (const canal of canales) {
    xml += `\n  <channel id=\"${canal.id}\">\n    <display-name>${canal.nombre}</display-name>\n  </channel>`;
  }

  for (let d = 0; d < dias; d++) {
    const dia = now.plus({ days: d });
    const weekday = dia.weekday; // 1=lunes ... 7=domingo
    const fecha = dia.toFormat("yyyy-MM-dd");

    for (const canal of canales) {
      if (canal.epg_fechas) {
        canal.epg_fechas.forEach(prog => {
          if (prog.fecha === fecha) {
            const start = DateTime.fromISO(`${fecha}T${prog.inicio}`).toUTC();
            const stop = DateTime.fromISO(`${fecha}T${prog.fin}`).toUTC();
            xml += `\n  <programme start=\"${formatoEPGTime(start)}\" stop=\"${formatoEPGTime(stop)}\" channel=\"${canal.id}\">\n    <title lang=\"es\">${prog.titulo}</title>\n    <desc lang=\"es\">${prog.titulo}</desc>\n  </programme>`;
          }
        });
        continue;
      }

      const horarios = canal.epg.filter(p =>
        p.todos || (p.dias && p.dias.includes(weekday))
      );

      horarios.forEach(h => {
        const start = DateTime.fromISO(`${fecha}T${h.inicio}`).toUTC();
        const stop = DateTime.fromISO(`${fecha}T${h.fin}`).toUTC();
        xml += `\n  <programme start=\"${formatoEPGTime(start)}\" stop=\"${formatoEPGTime(stop)}\" channel=\"${canal.id}\">\n    <title lang=\"es\">${h.titulo}</title>\n    <desc lang=\"es\">${h.titulo}</desc>\n  </programme>`;
      });
    }
  }

  xml += `\n</tv>`;
  fs.writeFileSync(path.join(__dirname, "epg.xml"), xml, "utf-8");
  console.log("✅ EPG generado exitosamente.");
}

// Ejecutar
if (require.main === module) {
  generarEPG();
}
