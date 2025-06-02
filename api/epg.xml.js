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
];

function formatoEPGTime(dt) {
  return dt.toUTC().toFormat("yyyyLLdd'T'HHmmss'Z'");
}

export default function handler(req, res) {
  const now = DateTime.utc();
  const dias = 3; // Probar con pocos días para debug

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<tv>`;

  // Definir canales
  for (const canal of canales) {
    xml += `\n  <channel id="${canal.id}">\n    <display-name>${canal.nombre}</display-name>\n  </channel>`;
  }

  for (let d = 0; d < dias; d++) {
    const dia = now.plus({ days: d });
    const diaPR = dia.setZone("America/Puerto_Rico");
    const weekday = diaPR.weekday;
    const fecha = diaPR.toFormat("yyyy-MM-dd");

    console.log(`Procesando día ${d}: ${fecha} (weekday ${weekday})`);

    for (const canal of canales) {
      const programas = canal.epg.filter(
        (p) => p.todos || (p.dias && p.dias.includes(weekday))
      );

      console.log(`Canal: ${canal.id} - Programas encontrados: ${programas.length}`);

      programas.forEach((p) => {
        const start = DateTime.fromISO(`${fecha}T${p.inicio}`, {
          zone: "America/Puerto_Rico",
        }).toUTC();

        let stop = DateTime.fromISO(`${fecha}T${p.fin}`, {
          zone: "America/Puerto_Rico",
        }).toUTC();

        if (p.fin === "00:00") stop = stop.plus({ days: 1 });

        console.log(
          `  Programa: ${p.titulo}, start: ${start.toISO()}, stop: ${stop.toISO()}`
        );

        xml += `\n  <programme start="${formatoEPGTime(
          start
        )}" stop="${formatoEPGTime(stop)}" channel="${canal.id}">` +
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
