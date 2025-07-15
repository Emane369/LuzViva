let idiomaActual = 'es';
let oracionSeleccionada = 'padre_nuestro';

const traducciones = {
  es: {
    bienvenida: "Un espacio para orar y contemplar",
    titulo_versiculo: "📜 Versículo del Día",
    titulo_oracion: "🙏 Oración del Día"
  },
  en: {
    bienvenida: "A sanctuary for prayer and reflection",
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
    reproductor.pause();
    reproductor.currentTime = 0;
    audioSource.setAttribute("src", oracion.audio);
    reproductor.load();

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


// 🎨 Fichas devocionales visuales

async function cargarFichasOraciones() {
  const res = await fetch("data/fichas-oraciones.json");
  const fichas = await res.json();
  const galeria = document.querySelector(".oraciones-galeria");

  if (!galeria) return; // Si no existe el contenedor, salimos

  galeria.innerHTML = "";

  Object.keys(fichas).forEach(key => {
    const ficha = fichas[key];
    const card = document.createElement("div");
    card.className = "ficha-oracion";
    card.style.backgroundColor = ficha.color;

    card.innerHTML = `
      <img src="${ficha.icono}" alt="${ficha.titulo}" class="icono-oracion" />
      <h3>${ficha.titulo}</h3>
      <p>${ficha.descripcion}</p>
    `;

    galeria.appendChild(card);
  });
}

cargarFichasOraciones();
const canvas = document.getElementById("particulas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = 180;

  let estrellas = Array.from({length: 40}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    d: Math.random() * 1.5
  }));

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    estrellas.forEach(e => {
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
      ctx.fill();
      e.y += e.d;
      if (e.y > canvas.height) {
        e.y = 0;
        e.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(animar);
  }

  animar();
}
