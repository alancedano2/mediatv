export default function handler(req, res) {
  res.setHeader("Content-Type", "application/x-mpegURL");
  const channels = [
    {
      name: "Netflix Eventos",
      logo: "https://pngimg.com/uploads/netflix/netflix_PNG15.png",
      url: "https://live20.bozztv.com/giatv/giatv-PPVDeportes2/PPVDeportes2/chunks.m3u8",
      tvg: "netflixeventos"
    },
    {
      name: "KQ-105 TV",
      logo: "https://bloximages.chicago2.vip.townnews.com/kq105.com/content/tncms/custom/image/f8b14b8c-a5ba-11ee-b21a-4b46656e8613.png",
      url: "https://live20.bozztv.com/akamaissh101/ssh101/kq105/chunks.m3u8",
      tvg: "kq105tv"
    },
    {
      name: "PPV 01",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Shaw_PPV.png",
      url: "https://live20.bozztv.com/giatv/giatv-PPV1/PPV1/chunks.m3u8",
      tvg: "ppv01"
    },
    {
      name: "NBA",
      logo: "https://cdn.freebiesupply.com/images/large/2x/nba-logo-transparent.png",
      url: "https://live20.bozztv.com/giatv/giatv-NBA01/NBA01/chunks.m3u8",
      tvg: "nba"
    },
    {
      name: "MLB",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Major_League_Baseball_logo.svg/1200px-Major_League_Baseball_logo.svg.png",
      url: "https://live20.bozztv.com/giatv/giatv-MLB01/MLB01/chunks.m3u8",
      tvg: "mlb"
    },
    {
      name: "EWO TV",
      logo: "https://ewopr-puce.vercel.app/logo.png",
      url: "https://live20.bozztv.com/giatv/giatv-eWoPRTV/eWoPRTV/chunks.m3u8",
      tvg: "ewotv"
    },
    {
      name: "BSN PR",
      logo: "https://upload.wikimedia.org/wikipedia/en/f/fe/Baloncesto_Superior_Nacional.png",
      url: "https://live20.bozztv.com/akamaissh101/ssh101/bsnpuertorico/playlist.m3u8",
      tvg: "bsnpr"
    },
  ];

  const m3u = [
    '#EXTM3U'
  ];

  channels.forEach(ch => {
    m3u.push(`#EXTINF:-1 tvg-id="${ch.tvg}" tvg-logo="${ch.logo}" group-title="StreamVerse",${ch.name}`);
    m3u.push(ch.url);
  });

  res.status(200).send(m3u.join('\n'));
}
