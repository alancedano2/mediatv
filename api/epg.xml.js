export default function handler(req, res) {
  const channels = [
    "ppv01", "bsnpr", "nba", "kq105tv", "mlb", "netflixeventos", "ewotv"
  ];

  const now = new Date();
  const timezoneOffset = -4; // Puerto Rico UTC-4
  now.setUTCHours(now.getUTCHours() + timezoneOffset);

  const getFormattedTime = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + ' +0000';
  };

  let epg = `<?xml version="1.0" encoding="UTF-8"?>\n<tv>\n`;

  channels.forEach(channel => {
    epg += `  <channel id="${channel}">\n    <display-name>${channel.toUpperCase()}</display-name>\n  </channel>\n`;

    // Generar bloques de 2 horas por 24 horas
    for (let i = 0; i < 24; i += 2) {
      const start = new Date(now);
      start.setHours(i, 0, 0, 0);
      const stop = new Date(now);
      stop.setHours(i + 2, 0, 0, 0);

      epg += `  <programme start="${getFormattedTime(start)}" stop="${getFormattedTime(stop)}" channel="${channel}">\n`;
      epg += `    <title lang="es">Visiten "mediaiptv.vercel.app" para más detalles</title>\n`;
      epg += `    <desc lang="es">En mediaiptv.vercel.app encontrarás la programación completa, horarios y más contenido de cada canal.</desc>\n`;
      epg += `  </programme>\n`;
    }
  });

  epg += `</tv>`;

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(epg);
}
