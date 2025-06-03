export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<tv>
  <!-- KQ105TV -->
  <channel id="kq105tv">
    <display-name>KQ105TV</display-name>
    <icon src="https://upload.wikimedia.org/wikipedia/commons/3/3f/KQ_105_Logo.png" />
  </channel>
  <programme start="20250603000000 -0400" stop="20250604000000 -0400" channel="kq105tv">
    <title>KQ105 en Vivo</title>
    <desc>Escucha lo mejor de KQ105 las 24 horas.</desc>
  </programme>

  <!-- NetflixEventos -->
  <channel id="netflixeventos">
    <display-name>NetflixEventos</display-name>
    <icon src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" />
  </channel>
  <programme start="20250603000000 -0400" stop="20250604000000 -0400" channel="netflixeventos">
    <title>Eventos Exclusivos Netflix</title>
    <desc>Disfruta de eventos especiales y estrenos exclusivos.</desc>
  </programme>

  <!-- PPV 01 -->
  <channel id="ppv01">
    <display-name>PPV 01</display-name>
    <icon src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Shaw_PPV.png" />
  </channel>
  <programme start="20250603000000 -0400" stop="20250604000000 -0400" channel="ppv01">
    <title>PPV 24/7</title>
    <desc>Visite mediaiptv.vercel.app para más detalles</desc>
  </programme>

  <!-- NBA -->
  <channel id="nba">
    <display-name>NBA</display-name>
    <icon src="https://cdn.freebiesupply.com/images/large/2x/nba-logo-transparent.png" />
  </channel>
  <programme start="20250603000000 -0400" stop="20250604000000 -0400" channel="nba">
    <title>Fuera del Aire</title>
    <desc>Fuera del Aire</desc>
  </programme>
  <programme start="20250605200000 -0400" stop="20250605230000 -0400" channel="nba">
    <title>NBA Finals Game 1</title>
    <desc>Indiana Pacers vs Oklahoma City Thunder</desc>
  </programme>
  <programme start="20250608200000 -0400" stop="20250608230000 -0400" channel="nba">
    <title>NBA Finals Game 2</title>
    <desc>Indiana Pacers vs Oklahoma City Thunder</desc>
  </programme>
  <programme start="20250611T200000 -0400" stop="20250611T230000 -0400" channel="nba">
    <title>NBA Finals Game 3</title>
    <desc>Indiana Pacers vs Oklahoma City Thunder</desc>
  </programme>
  <programme start="20250613200000 -0400" stop="20250613230000 -0400" channel="nba">
    <title>NBA Finals Game 4</title>
    <desc>Indiana Pacers vs Oklahoma City Thunder</desc>
  </programme>

  <!-- MLB -->
  <channel id="mlb">
    <display-name>MLB</display-name>
    <icon src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Major_League_Baseball_logo.svg/1200px-Major_League_Baseball_logo.svg.png" />
  </channel>
  <programme start="20250603000000 -0400" stop="20250604000000 -0400" channel="mlb">
    <title>MLB 24/7</title>
    <desc>Visite mediaiptv.vercel.app para más detalles</desc>
  </programme>

  <!-- EWO TV -->
  <channel id="ewotv">
    <display-name>EWO TV</display-name>
    <icon src="https://ewopr-puce.vercel.app/logo.png" />
  </channel>
  <programme start="20250603000000 -0400" stop="20250603080000 -0400" channel="ewotv">
    <title>Fuera del Aire</title>
    <desc>No hay programación.</desc>
  </programme>
  <programme start="20250603080000 -0400" stop="20250603093000 -0400" channel="ewotv">
    <title>eWo La Verdad Absoluta</title>
    <desc>Programa informativo</desc>
  </programme>
  <programme start="20250603093000 -0400" stop="20250603100000 -0400" channel="ewotv">
    <title>Cuenta Regresiva para eWo El Update</title>
    <desc>Previo al programa principal</desc>
  </programme>
  <programme start="20250603100000 -0400" stop="20250603110000 -0400" channel="ewotv">
    <title>eWo El Update</title>
    <desc>Noticias de eWo</desc>
  </programme>
  <programme start="20250603110000 -0400" stop="20250603150000 -0400" channel="ewotv">
    <title>eWo ThrowBack</title>
    <desc>Repeticiones clásicas</desc>
  </programme>
  <programme start="20250603150000 -0400" stop="20250603153000 -0400" channel="ewotv">
    <title>eWo El Perfil</title>
    <desc>Entrevistas</desc>
  </programme>
  <programme start="20250603153000 -0400" stop="20250603193000 -0400" channel="ewotv">
    <title>eWo 24/7 Retro</title>
    <desc>Programación nostálgica</desc>
  </programme>
  <programme start="20250603193000 -0400" stop="20250604000000 -0400" channel="ewotv">
    <title>Fuera del Aire</title>
    <desc>No hay programación.</desc>
  </programme>

  <!-- BSN PR -->
  <channel id="bsnpr">
    <display-name>BSN PR</display-name>
    <icon src="https://upload.wikimedia.org/wikipedia/en/f/fe/Baloncesto_Superior_Nacional.png" />
  </channel>
  <programme start="20250603000000 -0400" stop="20250604000000 -0400" channel="bsnpr">
    <title>BSN 24/7</title>
    <desc>Visite mediaiptv.vercel.app para más detalles</desc>
  </programme>
</tv>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
