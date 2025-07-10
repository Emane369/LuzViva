// Idioma actual (inicial en español)
let idiomaActual = 'es';

// Traducciones generales para textos de interfaz
const traducciones = {
  es: {
    bienvenida: "Bienvenido a LuzViva",
    titulo_versiculo: "📜 Versículo del Día",
    titulo_oracion: "🙏 Oración de Gratitud",
    contenido_oracion: "Señor, gracias por este nuevo día. Te ofrezco mis acciones, pensamientos y palabras como semilla de paz."
  },
  en: {
    bienvenida: "Welcome to LuzViva",
    titulo_versiculo: "📜 Verse of the Day",
    titulo_oracion: "🙏 Prayer of Gratitude",
    contenido_oracion: "Lord, thank you for this new day. I offer my actions, thoughts, and words as seeds of peace."
  }
};

// 🧠 Función para cargar versículos desde JSON dinámicamente
async function cargarVersiculos(categoria) {
  try {
    const respuesta = await fetch('data/versiculos.json');
    const datos = await respuesta.json();

    const idiomaVersiculo = idiomaActual === 'es' ? 'es' : 'en';
    const versiculos = datos[idiomaVersiculo][categoria];

    if (versiculos && versiculos.length > 0) {
      const aleatorio = versiculos[Math.floor(Math.random() * versiculos.length)];
      document.getElementById('contenido_versiculo').textContent = aleatorio.texto;
      document.getElementById('referencia_versiculo').textContent = `— ${aleatorio.referencia}`;
    } else {
      document.getElementById('contenido_versiculo').textContent = "[No hay versículos disponibles]";
      document.getElementById('referencia_versiculo').textContent = "";
    }
  } catch (error) {
    console.error("Error al cargar versículos:", error);
    document.getElementById('contenido_versiculo').textContent = "[Error al cargar versículo]";
    document.getElementById('referencia_versiculo').textContent = "";
  }
}

// 🕊️ Actualizar todo el texto en pantalla
function actualizarTexto() {
  const t = traducciones[idiomaActual];

  document.getElementById('bienvenida').textContent = t.bienvenida;
  document.getElementById('titulo_versiculo').textContent = t.titulo_versiculo;
  document.getElementById('titulo_oracion').textContent = t.titulo_oracion;
  document.getElementById('contenido_oracion').textContent = t.contenido_oracion;

  // Puedes cambiar "esperanza" por otra categoría según lo que desees mostrar
  cargarVersiculos("esperanza");
}

// 🌐 Cambiar idioma desde botón
function cambiarIdioma(lang) {
  idiomaActual = lang;
  actualizarTexto();
}

// Inicializa contenido al cargar
actualizarTexto();
