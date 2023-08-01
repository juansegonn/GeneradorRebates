document.addEventListener('DOMContentLoaded', function() {
    var buscarBtn = document.getElementById('buscar-geolocalizacion');
    var numeroTelefonoInput = document.getElementById('numero-llamada');
    var resetBtnGeo = document.getElementById('reset-btn-geo'); 

    resetBtnGeo.addEventListener('click', resetearValoresGeo);
    buscarBtn.addEventListener('click', buscarZonaGeografica);
    numeroTelefonoInput.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        buscarZonaGeografica();
      }
    });
  });
  
  function resetearValoresGeo() {
    var numeroTelefonoInput = document.getElementById('numero-llamada');
    var infoContainer = document.getElementById('resultado-geolocalizacion');
    var h2Ubicacion = document.getElementById('h2-ubicacion');
    h2Ubicacion.style.display = 'none';
    numeroTelefonoInput.value = '';
    infoContainer.style.display = 'none';
  }

  function buscarZonaGeografica() {
    var numeroTelefono = document.getElementById('numero-llamada').value;
    var codigoArea = obtenerCodigoArea(numeroTelefono);
    var zonasGeograficas = obtenerZonasGeograficas();
  
    var zonaEncontrada = null;
    for (var i = 0; i < zonasGeograficas.length; i++) {
      var zona = zonasGeograficas[i];
      if (zona.prefijo === codigoArea) {
        zonaEncontrada = zona;
        break;
      }
    }
  
    mostrarInfoZonaGeografica(zonaEncontrada);
  }

  function obtenerCodigoArea(numeroTelefono) {
    // Buscar el código de área en el número de teléfono
    for (var longitud = 2; longitud <= 4; longitud++) {
      // Verificar si el número de teléfono comienza con "0" y ajustar el inicio de la subcadena si es necesario
      var inicioSubcadena = numeroTelefono.startsWith("0") ? 1 : 0;
      var codigoArea = numeroTelefono.substring(inicioSubcadena, longitud + inicioSubcadena);
      if (existeCodigoArea(codigoArea)) {
        return codigoArea;
      }
    }
    return null;
  }
  
  function existeCodigoArea(codigoArea) {
    var zonasGeograficas = obtenerZonasGeograficas();
    for (var i = 0; i < zonasGeograficas.length; i++) {
      var zona = zonasGeograficas[i];
      if (zona.prefijo === codigoArea) {
        return true;
      }
    }
    return false;
  }

  function obtenerZonasGeograficas() {
    var zonasJSON = `
    {
      "zonas": [
        {
          "nombre": "Buenos Aires (CABA y alrededores)",
          "prefijo": "11",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.644506677932334&lg=-58.38409423828126&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Merlo y alrededores)",
          "prefijo": "220",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.71762892664954&lg=-58.825607299804695&zoom=12"
        },
        {
          "nombre": "Buenos Aires (La Plata y alrededores)",
          "prefijo": "221",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.93266739425499&lg=-57.9470443725586&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Mar del Plata y alrededores)",
          "prefijo": "223",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-38.09998264736479&lg=-57.54226684570313&zoom=10"
        },
        {
          "nombre": "Buenos Aires (Pilar y alrededores)",
          "prefijo": "230",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.47146728120383&lg=-58.92139434814454&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Junin y alrededores)",
          "prefijo": "236",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.61512668346219&lg=-60.94116210937501&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Moreno y alrededores)",
          "prefijo": "237",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.62981798125999&lg=-58.85513305664063&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Tandil y alrededores)",
          "prefijo": "249",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-37.35487607348372&lg=-59.21356201171876&zoom=10"
        },
        {
          "nombre": "Mendoza (San Rafael y alrededores)",
          "prefijo": "260",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.654109419137406&lg=-68.27041625976564&zoom=11"
        },
        {
          "nombre": "Mendoza (Mendoza y alrededores)",
          "prefijo": "261",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-32.983324091837474&lg=-68.73733520507814&zoom=10"
        },
        {
          "nombre": "Mendoza (San Martin y alrededores)",
          "prefijo": "263",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.14962472988583&lg=-68.38851928710939&zoom=11"
        },
        {
          "nombre": "San Juan (San Juan y alrededores)",
          "prefijo": "264",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.567420348693773&lg=-68.51142883300783&zoom=11"
        },
        {
          "nombre": "San Luis (San Luis y alrededores)",
          "prefijo": "266",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.28347195224925&lg=-66.27639770507814&zoom=11"
        },
        {
          "nombre": "Chubut (Rawson y alrededores)",
          "prefijo": "280",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-43.286203022463305&lg=-65.16815185546876&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Bahia Blanca y alrededores)",
          "prefijo": "291",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-38.74444410121546&lg=-62.24510192871094&zoom=11"
        },
        {
          "nombre": "Rio negro, Neuquen y Chubut (San Carlos de Bariloche y alrededores)",
          "prefijo": "294",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-41.58668835697236&lg=-71.60888671875001&zoom=8"
        },
        {
          "nombre": "Chubut y Santa Cruz (Comodoro Rivadavia y alrededores)",
          "prefijo": "297",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-45.871843796997936&lg=-67.61947631835939&zoom=10"
        },
        {
          "nombre": "Rio negro (General Roca y alrededores)",
          "prefijo": "298",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-39.0389196606146&lg=-67.60711669921876&zoom=11"
        },
        {
          "nombre": "Neuquen, La Pampa y Rio Negro (Neuquen y alrededores)",
          "prefijo": "299",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-38.96047664397741&lg=-68.33633422851564&zoom=10"
        },
        {
          "nombre": "Buenos Aires (San Nicolas de los Arroyos y alrededores)",
          "prefijo": "336",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.37813253452327&lg=-60.25588989257813&zoom=11"
        },
        {
          "nombre": "Santa Fe (Rosario y alrededores)",
          "prefijo": "341",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-32.97608356901193&lg=-60.68658828735352&zoom=11"
        },
        {
          "nombre": "Santa Fe (Santa Fe y alrededores)",
          "prefijo": "342",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.65045885867798&lg=-60.728302001953125&zoom=12"
        },
        {
          "nombre": "Entre Ríos (Parana y alrededores)",
          "prefijo": "343",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.799391179976894&lg=-60.43647766113282&zoom=11"
        },
        {
          "nombre": "Entre Ríos (Concordia y alrededores)",
          "prefijo": "345",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.38600574261588&lg=-58.03716659545899&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Belen de Escobar y alrededores)",
          "prefijo": "348",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.34230217446122&lg=-58.797111511230476&zoom=12"
        },
        {
          "nombre": "Córdoba (Córdoba y alrededores)",
          "prefijo": "351",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.41638924715148&lg=-64.18367305&zoom=11"
        },
        {
          "nombre": "Córdoba (Villa Maria y alrededores)",
          "prefijo": "353",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-32.41462544927252&lg=-63.20383071899415&zoom=10"
        },
        {
          "nombre": "Córdoba (Rio Cuarto y alrededores)",
          "prefijo": "358",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.16046614110187&lg=-64.38297271728517&zoom=10"
        },
        {
          "nombre": "Chaco (Resistencia y alrededores)",
          "prefijo": "362",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.454664938983115&lg=-59.13253784179688&zoom=11"
        },
        {
          "nombre": "Chaco (Presidencia Roque Sáenz Peña y alrededores)",
          "prefijo": "364",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-26.882708206402317&lg=-60.39527893066407&zoom=9"
        },
        {
          "nombre": "Formosa (Formosa y alrededores)",
          "prefijo": "370",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-26.195492799699977&lg=-58.17878723144532&zoom=11"
        },
        {
          "nombre": "Misiones (Posadas y alrededores)",
          "prefijo": "376",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.46685051926846&lg=-55.889511108398445&zoom=11"
        },
        {
          "nombre": "Corrientes (Corrientes y alrededores)",
          "prefijo": "379",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.464413510962768&lg=-58.578414916992195&zoom=11"
        },
        {
          "nombre": "La Rioja (La Rioja y alrededores)",
          "prefijo": "380",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-29.424048845483828&lg=-66.82571411132814&zoom=10"
        },
        {
          "nombre": "Tucumán (San Miguel de Tucumán y alrededores)",
          "prefijo": "381",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-26.84490270219663&lg=-65.19836425781251&zoom=10"
        },
        {
          "nombre": "Catamarca (San Fernando del Valle de Catamarca y alrededores)",
          "prefijo": "383",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-28.544719370308737&lg=-65.72845458984376&zoom=10"
        },
        {
          "nombre": "Santiago del Estero (Santiago del Estero y alrededores)",
          "prefijo": "385",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.817130191842725&lg=-64.18865203857423&zoom=10"
        },
        {
          "nombre": "Salta (Salta y alrededores)",
          "prefijo": "387",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-24.789397776011825&lg=-65.41031939999999&zoom=11"
        },
        {
          "nombre": "Jujuy (San Salvador de Jujuy y alrededores)",
          "prefijo": "388",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-24.20814215490266&lg=-65.29174804687501&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Gonzalez Catan y alrededores)",
          "prefijo": "2202",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.79815793636812&lg=-58.64364624023438&zoom=13"
        },
        {
          "nombre": "Buenos Aires (Magdalena y alrededores)",
          "prefijo": "2221",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.214209694830764&lg=-57.451629638671875&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Brandsen y alrededores)",
          "prefijo": "2223",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.18924177086569&lg=-58.25569152832032&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Glew y alrededores)",
          "prefijo": "2224",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.90198199920359&lg=-58.39319229125977&zoom=13"
        },
        {
          "nombre": "Buenos Aires (Alejandro Korn y alrededores)",
          "prefijo": "2225",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.00384706056547&lg=-58.4062385559082&zoom=13"
        },
        {
          "nombre": "Buenos Aires (Cañuelas y alrededores)",
          "prefijo": "2226",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.05613731434392&lg=-58.74011993408204&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Lobos y alrededores)",
          "prefijo": "2227",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.231037671011904&lg=-59.11262512207032&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Juan María Gutiérrez y alrededores)",
          "prefijo": "2229",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.84564869533323&lg=-58.18445205688477&zoom=13"
        },
        {
          "nombre": "Buenos Aires (Chascomus y alrededores)",
          "prefijo": "2241",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.57133159958164&lg=-58.078536987304695&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Lezama y alrededores)",
          "prefijo": "2242",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.92798069038271&lg=-58.03253173828126&zoom=11"
        },
        {
          "nombre": "Buenos Aires (General Belgrano y alrededores)",
          "prefijo": "2243",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.75097043944927&lg=-58.49842071533204&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Las Flores y alrededores)",
          "prefijo": "2244",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-36.029110596631845&lg=-59.06799316406251&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Dolores y alrededores)",
          "prefijo": "2245",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-36.37540930289889&lg=-57.60818481445313&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Santa Teresita y alrededores)",
          "prefijo": "2246",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-36.54991407904701&lg=-56.67537689208985&zoom=12"
        },
        {
          "nombre": "Buenos Aires (San Clemente del Tuyu y alrededores)",
          "prefijo": "2252",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-36.36048087912436&lg=-56.72859191894532&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Pinamar y alrededores)",
          "prefijo": "2254",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-37.134045371264456&lg=-56.848068237304695&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Villa Gesell y alrededores)",
          "prefijo": "2255",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-37.30027528134431&lg=-56.987113952636726&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Mar de Ajo y alrededores)",
          "prefijo": "2257",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-36.70861402239183&lg=-56.64413452148438&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Loberia y alrededores)",
          "prefijo": "2261",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-38.193942265959095&lg=-58.73634338378907&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Nechochea y alrededores)",
          "prefijo": "2262",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-38.57823196583315&lg=-58.80432128906251&zoom=10"
        },
        {
          "nombre": "Buenos Aires (Nicanor Olivera y alrededores)",
          "prefijo": "2264",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-38.2759228597492&lg=-59.17991638183594&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Coronel Vidal y alrededores)",
          "prefijo": "2265",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-37.48466628708501&lg=-57.61505126953126&zoom=10"
        },
        {
          "nombre": "Buenos Aires (Balcarce y alrededores)",
          "prefijo": "2266",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-37.89436302930202&lg=-58.30307006835938&zoom=11"
        },
        {
          "nombre": "Buenos Aires (General Juan Madariaga y alrededores)",
          "prefijo": "2267",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-37.01283374703216&lg=-57.12238311767578&zoom=13"
        },
        {
          "nombre": "Buenos Aires (Maipu y alrededores)",
          "prefijo": "2268",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-36.79389010047561&lg=-57.85949707031251&zoom=11"
        },
        {
          "nombre": "Buenos Aires (San Miguel del Monte y alrededores)",
          "prefijo": "2271",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.476328332657296&lg=-58.86268615722657&zoom=11"
        },
        {
          "nombre": "Buenos Aires (José Juan Almeyra y alrededores)",
          "prefijo": "2272",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.99175369350489&lg=-59.57885742187501&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Carmen de Areco y alrededores)",
          "prefijo": "2273",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.4304166707055&lg=-59.8257064819336&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Carlos Spegazzini y alrededores)",
          "prefijo": "2274",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.92274516151449&lg=-58.60854148864747&zoom=14"
        },
        {
          "nombre": "Buenos Aires (Azul y alrededores)",
          "prefijo": "2281",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-36.801587788085314&lg=-59.86930847167969&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Tapalque y alrededores)",
          "prefijo": "2283",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-36.40857332152868&lg=-60.03204345703126&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Olavarria y alrededores)",
          "prefijo": "2284",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-36.9361720347729&lg=-60.29365539550781&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Laprida y alrededores)",
          "prefijo": "2285",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-37.55303725055186&lg=-60.80528909999999&zoom=12"
        },
        {
          "nombre": "Buenos Aires (General La Madrid y alrededores)",
          "prefijo": "2286",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-37.25192049257331&lg=-61.26663208007813&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Miramar y alrededores)",
          "prefijo": "2291",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-38.26419775071166&lg=-57.840099334716804&zoom=13"
        },
        {
          "nombre": "Buenos Aires (Benito Juárez y alrededores)",
          "prefijo": "2292",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-37.69845270791935&lg=-59.8227882385254&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Ayacucho y alrededores)",
          "prefijo": "2296",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-37.131855694734625&lg=-58.44039916992188&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Rauch y alrededores)",
          "prefijo": "2297",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-36.78069226486258&lg=-59.067306518554695&zoom=11"
        },
        {
          "nombre": "La Pampa y Buenos Aires (General Pico y alrededores)",
          "prefijo": "2302",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.671800642387694&lg=-63.61633300781251&zoom=11"
        },
        {
          "nombre": "Buenos Aires (San Carlos de Bolívar y alrededores)",
          "prefijo": "2314",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-36.238735167309216&lg=-61.11488342285157&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Daireaux y alrededores)",
          "prefijo": "2316",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-36.607535686594915&lg=-61.74179077148438&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Nueve de Julio y alrededores)",
          "prefijo": "2317",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.46598295825904&lg=-60.85739135742188&zoom=12"
        },
        {
          "nombre": "Buenos Aires (José C. Paz y alrededores)",
          "prefijo": "2320",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.521267112055035&lg=-58.756256103515625&zoom=14"
        },
        {
          "nombre": "Buenos Aires (Lujan y alrededores)",
          "prefijo": "2323",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.54983198845188&lg=-59.124984741210945&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Mercedes y alrededores)",
          "prefijo": "2324",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.66272269636344&lg=-59.423675537109375&zoom=13"
        },
        {
          "nombre": "Buenos Aires (San Andrés de Giles y alrededores)",
          "prefijo": "2325",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.46212650201316&lg=-59.441356658935554&zoom=13"
        },
        {
          "nombre": "Buenos Aires (San Antonio de Areco y alrededores)",
          "prefijo": "2326",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.268282461829564&lg=-59.48890686035157&zoom=12"
        },
        {
          "nombre": "La Pampa (Realico y alrededores)",
          "prefijo": "2331",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.05417000742265&lg=-64.21131134033205&zoom=12"
        },
        {
          "nombre": "La Pampa (Quemú Quemú y alrededores)",
          "prefijo": "2333",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-36.07851703597173&lg=-63.563461303710945&zoom=11"
        },
        {
          "nombre": "La Pampa (Eduardo Castex y alrededores)",
          "prefijo": "2334",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.92962917008664&lg=-64.26306724548341&zoom=12"
        },
        {
          "nombre": "La Pampa (Caleufú y alrededores)",
          "prefijo": "2335",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.61851195302375&lg=-64.54055786132814&zoom=12"
        },
        {
          "nombre": "Córdoba (Huinca Renancó y alrededores)",
          "prefijo": "2336",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.86029906752953&lg=-64.4008255004883&zoom=12"
        },
        {
          "nombre": "Buenos Aires (América y alrededores)",
          "prefijo": "2337",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.5892019871624&lg=-63.01483154296876&zoom=11"
        },
        {
          "nombre": "La Pampa (Victorica y alrededores)",
          "prefijo": "2338",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-36.22876574685928&lg=-65.43800354003908&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Bragado y alrededores)",
          "prefijo": "2342",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.14375510234582&lg=-60.45647621154786&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Norberto de La Riestra y alrededores)",
          "prefijo": "2343",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.27169087118592&lg=-59.719963073730476&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Saladillo y alrededores)",
          "prefijo": "2344",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.64809016971277&lg=-59.7652816772461&zoom=12"
        },
        {
          "nombre": "Buenos Aires (25 de Mayo y alrededores)",
          "prefijo": "2345",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.476887504166136&lg=-60.17623901367188&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Chivilcoy y alrededores)",
          "prefijo": "2346",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.94617659008745&lg=-60.05538940429688&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Chacabuco y alrededores)",
          "prefijo": "2352",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.63151296363536&lg=-60.50445556640626&zoom=11"
        },
        {
          "nombre": "Buenos Aires y Santa Fe (General Arenales y alrededores)",
          "prefijo": "2353",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.27991439854992&lg=-61.37031555175782&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Vedia y alrededores)",
          "prefijo": "2354",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.503444454347544&lg=-61.569957733154304&zoom=13"
        },
        {
          "nombre": "Buenos Aires (Lincoln y alrededores)",
          "prefijo": "2355",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.87579181441272&lg=-61.521720886230476&zoom=12"
        },
        {
          "nombre": "Buenos Aires (General Pinto y alrededores)",
          "prefijo": "2356",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.79970851207568&lg=-61.98211669921876&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Carlos Tejedor y alrededores)",
          "prefijo": "2357",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.43381992014202&lg=-62.42225646972657&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Los Toldos y alrededores)",
          "prefijo": "2358",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.006378004233454&lg=-61.04003906250001&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Trenque Lauquen y alrededores)",
          "prefijo": "2392",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-36.00189606297457&lg=-62.74635314941407&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Salazar y alrededores)",
          "prefijo": "2393",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-36.315678425222245&lg=-62.192230224609375&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Tres Lomas y alrededores)",
          "prefijo": "2394",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-36.54936246839778&lg=-62.91183471679688&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Carlos Casares y alrededores)",
          "prefijo": "2395",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.6829560755903&lg=-61.35177612304688&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Pehuajó y alrededores)",
          "prefijo": "2396",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.82338084770654&lg=-61.89319610595704&zoom=12"
        },
        {
          "nombre": "Buenos Aires y Santa Fe (Colón y alrededores)",
          "prefijo": "2473",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.87725673930016&lg=-61.16912841796876&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Salto y alrededores)",
          "prefijo": "2474",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.321889460526734&lg=-60.2157211303711&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Rojas y alrededores)",
          "prefijo": "2475",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.232241617439286&lg=-60.74993133544922&zoom=12"
        },
        {
          "nombre": "Buenos Aires y Santa Fe (Pergamino y alrededores)",
          "prefijo": "2477",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.922850644859075&lg=-60.54428100585938&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Arrecifes y alrededores)",
          "prefijo": "2478",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.056926077410345&lg=-60.07461547851563&zoom=12"
        },
        {
          "nombre": "Mendoza (Tunuyán y alrededores)",
          "prefijo": "2622",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.5788527314192&lg=-69.0307903289795&zoom=12"
        },
        {
          "nombre": "Mendoza (Uspallata y alrededores)",
          "prefijo": "2624",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-32.628677316086694&lg=-69.41539764404298&zoom=12"
        },
        {
          "nombre": "Mendoza (General Alvear y alrededores)",
          "prefijo": "2625",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.00075357864239&lg=-67.70736694335939&zoom=11"
        },
        {
          "nombre": "Mendoza (La Paz y alrededores)",
          "prefijo": "2626",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.44175538910965&lg=-67.46944427490236&zoom=12"
        },
        {
          "nombre": "San Juan (Villa San Agustín y alrededores)",
          "prefijo": "2646",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-30.652680731583974&lg=-67.47013092041017&zoom=12"
        },
        {
          "nombre": "San Juan (San José de Jáchal y alrededores)",
          "prefijo": "2647",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-30.23934484742095&lg=-68.7213706970215&zoom=13"
        },
        {
          "nombre": "San Juan (Calingasta y alrededores)",
          "prefijo": "2648",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.507141872649377&lg=-69.51736450195314&zoom=10"
        },
        {
          "nombre": "San Luis (San Francisco del Monte de Oro y alrededores)",
          "prefijo": "2651",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-32.60033706577327&lg=-66.13597869873048&zoom=12"
        },
        {
          "nombre": "San Luis (Balde y alrededores)",
          "prefijo": "2652",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.36178941977973&lg=-66.67293548583986&zoom=12"
        },
        {
          "nombre": "San Luis (La Toma y alrededores)",
          "prefijo": "2655",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.02708758002873&lg=-65.61378479003908&zoom=11"
        },
        {
          "nombre": "San Luis (Tilisarao y alrededores)",
          "prefijo": "2656",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-32.741082231501245&lg=-65.28659820556642&zoom=12"
        },
        {
          "nombre": "San Luis (Villa Mercedes y alrededores)",
          "prefijo": "2657",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.69745380135229&lg=-65.43268203735353&zoom=11"
        },
        {
          "nombre": "San Luis (Buena Esperanza y alrededores)",
          "prefijo": "2658",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.76276869414469&lg=-65.25089263916017&zoom=12"
        },
        {
          "nombre": "Tierra del Fuego, Antártida e Islas del Atlántico Sur (Ushuaia y alrededores)",
          "prefijo": "2901",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-54.81767277836319&lg=-68.29153060913087&zoom=11"
        },
        {
          "nombre": "Santa Cruz (Río Turbio y alrededores)",
          "prefijo": "2902",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-51.561704889116456&lg=-72.28076934814455&zoom=12"
        },
        {
          "nombre": "Chubut (Río Mayo y alrededores)",
          "prefijo": "2903",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-45.75171424271877&lg=-70.28091430664064&zoom=11"
        },
        {
          "nombre": "Rio Negro y Buenos Aires (Viedma y alrededores)",
          "prefijo": "2920",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-40.83043687764924&lg=-63.014144897460945&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Coronel Dorrego y alrededores)",
          "prefijo": "2921",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-38.830614912420565&lg=-61.30233764648438&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Coronel Pringles y alrededores)",
          "prefijo": "2922",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-38.00814226695962&lg=-61.322593688964844&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Pigüé y alrededores)",
          "prefijo": "2923",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-37.60452811363717&lg=-62.402302150000004&zoom=13"
        },
        {
          "nombre": "Buenos Aires y La Pampa (Darregueira y alrededores)",
          "prefijo": "2924",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-37.72239230471584&lg=-63.18580627441407&zoom=11"
        },
        {
          "nombre": "Buenos Aires y La Pampa (Villa Iris y alrededores)",
          "prefijo": "2925",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-38.14751758025121&lg=-63.26202392578126&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Coronel Suárez y alrededores)",
          "prefijo": "2926",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-37.49143847378335&lg=-61.91156387329102&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Médanos y alrededores)",
          "prefijo": "2927",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-38.86644411885283&lg=-62.66120910644532&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Pedro Luro y alrededores)",
          "prefijo": "2928",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-39.51622507751165&lg=-62.66773223876954&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Guaminí y alrededores)",
          "prefijo": "2929",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-37.0173569794321&lg=-62.41676330566407&zoom=12"
        },
        {
          "nombre": "Río Negro y La Pampa (Río Colorado y alrededores)",
          "prefijo": "2931",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-38.99410572845627&lg=-64.08325195312501&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Punta Alta y alrededores)",
          "prefijo": "2932",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-38.883932291089&lg=-62.072839736938484&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Huanguelén y alrededores)",
          "prefijo": "2933",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-37.07010812716267&lg=-61.92718505859375&zoom=13"
        },
        {
          "nombre": "Rio Negro (San Antonio Oeste y alrededores)",
          "prefijo": "2934",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-40.751158348740226&lg=-65.00026702880861&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Rivera y alrededores)",
          "prefijo": "2935",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-37.142529769299856&lg=-63.231468200683594&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Carhué y alrededores)",
          "prefijo": "2936",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-37.18329633839569&lg=-62.75287628173829&zoom=13"
        },
        {
          "nombre": "Rio negro (Ingeniero Jacobacci y alrededores)",
          "prefijo": "2940",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-41.32719741125288&lg=-69.52835083007814&zoom=13"
        },
        {
          "nombre": "Neuquén y Rio Negro (Zapala y alrededores)",
          "prefijo": "2942",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-38.90599569999115&lg=-69.99252319335939&zoom=10"
        },
        {
          "nombre": "Chubut (Esquel y alrededores)",
          "prefijo": "2945",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-42.995607893370135&lg=-71.28753662109376&zoom=10"
        },
        {
          "nombre": "Río Negro (Choele Choel y alrededores)",
          "prefijo": "2946",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-39.29868643234352&lg=-65.65438270568849&zoom=12"
        },
        {
          "nombre": "Neuquén (Chos Malal y alrededores)",
          "prefijo": "2948",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-37.37703671828531&lg=-70.25289058685304&zoom=13"
        },
        {
          "nombre": "La Pampa (General Acha y alrededores)",
          "prefijo": "2952",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-37.38352560300922&lg=-64.54982757568361&zoom=12"
        },
        {
          "nombre": "La Pampa (Macachín y alrededores)",
          "prefijo": "2953",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-37.16414699732165&lg=-63.65341186523438&zoom=11"
        },
        {
          "nombre": "La Pampa (Santa Rosa y alrededores)",
          "prefijo": "2954",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-36.65681332189509&lg=-64.29147720336915&zoom=11"
        },
        {
          "nombre": "Santa Cruz (Puerto San Julián y alrededores)",
          "prefijo": "2962",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-49.30587434804734&lg=-67.76710510253908&zoom=12"
        },
        {
          "nombre": "Santa Cruz (Perito Moreno y alrededores)",
          "prefijo": "2963",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-46.598034075342866&lg=-70.90370178222658&zoom=12"
        },
        {
          "nombre": "Tierra del Fuego, Antártida e Islas del Atlántico Sur (Río Grande y alrededores)",
          "prefijo": "2964",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-53.77956569547067&lg=-67.71467250000002&zoom=12"
        },
        {
          "nombre": "Santa Cruz (Río Gallegos y alrededores)",
          "prefijo": "2966",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-51.66361190795316&lg=-69.27085876464845&zoom=11"
        },
        {
          "nombre": "Neuquén (San Martín de los Andes y alrededores)",
          "prefijo": "2972",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-40.16050911251291&lg=-71.28684997558595&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Orense y alrededores)",
          "prefijo": "2982",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-38.777640223073355&lg=-59.94964599609376&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Tres Arroyos y alrededores)",
          "prefijo": "2983",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-38.39979663000094&lg=-60.25726318359376&zoom=11"
        },
        {
          "nombre": "Buenos Aires (Benavídez y alrededores)",
          "prefijo": "3327",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.4154069302593&lg=-58.69746208190918&zoom=14"
        },
        {
          "nombre": "Buenos Aires (San Pedro y alrededores)",
          "prefijo": "3329",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.718342947799584&lg=-59.64820861816407&zoom=12"
        },
        {
          "nombre": "Santa Fe, Cordoba y Buenos Aires (Rufino y alrededores)",
          "prefijo": "3382",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.331529416604575&lg=-62.73330688476563&zoom=11"
        },
        {
          "nombre": "Córdoba (Laboulaye y alrededores)",
          "prefijo": "3385",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.14533967481939&lg=-63.35678100585938&zoom=12"
        },
        {
          "nombre": "Córdoba (Buchardo y alrededores)",
          "prefijo": "3387",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.74189461708387&lg=-63.54560852050782&zoom=12"
        },
        {
          "nombre": "Buenos Aires (General Villegas y alrededores)",
          "prefijo": "3388",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-35.077774562071816&lg=-62.95440673828126&zoom=11"
        },
        {
          "nombre": "Santa Fe (Villa Constitución y alrededores)",
          "prefijo": "3400",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.243425427429635&lg=-60.33742904663087&zoom=13"
        },
        {
          "nombre": "Santa Fe (El Trébol y alrededores)",
          "prefijo": "3401",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-32.202052802953474&lg=-61.702995300292976&zoom=13"
        },
        {
          "nombre": "Santa Fe (Arroyo Seco y alrededores)",
          "prefijo": "3402",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.173192085918075&lg=-60.49913406372071&zoom=13"
        },
        {
          "nombre": "Santa Fe (San Carlos Centro y alrededores)",
          "prefijo": "3404",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.735015535854757&lg=-61.11308097839356&zoom=12"
        },
        {
          "nombre": "Santa Fe (San Javier y alrededores)",
          "prefijo": "3405",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-30.597434228713674&lg=-59.933509826660156&zoom=12"
        },
        {
          "nombre": "Santa Fe (San Jorge y alrededores)",
          "prefijo": "3406",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.913993226490213&lg=-61.860580444335945&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Ramallo y alrededores)",
          "prefijo": "3407",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.497315567036274&lg=-60.017967224121094&zoom=12"
        },
        {
          "nombre": "Santa Fe (San Cristóbal y alrededores)",
          "prefijo": "3408",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-30.332583312405575&lg=-61.244316101074226&zoom=12"
        },
        {
          "nombre": "Santa Fe (Moisés Ville y alrededores)",
          "prefijo": "3409",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-30.720292558597645&lg=-61.4652442932129&zoom=13"
        },
        {
          "nombre": "Entre Ríos (Nogoyá y alrededores)",
          "prefijo": "3435",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-32.39677649519855&lg=-59.79343414306641&zoom=12"
        },
        {
          "nombre": "Entre Ríos (Victoria y alrededores)",
          "prefijo": "3436",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-32.62607501411621&lg=-60.11238098144532&zoom=11"
        },
        {
          "nombre": "Entre Ríos(La Paz y alrededores)",
          "prefijo": "3437",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-30.748598455330626&lg=-59.607179849999994&zoom=12"
        },
        {
          "nombre": "Entre Ríos (Bovril y alrededores)",
          "prefijo": "3438",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.34718658303276&lg=-59.44702148437501&zoom=12"
        },
        {
          "nombre": "Entre Ríos (Concepción del Uruguay y alrededores)",
          "prefijo": "3442",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-32.45366196195589&lg=-58.29954740000001&zoom=11"
        },
        {
          "nombre": "Entre Ríos (Gualeguay y alrededores)",
          "prefijo": "3444",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.14991217481661&lg=-59.32479858398438&zoom=12"
        },
        {
          "nombre": "Entre Ríos (Rosario del Tala y alrededores)",
          "prefijo": "3445",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-32.31092909162695&lg=-59.132194519042976&zoom=12"
        },
        {
          "nombre": "Entre Ríos (Gualeguaychú y alrededores)",
          "prefijo": "3446",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-32.99887413338121&lg=-58.519706726074226&zoom=12"
        },
        {
          "nombre": "Entre Ríos (Colón y alrededores)",
          "prefijo": "3447",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-32.23255132369509&lg=-58.18084716796876&zoom=12"
        },
        {
          "nombre": "Entre Ríos (Federal y alrededores)",
          "prefijo": "3454",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-30.961123839411403&lg=-58.784408569335945&zoom=11"
        },
        {
          "nombre": "Entre Ríos (Villaguay y alrededores)",
          "prefijo": "3455",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.868810958052563&lg=-59.012374877929695&zoom=11"
        },
        {
          "nombre": "Entre Ríos (Chajarí y alrededores)",
          "prefijo": "3456",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-30.73560817256108&lg=-57.97314929999999&zoom=11"
        },
        {
          "nombre": "Entre Ríos (San José de Feliciano y alrededores)",
          "prefijo": "3458",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-30.384130245890272&lg=-58.79951477050782&zoom=11"
        },
        {
          "nombre": "Santa Fe (Santa Teresa y alrededores)",
          "prefijo": "3460",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.461806983280546&lg=-60.804862976074226&zoom=12"
        },
        {
          "nombre": "Santa Fe (Venado Tuerto y alrededores)",
          "prefijo": "3462",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.75688594085081&lg=-61.96460723876954&zoom=12"
        },
        {
          "nombre": "Córdoba (Canals y alrededores)",
          "prefijo": "3463",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.5588483610808&lg=-62.88299560546876&zoom=12"
        },
        {
          "nombre": "Santa Fe (Casilda y alrededores)",
          "prefijo": "3464",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.07198015432511&lg=-61.164665222167976&zoom=12"
        },
        {
          "nombre": "Santa Fe (Firmat y alrededores)",
          "prefijo": "3465",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.4586563255238&lg=-61.45065307617188&zoom=12"
        },
        {
          "nombre": "Santa Fe (Barrancas y alrededores)",
          "prefijo": "3466",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-32.23719781901941&lg=-60.9627914428711&zoom=12"
        },
        {
          "nombre": "Córdoba y Santa Fe (Cruz Alta y alrededores)",
          "prefijo": "3467",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.03773724796046&lg=-61.80530548095704&zoom=12"
        },
        {
          "nombre": "Córdoba y Santa Fe (Corral de Bustos y alrededores)",
          "prefijo": "3468",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.298394990616416&lg=-62.176437377929695&zoom=11"
        },
        {
          "nombre": "Santa Fe (Acebal y alrededores)",
          "prefijo": "3469",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.24198972731705&lg=-60.82477569580079&zoom=13"
        },
        {
          "nombre": "Santa Fe (Cañada de Gómez y alrededores)",
          "prefijo": "3471",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-32.820027651215284&lg=-61.39503479003907&zoom=13"
        },
        {
          "nombre": "Córdoba (Marcos Juárez y alrededores)",
          "prefijo": "3472",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-32.70642228639568&lg=-62.08717346191407&zoom=12"
        },
        {
          "nombre": "Santa Fe (San Lorenzo y alrededores)",
          "prefijo": "3476",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-32.74137100776755&lg=-60.73156356811524&zoom=13"
        },
        {
          "nombre": "Santa Fe (Reconquista y alrededores)",
          "prefijo": "3482",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-29.165032246148105&lg=-59.6517276763916&zoom=12"
        },
        {
          "nombre": "Santa Fe (Vera y alrededores)",
          "prefijo": "3483",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-29.46620427522556&lg=-60.18894195556641&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Zárate y alrededores)",
          "prefijo": "3487",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.10242370984042&lg=-59.02027130126954&zoom=12"
        },
        {
          "nombre": "Buenos Aires (Campana y alrededores)",
          "prefijo": "3489",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.1876658575447&lg=-58.950920104980476&zoom=13"
        },
        {
          "nombre": "Santa Fe y Santiago del Estero (Ceres y alrededores)",
          "prefijo": "3491",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-29.8841136007713&lg=-61.95327758789063&zoom=12"
        },
        {
          "nombre": "Santa Fe (Rafaela y alrededores)",
          "prefijo": "3492",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.25037814985571&lg=-61.506271362304695&zoom=11"
        },
        {
          "nombre": "Santa Fe (Sunchales y alrededores)",
          "prefijo": "3493",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-30.950230235126554&lg=-61.55673980712891&zoom=12"
        },
        {
          "nombre": "Santa Fe (Esperanza y alrededores)",
          "prefijo": "3496",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.446238702913487&lg=-60.89309692382813&zoom=11"
        },
        {
          "nombre": "Santa Fe (Llambi Campbell y alrededores)",
          "prefijo": "3497",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.186224547734263&lg=-60.74375152587891&zoom=13"
        },
        {
          "nombre": "Santa Fe (San Justo y alrededores)",
          "prefijo": "3498",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-30.79758946002001&lg=-60.59406280517579&zoom=13"
        },
        {
          "nombre": "Córdoba (Deán Funes y alrededores)",
          "prefijo": "3521",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-30.417887641071157&lg=-64.3294143676758&zoom=12"
        },
        {
          "nombre": "Córdoba (Villa de María y alrededores)",
          "prefijo": "3522",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-29.905990152171317&lg=-63.71572494506837&zoom=13"
        },
        {
          "nombre": "Córdoba (Villa del Totoral y alrededores)",
          "prefijo": "3524",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-30.708043273475003&lg=-64.07192230224611&zoom=13"
        },
        {
          "nombre": "Córdoba (Jesús María y alrededores)",
          "prefijo": "3525",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-30.98673363476176&lg=-64.09921646118165&zoom=13"
        },
        {
          "nombre": "Córdoba (Oliva y alrededores)",
          "prefijo": "3532",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-32.04197592952657&lg=-63.55938434600831&zoom=13"
        },
        {
          "nombre": "Córdoba (Las Varillas y alrededores)",
          "prefijo": "3533",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.89038461310491&lg=-62.69107818603516&zoom=12"
        },
        {
          "nombre": "Córdoba (Bell Ville y alrededores)",
          "prefijo": "3537",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-32.62809903329911&lg=-62.67425537109376&zoom=12"
        },
        {
          "nombre": "Córdoba (Villa Carlos Paz y alrededores)",
          "prefijo": "3541",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.423749156560586&lg=-64.49401715&zoom=13"
        },
        {
          "nombre": "Córdoba (Salsacate y alrededores)",
          "prefijo": "3542",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.32196730125605&lg=-65.0768280029297&zoom=13"
        },
        {
          "nombre": "Córdoba (Argüello y alrededores)",
          "prefijo": "3543",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.3370703573764&lg=-64.28306579589845&zoom=13"
        },
        {
          "nombre": "Córdoba (Villa Dolores y alrededores)",
          "prefijo": "3544",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.949540446547825&lg=-65.17467498779298&zoom=13"
        },
        {
          "nombre": "Córdoba (Santa Rosa de Calamuchita y alrededores)",
          "prefijo": "3546",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-32.07428377001756&lg=-64.54004287719728&zoom=13"
        },
        {
          "nombre": "Córdoba (Alta Gracia y alrededores)",
          "prefijo": "3547",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.657545762907237&lg=-64.41736640000002&zoom=12"
        },
        {
          "nombre": "Córdoba (Villa Giardino y alrededores)",
          "prefijo": "3548",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.088810047715448&lg=-64.46056365966798&zoom=12"
        },
        {
          "nombre": "Córdoba (Cruz del Eje y alrededores)",
          "prefijo": "3549",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-30.720292558597645&lg=-64.79427337646486&zoom=12"
        },
        {
          "nombre": "Córdoba y Santa Fe (Morteros y alrededores)",
          "prefijo": "3562",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-30.731212295953558&lg=-61.95053100585938&zoom=11"
        },
        {
          "nombre": "Córdoba (Balnearia y alrededores)",
          "prefijo": "3563",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.00733422798419&lg=-62.66326904296876&zoom=12"
        },
        {
          "nombre": "Córdoba y Santa Fe (San Francisco y alrededores)",
          "prefijo": "3564",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.461427028572153&lg=-62.05816268920899&zoom=11"
        },
        {
          "nombre": "Córdoba (Río Tercero y alrededores)",
          "prefijo": "3571",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-32.15701248607009&lg=-64.10144805908205&zoom=12"
        },
        {
          "nombre": "Córdoba (Río Segundo y alrededores)",
          "prefijo": "3572",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.65323527479725&lg=-63.88549804687501&zoom=13"
        },
        {
          "nombre": "Córdoba (Villa del Rosario y alrededores)",
          "prefijo": "3572",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.556011391095595&lg=-63.519515991210945&zoom=12"
        },
        {
          "nombre": "Córdoba (Río Primero y alrededores)",
          "prefijo": "3574",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.337803453762206&lg=-63.599166870117195&zoom=12"
        },
        {
          "nombre": "Córdoba (La Puerta y alrededores)",
          "prefijo": "3575",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-30.896774702374667&lg=-63.239364624023445&zoom=13"
        },
        {
          "nombre": "Córdoba (Arroyito y alrededores)",
          "prefijo": "3576",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.42104600687802&lg=-63.02204132080079&zoom=12"
        },
        {
          "nombre": "Córdoba y San Luis (Sampacho y alrededores)",
          "prefijo": "3582",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.38300620236494&lg=-64.71530914306642&zoom=13"
        },
        {
          "nombre": "Córdoba (Vicuña Mackenna y alrededores)",
          "prefijo": "3583",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.912879061442034&lg=-64.38125610351564&zoom=12"
        },
        {
          "nombre": "Córdoba (La Carlota y alrededores)",
          "prefijo": "3584",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.41768735733493&lg=-63.35815429687501&zoom=11"
        },
        {
          "nombre": "Córdoba (Adelia María y alrededores)",
          "prefijo": "3585",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.64006173269824&lg=-63.991928100585945&zoom=12"
        },
        {
          "nombre": "Formosa (Ingeniero Juárez y alrededores)",
          "prefijo": "3711",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-23.900736937020543&lg=-61.84525966644288&zoom=13"
        },
        {
          "nombre": "Formosa y Chaco (Las Lomitas y alrededores)",
          "prefijo": "3715",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-24.696934226366682&lg=-60.585136413574226&zoom=12"
        },
        {
          "nombre": "Formosa (Comandante Fontana y alrededores)",
          "prefijo": "3716",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-25.337820284408895&lg=-59.64889526367188&zoom=12"
        },
        {
          "nombre": "Formosa (Clorinda y alrededores)",
          "prefijo": "3718",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-25.299337565234087&lg=-57.753410339355476&zoom=12"
        },
        {
          "nombre": "Chaco (Charadai y alrededores)",
          "prefijo": "3721",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.66680561332161&lg=-59.87068176269532&zoom=12"
        },
        {
          "nombre": "Chaco (General José de San Martín y alrededores)",
          "prefijo": "3725",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-26.54522995324051&lg=-59.344711303710945&zoom=12"
        },
        {
          "nombre": "Chaco (Charata y alrededores)",
          "prefijo": "3731",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.22044113007616&lg=-61.12243652343751&zoom=11"
        },
        {
          "nombre": "Chaco (Presidencia de la Plaza y alrededores)",
          "prefijo": "3734",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-26.989395002989045&lg=-59.844589233398445&zoom=11"
        },
        {
          "nombre": "Chaco (Villa Ángela y alrededores)",
          "prefijo": "3735",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.60871316531578&lg=-60.685043334960945&zoom=11"
        },
        {
          "nombre": "Misiones (Bernardo de Irigoyen y alrededores)",
          "prefijo": "3741",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-26.27217474447333&lg=-53.68005752563477&zoom=13"
        },
        {
          "nombre": "Misiones (Puerto Rico y alrededores)",
          "prefijo": "3743",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-26.849191151547593&lg=-54.99996185302735&zoom=12"
        },
        {
          "nombre": "Misiones (Eldorado y alrededores)",
          "prefijo": "3751",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-26.414317900459412&lg=-54.6295166015625&zoom=12"
        },
        {
          "nombre": "Misiones (Leandro N. Alem y alrededores)",
          "prefijo": "3754",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.6011356833059&lg=-55.31633377075196&zoom=12"
        },
        {
          "nombre": "Misiones (Oberá y alrededores)",
          "prefijo": "3755",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.508575921567697&lg=-55.114974975585945&zoom=12"
        },
        {
          "nombre": "Corrientes (Santo Tomé y alrededores)",
          "prefijo": "3756",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-28.57276350125333&lg=-56.102714538574226&zoom=12"
        },
        {
          "nombre": "Misiones (Puerto Iguazú y alrededores)",
          "prefijo": "3757",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-25.65992641175809&lg=-54.57552909851075&zoom=12"
        },
        {
          "nombre": "Misiones y Corrientes (Apóstoles y alrededores)",
          "prefijo": "3758",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.92298554382169&lg=-55.782909393310554&zoom=13"
        },
        {
          "nombre": "Corrientes (Paso de los Libres y alrededores)",
          "prefijo": "3772",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-29.731290623787476&lg=-57.10968017578126&zoom=12"
        },
        {
          "nombre": "Corrientes (Mercedes y alrededores)",
          "prefijo": "3773",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-29.197725900405835&lg=-58.10188293457032&zoom=12"
        },
        {
          "nombre": "Corrientes (Curuzú Cuatiá y alrededores)",
          "prefijo": "3774",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-29.80579492947979&lg=-58.06617736816406&zoom=13"
        },
        {
          "nombre": "Corrientes (Monte Caserosy alrededores)",
          "prefijo": "3775",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-30.26247743461651&lg=-57.65127182006837&zoom=13"
        },
        {
          "nombre": "Corrientes (Goya y alrededores)",
          "prefijo": "3777",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-29.16775145515014&lg=-59.22180175781251&zoom=12"
        },
        {
          "nombre": "Corrientes (Caá Catí y alrededores)",
          "prefijo": "3781",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.753734490130306&lg=-57.63874053955079&zoom=12"
        },
        {
          "nombre": "Corrientes (Saladas y alrededores)",
          "prefijo": "3782",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-28.269613327118847&lg=-58.62356185913087&zoom=13"
        },
        {
          "nombre": "Corrientes (Ituzaingó y alrededores)",
          "prefijo": "3786",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.609930077201188&lg=-56.71554565429688&zoom=12"
        },
        {
          "nombre": "La Rioja (Chepes y alrededores)",
          "prefijo": "3821",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.352757373215237&lg=-66.58281326293947&zoom=13"
        },
        {
          "nombre": "La Rioja (Chilecito y alrededores)",
          "prefijo": "3825",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-29.174374687812403&lg=-67.4912452697754&zoom=12"
        },
        {
          "nombre": "La Rioja (Chamical y alrededores)",
          "prefijo": "3826",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-30.372727086614265&lg=-66.31175994873048&zoom=13"
        },
        {
          "nombre": "La Rioja (Aimogasta y alrededores)",
          "prefijo": "3827",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-28.56128195160852&lg=-66.80849129999999&zoom=13"
        },
        {
          "nombre": "Catamarca y Santiago del Estero (Recreo y alrededores)",
          "prefijo": "3832",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-29.312147581143382&lg=-65.03974914550783&zoom=11"
        },
        {
          "nombre": "Catamarca (Andalgala y alrededores)",
          "prefijo": "3835",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.591831426437427&lg=-66.31902725&zoom=13"
        },
        {
          "nombre": "Catamarca (Tinogasta y alrededores)",
          "prefijo": "3837",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-28.06849651268897&lg=-67.56248474121095&zoom=13"
        },
        {
          "nombre": "Catamarca (Santa María y alrededores)",
          "prefijo": "3838",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-26.722307016045065&lg=-66.06250762939455&zoom=12"
        },
        {
          "nombre": "Santiago del Estero (Monte Quemado y alrededores)",
          "prefijo": "3841",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-25.814418001191893&lg=-62.82428741455079&zoom=12"
        },
        {
          "nombre": "Santiago del Estero (Quimilí y alrededores)",
          "prefijo": "3843",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.64703939431206&lg=-62.429122924804695&zoom=12"
        },
        {
          "nombre": "Santiago del Estero (Añatuya y alrededores)",
          "prefijo": "3844",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-28.46989851998662&lg=-62.82772064208985&zoom=12"
        },
        {
          "nombre": "Santiago del Estero (Loreto y alrededores)",
          "prefijo": "3845",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-28.303171574235144&lg=-64.17783737182619&zoom=13"
        },
        {
          "nombre": "Santiago del Estero (Tintina y alrededores)",
          "prefijo": "3846",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.03129982997934&lg=-62.70721435546876&zoom=13"
        },
        {
          "nombre": "Santiago del Estero (Frías y alrededores)",
          "prefijo": "3854",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-28.640129309591593&lg=-65.1178550720215&zoom=13"
        },
        {
          "nombre": "Santiago del Estero (Suncho Corral y alrededores)",
          "prefijo": "3855",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.94679608220783&lg=-63.42819213867188&zoom=12"
        },
        {
          "nombre": "Santiago del Estero (Villa Ojo de Aguay alrededores)",
          "prefijo": "3856",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-29.50400966544159&lg=-63.69100570678712&zoom=13"
        },
        {
          "nombre": "Santiago del Estero (Bandera y alrededores)",
          "prefijo": "3857",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-28.885564506657616&lg=-62.25711822509766&zoom=12"
        },
        {
          "nombre": "Santiago del Estero (Termas de Río Hondo y alrededores)",
          "prefijo": "3858",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.50294239285518&lg=-64.86070632934572&zoom=13"
        },
        {
          "nombre": "Santiago del Estero (Nueva Esperanza y alrededores)",
          "prefijo": "3861",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-26.205504356282102&lg=-64.23860549926759&zoom=13"
        },
        {
          "nombre": "Tucumán (Trancas y alrededores)",
          "prefijo": "3862",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-26.238305422824947&lg=-65.26445388793947&zoom=13"
        },
        {
          "nombre": "Tucumán (Monteros y alrededores)",
          "prefijo": "3863",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.174789302087067&lg=-65.49516677856447&zoom=13"
        },
        {
          "nombre": "Tucumán (Concepción y alrededores)",
          "prefijo": "3865",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.347983712830857&lg=-65.5876922607422&zoom=12"
        },
        {
          "nombre": "Tucumán (Tafí del Valle y alrededores)",
          "prefijo": "3867",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-26.86037098759473&lg=-65.69480895996095&zoom=13"
        },
        {
          "nombre": "Salta (Cafayate y alrededores)",
          "prefijo": "3868",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-26.066035334636084&lg=-65.9608840942383&zoom=12"
        },
        {
          "nombre": "Tucumán (Ranchillos y San Miguel y alrededores)",
          "prefijo": "3869",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-26.967977749051432&lg=-65.03597259521486&zoom=12"
        },
        {
          "nombre": "Salta (Tartagal y alrededores)",
          "prefijo": "3873",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-22.522705703482472&lg=-63.796405792236335&zoom=13"
        },
        {
          "nombre": "Salta (San José de Metán y alrededores)",
          "prefijo": "3876",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-25.508052238221445&lg=-64.98481750488283&zoom=13"
        },
        {
          "nombre": "Salta y Chaco (Joaquín Víctor González y alrededores)",
          "prefijo": "3877",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-25.123838412630676&lg=-64.13097381591798&zoom=12"
        },
        {
          "nombre": "Salta (Orán y alrededores)",
          "prefijo": "3878",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-23.148883635455952&lg=-64.32357788085939&zoom=12"
        },
        {
          "nombre": "Jujuy y Salta (La Quiaca y alrededores)",
          "prefijo": "3885",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-22.144163813359693&lg=-65.58151245117189&zoom=12"
        },
        {
          "nombre": "Jujuy (Libertador General San Martín y alrededores)",
          "prefijo": "3886",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-23.81016122624929&lg=-64.79032516479494&zoom=13"
        },
        {
          "nombre": "Jujuy (San Pedro de Jujuy y alrededores)",
          "prefijo": "3888",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-24.238512298151253&lg=-64.88800048828126&zoom=12"
        },
        {
          "nombre": "Jujuy (Humahuaca y alrededores)",
          "prefijo": "3889",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-23.213109231528158&lg=-65.35062789916994&zoom=13"
        },
        {
          "nombre": "Tucumán (Graneros y alrededores)",
          "prefijo": "3891",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.659811821285018&lg=-65.43628692626955&zoom=13"
        },
        {
          "nombre": "Tucumán (Amaicha del Valle y alrededores)",
          "prefijo": "3892",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-26.598504676214677&lg=-65.91762542724611&zoom=13"
        },
        {
          "nombre": "Tucumán (Burruyacú y alrededores)",
          "prefijo": "3894",
          "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-26.51543444547615&lg=-64.74328994750978&zoom=13"
        }
      ]
    }  
 `;
  
    return JSON.parse(zonasJSON).zonas;
  }
  
  function mostrarInfoZonaGeografica(zona) {
    var infoContainer = document.getElementById('resultado-geolocalizacion');
    infoContainer.innerHTML = '';
  
    if (zona) {
      var nombreZona = document.createElement('h3');
      nombreZona.style.color = '#fff';
      nombreZona.style.margin = '5px';
      nombreZona.textContent = 'Zona: ' + zona.nombre;

      infoContainer.appendChild(nombreZona);
      var mapaLink = document.createElement('a');
      mapaLink.style.display = 'block'; /* Para que el enlace ocupe todo el ancho disponible */
      mapaLink.style.color = '#fff';
      mapaLink.style.fontFamily = 'sans-serif';
      mapaLink.style.margin = '5px';
      mapaLink.style.textDecoration = 'none';
      mapaLink.addEventListener('mouseenter', function() {;
        mapaLink.style.color = '#ff732d';
      });
      mapaLink.addEventListener('mouseleave', function() {
        mapaLink.style.color = '#fff';
      });
      mapaLink.href = zona.mapa;
      mapaLink.className = 'mapa-antenas'
      mapaLink.target = '_blank';
      mapaLink.textContent = '>> click para ver cobertura <<';

      infoContainer.appendChild(mapaLink);
    } else {
      var mensajeError = document.createElement('p');
      mensajeError.textContent = 'Código de área no encontrado.';
      infoContainer.appendChild(mensajeError);
    }
  
    // Muestra el contenedor solo si hay información disponible
    if (zona) {
      infoContainer.style.display = 'block';
      var h2Ubicacion = document.getElementById('h2-ubicacion');
      h2Ubicacion.style.display = 'block';
    } else {
      infoContainer.style.display = 'none';
    }
  }
  

  
