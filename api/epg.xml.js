export default function handler(req, res) {
  res.setHeader("Content-Type", "application/xml");
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');

  const formatTime = date => {
    return date.getUTCFullYear().toString() +
           pad(date.getUTCMonth() + 1) +
           pad(date.getUTCDate()) +
           pad(date.getUTCHours()) +
           pad(date.getUTCMinutes()) +
           '00 +0000';
  };

  const channels = [
    { id: "netflixeventos", name: "Netflix Eventos" },
    { id: "kq105tv", name: "KQ-105 TV" },
    { id: "ppv01", name: "PPV 01" },
    { id: "nba", name: "NBA" },
    { id: "mlb", name: "MLB" },
    { id: "ewotv", name: "EWO TV" },
    { id: "bsnpr", name: "BSN PR" },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<tv generator-info-name="streamverse">`;

  channels.forEach(c => {
    xml += `<channel id="${c.id}">
      <display-name>${c.name}</display-name>
    </channel>`;
  });

  // Aquí va tu programación real (por ahora simplificada)
  const addProgram = (channelId, start, stop, title) => {
    xml += `<programme start="${start}" stop="${stop}" channel="${channelId}">
      <title lang="es">${title}</title>
    </programme>`;
  };

  // Ejemplo de uso para KQ-105 (todos los días)
  const startDate = new Date(now);
  startDate.setUTCHours(6, 0, 0, 0);
  for (let i = 0; i < 7; i++) {
    const day = new Date(startDate);
    day.setUTCDate(day.getUTCDate() + i);
    let base = new Date(day);
    
    addProgram("kq105tv", formatTime(base), formatTime(new Date(base.setUTCHours(10))), "KQ Al Aire con Héctor Ortiz");
    addProgram("kq105tv", formatTime(base), formatTime(new Date(base.setUTCHours(15))), "KQOnline con Alex Diaz");
    addProgram("kq105tv", formatTime(base), formatTime(new Date(base.setUTCHours(18))), "La Tendencia de Molusco");
    addProgram("kq105tv", formatTime(base), formatTime(new Date(base.setUTCHours(19))), "KQ con Pedro Villegas");
    addProgram("kq105tv", formatTime(base), formatTime(new Date(base.setUTCHours(24))), "Videos Musicales");
  }

  xml += `</tv>`;
  res.status(200).send(xml);
}
