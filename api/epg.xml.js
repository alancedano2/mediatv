¡Claro, Miguel! Aquí tienes el **EPG actualizado** con los cambios en **KQ105TV** y **NetflixEventos**, sin modificar el resto del código.  

```js
export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<tv>

  <!-- PPV 01 -->
  <channel id="ppv01">
    <display-name>PPV 01</display-name>
    <icon src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Shaw_PPV.png" />
  </channel>
  <programme start="20250603000000 -0400" stop="20250604000000 -0400" channel="ppv01">
    <title>Visite mediaiptv.vercel.app para más detalles</title>
    <desc>Visite mediaiptv.vercel.app para más detalles</desc>
  </programme>

  <!-- NBA -->
  <channel id="nba">
    <display-name>NBA</display-name>
    <icon src="https://cdn.freebiesupply.com/images/large/2x/nba-logo-transparent.png" />
  </channel>
  <programme start="20250605200000 -0400" stop="20250605230000 -0400" channel="nba">
    <title>NBA Finals: Indiana Pacers vs Oklahoma City Thunder Game 1</title>
    <desc>NBA Finals Game 1</desc>
  </programme>
  <programme start="20250608200000 -0400" stop="20250608230000 -0400" channel="nba">
    <title>NBA Finals: Indiana Pacers vs Oklahoma City Thunder Game 2</title>
    <desc>NBA Finals Game 2</desc>
  </programme>
  <programme start="20250611200000 -0400" stop="20250611230000 -0400" channel="nba">
    <title>NBA Finals: Indiana Pacers vs Oklahoma City Thunder Game 3</title>
    <desc>NBA Finals Game 3</desc>
  </programme>
  <programme start="20250613200000 -0400" stop="20250613230000 -0400" channel="nba">
    <title>NBA Finals: Indiana Pacers vs Oklahoma City Thunder Game 4</title>
    <desc>NBA Finals Game 4</desc>
  </programme>

  <!-- MLB -->
  <channel id="mlb">
    <display-name>MLB</display-name>
    <icon src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Major_League_Baseball_logo.svg/1200px-Major_League_Baseball_logo.svg.png" />
  </channel>
  <programme start="20250603000000 -0400" stop="20250604000000 -0400" channel="mlb">
    <title>Visite mediaiptv.vercel.app para más detalles</title>
    <desc>Visite mediaiptv.vercel.app para más detalles</desc>
  </programme>

  <!-- EWO TV -->
  <channel id="ewotv">
    <display-name>EWO TV</display-name>
    <icon src="https://ewopr-puce.vercel.app/logo.png" />
  </channel>

  <!-- BSN PR -->
  <channel id="bsnpr">
    <display-name>BSN PR</display-name>
    <icon src="https://upload.wikimedia.org/wikipedia/en/f/fe/Baloncesto_Superior_Nacional.png" />
  </channel>
  <programme start="20250603000000 -0400" stop="20250604000000 -0400" channel="bsnpr">
    <title>Visite mediaiptv.vercel.app para más detalles</title>
    <desc>Visite mediaiptv.vercel.app para más detalles</desc>
  </programme>

  <!-- KQ105TV -->
  <channel id="kq105tv">
    <display-name>KQ105TV</display-name>
    <icon src="https://upload.wikimedia.org/wikipedia/commons/3/3f/KQ_105_Logo.png" />
  </channel>

  <!-- Sábados y Domingos -->
  <programme start="20250607000000 -0400" stop="20250609000000 -0400" channel="kq105tv">
    <title>Fuera del Aire</title>
    <desc>Fuera del Aire</desc>
  </programme>

  <!-- Lunes a Viernes -->
  <programme start="20250603000000 -0400" stop="20250603060000 -0400" channel="kq105tv">
    <title>Fuera del Aire</title>
    <desc>Fuera del Aire</desc>
  </programme>
  <programme start="20250603060000 -0400" stop="20250603100000 -0400" channel="kq105tv">
    <title>KQ Al Aire con Héctor Ortiz</title>
    <desc>Programa de radio matutino</desc>
  </programme>
  <programme start="20250603100000 -0400" stop="20250603150000 -0400" channel="kq105tv">
    <title>KQOnline con Alex Diaz</title>
    <desc>Contenido digital y tendencias</desc>
  </programme>
  <programme start="20250603150000 -0400" stop="20250603180000 -0400" channel="kq105tv">
    <title>La Tendencia de Molusco con Ali, Pamela y Robert</title>
    <desc>Análisis y entretenimiento</desc>
  </programme>
  <programme start="20250603180000 -0400" stop="20250603190000 -0400" channel="kq105tv">
    <title>KQ Al Aire con Pedro Villegas</title>
    <desc>Programa de entretenimiento</desc>
  </programme>
  <programme start="20250603190000 -0400" stop="20250604000000 -0400" channel="kq105tv">
    <title>Videos Musicales powered by KQ-105</title>
    <desc>Videos musicales</desc>
  </programme>

  <!-- NetflixEventos -->
  <channel id="netflixeventos">
    <display-name>NetflixEventos</display-name>
    <icon src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" />
  </channel>

  <!-- Sábados y Domingos -->
  <programme start="20250607000000 -0400" stop="20250609000000 -0400" channel="netflixeventos">
    <title>Fuera del Aire</title>
    <desc>Fuera del Aire</desc>
  </programme>

  <!-- Lunes -->
  <programme start="20250603000000 -0400" stop="20250603210000 -0400" channel="netflixeventos">
    <title>Fuera del Aire</title>
    <desc>Fuera del Aire</desc>
  </programme>
  <programme start="20250603210000 -0400" stop="20250603223000 -0400" channel="netflixeventos">
    <title>WWE Raw</title>
    <desc>Evento de lucha libre en vivo</desc>
  </programme>

  <!-- Martes -->
  <programme start="20250604210000 -0400" stop="20250604230000 -0400" channel="netflixeventos">
    <title>WWE NXT</title>
    <desc>Evento de lucha libre en vivo</desc>
  </programme>

  <!-- Viernes -->
  <programme start="20250607210000 -0400" stop="20250607240000 -0400" channel="netflixeventos">
    <title>WWE SmackDown</title>
    <desc>Evento de lucha libre en vivo</desc>
  </programme>

</tv>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
```

Ahora sí, este es el **código completo** con solo la programación de **KQ105TV** y **NetflixEventos** modificada según tus instrucciones. 🚀 Dale un vistazo y dime si necesitas algún ajuste más. ¡Vamos afinando los detalles!
