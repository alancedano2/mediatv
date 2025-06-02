export default function handler(req, res) {
  res.setHeader("Content-Type", "application/xml");

  const pad = n => String(n).padStart(2, '0');
  const formatTime = d => {
    return d.getUTCFullYear().toString() +
           pad(d.getUTCMonth() + 1) +
           pad(d.getUTCDate()) +
           pad(d.getUTCHours()) +
           pad(d.getUTCMinutes()) +
           '00 +0000';
  };

  const now = new Date();
  const addHours = (date, h) => new Date(date.getTime() + h * 60 * 60 * 1000);

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

  // Agrega los canales
  channels.forEach(c => {
    xml += `<channel id="${c.id}">
      <display-name>${c.name}</display-name>
    </channel>`;
  });

  // Añade programación a cada canal
  channels.forEach(c => {
    let start = new Date(now);
    for (let i = 0; i < 6; i++) {
      const end = addHours(start, 2);
      xml += `
<programme start="${formatTime(start)}" stop="${formatTime(end)}" channel="${c.id}">
  <title lang="es">Programa ${i + 1} de ${c.name}</title>
  <desc lang="es">Descripción del programa ${i + 1} en ${c.name}</desc>
</programme>`;
      start = end;
    }
  });

  xml += `\n</tv>`;
  res.status(200).send(xml);
}
