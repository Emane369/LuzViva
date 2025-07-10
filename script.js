let idiomaActual = 'es';

const traducciones = {
  es: {
    bienvenida: "Bienvenido a LuzViva",
    titulo_versiculo: "📜 Versículo del Día",
    contenido_versiculo: "Todo lo puedo en Cristo que me fortalece.",
    referencia_versiculo: "— Filipenses 4:13",
    titulo_oracion: "🙏 Oración de Gratitud",
    contenido_oracion: "Señor, gracias por este nuevo día. Te ofrezco mis acciones, pensamientos y palabras como semilla de paz."
  },
  en: {
    bienvenida: "Welcome to LuzViva",
    titulo_versiculo: "📜 Verse of the Day",
    contenido_versiculo: "I can do all things through Christ who strengthens me.",
    referencia_versiculo: "— Philippians 4:13",
    titulo_oracion: "🙏 Prayer of Gratitude",
    contenido_oracion: "Lord, thank you for this new day. I offer my actions, thoughts, and words as seeds of peace."
  }
};

function actualizarTexto() {
  const t = traducciones[idiomaActual];
  document.getElementById('bienvenida').textContent = t.bienvenida;
  document.getElementById('titulo_versiculo').textContent = t.titulo_versiculo;
  document.getElementById('contenido_versiculo').textContent = t.contenido_versiculo;
  document.getElementById('referencia_versiculo').textContent = t.referencia_versiculo;
  document.getElementById('titulo_oracion').textContent = t.titulo_oracion;
  document.getElementById('contenido_oracion').textContent = t.contenido_oracion;
}

function cambiarIdioma(lang) {
  idiomaActual = lang;
  actualizarTexto();
}

actualizarTexto();
