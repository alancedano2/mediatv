// /api/epg.xml.js

export default function handler(req, res) {
  // Ejemplo simple de canales y programas
  const canales = [
    {
      id: 'kq105tv',
      nombre: 'KQ105 TV',
      programas: [
        {
          titulo: 'Fuera del Aire',
          inicio: '2025-06-02T04:00:00.000Z',
          fin: '2025-06-02T10:00:00.000Z',
        },
        {
          titulo: 'KQ Al Aire con Héctor Ortiz',
          inicio: '2025-06-02T10:00:00.000Z',
          fin: '2025-06-02T14:00:00.000Z',
        },
        // ...otros programas
      ],
    },
    // Puedes agregar más canales aquí
  ];

  // Función para convertir fecha ISO a formato EPG (YYYYMMDDHHMMSS + timezone)
  function formatoEPG(fechaISO) {
    const fecha = new Date(fechaISO);
    // Ejemplo: 20250602040000 +0000 (UTC)
    const pad = (n) => n.toString().padStart(2, '0');
    const yyyy = fecha.getUTCFullYear();
    const mm = pad(fecha.getUTCMonth() + 1);
    const dd = pad(fecha.getUTCDate());
    const hh = pad(fecha.getUTCHours());
    const min = pad(fecha.getUTCMinutes());
    const ss = pad(fecha.getUTCSeconds());
    return `${yyyy}${mm}${dd}${hh}${min}${ss} +0000`;
  }

  // Construir XML EPG básico
  let epgXml = `<?xml version="1.0" encoding="UTF-8" ?>
<tv>
`;

  // Añadir canales
  for (const canal of canales) {
    epgXml += `  <channel id="${canal.id}">
    <display-name>${canal.nombre}</display-name>
  </channel>
`;
  }

  // Añadir programas
  for (const canal of canales) {
    for (const programa of canal.programas) {
      epgXml += `  <programme start="${formatoEPG(programa.inicio)}" stop="${formatoEPG(programa.fin)}" channel="${canal.id}">
    <title>${programa.titulo}</title>
  </programme>
`;
    }
  }

  epgXml += '</tv>';

  // Responder con XML
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.status(200).send(epgXml);
}
