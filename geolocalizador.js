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
    // Extraer el código de área del número de teléfono
    var codigoArea = numeroTelefono.match(/^\d{3,5}(?=15)/); // Extrae de 3 a 5 dígitos como código de área seguidos de "15" sin incluir "15" en el resultado
    return codigoArea ? codigoArea[0] : null;
  }
  
  
  function obtenerZonasGeograficas() {
    var zonasJSON = `
    {
        "zonas": [
          {
            "nombre": "Buenos Aires",
            "prefijo": "011",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.70379994079757&lg=-58.583908081054695&zoom=10"
          },
          {
            "nombre": "Córdoba",
            "prefijo": "0351",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.43012787536121&lg=-64.20650482177736&zoom=11"
          },
          {
            "nombre": "Rosario (Santa Fe)",
            "prefijo": "0341",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.001177610217496&lg=-60.68881988525391&zoom=11"
          },
          {
            "nombre": "Mendoza",
            "prefijo": "0261",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.137551192346145&lg=-69.19052124023439&zoom=9"
          },
          {
            "nombre": "Tucumán",
            "prefijo": "0381",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-26.941659545381505&lg=-65.27389526367189&zoom=10"
          },
          {
            "nombre": "La Plata (Buenos Aires)",
            "prefijo": "0221",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-34.93618562829475&lg=-57.98824310302735&zoom=12"
          },
          {
            "nombre": "Mar del Plata (Buenos Aires)",
            "prefijo": "0223",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-38.01894225270577&lg=-57.58847555&zoom=11"
          },
          {
            "nombre": "Santa Fe",
            "prefijo": "0342",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.67266786512637&lg=-60.84365844726563&zoom=11"
          },
          {
            "nombre": "Salta",
            "prefijo": "0387",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-24.823508980256506&lg=-65.45534133911134&zoom=12"
          },
          {
            "nombre": "Paraná (Entre Ríos)",
            "prefijo": "0343",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.762764353412827&lg=-60.522480010986335&zoom=12"
          },
          {
            "nombre": "San Juan",
            "prefijo": "0264",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-31.668577131274443&lg=-68.62197875976564&zoom=9"
          },
          {
            "nombre": "Resistencia (Chaco)",
            "prefijo": "0362",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.467612073314093&lg=-59.00825500488282&zoom=12"
          },
          {
            "nombre": "Corrientes",
            "prefijo": "0379",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.631223846681277&lg=-58.67385864257813&zoom=10"
          },
          {
            "nombre": "Bahía Blanca (Buenos Aires)",
            "prefijo": "0291",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-38.731054199763825&lg=-62.25849151611329&zoom=12"
          },
          {
            "nombre": "Neuquén",
            "prefijo": "0299",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-38.94979740456155&lg=-68.68927001953126&zoom=9"
          },
          {
            "nombre": "Santiago del Estero",
            "prefijo": "0385",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.96954010173255&lg=-64.07089233398439&zoom=10"
          },
          {
            "nombre": "Posadas (Misiones)",
            "prefijo": "0376",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-27.427699557414545&lg=-55.91560363769532&zoom=12"
          },
          {
            "nombre": "San Salvador de Jujuy (Jujuy)",
            "prefijo": "0388",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-24.215500534742663&lg=-65.31612396240236&zoom=12"
          },
          {
            "nombre": "Formosa",
            "prefijo": "0370",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-26.181167075950878&lg=-58.26290130615235&zoom=12"
          },
          {
            "nombre": "San Luis",
            "prefijo": "02652",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-33.30126451306708&lg=-66.33201599121095&zoom=10"
          },
          {
            "nombre": "Catamarca",
            "prefijo": "03833",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-28.514254381037176&lg=-65.78922271728517&zoom=11"
          },
          {
            "nombre": "La Rioja",
            "prefijo": "03822",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-29.47845895048651&lg=-66.90261840820314&zoom=10"
          },
          {
            "nombre": "Río Gallegos (Santa Cruz)",
            "prefijo": "02966",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-51.646408616283026&lg=-69.26263165&zoom=12"
          },
          {
            "nombre": "Ushuaia (Tierra del Fuego)",
            "prefijo": "02901",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-54.82660131962677&lg=-68.29925537109376&zoom=12"
          },
          {
            "nombre": "Viedma (Río Negro)",
            "prefijo": "02920",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-40.964393124663104&lg=-63.3994531&zoom=10"
          },
          {
            "nombre": "Rawson (Chubut)",
            "prefijo": "02965",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-43.299345318210165&lg=-65.1056655&zoom=10"
          },
          {
            "nombre": "Santa Rosa (La Pampa)",
            "prefijo": "02954",
            "mapa": "https://www.nperf.com/es/map/AR/-/152392.Movistar-Mvil/signal/?ll=-36.62053001376362&lg=-64.29740875000002&zoom=12"
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
      nombreZona.style.margin = '10px auto 5px 5px';
      nombreZona.textContent = 'Zona: ' + zona.nombre;

      infoContainer.appendChild(nombreZona);
      var mapaLink = document.createElement('a');
      mapaLink.style.display = 'block'; /* Para que el enlace ocupe todo el ancho disponible */
      mapaLink.style.color = '#fff';
      mapaLink.style.fontFamily = 'sans-serif';
      mapaLink.style.margin = '10px auto 5px 5px';
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
  

  