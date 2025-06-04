export async function GET() {
  const channels = [
    { id: 'ppv01', name: 'PPV 01', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Shaw_PPV.png' },
    { id: 'bsnpr', name: 'BSN PR', icon: 'https://upload.wikimedia.org/wikipedia/en/f/fe/Baloncesto_Superior_Nacional.png' },
    { id: 'nba', name: 'NBA', icon: 'https://cdn.freebiesupply.com/images/large/2x/nba-logo-transparent.png' },
    { id: 'kq105tv', name: 'KQ105TV', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/KQ_105_Logo.png' },
    { id: 'mlb', name: 'MLB', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Major_League_Baseball_logo.svg/1200px-Major_League_Baseball_logo.svg.png' },
    { id: 'netflixeventos', name: 'Netflix Eventos', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    { id: 'ewotv', name: 'EWO TV', icon: 'https://ewopr-puce.vercel.app/logo.png' },
  ];

  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 3); // 3 meses de programación

  const pad = (num) => num.toString().padStart(2, '0');

  const formatDate = (date) => {
    return (
      date.getFullYear().toString() +
      pad(date.getMonth() + 1) +
      pad(date.getDate()) +
      pad(date.getHours()) +
      pad(date.getMinutes()) +
      pad(date.getSeconds()) +
      ' -0400'
    );
  };

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<tv>\n`;

  // Agregar canales
  for (const channel of channels) {
    xml += `  <channel id="${channel.id}">\n`;
    xml += `    <display-name>${channel.name}</display-name>\n`;
    xml += `    <icon src="${channel.icon}" />\n`;
    xml += `  </channel>\n`;
  }

  // Agregar programación 24/7
  for (const channel of channels) {
    let current = new Date(startDate);
    while (current < endDate) {
      const next = new Date(current);
      next.setDate(next.getDate() + 1);

      xml += `  <programme start="${formatDate(current)}" stop="${formatDate(next)}" channel="${channel.id}">\n`;
      xml += `    <title lang="es">Visiten "mediaiptv.vercel.app" para más detalles</title>\n`;
      xml += `    <desc lang="es">En mediaiptv.vercel.app encontrarás la programación completa y actualizada de este canal.</desc>\n`;
      xml += `  </programme>\n`;

      current = next;
    }
  }

  xml += `</tv>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
