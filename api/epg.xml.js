export default function handler(req, res) {
  const channels = [
    "ppv01", "bsnpr", "nba", "kq105tv", "mlb", "netflixeventos", "ewotv"
  ];

  const now = new Date();
  const timezoneOffset = -4; // UTC-4
  now.setUTCHours(now.getUTCHours() + timezoneOffset);

  const getFormattedTime = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + ' +0000';
  };

  let epg = `<?xml version="1.0" encoding="UTF-8"?>\n<tv>\n`;

  channels.forEach(channel => {
    epg += `  <channel id="${channel}">\n    <display-name>${channel.toUpperCase()}</display-name>\n  </channel>\n`;

    const blockHours = 2;
    const days = 90;
    const totalBlocks = (24 / blockHours) * days; // 12 bloques por día * 90 días

    let start = new Date(now);

    for (let i = 0; i < totalBlocks; i++) {
      let stop = new Date(start);
      stop.setHours(stop.getHours() + blockHours);

      epg += `  <programme start="${getFormattedTime(start)}" stop="${getFormattedTime(stop)}" channel="${channel}">\n`;
      epg += `    <title lang="es">Visiten "mediaiptv.vercel.app" para más detalles</title>\n`;
      epg += `    <desc lang="es">En mediaiptv.vercel.app encontrarás la programación completa, horarios y más contenido de cada canal.</desc>\n`;
      epg += `  </programme>\n`;

      start = new Date(stop);
    }
  });

  epg += `</tv>`;

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(epg);
}
