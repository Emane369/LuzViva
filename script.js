let idiomaActual = 'es';
let oracionSeleccionada = 'padre_nuestro';

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

async function cargarVersiculo() {
  const res = await fetch('data/versiculos.json');
  const datos = await res.json();
  const categoria = idiomaActual === 'es' ? 'esperanza' : 'hope';
  const versiculos = datos[idiomaActual][categoria];
  const aleatorio = versiculos[Math.floor(Math.random() * versiculos.length)];
  document.getElementById('contenido_versiculo').textContent = aleatorio.texto;
  document.getElementById('referencia_versiculo').textContent = `— ${aleatorio.referencia}`;
}

function convertirNombreIngles(nombre) {
  const mapa = {
    padre_nuestro: "our_father",
    ave_maria: "hail_mary",
    credo: "creed",
    salve: "salve",
    magnificat: "magnificat",
    gloria: "glory_be",
    actos_de_contricion: "act_of_contrition",
    oracion_al_espiritu_santo: "prayer_to_holy_spirit",
    angelus: "angelus",
    oracion_por_la_familia: "prayer_for_family"
  };
  return mapa[nombre] || "our_father";
}

function convertirNombreEspañol(nombre) {
  const mapa = {
    our_father: "padre_nuestro",
    hail_mary: "ave_maria",
    creed: "credo",
    salve: "salve",
    magnificat: "magnificat",
    glory_be: "gloria",
    act_of_contrition: "actos_de_contricion",
    prayer_to_holy_spirit: "oracion_al_espiritu_santo",
    angelus: "angelus",
    prayer_for_family: "oracion_por_la_familia"
  };
  return mapa[nombre] || "padre_nuestro";
}

async function cargarOracionPorNombre(categoria) {
  const res = await fetch("data/oraciones.json");
  const datos = await res.json();
  const oracion = datos[idiomaActual][categoria];

  const texto = document.getElementById("contenido_oracion");
  const audioSource = document.getElementById("audio_oracion");
  const reproductor = document.querySelector("audio");

  if (oracion) {
    texto.textContent = oracion.texto;

    // 🔊 Reiniciar y cargar nuevo audio
    reproductor.pause();
    reproductor.currentTime = 0;
    audioSource.setAttribute("src", oracion.audio);
    reproductor.load();

    // 🩹 Parche visual para móviles
    reproductor.style.display = "none";
    setTimeout(() => {
      reproductor.style.display = "block";
    }, 100);
  } else {
    texto.textContent = "[Oración no disponible]";
    audioSource.setAttribute("src", "");
    reproductor.load();
  }
}

function cargarOracionDesdeSelector() {
  const selector = document.getElementById('oracion_selector');
  const seleccion = selector.value;

  oracionSeleccionada = seleccion || 'padre_nuestro';
  const categoria = idiomaActual === 'es' ? oracionSeleccionada : convertirNombreIngles(oracionSeleccionada);
  cargarOracionPorNombre(categoria);
}

function actualizarSelector() {
  const selector = document.getElementById('oracion_selector');
  const valor = idiomaActual === 'es'
    ? oracionSeleccionada
    : convertirNombreIngles(oracionSeleccionada);

  selector.value = idiomaActual === 'es'
    ? convertirNombreEspañol(valor)
    : valor;
}

function actualizarTexto() {
  const t = traducciones[idiomaActual];
  document.getElementById('bienvenida').textContent = t.bienvenida;
  document.getElementById('titulo_versiculo').textContent = t.titulo_versiculo;
  document.getElementById('titulo_oracion').textContent = t.titulo_oracion;

  cargarVersiculo();

  const categoria = idiomaActual === 'es'
    ? oracionSeleccionada
    : convertirNombreIngles(oracionSeleccionada);

  cargarOracionPorNombre(categoria);
  actualizarSelector();
}

actualizarTexto();
