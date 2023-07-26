document.addEventListener('DOMContentLoaded', function() {
  var buscarBtn = document.getElementById('buscar-btn');
  var resetBtn = document.getElementById('reset-btn');

  buscarBtn.addEventListener('click', obtenerRespuesta);
  resetBtn.addEventListener('click', resetearValores);

  cargarOpcionesObjecion();
});


function resetearValores() {
  document.getElementById('empresa').selectedIndex = 0;
  document.getElementById('tipo-linea').selectedIndex = 0;
  document.getElementById('uso').selectedIndex = 0;
  document.getElementById('busqueda-objecion').value = '';
  document.getElementById('respuesta').textContent = '';

  // Ocultar el respuesta-container y el h2 al presionar el botón "Reset"
  var respuestaContainer = document.getElementById('respuesta-container');
  respuestaContainer.classList.remove('has-content');
  var h2Respuesta = document.getElementById('h2-respuesta');
  h2Respuesta.style.display = 'none';
}


function cargarOpcionesObjecion() {
  var objecionDatalist = document.getElementById('opciones-objecion');
  var respuestas = obtenerRespuestas();
  var busquedaInput = document.getElementById('busqueda-objecion');
  var busquedaTexto = busquedaInput.value.toLowerCase().trim();

  objecionDatalist.innerHTML = '';

  for (var i = 0; i < respuestas.length; i++) {
    var objecion = respuestas[i].objecion.toLowerCase();
    var opcion = document.createElement('option');
    opcion.value = respuestas[i].objecion;
    objecionDatalist.appendChild(opcion);
  }

  if (busquedaTexto.length > 0) {
    filtrarOpcionesObjecion(busquedaTexto);
  }
}


function filtrarOpcionesObjecion(busquedaTexto) {
  var objecionDatalist = document.getElementById('opciones-objecion');
  var opciones = objecionDatalist.getElementsByTagName('option');

  for (var i = 0; i < opciones.length; i++) {
    var objecion = opciones[i].value.toLowerCase();

    if (objecion.includes(busquedaTexto)) {
      opciones[i].style.display = 'block';
    } else {
      opciones[i].style.display = 'none';
    }
  }
}

var busquedaInput = document.getElementById('busqueda-objecion');
busquedaInput.addEventListener('keyup', function() {
  var busquedaTexto = busquedaInput.value.toLowerCase().trim();
  filtrarOpcionesObjecion(busquedaTexto);
});




function obtenerRespuestas() {
  var respuestasJSON = `{
    "respuestas": [
      {
        "objecion": "No me gusta Movistar como empresa",
        "comprende": "Alguna vez te sucedió algo con la facturación o la señal?",
        "rebate": "Lamento mucho lo que te sucedió, en este caso ya cuentas con el descuento fijo por 24 meses. ¿Te podemos enviar un mail con la promoción para que te quede a ti?",
        "pregunta": "¿Alguna vez realizaste este trámite?"
      },
      {
        "objecion": "Me llamaron hoy a la mañana",
        "comprende": "Lo comprendo que estés cansado de los llamados, sin embargo...",
        "rebate": "Lo que quiero dar es un descuento por 24 meses en tu línea celular.",
        "pregunta": "Le hago una consulta rápida. ¿Recarga en un kiosko o paga una factura?"
      },
      {
        "objecion": "No gracias, no estoy interesada en ningún plan",
        "comprende": "Seguramente te encuentres cómodo con lo que tienes. ¿Realizas recargas?",
        "rebate": "La idea es que con un plan puedas tener conectividad todo el día y en todo lugar. Vas a estar abonando menos...",
        "pregunta": "Cuéntame qué es lo que más utilizas en la línea."
      },
      {
        "objecion": "No me interesa",
        "comprende": "La entiendo que no estés interesado. Tenga en cuenta...",
        "rebate": "Nosotros actualmente estamos ofreciendo un servicio con un descuento fijo por 24 meses y con un plan acorde a sus necesidades...",
        "pregunta": "¿Qué es lo que más utiliza en su compañía?"
      },
      {
        "objecion": "No soy la encargada de la línea/abono",
        "comprende": "Lo comprendo, ¿es usted quien utiliza la línea?",
        "rebate": "No te preocupes que puedo gestionar con vos el trámite y que estés ahorrando desde el próximo mes. Solo necesitamos los datos del titular...",
        "pregunta": "¿Sabes cómo es el trámite?"
      },
      {
        "objecion": "Tengo muchos años con Claro/Personal y no me voy a cambiar",
        "comprende": "Comprendo perfectamente el recorrido que tienes en la empresa...",
        "rebate": "Tenga en cuenta que nosotros lo invitamos a ingresar a nuestra compañía, con la comodidad de...",
        "pregunta": "¿Cuánto viene pagando en Claro/Personal? ¿Qué es lo que más utiliza?"
      },
      {
        "objecion": "Ya tuve Movistar y cuando necesité, no me dieron ninguna promoción",
        "comprende": "Lamento mucho que te haya pasado eso...",
        "rebate": "Yo lo invito a tener una nueva experiencia con la empresa. También quiero que sepas que yo le hago un seguimiento a todas mis gestiones, así usted puede preguntarme lo que quiere de su línea...",
        "pregunta": "¿Qué es lo que más utiliza en su compañía?"
      },
      {
        "objecion": "Estoy muy cómodo como estoy, no quiero cambiarme",
        "comprende": "Te entiendo perfectamente que estés cómodo...",
        "rebate": "Nosotros al igual que su compañía, le brindemos que este comunicado sin embargo con mayor calidad de servicio. Además una promoción por 24 meses abonando menos.",
        "pregunta": "Cuentame ¿Sabes como es el trámite?"
      },
      {
        "objecion": "Ya tuve Movistar y tuve problemas de facturación",
        "comprende": "Comprendo, cuentame cual fue el problema que tuvo?",
        "rebate": "Lo bueno es que hoy contamos con planes y promociones que tienen descuentos fijos por 24 meses. Hoy en dia en el caso que aumente su factura sera notificado por sms..",
        "pregunta": "Actualmente ¿Qué es lo que más utiliza?"
      },
      {
        "objecion": "No tengo señal en mi zona con Movistar",
        "comprende": "Entiendo su preocupación por la comunicación...",
        "rebate": "Quedese tranquil@o que hoy en dia estamos trabajando con antenas 4g y 5g, y estamso en mejora constante...",
        "pregunta": "Cuenteme ¿Qué es lo que más utiliza?"
      },
      {
        "objecion": "Me llamaron muchas veces..",
        "comprende": "Lamento mucho la situación. Le pido disculpas por eso...",
        "rebate": "Le explicaron que es para un descuento por 24 meses en su línea celular con gigas de regalo",
        "pregunta": "¿Alguna vez cambiaste de empresa?"
      },
      {
        "objecion": "Por ahora no",
        "comprende": "Comprendo, que estes comodo como estas...",
        "rebate": "Nuestra idea es que puedas comparar los servicios y las promociones. Y puedas empezar a abonar menos con nosotros y tambien mejores tu servicio..",
        "pregunta": "Actualmente ¿Qué es lo que más utiliza?"
      }
    ]
  }`;

  return JSON.parse(respuestasJSON).respuestas;
}


function obtenerRespuesta() {
  var objecion = document.getElementById('busqueda-objecion').value;
  var respuestaElement = document.getElementById('respuesta');
  var empresa = document.getElementById('empresa').value;
  var tipoLinea = document.getElementById('tipo-linea').value;
  var uso = document.getElementById('uso').value;

  var respuestas = obtenerRespuestas();
  var respuesta = respuestas.find(function(respuesta) {
    return respuesta.objecion === objecion;
  });

  if (respuesta) {
    var comprender = respuesta.comprende;
    var rebate = respuesta.rebate;
    var pregunta = respuesta.pregunta;

    if (!tipoLinea && !uso) {
      pregunta = pregunta;
    } else if (!uso) {
      pregunta = 'Cuenteme ¿Qué es lo que más utiliza?';
    } else if (uso !== 'ninguna') {
      pregunta = '¿Alguna vez cambiaste de empresa?';
    }

    var respuestaHTML = "<b>Comprende:</b> " + comprender.trim() + "<br><b>Rebate:</b> " + rebate.trim() + "<br><b>Pregunta:</b> " + pregunta.trim();
    respuestaElement.innerHTML = respuestaHTML;

    // Mostrar el respuesta-container y el h2 al tener una respuesta válida
    var respuestaContainer = document.getElementById('respuesta-container');
    respuestaContainer.classList.add('has-content');
    var h2Respuesta = document.getElementById('h2-respuesta');
    h2Respuesta.style.display = 'block';
  } else {
    // Ocultar el respuesta-container y el h2 si no hay una respuesta válida
    var respuestaContainer = document.getElementById('respuesta-container');
    respuestaContainer.classList.remove('has-content');
    var h2Respuesta = document.getElementById('h2-respuesta');
    h2Respuesta.style.display = 'none';
  }
}







