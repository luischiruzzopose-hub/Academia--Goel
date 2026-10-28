/*
  Simulacro de examen teórico — Academia Goel
  - Las preguntas están en data/preguntas.json
  - Las primeras FIJAS preguntas del archivo salen siempre.
  - Se sortean ALEATORIAS preguntas más entre el resto en cada intento.
  Para cambiar las cantidades, editá los dos números de abajo.
*/
(function () {
  var FIJAS = 10;
  var ALEATORIAS = 20;
  var LETRAS = 'ABCDEF';

  var banco = [];
  var seleccion = [];
  var respuestas = {};
  var corregido = false;

  var $ = function (id) { return document.getElementById(id); };
  var cont = $('preguntas');

  function mezclar(lista) {
    var a = lista.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function sortear() {
    return banco.slice(0, FIJAS).concat(mezclar(banco.slice(FIJAS)).slice(0, ALEATORIAS));
  }

  function crear(tag, clase, texto) {
    var el = document.createElement(tag);
    if (clase) el.className = clase;
    if (texto != null) el.textContent = texto;
    return el;
  }

  function dibujar() {
    cont.innerHTML = '';
    seleccion.forEach(function (q, i) {
      var tarjeta = crear('fieldset', 'pregunta');
      tarjeta.style.margin = '0';
      var leyenda = crear('legend', 'solo-lectores', 'Pregunta ' + (i + 1));
      tarjeta.appendChild(leyenda);

      var p = crear('p', 'pregunta-texto');
      p.appendChild(crear('span', 'pregunta-numero', (i + 1) + '.'));
      p.appendChild(crear('span', '', q.q));
      tarjeta.appendChild(p);

      if (q.img) {
        var img = crear('img', 'pregunta-senal');
        img.src = q.img;
        img.alt = 'Señal de tránsito de la pregunta ' + (i + 1);
        img.loading = 'lazy';
        tarjeta.appendChild(img);
      }

      var opciones = crear('div', 'opciones');
      q.o.forEach(function (texto, j) {
        var b = crear('button', 'opcion');
        b.type = 'button';
        b.dataset.q = q.n;
        b.dataset.o = j;
        b.setAttribute('aria-pressed', 'false');
        b.appendChild(crear('span', 'letra', LETRAS[j]));
        b.appendChild(crear('span', '', texto));
        opciones.appendChild(b);
      });
      tarjeta.appendChild(opciones);

      var dev = crear('p', 'devolucion');
      dev.hidden = true;
      tarjeta.appendChild(dev);

      cont.appendChild(tarjeta);
    });
    actualizarContador();
  }

  function actualizarContador() {
    var n = Object.keys(respuestas).length;
    $('contador').textContent = n + ' de ' + seleccion.length;
    var faltan = seleccion.length - n;
    $('faltan').textContent = faltan > 0
      ? 'Te faltan ' + faltan + (faltan === 1 ? ' pregunta' : ' preguntas') + ' por responder.'
      : '¡Listo! Ya respondiste todas.';
  }

  cont.addEventListener('click', function (e) {
    var b = e.target.closest('.opcion');
    if (!b || corregido) return;
    var qn = b.dataset.q;
    respuestas[qn] = Number(b.dataset.o);
    b.parentNode.querySelectorAll('.opcion').forEach(function (x) {
      x.classList.toggle('elegida', x === b);
      x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
    });
    actualizarContador();
  });

  function corregir() {
    var sinResponder = seleccion.length - Object.keys(respuestas).length;
    if (sinResponder > 0 && !window.confirm('Te faltan ' + sinResponder + ' preguntas. ¿Querés corregir igual?')) return;
    corregido = true;
    var bien = 0;
    var tarjetas = cont.querySelectorAll('.pregunta');
    seleccion.forEach(function (q, i) {
      var r = respuestas[q.n];
      var ok = r === q.c;
      if (ok) bien++;
      var t = tarjetas[i];
      t.querySelectorAll('.opcion').forEach(function (b, j) {
        b.classList.remove('elegida');
        if (j === q.c) b.classList.add('correcta');
        else if (j === r) b.classList.add('incorrecta');
        b.disabled = true;
      });
      var dev = t.querySelector('.devolucion');
      dev.hidden = false;
      if (ok) { dev.className = 'devolucion bien'; dev.textContent = '✓ Correcta'; }
      else {
        dev.className = 'devolucion mal';
        dev.textContent = (r === undefined ? 'Sin responder' : 'Incorrecta') +
          '. La respuesta correcta es: ' + LETRAS[q.c] + ') ' + q.o[q.c];
      }
    });
    cont.classList.add('sim-corregido');
    var total = seleccion.length;
    $('puntaje').innerHTML = bien + ' <em>de</em> ' + total;
    $('porcentaje').textContent = Math.round(bien / total * 100) + '% de respuestas correctas. Revisá abajo cada pregunta.';
    $('resultado').hidden = false;
    $('acciones').hidden = true;
    $('progreso').hidden = true;
    $('acciones-final').hidden = false;
    window.scrollTo({ top: $('resultado').getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
    $('resultado').focus({ preventScroll: true });
  }

  function nuevo() {
    seleccion = sortear();
    respuestas = {};
    corregido = false;
    cont.classList.remove('sim-corregido');
    $('resultado').hidden = true;
    $('acciones-final').hidden = true;
    $('acciones').hidden = false;
    $('progreso').hidden = false;
    dibujar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  $('corregir').addEventListener('click', corregir);
  document.querySelectorAll('[data-accion="otro"]').forEach(function (b) { b.addEventListener('click', nuevo); });

  fetch('data/preguntas.json')
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (datos) {
      banco = datos;
      $('cargando').hidden = true;
      nuevo();
    })
    .catch(function () {
      $('cargando').textContent = 'No se pudieron cargar las preguntas. Recargá la página para intentar de nuevo.';
    });
})();
