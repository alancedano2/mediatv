// api/epg.xml.js

export const config = {
  runtime: 'edge',
};

function formatDate(date) {
  const pad = (n) => n.toString().padStart(2, '0');
  return (
    date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    ' +0000'
  );
}

function getProgramsForChannel(channel) {
  const now = new Date();
  const day = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));

  const programs = [];

  if (channel === 'kq105tv') {
    const shows = [
      ['Fuera del Aire', 4, 10],
      ['KQ Al Aire con Héctor Ortiz', 10, 14],
      ['KQOnline con Alex Diaz', 14, 19],
      ['La Tendencia de Molusco con Ali, Pamela y Robert', 19, 22],
      ['KQ Al Aire con Pedro Villegas', 22, 23],
      ['Videos Musicales powered by KQ-105', 23, 28],
    ];

    for (let i = 0; i < 3; i++) {
      const base = new Date(day.getTime() + i * 86400000);
      for (const [title, startHour, endHour] of shows) {
        const start = new Date(base.getTime() + startHour * 3600000);
        const end = new Date(base.getTime() + endHour * 3600000);
        programs.push({ channel, title, start, end });
      }
    }

  } else if (channel === 'netflixeventos') {
    const rawStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
    const start = new Date(rawStart.getTime() + 24 * 3600000); // mañana a las 00:00
    const end = new Date(start.getTime() + 3 * 3600000); // 3 horas

    programs.push({
      channel,
      title: 'WWE RAW',
      start,
      end,
    });
  }

  return programs;
}

export default function handler(req) {
  const channels = ['kq105tv', 'netflixeventos'];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<tv>\n`;

  // Channel definitions
  for (const channel of channels) {
    xml += `  <channel id="${channel}">\n    <display-name>${channel}</display-name>\n  </channel>\n`;
  }

  // Program definitions
  for (const channel of channels) {
    const programs = getProgramsForChannel(channel);
    for (const p of programs) {
      xml += `  <programme start="${formatDate(p.start)}" stop="${formatDate(p.end)}" channel="${p.channel}">\n`;
      xml += `    <title lang="es">${p.title}</title>\n`;
      xml += `  </programme>\n`;
    }
  }

  xml += `</tv>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
