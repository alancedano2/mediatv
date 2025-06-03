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

  const addShow = (title, start, end) => {
    programs.push({ channel, title, start, end });
  };

  const addDailyShow = (title, hourStart, hourEnd, dayOffset = 0) => {
    const start = new Date(day.getTime() + dayOffset * 86400000 + hourStart * 3600000);
    const end = new Date(day.getTime() + dayOffset * 86400000 + hourEnd * 3600000);
    addShow(title, start, end);
  };

  const addFullDay = (title, dayOffset = 0) => {
    const start = new Date(day.getTime() + dayOffset * 86400000);
    const end = new Date(start.getTime() + 86400000);
    addShow(title, start, end);
  };

  switch (channel) {
    case 'ppv01':
    case 'mlb':
    case 'bsnpr':
      for (let i = 0; i < 10; i++) {
        addFullDay('Visite mediaiptv.vercel.app para más detalles', i);
      }
      break;

    case 'nba': {
      const games = [
        [5, 20, 23, 'NBA Finals presented by Youtube: Indiana Pacers vs Oklahoma City Thunder Game 1'],
        [8, 20, 23, 'NBA Finals presented by Youtube: Indiana Pacers vs Oklahoma City Thunder Game 2'],
        [11, 20, 23, 'NBA Finals presented by Youtube: Indiana Pacers vs Oklahoma City Thunder Game 3'],
        [13, 20, 23, 'NBA Finals presented by Youtube: Indiana Pacers vs Oklahoma City Thunder Game 4'],
      ];
      for (let i = 2; i <= 13; i++) {
        const isGameDay = games.find(g => g[0] === i);
        if (isGameDay) {
          addDailyShow('Fuera del Aire', 0, isGameDay[1], i);
          addDailyShow(isGameDay[3], isGameDay[1], isGameDay[2], i);
        } else {
          addFullDay('Fuera del Aire', i);
        }
      }
      break;
    }

    case 'ewo': {
      for (let i = 0; i < 14; i++) {
        const date = new Date(day.getTime() + i * 86400000);
        const weekday = date.getUTCDay();
        if (weekday === 6 || weekday === 0) {
          addFullDay('Fuera del Aire', i);
        } else {
          addDailyShow('Fuera del Aire', 0, 8, i);
          addDailyShow('eWo La Verdad Absoluta', 8, 9.5, i);
          addDailyShow('Cuenta Regresiva para eWo El Update', 9.5, 10, i);
          addDailyShow('eWo El Update', 10, 11, i);
          addDailyShow('eWo ThrowBack', 11, 15, i);
          addDailyShow('eWo El Perfil', 15, 15.5, i);
          addDailyShow('eWo 24/7 Retro', 15.5, 17.5, i);
          addDailyShow('Fuera del Aire', 17.5, 22, i);
        }
      }
      break;
    }
  }

  return programs;
}

export default async function handler(req) {
  const channels = ['ppv01', 'nba', 'mlb', 'ewo', 'bsnpr'];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<tv generator-info-name="mediaiptv.vercel.app">\n';

  for (const channel of channels) {
    xml += `<channel id="${channel}">\n`;
    xml += `<display-name>${channel.toUpperCase()}</display-name>\n`;
    xml += `</channel>\n`;
  }

  for (const channel of channels) {
    const programs = getProgramsForChannel(channel);
    for (const p of programs) {
      xml += `<programme start="${formatDate(p.start)}" stop="${formatDate(p.end)}" channel="${channel}">\n`;
      xml += `<title>${p.title}</title>\n`;
      xml += `</programme>\n`;
    }
  }

  xml += '</tv>';

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
