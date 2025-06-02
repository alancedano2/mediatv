import { DateTime } from "luxon";

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
  return dt.toUTC().toFormat("yyyyLLdd'T'HHmmss'Z'");
}

export default function handler(req, res) {
  const now = DateTime.utc();
  const dias = 14; // 14 días de programación
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<tv>`;

  // Definir canales
  for (const canal of canales) {
    xml += `\n  <channel id="${canal.id}">\n    <display-name>${canal.nombre}</display-name>\n  </channel>`;
  }

  // Programas para cada día y canal
  for (let d = 0; d < dias; d++) {
    const dia = now.plus({ days: d });
    const weekday = dia.setZone('America/Puerto_Rico').weekday; // Para usar la zona PR en el día de la semana
    const fecha = dia.setZone('America/Puerto_Rico').toFormat("yyyy-MM-dd");

    for (const canal of canales) {
      if (canal.epg_fechas) {
        canal.epg_fechas.forEach(prog => {
          if (prog.fecha === fecha) {
            const start = DateTime.fromISO(`${fecha}T${prog.inicio}`, { zone: 'America/Puerto_Rico' }).toUTC();
            let stop = DateTime.fromISO(`${fecha}T${prog.fin}`, { zone: 'America/Puerto_Rico' }).toUTC();
            if (prog.fin === "00:00") stop = stop.plus({ days: 1 });
            xml += `\n  <programme start="${formatoEPGTime(start)}" stop="${formatoEPGTime(stop)}" channel="${canal.id}">` +
                   `\n    <title lang="es">${prog.titulo}</title>` +
                   `\n    <desc lang="es">${prog.titulo}</desc>` +
                   `\n  </programme>`;
          }
        });
        continue;
      }

      const programas = canal.epg.filter(p =>
        p.todos || (p.dias && p.dias.includes(weekday))
      );

      programas.forEach(p => {
        const start = DateTime.fromISO(`${fecha}T${p.inicio}`, { zone: 'America/Puerto_Rico' }).toUTC();
        let stop = DateTime.fromISO(`${fecha}T${p.fin}`, { zone: 'America/Puerto_Rico' }).toUTC();
        if (p.fin === "00:00") stop = stop.plus({ days: 1 });

        xml += `\n  <programme start="${formatoEPGTime(start)}" stop="${formatoEPGTime(stop)}" channel="${canal.id}">` +
               `\n    <title lang="es">${p.titulo}</title>` +
               `\n    <desc lang="es">${p.titulo}</desc>` +
               `\n  </programme>`;
      });
    }
  }

  xml += `\n</tv>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.status(200).send(xml);
}
