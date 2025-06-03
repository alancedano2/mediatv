export async function GET() {
  // Helper para formatear fecha en formato XMLTV: YYYYMMDDHHMMSS +/-ZZZZ
  function formatDate(date) {
    const pad = (n) => n.toString().padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    // Offset en minutos y formato ±HHMM
    const offset = -date.getTimezoneOffset();
    const sign = offset >= 0 ? "+" : "-";
    const offsetHours = pad(Math.floor(Math.abs(offset) / 60));
    const offsetMinutes = pad(Math.abs(offset) % 60);

    return `${year}${month}${day}${hours}${minutes}${seconds} ${sign}${offsetHours}${offsetMinutes}`;
  }

  // Fechas base para los programas
  const now = new Date();

  // Ejemplo de programa 24h hoy
  const startToday = new Date(now);
  startToday.setHours(0, 0, 0, 0);

  const endToday = new Date(startToday);
  endToday.setDate(endToday.getDate() + 1); // siguiente día a 00:00

  // Ejemplo fechas para eventos futuros NBA
  function makeDate(dayOffset, hour, minute = 0) {
    const d = new Date(startToday);
    d.setDate(d.getDate() + dayOffset);
    d.setHours(hour, minute, 0, 0);
    return d;
  }

  // Crear XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<tv>
  <!-- KQ105TV -->
  <channel id="kq105tv">
    <display-name>KQ105TV</display-name>
    <icon src="https://upload.wikimedia.org/wikipedia/commons/3/3f/KQ_105_Logo.png" />
  </channel>
  <programme start="${formatDate(startToday)}" stop="${formatDate(endToday)}" channel="kq105tv">
    <title>KQ105 en Vivo</title>
    <desc>Escucha lo mejor de KQ105 las 24 horas.</desc>
  </programme>

  <!-- NetflixEventos -->
  <channel id="netflixeventos">
    <display-name>NetflixEventos</display-name>
    <icon src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" />
  </channel>
  <programme start="${formatDate(startToday)}" stop="${formatDate(endToday)}" channel="netflixeventos">
    <title>Eventos Exclusivos Netflix</title>
    <desc>Disfruta de eventos especiales y estrenos exclusivos.</desc>
  </programme>

  <!-- PPV 01 -->
  <channel id="ppv01">
    <display-name>PPV 01</display-name>
    <icon src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Shaw_PPV.png" />
  </channel>
  <programme start="${formatDate(startToday)}" stop="${formatDate(endToday)}" channel="ppv01">
    <title>PPV 24/7</title>
    <desc>Visite mediaiptv.vercel.app para más detalles</desc>
  </programme>

  <!-- NBA -->
  <channel id="nba">
    <display-name>NBA</display-name>
    <icon src="https://cdn.freebiesupply.com/images/large/2x/nba-logo-transparent.png" />
  </channel>
  <programme start="${formatDate(startToday)}" stop="${formatDate(endToday)}" channel="nba">
    <title>Fuera del Aire</title>
    <desc>Fuera del Aire</desc>
  </programme>
  <programme start="${formatDate(makeDate(2, 20))}" stop="${formatDate(makeDate(2, 23))}" channel="nba">
    <title>NBA Finals Game 1</title>
    <desc>Indiana Pacers vs Oklahoma City Thunder</desc>
  </programme>
  <programme start="${formatDate(makeDate(5, 20))}" stop="${formatDate(makeDate(5, 23))}" channel="nba">
    <title>NBA Finals Game 2</title>
    <desc>Indiana Pacers vs Oklahoma City Thunder</desc>
  </programme>
  <programme start="${formatDate(makeDate(8, 20))}" stop="${formatDate(makeDate(8, 23))}" channel="nba">
    <title>NBA Finals Game 3</title>
    <desc>Indiana Pacers vs Oklahoma City Thunder</desc>
  </programme>
  <programme start="${formatDate(makeDate(10, 20))}" stop="${formatDate(makeDate(10, 23))}" channel="nba">
    <title>NBA Finals Game 4</title>
    <desc>Indiana Pacers vs Oklahoma City Thunder</desc>
  </programme>

  <!-- MLB -->
  <channel id="mlb">
    <display-name>MLB</display-name>
    <icon src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Major_League_Baseball_logo.svg/1200px-Major_League_Baseball_logo.svg.png" />
  </channel>
  <programme start="${formatDate(startToday)}" stop="${formatDate(endToday)}" channel="mlb">
    <title>MLB 24/7</title>
    <desc>Visite mediaiptv.vercel.app para más detalles</desc>
  </programme>

  <!-- EWO TV -->
  <channel id="ewotv">
    <display-name>EWO TV</display-name>
    <icon src="https://ewopr-puce.vercel.app/logo.png" />
  </channel>
  <programme start="${formatDate(startToday)}" stop="${formatDate(makeDate(0,8))}" channel="ewotv">
    <title>Fuera del Aire</title>
    <desc>No hay programación.</desc>
  </programme>
  <programme start="${formatDate(makeDate(0,8))}" stop="${formatDate(makeDate(0,9,30))}" channel="ewotv">
    <title>eWo La Verdad Absoluta</title>
    <desc>Programa informativo</desc>
  </programme>
  <programme start="${formatDate(makeDate(0,9,30))}" stop="${formatDate(makeDate(0,10))}" channel="ewotv">
    <title>Cuenta Regresiva para eWo El Update</title>
    <desc>Previo al programa principal</desc>
  </programme>
  <programme start="${formatDate(makeDate(0,10))}" stop="${formatDate(makeDate(0,11))}" channel="ewotv">
    <title>eWo El Update</title>
    <desc>Noticias de eWo</desc>
  </programme>
  <programme start="${formatDate(makeDate(0,11))}" stop="${formatDate(makeDate(0,15))}" channel="ewotv">
    <title>eWo ThrowBack</title>
    <desc>Repeticiones clásicas</desc>
  </programme>
  <programme start="${formatDate(makeDate(0,15))}" stop="${formatDate(makeDate(0,15,30))}" channel="ewotv">
    <title>eWo El Perfil</title>
    <desc>Entrevistas</desc>
  </programme>
  <programme start="${formatDate(makeDate(0,15,30))}" stop="${formatDate(makeDate(0,19,30))}" channel="ewotv">
    <title>eWo 24/7 Retro</title>
    <desc>Programación nostálgica</desc>
  </programme>
  <programme start="${formatDate(makeDate(0,19,30))}" stop="${formatDate(endToday)}" channel="ewotv">
    <title>Fuera del Aire</title>
    <desc>No hay programación.</desc>
  </programme>

  <!-- BSN PR -->
  <channel id="bsnpr">
    <display-name>BSN PR</display-name>
    <icon src="https://upload.wikimedia.org/wikipedia/en/f/fe/Baloncesto_Superior_Nacional.png" />
  </channel>
  <programme start="${formatDate(startToday)}" stop="${formatDate(endToday)}" channel="bsnpr">
    <title>BSN 24/7</title>
    <desc>Visite mediaiptv.vercel.app para más detalles</desc>
  </programme>
</tv>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
