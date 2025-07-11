// Idioma por defecto
let idiomaActual = 'es';

// Textos fijos por idioma
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

// 🔄 Botones que cambian el idioma
function cambiarIdioma(lang) {
  idiomaActual = lang;
  actualizarTexto();
}

// 📜 Cargar versículo por idioma
async function cargarVersiculo() {
  try {
    const res = await fetch('data/versiculos.json');
    const datos = await res.json();
    const categoria = idiomaActual === 'es' ? 'esperanza' : 'hope';
    const versiculos = datos[idiomaActual][categoria];

    if (versiculos && versiculos.length > 0) {
      const aleatorio = versiculos[Math.floor(Math.random() * versiculos.length)];
      document.getElementById('contenido_versiculo').textContent = aleatorio.texto;
      document.getElementById('referencia_versiculo').textContent = `— ${aleatorio.referencia}`;
    } else {
      document.getElementById('contenido_versiculo').textContent = "[Versículo no disponible]";
      document.getElementById('referencia_versiculo').textContent = "";
    }
  } catch (error) {
    console.error("Error al cargar versículo:", error);
    document.getElementById('contenido_versiculo').textContent = "[Error al cargar versículo]";
    document.getElementById('referencia_versiculo').textContent = "";
  }
}

// 🙏 Cargar oración según idioma
async function cargarOracion() {
  try {
    const res = await fetch('data/oraciones.json');
    const datos = await res.json();
    const categoria = idiomaActual === 'es' ? 'padre_nuestro' : 'our_father';
    const oracion = datos[idiomaActual][categoria];

    if (oracion) {
      document.getElementById('contenido_oracion').textContent = oracion.texto;
      document.getElementById('audio_oracion').src = oracion.audio;
    } else {
      document.getElementById('contenido_oracion').textContent = "[Oración no disponible]";
      document.getElementById('audio_oracion').src = "";
    }
  } catch (error) {
    console.error("Error al cargar oración:", error);
    document.getElementById('contenido_oracion').textContent = "[Error al cargar oración]";
    document.getElementById('audio_oracion').src = "";
  }
}

// 🧩 Actualiza los textos visuales y el contenido dinámico
function actualizarTexto() {
  const t = traducciones[idiomaActual];

  document.getElementById('bienvenida').textContent = t.bienvenida;
  document.getElementById('titulo_versiculo').textContent = t.titulo_versiculo;
  document.getElementById('titulo_oracion').textContent = t.titulo_oracion;

  cargarVersiculo();
  cargarOracion();
}

// 🕊️ Inicializar
actualizarTexto();
