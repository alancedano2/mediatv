// api/epg.xml.js
import { format } from 'date-fns';

function formatDateTime(date) {
  return format(date, "yyyyMMddHHmmss ZZZZ").replace(' ', '');
}

function generateProgram(channelId, title, start, stop) {
  return `
    <programme start="${formatDateTime(start)}" stop="${formatDateTime(stop)}" channel="${channelId}">
      <title lang="es">${title}</title>
    </programme>`;
}

export async function GET() {
  const now = new Date();

  // --- Canales ---

  const channels = [
    {
      id: "netflixeventos",
      name: "Netflix Eventos",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
      epg: [
        // Sab y Dom 24h Fuera del Aire
        { day: 6, start: "00:00", end: "23:59", title: "Fuera Del Aire" }, // Sábado
        { day: 0, start: "00:00", end: "23:59", title: "Fuera Del Aire" }, // Domingo

        // Lunes
        { day: 1, start: "00:00", end: "15:00", title: "Fuera Del Aire" },
        { day: 1, start: "15:00", end: "20:00", title: "Fuera Del Aire" },
        { day: 1, start: "20:00", end: "22:30", title: "WWE Raw" },
        { day: 1, start: "22:30", end: "24:00", title: "Fuera Del Aire" },

        // Martes
        { day: 2, start: "00:00", end: "15:00", title: "Fuera Del Aire" },
        { day: 2, start: "15:00", end: "20:00", title: "Fuera Del Aire" },
        { day: 2, start: "20:00", end: "22:00", title: "WWE NXT" },
        { day: 2, start: "22:00", end: "24:00", title: "Fuera Del Aire" },

        // Miércoles
        { day: 3, start: "00:00", end: "24:00", title: "Fuera Del Aire" },

        // Jueves
        { day: 4, start: "00:00", end: "24:00", title: "Fuera Del Aire" },

        // Viernes
        { day: 5, start: "00:00", end: "15:00", title: "Fuera Del Aire" },
        { day: 5, start: "15:00", end: "20:00", title: "Fuera Del Aire" },
        { day: 5, start: "20:00", end: "23:00", title: "WWE SmackDown" },
        { day: 5, start: "23:00", end: "24:00", title: "Fuera Del Aire" },
      ],
    },
    {
      id: "kq105tv",
      name: "KQ105TV",
      logo: "https://upload.wikimedia.org/wikipedia/en/f/fe/Baloncesto_Superior_Nacional.png",
      epg: [
        // Sab y Dom 24h Fuera del Aire
        { day: 6, start: "00:00", end: "24:00", title: "Fuera del Aire" },
        { day: 0, start: "00:00", end: "24:00", title: "Fuera del Aire" },

        // Lunes a Viernes
        { day: 1, start: "00:00", end: "06:00", title: "Fuera del Aire" },
        { day: 1, start: "06:00", end: "10:00", title: "KQ Al Aire con Héctor Ortiz" },
        { day: 1, start: "10:00", end: "15:00", title: "KQOnline con Alex Diaz" },
        { day: 1, start: "15:00", end: "18:00", title: "La Tendencia de Molusco con Ali, Pamela y Robert" },
        { day: 1, start: "18:00", end: "19:00", title: "KQ Al Aire con Pedro Villegas" },
        { day: 1, start: "19:00", end: "24:00", title: "Videos Musicales powered by KQ-105" },

        { day: 2, start: "00:00", end: "06:00", title: "Fuera del Aire" },
        { day: 2, start: "06:00", end: "10:00", title: "KQ Al Aire con Héctor Ortiz" },
        { day: 2, start: "10:00", end: "15:00", title: "KQOnline con Alex Diaz" },
        { day: 2, start: "15:00", end: "18:00", title: "La Tendencia de Molusco con Ali, Pamela y Robert" },
        { day: 2, start: "18:00", end: "19:00", title: "KQ Al Aire con Pedro Villegas" },
        { day: 2, start: "19:00", end: "24:00", title: "Videos Musicales powered by KQ-105" },

        { day: 3, start: "00:00", end: "06:00", title: "Fuera del Aire" },
        { day: 3, start: "06:00", end: "10:00", title: "KQ Al Aire con Héctor Ortiz" },
        { day: 3, start: "10:00", end: "15:00", title: "KQOnline con Alex Diaz" },
        { day: 3, start: "15:00", end: "18:00", title: "La Tendencia de Molusco con Ali, Pamela y Robert" },
        { day: 3, start: "18:00", end: "19:00", title: "KQ Al Aire con Pedro Villegas" },
        { day: 3, start: "19:00", end: "24:00", title: "Videos Musicales powered by KQ-105" },

        { day: 4, start: "00:00", end: "06:00", title: "Fuera del Aire" },
        { day: 4, start: "06:00", end: "10:00", title: "KQ Al Aire con Héctor Ortiz" },
        { day: 4, start: "10:00", end: "15:00", title: "KQOnline con Alex Diaz" },
        { day: 4, start: "15:00", end: "18:00", title: "La Tendencia de Molusco con Ali, Pamela y Robert" },
        { day: 4, start: "18:00", end: "19:00", title: "KQ Al Aire con Pedro Villegas" },
        { day: 4, start: "19:00", end: "24:00", title: "Videos Musicales powered by KQ-105" },

        { day: 5, start: "00:00", end: "06:00", title: "Fuera del Aire" },
        { day: 5, start: "06:00", end: "10:00", title: "KQ Al Aire con Héctor Ortiz" },
        { day: 5, start: "10:00", end: "15:00", title: "KQOnline con Alex Diaz" },
        { day: 5, start: "15:00", end: "18:00", title: "La Tendencia de Molusco con Ali, Pamela y Robert" },
        { day: 5, start: "18:00", end: "19:00", title: "KQ Al Aire con Pedro Villegas" },
        { day: 5, start: "19:00", end: "24:00", title: "Videos Musicales powered by KQ-105" },
      ],
    },
    {
      id: "ppv01",
      name: "PPV 01",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Shaw_PPV.png",
      epg: [
        { day: -1, start: "00:00", end: "24:00", title: "Visite mediaiptv.vercel.app para más detalles" },
      ],
    },
    {
      id: "nba",
      name: "NBA",
      logo: "https://cdn.freebiesupply.com/images/large/2x/nba-logo-transparent.png",
      epg: [
        { day: -1, start: "00:00", end: "24:00", title: "Fuera del Aire" },
        // Aquí añado algunos eventos de NBA Finals que mencionaste
        // Puedes añadir más días/horarios según necesites
      ],
    },
    {
      id: "bsnpr",
      name: "BSN Puerto Rico",
      logo: "https://bsnpr.com/wp-content/uploads/2021/05/bsn-logo.png",
      epg: [
        { day: -1, start: "00:00", end: "24:00", title: "Fuera del Aire" },
      ],
    },
  ];

  // Crear XML

  let xml = `<?xml version="1.0" encoding="UTF-8" ?>
<tv generator-info-name="StreamVerse EPG Generator" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="xmltv.dtd">\n`;

  // Agregar canales
  for (const channel of channels) {
    xml += `  <channel id="${channel.id}">
    <display-name lang="es">${channel.name}</display-name>
    <icon src="${channel.logo}" />
  </channel>\n`;
  }

  // Función para convertir horas y minutos a Date para hoy o el día correcto
  function getDateForDayAndTime(dayOfWeek, timeStr) {
    const [hour, minute] = timeStr.split(":").map(Number);
    const date = new Date();
    const currentDay = date.getDay();
    const dayDiff = (dayOfWeek - currentDay + 7) % 7;
    date.setDate(date.getDate() + dayDiff);
    date.setHours(hour, minute, 0, 0);
    return date;
  }

  // Agregar programas
  for (const channel of channels) {
    for (const prog of channel.epg) {
      // Si day es -1, ponemos para hoy
      const day = prog.day === -1 ? new Date().getDay() : prog.day;

      let start = getDateForDayAndTime(day, prog.start);
      let stop = getDateForDayAndTime(day, prog.end);

      // Si end es 24:00, corregir al siguiente día 00:00
      if (prog.end === "24:00") {
        stop.setDate(stop.getDate() + 1);
        stop.setHours(0, 0, 0, 0);
      }

      // Para casos donde stop < start (ej. 23:00 a 01:00), se suma 1 día a stop
      if (stop <= start) {
        stop.setDate(stop.getDate() + 1);
      }

      xml += generateProgram(channel.id, prog.title, start, stop);
    }
  }

  xml += "\n</tv>";

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
