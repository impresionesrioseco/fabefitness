/* ==========================================================================
   FABE FITNESS — Lógica de la landing
   --------------------------------------------------------------------------
   1) CONFIGURACIÓN: es lo único que hay que editar para completar la web.
   2) El resto del archivo (menú, carrusel, lightbox, WhatsApp, etc.) no
      necesita modificaciones.

   REGLA: todo valor vacío ("" o []) significa "dato pendiente". La web NO
   muestra información inventada: usa textos del tipo "Consultá disponibilidad"
   hasta que se completen los datos reales.
   ========================================================================== */
"use strict";

/* ==========================================================================
   1. CONFIGURACIÓN CENTRALIZADA
   ========================================================================== */
const CONFIG = {
  /* Nombre del establecimiento */
  name: "FABE Fitness",

  /* WHATSAPP_NUMBER — número internacional completo, SOLO DÍGITOS, sin +, espacios ni guiones.
     Argentina (móvil): 54 + 9 + característica sin 0 + número sin 15.
     Ejemplo: "5493515551234". Mientras esté vacío, los botones de WhatsApp quedan desactivados. */
  WHATSAPP_NUMBER: "5493522454829",

  /* Mensajes iniciales de WhatsApp (se codifican automáticamente) */
  messages: {
    gym:      "Hola! Quiero consultar por el gimnasio de FABE Fitness. ¿Me pueden pasar información?",
    plans:    "Hola! Quisiera conocer los planes, tarifas y horarios del gimnasio de FABE Fitness.",
    padel:    "Hola! Quiero reservar una cancha de pádel en FABE Fitness. ¿Qué horarios tienen disponibles?",
    general:  "Hola! Quiero hacer una consulta sobre FABE Fitness.",
    feedback: "Hola! Quiero compartir mi experiencia en FABE Fitness."
  },

  /* Dirección (se muestra en la web, arma el mapa y el botón "Cómo llegar") */
  address:  "Publica s/n",          // Calle y número. Ej.: "Av. Siempre Viva 1234"
  locality: "Villa de Maria - Rio Seco",          // Ej.: "Córdoba"
  province: "Cordoba",          // Ej.: "Córdoba"
  countryCode: "AR",     // Código de país (para datos estructurados)

  /* Mapa (opcional). Si se deja vacío y hay dirección, el mapa se arma solo con la dirección.
     - mapEmbedUrl: el valor src="..." del iframe de Google Maps > Compartir > Insertar un mapa.
     - mapDirectionsUrl: enlace "Compartir" de Google Maps con la ubicación exacta (https://maps.app.goo.gl/...). */
  mapEmbedUrl: "",
  mapDirectionsUrl: "https://maps.app.goo.gl/PrKaBEDbsqaDNzw7A",

  /* Teléfono visible (con el formato que prefieras). Ej.: "+54 351 555-1234" */
  phone: "3522-454829",

  /* Dominio de la web, con https y sin barra final. Ej.: "https://www.fabefitness.com.ar" */
  domain: "https://www.jmcdiseños.com",

  /* Horarios (texto libre). Ej.: "Lunes a viernes de 8 a 22 h" */
  hours: {
    general: "06:00 a 13:00 - 15:00 a 21:00",         // Horarios de atención (sección Ubicación)
    gym: "",             // Horarios del gimnasio
    padel: ""            // Horarios de las canchas
  },

  /* Redes sociales: URL completa (https://...). Dejá vacío lo que no exista. */
  social: {
    instagram: "@fabefitness",
    facebook: "fb.com/fabefitness",
    tiktok: "",
    youtube: "",
    googleBusiness: ""   // Enlace al Perfil de Empresa de Google, cuando exista
  },

  /* Pádel — completar con datos reales */
  padel: {
    courts: "3 canchas techadas",          // Ej.: "3 canchas techadas"
    price: "$20.000 por turno",           // Ej.: "$ 20.000 por turno"
    duration: "50 minutos",        // Ej.: "90 minutos"
    reservations: "boton de WhatsApp",    // Ej.: "Reservá por WhatsApp con anticipación"
    info: "conectate ahora..."             // Información adicional
  },

  /* Gimnasio */
  gym: {
    /* Servicios confirmados. Ej.: ["Sala de musculación", "Zona de cardio"]. Si queda vacío, se muestra un texto genérico. */
    services: [],

    /* Planes. Cada plan: { name, description, price, frequency, hours }
       Ejemplo:
       { name: "Plan Mensual", description: "Acceso libre a la sala.", price: "$ 30.000", frequency: "Por mes", hours: "Lunes a viernes de 8 a 22 h" }
       Si queda vacío se muestra "Consultá por nuestros planes". */
    plans: []
  },

  /* Testimonios REALES y autorizados. Cada uno: { text, author, rating }  (rating opcional, 1 a 5)
     Si queda vacío se muestra una invitación a compartir la experiencia. */
  testimonials: [
    /* EJEMPLOS DE DISEÑO: llevan example: true, por lo que la web los rotula con la etiqueta "Ejemplo".
       Reemplazalos por opiniones REALES y autorizadas (y quitá example: true) antes de publicar.
       category: "Gimnasio" o "Pádel" (opcional, se muestra como etiqueta). */
    { category: "Gimnasio", example: true, author: "Nombre del cliente",
      text: "Un lugar cómodo para entrenar, con todo lo necesario a mano. Da gusto venir a entrenar a mi ritmo." },
    { category: "Gimnasio", example: true, author: "Nombre del cliente",
      text: "Pude armar mi rutina sin complicaciones. El ambiente y las máquinas invitan a volver." },
    { category: "Pádel", example: true, author: "Nombre del cliente",
      text: "Jugar en cancha techada hace que los partidos no dependan del clima. Es nuestro plan fijo con amigos." },
    { category: "Pádel", example: true, author: "Nombre del cliente",
      text: "Muy buenas canchas para juntarse a jugar. Coordinar el turno por WhatsApp es simple." }],

  /* Rutas de imágenes (todas dentro de la carpeta imagenes/). Para reemplazar una foto, usá el mismo nombre
     de archivo o cambiá la ruta acá. */
  images: {
    logo:           "imagenes/logo-fabe.png",
    portada:        "imagenes/portada-gimnasio.jpg",
    gimnasio1:      "imagenes/gimnasio-01.jpg",
    gimnasio2:      "imagenes/gimnasio-02.jpg",
    gimnasio3:      "imagenes/gimnasio-03.jpg",
    equipamiento1:  "imagenes/equipamiento-01.jpg",
    equipamiento2:  "imagenes/equipamiento-02.jpg",
    padel1:         "imagenes/padel-01.jpg",
    padel2:         "imagenes/padel-02.jpg",
    padel3:         "imagenes/padel-03.jpg",
    padelJugadores: "imagenes/padel-jugadores.jpg",
    instalaciones1: "imagenes/instalaciones-01.jpg",
    instalaciones2: "imagenes/instalaciones-02.jpg"
  }
};

/* Fotografías del carrusel. cat: "gimnasio" | "equipamiento" | "padel".
   Las imágenes que no existan en la carpeta se omiten automáticamente. */
const GALLERY = [
  { key: "gimnasio1",      cat: "gimnasio",     label: "El gimnasio",         alt: "Sala de entrenamiento del gimnasio de FABE Fitness" },
  { key: "gimnasio2",      cat: "gimnasio",     label: "El gimnasio",         alt: "Otro sector del gimnasio de FABE Fitness" },
  { key: "gimnasio3",      cat: "gimnasio",     label: "El gimnasio",         alt: "Espacio de entrenamiento del gimnasio de FABE Fitness" },
  { key: "instalaciones1", cat: "gimnasio",     label: "Instalaciones",       alt: "Instalaciones de FABE Fitness" },
  { key: "instalaciones2", cat: "gimnasio",     label: "Instalaciones",       alt: "Vista de las instalaciones de FABE Fitness" },
  { key: "equipamiento1",  cat: "equipamiento", label: "Equipamiento",        alt: "Máquinas del gimnasio de FABE Fitness" },
  { key: "equipamiento2",  cat: "equipamiento", label: "Equipamiento",        alt: "Equipamiento de entrenamiento de FABE Fitness" },
  { key: "padel1",         cat: "padel",        label: "Cancha de pádel",     alt: "Cancha de pádel techada de FABE Fitness" },
  { key: "padel2",         cat: "padel",        label: "Cancha de pádel",     alt: "Otra vista de las canchas de pádel de FABE Fitness" },
  { key: "padel3",         cat: "padel",        label: "Cancha de pádel",     alt: "Cancha de pádel techada lista para jugar" },
  { key: "padelJugadores", cat: "padel",        label: "Partido de pádel",    alt: "Jugadores disputando un partido de pádel" }
];

/* ==========================================================================
   2. UTILIDADES
   ========================================================================== */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const clean = (v) => (typeof v === "string" ? v.trim() : "");
const isHttps = (u) => /^https:\/\//i.test(clean(u));

const fullAddress = [CONFIG.address, CONFIG.locality, CONFIG.province].map(clean).filter(Boolean).join(", ");
const DATA = Object.assign({}, CONFIG, { fullAddress });

function getPath(path) {
  return path.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), DATA);
}
function hasValue(path) {
  if (path === "social") return Object.values(CONFIG.social).some((u) => isHttps(u));
  return clean(getPath(path)) !== "";
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function iconSvg(id) {
  const wrap = document.createElement("span");
  wrap.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#' + id + '"/></svg>';
  return wrap.firstChild;
}

/* ==========================================================================
   3. CONTENIDO DESDE LA CONFIGURACIÓN
   ========================================================================== */
function applyImages() {
  $$("[data-img]").forEach((img) => {
    const src = CONFIG.images[img.dataset.img];
    if (src && img.getAttribute("src") !== src) img.setAttribute("src", src);
  });
}

/* Si una foto no existe, el marco muestra un fondo neutro (sin icono de imagen rota). */
function setupImageFallback() {
  $$(".img-frame > img").forEach((img) => {
    const frame = img.parentElement;
    const mark = () => frame.classList.add("is-missing");
    img.addEventListener("error", mark);
    if (img.complete && img.naturalWidth === 0) mark();
  });
}

function applyTexts() {
  $$("[data-cfg]").forEach((node) => {
    const value = getPath(node.dataset.cfg);
    if (clean(value)) node.textContent = clean(value);   // si está vacío se conserva el texto por defecto del HTML
  });
  $$("[data-if]").forEach((node) => { node.hidden = !hasValue(node.dataset.if); });

  const phone = clean(CONFIG.phone);
  $$("[data-phone-link]").forEach((a) => {
    if (!phone) return;
    a.textContent = phone;
    a.href = "tel:" + phone.replace(/[^\d+]/g, "");
  });

  const pending = $("#location-pending");
  if (pending) pending.hidden = Boolean(fullAddress);
}

function renderSocial() {
  const labels = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok", youtube: "YouTube", googleBusiness: "Google" };
  const icons  = { instagram: "i-instagram", facebook: "i-facebook" };
  $$("[data-social]").forEach((list) => {
    list.textContent = "";
    Object.keys(CONFIG.social).forEach((key) => {
      const url = clean(CONFIG.social[key]);
      if (!isHttps(url)) return;
      const li = document.createElement("li");
      const a = el("a");
      a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
      a.append(iconSvg(icons[key] || "i-link"), document.createTextNode(labels[key] || key));
      li.append(a);
      list.append(li);
    });
  });
}

function renderServices() {
  const list = $("#gym-services");
  const note = $("#gym-services-note");
  const services = CONFIG.gym.services.map(clean).filter(Boolean);
  if (!list || !services.length) return;
  list.textContent = "";
  services.forEach((s) => {
    const li = document.createElement("li");
    li.append(iconSvg("i-check"), document.createTextNode(s));
    list.append(li);
  });
  if (note) note.hidden = true;
}

function renderPlans() {
  const grid = $("#gym-plans");
  if (!grid) return;
  grid.textContent = "";
  const plans = CONFIG.gym.plans.filter((p) => p && clean(p.name));

  const detail = (dl, term, value) => {
    if (!clean(value)) return;
    const row = document.createElement("div");
    row.append(el("dt", "", term), el("dd", "", clean(value)));
    dl.append(row);
  };
  const button = (label, key) => {
    const a = el("a", "btn btn-primary", label);
    a.href = "#"; a.dataset.wa = key;
    return a;
  };

  if (!plans.length) {
    const card = el("article", "card plan");
    card.append(el("h4", "", "Consultá por nuestros planes"));
    card.append(el("p", "", "Escribinos y te contamos las opciones de membresía, los valores y los horarios del gimnasio."));
    const dl = el("dl", "plan-details");
    detail(dl, "Horarios del gimnasio", CONFIG.hours.gym);
    if (dl.children.length) card.append(dl);
    card.append(button("Consultar planes", "plans"));
    grid.append(card);
    return;
  }

  plans.forEach((p) => {
    const card = el("article", "card plan");
    card.append(el("h4", "", clean(p.name)));
    if (clean(p.description)) card.append(el("p", "", clean(p.description)));
    card.append(el("p", "plan-price", clean(p.price) || "Consultá el valor"));
    const dl = el("dl", "plan-details");
    detail(dl, "Frecuencia o duración", p.frequency);
    detail(dl, "Horarios", p.hours || CONFIG.hours.gym);
    if (dl.children.length) card.append(dl);
    card.append(button("Consultar este plan", "plans"));
    grid.append(card);
  });
}

function renderTestimonials() {
  const box = $("#testimonials");
  if (!box) return;
  box.textContent = "";
  const items = CONFIG.testimonials.filter((t) => t && clean(t.text));

  if (!items.length) {
    const card = el("article", "card testimonial testimonial-invite cards-wide reveal");
    card.append(el("h3", "", "Tu opinión nos importa"));
    card.append(el("p", "", "Si ya entrenaste o jugaste en FABE Fitness, contanos cómo fue tu experiencia."));
    const a = el("a", "btn btn-primary", "Compartí tu experiencia");
    a.href = "#"; a.dataset.wa = "feedback";
    card.append(a);
    box.append(card);
    return;
  }

  items.forEach((t) => {
    const card = el("article", "card testimonial reveal");
    const rating = Number(t.rating);
    if (rating >= 1 && rating <= 5) {
      const stars = el("p", "stars", "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating)));
      stars.setAttribute("role", "img");
      stars.setAttribute("aria-label", "Valoración: " + Math.round(rating) + " de 5");
      card.append(stars);
    }
    card.append(el("blockquote", "", clean(t.text)));
    if (clean(t.author)) card.append(el("p", "author", clean(t.author)));
    box.append(card);
  });
}

/* ---------- Mapa y "Cómo llegar" ---------- */
function setupMap() {
  const wrap = $("#map-wrap");
  const placeholder = $("#map-placeholder");
  const directions = $("#directions-btn");
  const query = encodeURIComponent(fullAddress);

  let embed = "";
  if (isHttps(CONFIG.mapEmbedUrl)) embed = clean(CONFIG.mapEmbedUrl);
  else if (fullAddress) embed = "https://www.google.com/maps?q=" + query + "&output=embed";

  if (wrap && embed) {
    const iframe = document.createElement("iframe");
    iframe.src = embed;
    iframe.title = "Mapa con la ubicación de " + CONFIG.name;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.allowFullscreen = true;
    wrap.append(iframe);
    if (placeholder) placeholder.hidden = true;
  }

  if (directions) {
    let link = "";
    if (isHttps(CONFIG.mapDirectionsUrl)) link = clean(CONFIG.mapDirectionsUrl);
    else if (fullAddress) link = "https://www.google.com/maps/dir/?api=1&destination=" + query;

    if (link) {
      directions.href = link;
    } else {
      directions.classList.add("is-disabled");
      directions.setAttribute("aria-disabled", "true");
      directions.addEventListener("click", (e) => {
        e.preventDefault();
        showToast("Configuración pendiente: falta cargar la dirección del establecimiento (address, locality, province).");
      });
    }
  }
}

/* ---------- SEO: título, canonical y datos estructurados ---------- */
function setupSeo() {
  const locality = clean(CONFIG.locality);
  if (locality) {
    document.title = CONFIG.name + " | Gimnasio y canchas de pádel techadas en " + locality;
    const meta = $('meta[name="description"]');
    if (meta) meta.setAttribute("content", CONFIG.name + ": gimnasio totalmente equipado y canchas de pádel techadas en " + locality + ". Consultá por membresías y reservá tu turno por WhatsApp.");
  }

  const domain = clean(CONFIG.domain).replace(/\/+$/, "");
  if (isHttps(domain)) {
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = domain + "/";
    document.head.append(canonical);
  }

  /* Solo se incluyen los datos que realmente fueron cargados. */
  const data = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: CONFIG.name,
    description: "Gimnasio totalmente equipado y canchas de pádel techadas."
  };
  if (isHttps(domain)) { data.url = domain + "/"; data.image = domain + "/" + CONFIG.images.portada; }
  if (clean(CONFIG.phone)) data.telephone = clean(CONFIG.phone);
  if (clean(CONFIG.address) || locality) {
    data.address = { "@type": "PostalAddress" };
    if (clean(CONFIG.address)) data.address.streetAddress = clean(CONFIG.address);
    if (locality) data.address.addressLocality = locality;
    if (clean(CONFIG.province)) data.address.addressRegion = clean(CONFIG.province);
    if (clean(CONFIG.countryCode)) data.address.addressCountry = clean(CONFIG.countryCode);
  }
  const sameAs = Object.values(CONFIG.social).map(clean).filter(isHttps);
  if (sameAs.length) data.sameAs = sameAs;

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.append(script);
}

/* ==========================================================================
   4. WHATSAPP
   ========================================================================== */
const WA_NUMBER = clean(CONFIG.WHATSAPP_NUMBER);
const WA_VALID = /^\d{8,15}$/.test(WA_NUMBER);

function waUrl(key) {
  const text = CONFIG.messages[key] || CONFIG.messages.general;
  return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
}

function setupWhatsApp() {
  $$("[data-wa]").forEach((a) => {
    if (a.dataset.waReady) return;
    a.dataset.waReady = "1";
    if (WA_VALID) {
      a.href = waUrl(a.dataset.wa);
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    } else {
      a.href = "#";
      a.classList.add("is-disabled");
      a.setAttribute("aria-disabled", "true");
      a.addEventListener("click", (e) => {
        e.preventDefault();
        showToast("Configuración pendiente: falta cargar el número de WhatsApp (WHATSAPP_NUMBER en script.js).");
      });
    }
  });
  if (!WA_VALID) {
    console.info("[FABE Fitness] WHATSAPP_NUMBER está vacío o no es válido. Completalo en script.js con el formato 5493515551234 (solo dígitos).");
  }
}

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 5500);
}

/* ==========================================================================
   5. MENÚ MÓVIL, ENCABEZADO Y NAVEGACIÓN ACTIVA
   ========================================================================== */
function setupHeader() {
  const header = $(".site-header");
  const toggle = $("#menu-toggle");
  const nav = $("#main-nav");
  if (!header || !toggle || !nav) return;

  const setOpen = (open, returnFocus) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    if (!open && returnFocus) toggle.focus();
  };

  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) setOpen(false, true);
  });
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("is-open") && !header.contains(e.target)) setOpen(false);
  });
  window.matchMedia("(min-width: 960px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Resalta el enlace de la sección visible */
  if (!("IntersectionObserver" in window)) return;
  const linkFor = { gimnasio: "#gimnasio", padel: "#padel", galeria: "#galeria", planes: "#planes", ubicacion: "#ubicacion", contacto: "#ubicacion" };
  const links = $$("#main-nav ul a");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = linkFor[entry.target.id] || "";
      links.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === target));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach((s) => observer.observe(s));
}

/* ==========================================================================
   6. APARICIÓN SUAVE AL DESPLAZARSE
   ========================================================================== */
function setupReveal() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((i) => i.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
  items.forEach((i) => observer.observe(i));
}

/* ==========================================================================
   7. GALERÍA: CARRUSEL, FILTROS Y LIGHTBOX
   ========================================================================== */
const gallery = {
  all: [],        // fotos que existen realmente
  items: [],      // fotos del filtro actual
  index: 0,
  dragMoved: false
};

function setupGallery() {
  const track = $("#carousel-track");
  const viewport = $("#carousel-viewport");
  const prev = $("#carousel-prev");
  const next = $("#carousel-next");
  const dots = $("#carousel-dots");
  const counter = $("#carousel-counter");
  const empty = $("#carousel-empty");
  const emptyText = empty ? $("p", empty) : null;
  const chips = $$(".chip[data-filter]");
  if (!track || !viewport) return;

  /* ---- Carrusel ---- */
  const n = () => gallery.items.length;

  function render() {
    track.textContent = "";
    dots.textContent = "";
    const total = n();
    viewport.hidden = total === 0;
    prev.hidden = next.hidden = total < 2;
    dots.hidden = total < 2;
    counter.textContent = "";
    if (empty) empty.hidden = total > 0;
    if (!total) return;

    gallery.items.forEach((item, i) => {
      const li = el("li", "carousel-slide");
      li.setAttribute("role", "group");
      li.setAttribute("aria-roledescription", "diapositiva");
      li.setAttribute("aria-label", (i + 1) + " de " + total);

      const btn = el("button", "slide-btn");
      btn.type = "button";
      btn.setAttribute("aria-label", "Ampliar fotografía: " + item.alt);
      btn.addEventListener("click", () => { if (!gallery.dragMoved) openLightbox(i); });

      const img = new Image();
      img.src = item.src; img.alt = item.alt; img.draggable = false;
      img.decoding = "async"; img.width = 1600; img.height = 900;
      if (i > 1) img.loading = "lazy";

      const zoom = el("span", "slide-zoom");
      zoom.append(iconSvg("i-zoom"));
      zoom.setAttribute("aria-hidden", "true");

      btn.append(img, zoom, el("span", "slide-caption", item.label));
      li.append(btn);
      track.append(li);

      const dot = el("button", "dot");
      dot.type = "button";
      dot.setAttribute("aria-label", "Ir a la fotografía " + (i + 1));
      dot.addEventListener("click", () => goTo(i));
      dots.append(dot);
    });
    update();
  }

  function update(offsetPx) {
    const total = n();
    if (!total) return;
    const extra = offsetPx ? " + " + offsetPx + "px" : "";
    track.style.transform = "translateX(calc(" + (-gallery.index * 100) + "%" + extra + "))";
    $$(".carousel-slide", track).forEach((slide, i) => {
      const active = i === gallery.index;
      slide.setAttribute("aria-hidden", String(!active));
      $(".slide-btn", slide).tabIndex = active ? 0 : -1;
    });
    $$(".dot", dots).forEach((d, i) => {
      if (i === gallery.index) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current");
    });
    counter.textContent = (gallery.index + 1) + " / " + total;
  }

  function goTo(i) {
    const total = n();
    if (!total) return;
    gallery.index = (i + total) % total;
    update();
  }
  gallery.goTo = goTo;

  prev.addEventListener("click", () => goTo(gallery.index - 1));
  next.addEventListener("click", () => goTo(gallery.index + 1));
  $("#carousel").addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { goTo(gallery.index - 1); }
    else if (e.key === "ArrowRight") { goTo(gallery.index + 1); }
  });

  /* Deslizamiento táctil */
  let startX = 0, startY = 0, dx = 0, tracking = false, horizontal = false;
  viewport.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1 || n() < 2) return;
    startX = e.touches[0].clientX; startY = e.touches[0].clientY;
    dx = 0; tracking = true; horizontal = false; gallery.dragMoved = false;
  }, { passive: true });
  viewport.addEventListener("touchmove", (e) => {
    if (!tracking) return;
    dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;
    if (!horizontal && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      horizontal = true;
      track.classList.add("is-dragging");
    }
    if (horizontal) { gallery.dragMoved = true; update(dx); }
  }, { passive: true });
  const endTouch = () => {
    if (!tracking) return;
    tracking = false;
    track.classList.remove("is-dragging");
    const threshold = Math.min(70, viewport.clientWidth * 0.15);
    if (horizontal && dx <= -threshold) goTo(gallery.index + 1);
    else if (horizontal && dx >= threshold) goTo(gallery.index - 1);
    else update();
    setTimeout(() => { gallery.dragMoved = false; }, 60);
  };
  viewport.addEventListener("touchend", endTouch);
  viewport.addEventListener("touchcancel", endTouch);

  /* ---- Filtros ---- */
  function setFilter(filter) {
    gallery.items = filter === "todas" ? gallery.all.slice() : gallery.all.filter((g) => g.cat === filter);
    gallery.index = 0;
    if (emptyText) emptyText.textContent = gallery.all.length
      ? "Todavía no hay fotografías en esta categoría."
      : "Estamos preparando las fotografías de nuestras instalaciones.";
    render();
  }
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => { const on = c === chip; c.classList.toggle("is-active", on); c.setAttribute("aria-pressed", String(on)); });
      setFilter(chip.dataset.filter);
    });
  });

  /* ---- Carga de fotos: solo se usan las que existen en la carpeta imagenes/ ---- */
  if (empty) { empty.hidden = false; if (emptyText) emptyText.textContent = "Cargando fotografías…"; }
  viewport.hidden = true; prev.hidden = next.hidden = true; dots.hidden = true;

  Promise.all(GALLERY.map((g) => new Promise((resolve) => {
    const src = CONFIG.images[g.key];
    if (!src) return resolve(null);
    const probe = new Image();
    probe.onload = () => resolve(Object.assign({ src }, g));
    probe.onerror = () => resolve(null);
    probe.src = src;
  }))).then((results) => {
    gallery.all = results.filter(Boolean);
    chips.forEach((chip) => {
      const f = chip.dataset.filter;
      if (f !== "todas") chip.hidden = !gallery.all.some((g) => g.cat === f);
    });
    setFilter("todas");
  });
}

/* ---- Lightbox ---- */
let lastFocus = null;
let lbIndex = 0;

function setupLightbox() {
  const box = $("#lightbox");
  const img = $("#lb-img");
  const caption = $("#lb-caption");
  const btnClose = $("#lb-close");
  const btnPrev = $("#lb-prev");
  const btnNext = $("#lb-next");
  if (!box) return;

  function show(i) {
    const total = gallery.items.length;
    if (!total) return;
    lbIndex = (i + total) % total;
    const item = gallery.items[lbIndex];
    img.src = item.src;
    img.alt = item.alt;
    caption.textContent = item.label + " · " + (lbIndex + 1) + " / " + total;
  }

  window.openLightbox = (i) => {
    if (!gallery.items.length) return;
    lastFocus = document.activeElement;
    const multiple = gallery.items.length > 1;
    btnPrev.hidden = btnNext.hidden = !multiple;
    show(i);
    box.hidden = false;
    document.body.style.overflow = "hidden";
    btnClose.focus();
  };

  function close() {
    if (box.hidden) return;
    box.hidden = true;
    document.body.style.overflow = "";
    img.removeAttribute("src");
    if (gallery.goTo) gallery.goTo(lbIndex);
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  btnClose.addEventListener("click", close);
  btnPrev.addEventListener("click", () => show(lbIndex - 1));
  btnNext.addEventListener("click", () => show(lbIndex + 1));

  /* Clic fuera de la fotografía */
  box.addEventListener("click", (e) => {
    if (e.target === box || e.target.classList.contains("lb-figure")) close();
  });

  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "ArrowLeft" && !btnPrev.hidden) show(lbIndex - 1);
    else if (e.key === "ArrowRight" && !btnNext.hidden) show(lbIndex + 1);
    else if (e.key === "Tab") {
      const focusables = [btnClose, btnPrev, btnNext].filter((b) => !b.hidden);
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* Deslizamiento táctil dentro del lightbox */
  let sx = 0;
  box.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - sx;
    if (Math.abs(diff) > 60 && gallery.items.length > 1) show(lbIndex + (diff < 0 ? 1 : -1));
  });
}

/* ==========================================================================
   8. INICIO
   ========================================================================== */
function init() {
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  applyImages();
  setupImageFallback();
  applyTexts();
  renderSocial();
  renderServices();
  renderPlans();
  renderTestimonials();
  setupWhatsApp();      // después de renderizar, para incluir los botones generados
  setupMap();
  setupSeo();
  setupHeader();
  setupLightbox();
  setupGallery();
  setupReveal();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
