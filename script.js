let idiomaActual = 'es';

const traducciones = {
  es: {
    bienvenida: "Bienvenido a LuzViva",
    titulo_versiculo: "📜 Versículo del Día",
    titulo_oracion: "🙏 Oración del Día"
  },
  en: {
    bienvenida: "Welcome to LuzViva",
    titulo_versiculo: "📜 Verse of the Day",
    titulo_oracion: "🙏 Prayer of the Day"
  }
};

function cambiarIdioma(lang) {
  idiomaActual = lang;
  actualizarTexto();
}

async function cargarVersiculo(categoria = "esperanza") {
  const res = await fetch('data/versiculos.json');
  const datos = await res.json();
  const versiculos = datos[idiomaActual][categoria];
  const aleatorio = versiculos[Math.floor(Math.random() * versiculos.length)];
  document.getElementById('contenido_versiculo').textContent = aleatorio.texto;
  document.getElementById('referencia_versiculo').textContent = `— ${aleatorio.referencia}`;
}

async function cargarOracion(categoria = "gratitud") {
  const res = await fetch('data/oraciones.json');
  const datos = await res.json();
  const oracion = datos[idiomaActual][categoria];
  document.getElementById('contenido_oracion').textContent = oracion.texto;
  document.getElementById('audio_oracion').src = oracion.audio;
}

function actualizarTexto() {
  const t = traducciones[idiomaActual];
  document.getElementById('bienvenida').textContent = t.bienvenida;
  document.getElementById('titulo_versiculo').textContent = t.titulo_versiculo;
  document.getElementById('titulo_oracion').textContent = t.titulo_oracion;
  const categoria = idiomaActual === 'es' ? 'esperanza' : 'hope';
cargarVersiculo(categoria);
  cargarOracion();
}

actualizarTexto();
