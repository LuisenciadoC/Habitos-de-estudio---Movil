/* Hábitos de Estudio
 * App web (PWA) hecha a partir de los mockups de Figma.
 * Todo se guarda en el navegador del celular (localStorage), no necesita servidor.
 * Navegación por "hash": index.html#/inicio, #/tareas, etc.
 */
(function () {
  'use strict';

  // ---------- Íconos (estilo Iconoir, trazo) ----------
  const P = {
    book: '<path d="M12 21V7m0 14-1.2-.6A20 20 0 0 0 2 18.5V4.6a20 20 0 0 1 8.8 1.8L12 7m0 14 1.2-.6A20 20 0 0 1 22 18.5V4.6a20 20 0 0 0-8.8 1.8L12 7"/>',
    back: '<path d="m15 6-6 6 6 6"/>',
    chevR: '<path d="m9 6 6 6-6 6"/>',
    chevD: '<path d="m6 9 6 6 6-6"/>',
    chevU: '<path d="m6 15 6-6 6 6"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    userCircle: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3.2"/><path d="M6.2 18.4c1.3-2 3.4-3 5.8-3s4.5 1 5.8 3"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    camera: '<path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="3.5"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m21 16-5-5-9 9"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M5 7l1 13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1l1-13M9 7V4h6v3"/>',
    edit: '<path d="M14.4 5.6 18.4 9.6M4 20l1-5L15.6 4.4a2 2 0 0 1 2.8 0l1.2 1.2a2 2 0 0 1 0 2.8L9 19z"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    home: '<path d="M3 10.5 12 3l9 7.5V21h-6.5v-6h-5v6H3z" fill="currentColor"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    calc: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 8h4M9 6v4M14 8h3M14.5 14.5l2 2m0-2-2 2M7 15.5h4M14 16h3"/>',
    flame: '<path d="M12 21a7 7 0 0 0 7-7c0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-2 2-5 5-5 8a7 7 0 0 0 7 7z"/><path d="M12 21a3 3 0 0 0 3-3c0-2-1.5-3-3-5-1.5 2-3 3-3 5a3 3 0 0 0 3 3z"/>',
    logout: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l5-5-5-5M15 12H3"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>',
    cards: '<rect x="3" y="6" width="14" height="14" rx="3"/><path d="M7 3h11a3 3 0 0 1 3 3v11"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    shield: '<path d="M7 6v6a5 5 0 0 0 10 0V6"/>',
    arrows: '<path d="M7 8 3 12l4 4M17 8l4 4-4 4M3 12h18"/>',
    arrowR: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  };
  const ic = (name, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name]}</svg>`;

  // ---------- Utilidades ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = () => Math.random().toString(36).slice(2, 10);
  const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const DIAS_CORTOS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const MESES_CORTOS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

  const pad = (n) => String(n).padStart(2, '0');
  const isoDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parseISO = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const today = () => isoDate(new Date());
  const addDays = (iso, n) => { const d = parseISO(iso); d.setDate(d.getDate() + n); return isoDate(d); };
  const dayIndex = (d) => (d.getDay() + 6) % 7; // 0 = lunes
  function dueLabel(iso) {
    if (!iso) return 'Sin fecha';
    if (iso === today()) return 'Vence hoy';
    if (iso === addDays(today(), 1)) return 'Vence mañana';
    const d = parseISO(iso);
    return `${DIAS_CORTOS[dayIndex(d)]}, ${d.getDate()} ${MESES_CORTOS[d.getMonth()]}`;
  }
  function hora12(t) {
    if (!t) return '';
    let [h, m] = t.split(':').map(Number);
    const ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${pad(h)}:${pad(m)} ${ap}`;
  }

  // ---------- Almacenamiento ----------
  const KEY = 'habitos-estudio-v1';
  let db;
  try { db = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { db = {}; }
  db.users = db.users || {};
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { toast('No se pudo guardar (memoria llena)'); } };
  const me = () => (db.session && db.users[db.session]) || null;
  const data = () => me().data;

  // Una cuenta nueva empieza vacía; solo la cuenta de demostración trae ejemplos.
  const emptyData = () => ({ materias: [], tareas: [], flashcards: [], notas: {}, racha: { dias: 1, ultimo: today() } });

  function seedData() {
    const t = today();
    const m1 = uid(), m2 = uid(), m3 = uid();
    return {
      materias: [
        { id: m1, nombre: 'Matemáticas Financieras', profesor: 'Ana Gómez', salon: '304', horarios: [{ dia: 'Lunes', hora: '08:00' }, { dia: 'Miércoles', hora: '08:00' }] },
        { id: m2, nombre: 'Programación', profesor: '', salon: '205', horarios: [{ dia: 'Martes', hora: '10:00' }] },
        { id: m3, nombre: 'Bases de Datos', profesor: '', salon: '401', horarios: [{ dia: 'Miércoles', hora: '14:00' }] },
      ],
      tareas: [
        { id: uid(), titulo: 'Taller de Cálculo II', materiaId: m1, fecha: t, desc: '', hecha: false },
        { id: uid(), titulo: 'Informe de laboratorio', materiaId: m3, fecha: addDays(t, 2), desc: 'Péndulo simple, en PDF', hecha: false },
        { id: uid(), titulo: 'Leer capítulo 4', materiaId: m2, fecha: addDays(t, 4), desc: '', hecha: false },
        { id: uid(), titulo: 'Quiz de Programación', materiaId: m2, fecha: addDays(t, -3), desc: '', hecha: true },
      ],
      flashcards: [
        { id: uid(), materiaId: m1, pregunta: '¿Qué estudian las matemáticas financieras?', respuesta: 'El valor del dinero en el tiempo: intereses, inversiones, créditos y anualidades.' },
        { id: uid(), materiaId: m1, pregunta: '¿Cuál es el principio fundamental de las finanzas y el dinero?', respuesta: 'Un peso hoy vale más que un peso mañana (por su capacidad de generar rendimientos).' },
        { id: uid(), materiaId: m1, pregunta: '¿Cuáles son los cuatro elementos básicos de una operación financiera?', respuesta: 'Capital, tasa de interés, tiempo y monto (valor futuro).' },
      ],
      notas: { [m1]: { periodos: 3, notas: ['3.5', '4.0'] } },
      racha: { dias: 1, ultimo: t },
    };
  }

  function touchStreak() {
    const u = me(); if (!u) return;
    const r = u.data.racha || (u.data.racha = { dias: 0, ultimo: null });
    const t = today();
    if (r.ultimo === t) return;
    r.dias = r.ultimo === addDays(t, -1) ? r.dias + 1 : 1;
    r.ultimo = t;
    save();
  }

  // ---------- Toast y modales ----------
  let toastTimer;
  function toast(msg) {
    const root = $('#toast-root');
    root.innerHTML = `<div class="toast" role="status">${ic('check')}<span>${esc(msg)}</span></div>`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (root.innerHTML = ''), 2600);
  }
  // Mensaje que se muestra en la siguiente pantalla (después de navegar)
  let pendingToast = null;
  const go = (path, msg) => { pendingToast = msg || null; if (location.hash === '#' + path) render(); else location.hash = path; };

  function closeOverlay() { $('#overlay-root').innerHTML = ''; }
  function confirmDelete({ titulo, texto, onOk, icon = 'trash', okText = 'Eliminar' }) {
    const root = $('#overlay-root');
    root.innerHTML = `<div class="scrim"><div class="modal" role="dialog" aria-modal="true">
      <div class="badge">${ic(icon)}</div>
      <h2>${esc(titulo)}</h2>
      ${texto ? `<p>${esc(texto)}</p>` : '<div style="height:18px"></div>'}
      <div class="row"><button class="btn" data-x="no">Cancelar</button><button class="btn" data-x="ok">${okText}</button></div>
    </div></div>`;
    $('[data-x=no]', root).onclick = closeOverlay;
    $('.scrim', root).onclick = (e) => { if (e.target.classList.contains('scrim')) closeOverlay(); };
    $('[data-x=ok]', root).onclick = () => { closeOverlay(); onOk(); };
  }

  // ---------- Piezas comunes ----------
  const topbar = (title, backTo) => `<div class="topbar">
      <button class="icon-btn" aria-label="Atrás" data-back="${backTo || ''}">${ic('back')}</button>
      <h1>${esc(title)}</h1><span></span></div>`;
  const nav = (active) => `<nav class="nav" aria-label="Navegación">
      <button class="${active === 'inicio' ? 'on' : ''}" data-go="/inicio" aria-label="Inicio">${ic('home')}</button>
      <button class="${active === 'calendario' ? 'on' : ''}" data-go="/calendario" aria-label="Calendario">${ic('cal')}</button>
      <button class="${active === 'simulador' ? 'on' : ''}" data-go="/simulador" aria-label="Simulador de notas">${ic('calc')}</button>
    </nav>`;
  const materiaNombre = (id) => (data().materias.find((m) => m.id === id) || {}).nombre || 'Sin materia';
  const materiaOptions = (sel) => `<option value="">Selecciona una materia</option>` +
    data().materias.map((m) => `<option value="${m.id}" ${m.id === sel ? 'selected' : ''}>${esc(m.nombre)}</option>`).join('');

  // Días y horas en que se ve una materia (las materias viejas tenían un solo día/hora)
  const horariosDe = (m) => (m.horarios && m.horarios.length ? m.horarios : [{ dia: m.dia || 'Lunes', hora: m.hora || '08:00' }]);

  // ---------- Cálculos ----------
  // Porcentajes por defecto según el número de periodos (cortes)
  function pesosBase(n) {
    if (n === 3) return [30, 30, 40];
    const base = Math.floor(100 / n), w = Array(n).fill(base);
    w[n - 1] += 100 - base * n;
    return w;
  }
  // Porcentajes de una materia: los que escribió la persona o los de por defecto
  const pesosDe = (n) => (Array.isArray(n.pesos) && n.pesos.length === n.periodos ? n.pesos : pesosBase(n.periodos));
  function promedioMateria(id) {
    const n = data().notas[id]; if (!n) return null;
    const w = pesosDe(n);
    let s = 0, ws = 0;
    (n.notas || []).forEach((v, i) => {
      const x = parseFloat(String(v).replace(',', '.'));
      if (!isNaN(x) && i < w.length) { s += x * w[i]; ws += w[i]; }
    });
    return ws ? s / ws : null;
  }
  function promedioSemestre() {
    const vals = data().materias.map((m) => promedioMateria(m.id)).filter((v) => v !== null);
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
  }
  function progresoMateria(id) {
    const ts = data().tareas.filter((t) => t.materiaId === id);
    if (!ts.length) return 0;
    return Math.round((ts.filter((t) => t.hecha).length / ts.length) * 100);
  }

  // ---------- Pomodoro (sigue corriendo aunque cambies de pantalla) ----------
  // guardado: tiempo de estudio que quedaba al irse a descansar, para retomarlo después
  const pomo = { minutos: 30, restante: 30 * 60, corriendo: false, fase: 'Estudio', timer: null, guardado: null };
  const fmt = (s) => `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
  function pomoTick() {
    if (pomo.restante > 0) pomo.restante--;
    if (pomo.restante === 0) {
      pomoStop();
      const fueEstudio = pomo.fase === 'Estudio';
      if ('vibrate' in navigator) navigator.vibrate([300, 150, 300]);
      toast(fueEstudio ? '¡Tiempo de descanso!' : '¡A estudiar de nuevo!');
      if (fueEstudio) { pomo.guardado = null; pomo.fase = 'Descanso'; pomo.restante = 5 * 60; }
      else volverAEstudiar();
    }
    pomoRefresh();
  }
  function pomoStart() { if (pomo.corriendo) return; pomo.corriendo = true; pomo.timer = setInterval(pomoTick, 1000); }
  function pomoStop() { pomo.corriendo = false; clearInterval(pomo.timer); }
  // Termina el descanso y retoma el estudio donde quedó (o desde el inicio si ya había terminado)
  function volverAEstudiar() {
    pomo.fase = 'Estudio';
    pomo.restante = pomo.guardado || pomo.minutos * 60;
    pomo.guardado = null;
  }
  const pomoWidget = () => `<div class="pomo">
      <div class="phase" data-pomo-phase>${pomo.fase}</div>
      <div class="time"><button data-pomo="menos" aria-label="Menos tiempo">−</button><span data-pomo-time>${fmt(pomo.restante)}</span><button data-pomo="mas" aria-label="Más tiempo">+</button></div>
      <div class="ctrls"><button class="pill" data-pomo="pausar">Pausar</button><button class="pill" data-pomo="iniciar">Iniciar</button><button class="pill" data-pomo="descansar" data-pomo-alt>${pomo.fase === 'Descanso' ? 'Estudiar' : 'Descansar'}</button></div>
    </div>`;
  function bindPomo(root) {
    $$('[data-pomo]', root).forEach((b) => (b.onclick = () => {
      const a = b.dataset.pomo;
      if (a === 'mas' || a === 'menos') {
        if (pomo.corriendo) return toast('Pausa el pomodoro para cambiar el tiempo');
        const step = 5;
        pomo.minutos = Math.min(120, Math.max(5, pomo.minutos + (a === 'mas' ? step : -step)));
        pomo.fase = 'Estudio';
        pomo.restante = pomo.minutos * 60;
      }
      if (a === 'iniciar') pomoStart();
      if (a === 'pausar') pomoStop();
      if (a === 'descansar') {
        pomoStop();
        if (pomo.fase === 'Descanso') {
          // Botón "Estudiar": corta el descanso y sigue estudiando
          volverAEstudiar(); pomoStart(); toast('¡De vuelta a estudiar!');
        } else {
          // Botón "Descansar": pausa el estudio, guarda el tiempo y empieza 5 min de descanso
          pomo.guardado = pomo.restante; pomo.fase = 'Descanso'; pomo.restante = 5 * 60; pomoStart(); toast('¡Tiempo de descanso!');
        }
      }
      pomoRefresh();
    }));
  }
  function pomoRefresh() {
    $$('[data-pomo-time]').forEach((el) => (el.textContent = fmt(pomo.restante)));
    $$('[data-pomo-phase]').forEach((el) => (el.textContent = pomo.fase));
    $$('[data-pomo-alt]').forEach((el) => (el.textContent = pomo.fase === 'Descanso' ? 'Estudiar' : 'Descansar'));
  }

  // Permite deslizar una fila horizontal arrastrando con el mouse (en el computador)
  function dragScroll(el) {
    if (!el) return;
    let down = false, startX = 0, startLeft = 0, moved = false;
    el.addEventListener('mousedown', (e) => {
      down = true; moved = false; startX = e.pageX; startLeft = el.scrollLeft;
      el.classList.add('dragging');
    });
    window.addEventListener('mousemove', (e) => {
      if (!down) return;
      const dx = e.pageX - startX;
      if (Math.abs(dx) > 5) moved = true;
      el.scrollLeft = startLeft - dx;
    });
    window.addEventListener('mouseup', () => { down = false; el.classList.remove('dragging'); });
    // Si se arrastró, no se abre la tarjeta al soltar
    el.addEventListener('click', (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
    // La rueda del mouse también la mueve hacia el costado
    el.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      if ((e.deltaY > 0 && el.scrollLeft < max) || (e.deltaY < 0 && el.scrollLeft > 0)) { e.preventDefault(); el.scrollLeft += e.deltaY; }
    }, { passive: false });
  }

  // =====================================================================
  // PANTALLAS
  // =====================================================================
  const views = {};

  // ----- Iniciar sesión -----
  views.login = () => ({
    html: `<div class="screen">
      <div class="logo">${ic('book')}</div>
      <h1 class="auth-title">Hábitos de Estudio</h1>
      <h2 class="auth-sub">Qué bueno verte de nuevo</h2>
      <p class="auth-text">Ingresa tus datos para seguir con tu racha</p>
      <form id="f" novalidate>
        <label class="label" for="email">Correo electrónico</label>
        <input class="input" id="email" type="email" autocomplete="email" placeholder="correo@ejemplo.com">
        <label class="label" for="pass">Contraseña</label>
        <input class="input" id="pass" type="password" autocomplete="current-password" placeholder="••••••••">
        <div class="right" style="margin-top:10px"><button type="button" class="link" data-go="/recuperar">¿Olvidaste tu contraseña?</button></div>
        <div class="error" id="err"></div>
        <button class="btn" type="submit">Iniciar sesión</button>
      </form>
      <div class="divider">o</div>
      <button class="btn outline" id="google">Continuar con Google</button>
      <p class="center mt">¿No tienes cuenta? <button class="link" data-go="/registro">Regístrate</button></p>
    </div>`,
    mount(root) {
      $('#f', root).onsubmit = (e) => {
        e.preventDefault();
        const email = $('#email', root).value.trim().toLowerCase();
        const pass = $('#pass', root).value;
        const u = db.users[email];
        if (!email || !pass) return ($('#err', root).textContent = 'Escribe tu correo y tu contraseña.');
        if (!u || u.pass !== pass) return ($('#err', root).textContent = 'Correo o contraseña incorrectos.');
        db.session = email; save(); touchStreak(); go('/inicio');
      };
      $('#google', root).onclick = googleDemo;
    },
  });

  // "Continuar con Google": muestra cuentas de prueba ya creadas
  // (una app sin servidor no puede validar cuentas reales de Google).
  const CUENTAS_PRUEBA = [
    { nombre: 'Camila Torres', email: 'camila.torres@correo.com', color: '#5D0D18' },
    { nombre: 'Andrés Rojas', email: 'andres.rojas@correo.com', color: '#7D8E89' },
    { nombre: 'Laura Gómez', email: 'laura.gomez@correo.com', color: '#B07A3B' },
  ];
  function googleDemo() {
    // Cuentas de prueba + las cuentas que se registraron en este navegador
    const colores = ['#5D0D18', '#7D8E89', '#B07A3B', '#4A6FA5', '#6B4E8A'];
    const propias = Object.values(db.users)
      .filter((u) => !CUENTAS_PRUEBA.some((c) => c.email === u.email))
      .map((u, i) => ({ nombre: u.nombre, email: u.email, color: colores[(i + 3) % colores.length] }));
    const cuentas = [...propias, ...CUENTAS_PRUEBA];
    const o = $('#overlay-root');
    o.innerHTML = `<div class="scrim bottom"><div class="sheet g-sheet" role="dialog" aria-modal="true">
      <div class="grip"></div>
      <div class="g-logo"><b style="color:#4285F4">G</b><b style="color:#EA4335">o</b><b style="color:#FBBC05">o</b><b style="color:#4285F4">g</b><b style="color:#34A853">l</b><b style="color:#EA4335">e</b></div>
      <h2>Elige una cuenta</h2>
      <p class="center hint" style="margin:-4px 0 8px">para continuar a Hábitos de Estudio</p>
      ${cuentas.map((c, i) => `<button data-acc="${i}"><span class="g-av" style="background:${c.color}">${esc(c.nombre[0])}</span>
        <span><b>${esc(c.nombre)}</b><br><small>${esc(c.email)}</small></span></button>`).join('')}
      <button data-acc="cancel">Cancelar</button>
    </div></div>`;
    $('.scrim', o).onclick = (e) => {
      const b = e.target.closest('[data-acc]');
      if (!b && !e.target.classList.contains('scrim')) return;
      closeOverlay();
      if (!b || b.dataset.acc === 'cancel') return;
      const c = cuentas[Number(b.dataset.acc)];
      if (!db.users[c.email]) db.users[c.email] = { nombre: c.nombre, email: c.email, pass: 'prueba123', foto: null, google: true, data: seedData() };
      db.session = c.email; save(); touchStreak();
      go('/inicio', `¡Hola, ${c.nombre.split(" ")[0]}!`);
    };
  }

  // ----- Crear cuenta -----
  views.registro = () => ({
    html: `<div class="screen">
      ${topbar('Crea tu cuenta', '/login')}
      <p class="center" style="margin:0 0 6px">Organiza tus materias y estudia a diario.</p>
      <form id="f" novalidate>
        <label class="label" for="nombre">Nombre</label>
        <input class="input" id="nombre" autocomplete="name" placeholder="Camila Torres">
        <label class="label" for="email">Correo electrónico</label>
        <input class="input" id="email" type="email" autocomplete="email" placeholder="correo@ejemplo.com">
        <label class="label" for="p1">Contraseña</label>
        <input class="input" id="p1" type="password" autocomplete="new-password" placeholder="Mínimo 8 caracteres">
        <label class="label" for="p2">Confirmar contraseña</label>
        <input class="input" id="p2" type="password" autocomplete="new-password" placeholder="Repite tu contraseña">
        <label class="check"><input type="checkbox" id="acepto"> <span>Acepto los <b>Términos de servicio</b> y la <b>Política de privacidad</b></span></label>
        <div class="error" id="err"></div>
        <button class="btn" type="submit">Crear cuenta</button>
      </form>
      <div class="divider">o regístrate con</div>
      <button class="btn outline" id="google">Continuar con Google</button>
      <p class="center mt">¿Ya tienes cuenta? <button class="link" data-go="/login">Inicia sesión</button></p>
    </div>`,
    mount(root) {
      $('#google', root).onclick = googleDemo;
      $('#f', root).onsubmit = (e) => {
        e.preventDefault();
        const nombre = $('#nombre', root).value.trim();
        const email = $('#email', root).value.trim().toLowerCase();
        const p1 = $('#p1', root).value, p2 = $('#p2', root).value;
        const err = (m) => ($('#err', root).textContent = m);
        if (!nombre) return err('Escribe tu nombre.');
        if (!/^\S+@\S+\.\S+$/.test(email)) return err('Escribe un correo válido.');
        if (db.users[email]) return err('Ya existe una cuenta con ese correo.');
        if (p1.length < 8) return err('La contraseña debe tener mínimo 8 caracteres.');
        if (p1 !== p2) return err('Las contraseñas no coinciden.');
        if (!$('#acepto', root).checked) return err('Debes aceptar los términos para continuar.');
        db.users[email] = { nombre, email, pass: p1, foto: null, data: emptyData() };
        save();
        go('/login', 'Cuenta creada correctamente');
      };
    },
  });

  // ----- Recuperar contraseña -----
  let recuperando = null;
  views.recuperar = () => ({
    html: `<div class="screen">
      ${topbar('Recupera tu contraseña', '/login')}
      <p class="center" style="margin:0 0 6px">Escribe el correo con el que te registraste y te enviaremos un enlace para crear una nueva.</p>
      <form id="f" novalidate>
        <label class="label" for="email">Correo electrónico</label>
        <input class="input" id="email" type="email" placeholder="correo@ejemplo.com">
        <div class="error" id="err"></div>
        <button class="btn" type="submit">Enviar enlace</button>
      </form>
      <p class="center mt"><button class="link" data-go="/login">Volver a iniciar sesión</button></p>
    </div>`,
    mount(root) {
      $('#f', root).onsubmit = (e) => {
        e.preventDefault();
        const email = $('#email', root).value.trim().toLowerCase();
        if (!db.users[email]) return ($('#err', root).textContent = 'No encontramos una cuenta con ese correo.');
        // Sin servidor no se puede enviar un correo: abrimos directamente la pantalla del enlace.
        recuperando = email;
        go('/nueva-contrasena', 'Enlace enviado. Crea tu nueva contraseña');
      };
    },
  });

  views['nueva-contrasena'] = () => ({
    html: `<div class="screen">
      ${topbar('Nueva contraseña', '/recuperar')}
      <form id="f" novalidate>
        <label class="label" for="p1">Nueva contraseña</label>
        <input class="input" id="p1" type="password" autocomplete="new-password" placeholder="Mínimo 8 caracteres">
        <label class="label" for="p2">Confirmar contraseña</label>
        <input class="input" id="p2" type="password" autocomplete="new-password" placeholder="Repite tu contraseña">
        <div class="error" id="err"></div>
        <button class="btn" type="submit">Guardar contraseña</button>
      </form>
    </div>`,
    mount(root) {
      if (!recuperando) return go('/recuperar');
      $('#f', root).onsubmit = (e) => {
        e.preventDefault();
        const p1 = $('#p1', root).value, p2 = $('#p2', root).value;
        if (p1.length < 8) return ($('#err', root).textContent = 'Mínimo 8 caracteres.');
        if (p1 !== p2) return ($('#err', root).textContent = 'Las contraseñas no coinciden.');
        db.users[recuperando].pass = p1; save(); recuperando = null;
        go('/login', 'Contraseña cambiada correctamente');
      };
    },
  });

  // ----- Inicio -----
  views.inicio = () => {
    const u = me(), d = u.data;
    const prom = promedioSemestre();
    const progreso = d.materias.map((m) => `<div class="progress-item">
        <div class="pl"><span>${esc(m.nombre)}</span><span>${progresoMateria(m.id)}%</span></div>
        <div class="bar"><i style="width:${progresoMateria(m.id)}%"></i></div></div>`).join('');
    const pend = d.tareas.filter((t) => !t.hecha).length;
    return {
      html: `<div class="screen with-nav">
        <div class="home-head">
          <button class="icon-btn" id="menu" aria-label="Menú">${ic('menu')}</button>
          <h1>Habitos de Estudio</h1>
          <span class="streak" title="Días seguidos estudiando">${ic('flame')}${d.racha.dias}</span>
          <button class="icon-btn avatar-btn" data-go="/perfil" aria-label="Mi perfil">${ic('userCircle')}</button>
        </div>
        <div class="stat-row">
          <div class="card stat"><h3>Promedio semestre</h3>
            <div class="big">${prom === null ? '0.0' : prom.toFixed(1)}<small>/5.0</small></div>
            <p>${prom === null ? 'Aún no tienes notas registradas' : prom >= 3 ? '¡Vas aprobando, sigue así!' : '¡Tú puedes subir esa nota!'}</p></div>
          <div class="card stat" data-go="/materias" role="button"><h3># Materias</h3>
            <div class="big">${d.materias.length}</div><p>${d.materias.length ? '¡Wow, eres increíble!' : 'Agrega tu primera materia'}</p></div>
          <div class="card stat" data-go="/tareas" role="button"><h3>Tareas</h3>
            <div class="big">${pend}</div><p>${pend ? 'Pendientes por hacer' : '¡Todo al día!'}</p></div>
        </div>
        <div class="card mt">
          <h2 class="section-title">Progreso</h2>
          ${progreso || '<div class="empty">Agrega materias y tareas para ver tu progreso.</div>'}
        </div>
        <div class="card mt">
          <h2 class="section-title">Metodos de estudio</h2>
          <div class="method-title">Pomodoro</div>
          ${pomoWidget()}
          <div class="method-title">Flashcards</div>
          <button class="fc-stack" data-go="/flashcards" aria-label="Abrir flashcards">
            <i></i><i></i><span>Escribe una pregunta en un lado y la respuesta en la parte de atrás.<br><br>Toma una tarjeta y responde, ¡confirma tu respuesta mirando el reverso!</span>
          </button>
        </div>
      </div>${nav('inicio')}`,
      mount(root) {
        bindPomo(root);
        dragScroll($('.stat-row', root));
        $('#menu', root).onclick = openDrawer;
      },
    };
  };

  function openDrawer() {
    const items = [
      ['/inicio', 'home', 'Inicio'], ['/materias', 'folder', 'Mis materias'], ['/tareas', 'list', 'Tareas'],
      ['/flashcards', 'cards', 'Flashcards'], ['/pomodoro', 'timer', 'Pomodoro'], ['/calendario', 'cal', 'Calendario'],
      ['/simulador', 'calc', 'Simulador de notas'], ['/perfil', 'user', 'Mi perfil'],
    ];
    const root = $('#overlay-root');
    root.innerHTML = `<div class="drawer"><nav aria-label="Menú">
      <h2>Hábitos de Estudio</h2>
      ${items.map(([p, i, t]) => `<button data-go="${p}">${ic(i)}${t}</button>`).join('')}
      <div class="spacer"></div>
      <button class="drawer-out" id="drawer-out">${ic('logout')}Cerrar sesión</button>
    </nav></div>`;
    $('#drawer-out', root).onclick = (e) => { e.stopPropagation(); closeOverlay(); db.session = null; save(); go('/login', 'Sesión cerrada'); };
    $('.drawer', root).onclick = (e) => {
      const b = e.target.closest('[data-go]');
      closeOverlay();
      if (b) go(b.dataset.go);
    };
  }

  // ----- Perfil -----
  views.perfil = () => {
    const u = me();
    return {
      html: `<div class="screen">
        ${topbar('Mi perfil', '/inicio')}
        <div class="avatar">${u.foto ? `<img src="${u.foto}" alt="Foto de perfil">` : ic('user', 'ph')}
          <button class="cam" id="cam" aria-label="Cambiar foto">${ic('camera')}</button></div>
        <h2 class="profile-name">${esc(u.nombre)}</h2>
        <div class="profile-mail">${esc(u.email)}</div>
        <div class="mt">
          <button class="menu-item" data-go="/perfil/nombre">${ic('user')}<span>Cambiar nombre</span>${ic('chevR')}</button>
          <button class="menu-item" data-go="/perfil/contrasena">${ic('lock')}<span>Cambiar contraseña</span>${ic('chevR')}</button>
          <button class="menu-item" id="foto">${ic('camera')}<span>Cambiar foto de perfil</span>${ic('chevR')}</button>
          <button class="menu-item danger" id="del">${ic('trash')}<span>Eliminar perfil</span>${ic('chevR')}</button>
        </div>
        <div class="spacer"></div>
        <button class="btn mt-l" id="salir">Cerrar sesión</button>
        <input type="file" id="fileCam" accept="image/*" capture="user" hidden>
        <input type="file" id="fileGal" accept="image/*" hidden>
      </div>`,
      mount(root) {
        const sheet = () => {
          const o = $('#overlay-root');
          o.innerHTML = `<div class="scrim bottom"><div class="sheet" role="dialog" aria-modal="true">
            <div class="grip"></div><h2>Cambiar foto de perfil</h2>
            <button data-s="cam">${ic('camera')}Tomar foto</button>
            <button data-s="gal">${ic('image')}Elegir de la galería</button>
            <button data-s="del">${ic('trash')}Quitar foto</button></div></div>`;
          $('.scrim', o).onclick = (e) => {
            const s = e.target.closest('[data-s]');
            if (!s && !e.target.classList.contains('scrim')) return;
            closeOverlay();
            if (!s) return;
            if (s.dataset.s === 'cam') $('#fileCam', root).click();
            if (s.dataset.s === 'gal') $('#fileGal', root).click();
            if (s.dataset.s === 'del') { u.foto = null; save(); go('/perfil', 'Foto eliminada'); }
          };
        };
        $('#cam', root).onclick = sheet;
        $('#foto', root).onclick = sheet;
        const onFile = (e) => {
          const f = e.target.files[0]; if (!f) return;
          const img = new Image();
          img.onload = () => {
            const c = document.createElement('canvas'), s = 256;
            const k = Math.max(s / img.width, s / img.height);
            c.width = c.height = s;
            c.getContext('2d').drawImage(img, (s - img.width * k) / 2, (s - img.height * k) / 2, img.width * k, img.height * k);
            u.foto = c.toDataURL('image/jpeg', 0.85); save(); URL.revokeObjectURL(img.src);
            go('/perfil', 'Foto actualizada');
          };
          img.src = URL.createObjectURL(f);
        };
        $('#fileCam', root).onchange = onFile;
        $('#fileGal', root).onchange = onFile;
        $('#salir', root).onclick = () => { db.session = null; save(); go('/login'); };
        $('#del', root).onclick = () => confirmDelete({
          titulo: '¿Eliminar tu perfil?',
          texto: 'Se borrarán tus materias, tareas, flashcards y tu racha. Esta acción no se puede deshacer.',
          onOk: () => { delete db.users[u.email]; db.session = null; save(); go('/login', 'Perfil eliminado'); },
        });
      },
    };
  };

  views['perfil/nombre'] = () => ({
    html: `<div class="screen">
      ${topbar('Cambiar nombre', '/perfil')}
      <form id="f" novalidate>
        <label class="label" for="n">Nombre</label>
        <input class="input" id="n" value="${esc(me().nombre)}" placeholder="Camila Torres">
        <div class="hint">Así te saludaremos en la aplicación.</div>
        <div class="error" id="err"></div>
        <div class="center"><button class="btn small" type="submit">Guardar cambios</button></div>
      </form></div>`,
    mount(root) {
      $('#f', root).onsubmit = (e) => {
        e.preventDefault();
        const n = $('#n', root).value.trim();
        if (!n) return ($('#err', root).textContent = 'El nombre no puede estar vacío.');
        me().nombre = n; save(); go('/perfil', 'Nombre actualizado');
      };
    },
  });

  views['perfil/contrasena'] = () => ({
    html: `<div class="screen">
      ${topbar('Cambiar contraseña', '/perfil')}
      <form id="f" novalidate>
        <label class="label" for="a">Contraseña actual</label>
        <input class="input" id="a" type="password" autocomplete="current-password" placeholder="••••••••">
        <label class="label" for="p1">Nueva contraseña</label>
        <input class="input" id="p1" type="password" autocomplete="new-password" placeholder="Mínimo 8 caracteres">
        <label class="label" for="p2">Confirmar nueva contraseña</label>
        <input class="input" id="p2" type="password" autocomplete="new-password" placeholder="Repite la nueva contraseña">
        <div class="error" id="err"></div>
        <button class="btn" type="submit">Guardar contraseña</button>
      </form>
      <p class="center mt"><button class="link" id="olv">¿Olvidaste tu contraseña actual?</button></p>
    </div>`,
    mount(root) {
      $('#olv', root).onclick = () => { recuperando = me().email; go('/nueva-contrasena'); };
      $('#f', root).onsubmit = (e) => {
        e.preventDefault();
        const err = (m) => ($('#err', root).textContent = m);
        if ($('#a', root).value !== me().pass) return err('La contraseña actual no es correcta.');
        const p1 = $('#p1', root).value;
        if (p1.length < 8) return err('La nueva contraseña debe tener mínimo 8 caracteres.');
        if (p1 !== $('#p2', root).value) return err('Las contraseñas no coinciden.');
        me().pass = p1; save(); go('/perfil', 'Contraseña cambiada correctamente');
      };
    },
  });

  // ----- Materias -----
  views.materias = () => {
    const ms = data().materias;
    return {
      html: `<div class="screen with-nav">
        ${topbar('Mis materias', '/inicio')}
        <h2 class="serif" style="font-size:18px;margin:6px 0 16px">SEMESTRE ACTUAL</h2>
        ${ms.map((m) => `<div class="item materia-item">
            <div class="t">${esc(m.nombre)}</div>
            <div class="s">${horariosDe(m).map((h) => `${esc(h.dia)} • ${hora12(h.hora)}`).join('<br>')}${m.salon ? '<br>Salón ' + esc(m.salon) : ''}${m.profesor ? '<br>' + esc(m.profesor) : ''}</div>
            <div class="acts"><button class="icon-btn edit" data-go="/materias/editar/${m.id}" aria-label="Editar">${ic('edit')}</button>
            <button class="icon-btn" data-del="${m.id}" aria-label="Eliminar">${ic('trash')}</button></div>
          </div>`).join('') || '<div class="empty">Aún no tienes materias.</div>'}
        <div class="center mt"><button class="btn small caps" data-go="/materias/nueva">+ Nueva materia</button></div>
      </div>${nav('inicio')}`,
      mount(root) {
        $$('[data-del]', root).forEach((b) => (b.onclick = () => {
          const m = ms.find((x) => x.id === b.dataset.del);
          confirmDelete({
            titulo: '¿Eliminar esta materia?', texto: m.nombre,
            onOk: () => {
              const d = data();
              d.materias = d.materias.filter((x) => x.id !== m.id);
              d.flashcards = d.flashcards.filter((x) => x.materiaId !== m.id);
              d.tareas.forEach((t) => { if (t.materiaId === m.id) t.materiaId = ''; });
              delete d.notas[m.id];
              save(); go('/materias', 'Materia eliminada');
            },
          });
        }));
      },
    };
  };

  // Bloque de un horario (día + hora) dentro del formulario de materia
  const HORAS = [];
  for (let h = 1; h <= 12; h++) HORAS.push(`${h}:00`, `${h}:30`);
  function horarioBlock(h, n) {
    let [hh, mm] = (h.hora || '08:00').split(':').map(Number);
    const pm = hh >= 12;
    const h12 = `${hh % 12 || 12}:${pad(mm)}`;
    return `<div class="horario" data-h>
      <div class="horario-head"><b>Horario ${n}</b>${n > 1 ? `<button type="button" class="icon-btn" data-quitar aria-label="Quitar horario">${ic('trash')}</button>` : ''}</div>
      <label class="label">Día</label>
      <select class="select" data-dia>${DIAS.map((d) => `<option ${d === h.dia ? 'selected' : ''}>${d}</option>`).join('')}</select>
      <label class="label">Hora</label>
      <div class="hora-row">
        <select class="select" data-hora>${HORAS.map((x) => `<option ${x === h12 ? 'selected' : ''}>${x}</option>`).join('')}</select>
        <select class="select ampm" data-ampm><option ${pm ? '' : 'selected'}>AM</option><option ${pm ? 'selected' : ''}>PM</option></select>
      </div>
    </div>`;
  }

  function materiaForm(m) {
    const isNew = !m;
    m = m || { nombre: '', profesor: '', salon: '', horarios: [{ dia: 'Lunes', hora: '08:00' }] };
    return {
      html: `<div class="screen with-nav">
        ${topbar(isNew ? 'Nueva materia' : 'Editar materia', '/materias')}
        <form id="f" novalidate>
          <label class="label" for="nombre">Nombre de la materia</label>
          <input class="input" id="nombre" value="${esc(m.nombre)}" placeholder="Matemáticas Financieras">
          <label class="label" for="profesor">Profesor</label>
          <input class="input" id="profesor" value="${esc(m.profesor)}" placeholder="Nombre del profesor">
          <label class="label" for="salon">Salón</label>
          <input class="input" id="salon" value="${esc(m.salon)}" placeholder="304">
          <div id="horarios">${horariosDe(m).map((h, i) => horarioBlock(h, i + 1)).join('')}</div>
          <div class="error" id="err"></div>
          <div class="form-btns">
            <button type="button" class="btn small" id="addH">+ Horario</button>
            <button type="submit" class="btn small">Guardar</button>
            <button type="button" class="btn small" data-go="/materias">Cancelar</button>
          </div>
        </form></div>${nav('inicio')}`,
      mount(root) {
        const cont = $('#horarios', root);
        const renumerar = () => $$('[data-h]', cont).forEach((el, i) => {
          $('.horario-head b', el).textContent = `Horario ${i + 1}`;
        });
        const bindQuitar = () => $$('[data-quitar]', cont).forEach((b) => (b.onclick = () => { b.closest('[data-h]').remove(); renumerar(); }));
        bindQuitar();
        $('#addH', root).onclick = () => {
          const n = $$('[data-h]', cont).length + 1;
          cont.insertAdjacentHTML('beforeend', horarioBlock({ dia: DIAS[Math.min(n - 1, 6)], hora: '08:00' }, n));
          bindQuitar();
          cont.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'center' });
        };
        $('#f', root).onsubmit = (e) => {
          e.preventDefault();
          const v = (id) => $('#' + id, root).value.trim();
          if (!v('nombre')) return ($('#err', root).textContent = 'Escribe el nombre de la materia.');
          const horarios = $$('[data-h]', cont).map((el) => {
            let [hh, mm] = $('[data-hora]', el).value.split(':').map(Number);
            const pm = $('[data-ampm]', el).value === 'PM';
            hh = (hh % 12) + (pm ? 12 : 0);
            return { dia: $('[data-dia]', el).value, hora: `${pad(hh)}:${pad(mm)}` };
          });
          const obj = { nombre: v('nombre'), profesor: v('profesor'), salon: v('salon'), horarios };
          if (isNew) data().materias.push({ id: uid(), ...obj });
          else { Object.assign(m, obj); delete m.dia; delete m.hora; }
          save(); go('/materias', isNew ? 'Materia creada' : 'Materia actualizada');
        };
      },
    };
  }
  views['materias/nueva'] = () => materiaForm(null);
  views['materias/editar'] = (id) => {
    const m = data().materias.find((x) => x.id === id);
    return m ? materiaForm(m) : views.materias();
  };

  // ----- Tareas -----
  views.tareas = () => {
    const ts = data().tareas.slice().sort((a, b) => (a.fecha || '9').localeCompare(b.fecha || '9'));
    const pend = ts.filter((t) => !t.hecha), hechas = ts.filter((t) => t.hecha);
    const row = (t) => `<div class="item ${t.hecha ? 'done' : ''}">
        <button class="circle ${t.hecha ? 'on' : ''}" data-tog="${t.id}" aria-label="${t.hecha ? 'Marcar pendiente' : 'Marcar hecha'}">${t.hecha ? ic('check') : ''}</button>
        <div class="txt"><div class="t">${esc(t.titulo)}</div><div class="s">${esc(materiaNombre(t.materiaId))} · ${dueLabel(t.fecha)}</div></div>
        <div class="acts"><button class="icon-btn edit" data-go="/tareas/editar/${t.id}" aria-label="Editar">${ic('edit')}</button>
        <button class="icon-btn" data-del="${t.id}" aria-label="Eliminar">${ic('trash')}</button></div></div>`;
    return {
      html: `<div class="screen with-nav">
        ${topbar('Tareas', '/inicio')}
        <div class="list-title">Pendientes (${pend.length})</div>
        ${pend.map(row).join('') || '<div class="empty">No tienes tareas pendientes.</div>'}
        <div class="list-title">Hechas (${hechas.length})</div>
        ${hechas.map(row).join('')}
        <div style="height:60px"></div>
      </div>
      <div class="fab-wrap"><div class="fab-inner"><button class="btn fab" data-go="/tareas/nueva">${ic('plus')}Nueva tarea</button></div></div>
      ${nav('inicio')}`,
      mount(root) {
        $$('[data-tog]', root).forEach((b) => (b.onclick = () => {
          const t = data().tareas.find((x) => x.id === b.dataset.tog);
          t.hecha = !t.hecha; save();
          go('/tareas', t.hecha ? '¡Tarea completada!' : 'Tarea marcada como pendiente');
        }));
        $$('[data-del]', root).forEach((b) => (b.onclick = () => {
          const t = data().tareas.find((x) => x.id === b.dataset.del);
          confirmDelete({
            titulo: '¿Eliminar esta tarea?', texto: `“${t.titulo}” se borrará de tu lista.`,
            onOk: () => { data().tareas = data().tareas.filter((x) => x.id !== t.id); save(); go('/tareas', 'Tarea eliminada'); },
          });
        }));
      },
    };
  };

  function tareaForm(t) {
    const isNew = !t;
    t = t || { titulo: '', materiaId: '', fecha: '', desc: '' };
    return {
      html: `<div class="screen with-nav">
        ${topbar(isNew ? 'Nueva tarea' : 'Editar tarea', '/tareas')}
        <form id="f" novalidate>
          <label class="label" for="titulo">Título de la tarea</label>
          <input class="input" id="titulo" value="${esc(t.titulo)}" placeholder="Ej: Taller de Cálculo II">
          <label class="label" for="materia">Materia</label>
          <select class="select" id="materia">${materiaOptions(t.materiaId)}</select>
          <label class="label" for="fecha">Fecha de entrega</label>
          <input class="input" id="fecha" type="date" value="${esc(t.fecha)}">
          <label class="label" for="desc">Descripción (opcional)</label>
          <textarea class="textarea" id="desc" placeholder="Agrega detalles de la tarea">${esc(t.desc)}</textarea>
          <div class="error" id="err"></div>
          <button class="btn" type="submit">${isNew ? 'Guardar tarea' : 'Guardar cambios'}</button>
        </form></div>${nav('inicio')}`,
      mount(root) {
        $('#f', root).onsubmit = (e) => {
          e.preventDefault();
          const v = (id) => $('#' + id, root).value.trim();
          if (!v('titulo')) return ($('#err', root).textContent = 'Escribe el título de la tarea.');
          const obj = { titulo: v('titulo'), materiaId: v('materia'), fecha: v('fecha'), desc: v('desc') };
          if (isNew) data().tareas.push({ id: uid(), hecha: false, ...obj }); else Object.assign(t, obj);
          save(); go('/tareas', isNew ? 'Tarea creada' : 'Tarea actualizada');
        };
      },
    };
  }
  views['tareas/nueva'] = () => tareaForm(null);
  views['tareas/editar'] = (id) => {
    const t = data().tareas.find((x) => x.id === id);
    return t ? tareaForm(t) : views.tareas();
  };

  // ----- Flashcards -----
  function flashcardModal({ titulo, fc, materiaFija, onSave }) {
    const o = $('#overlay-root');
    const ms = data().materias;
    o.innerHTML = `<div class="scrim"><div class="modal" role="dialog" aria-modal="true">
      ${titulo ? `<h2 style="font-family:Nunito,sans-serif;font-size:19px;margin-bottom:12px">${titulo}</h2>` : `<div class="badge">${ic('edit')}</div>`}
      ${materiaFija ? '' : `<select class="select" id="m" style="text-align:center;letter-spacing:2px;font-weight:700">
        <option value="">Selecciona la materia</option>${ms.map((m) => `<option value="${m.id}" ${fc && fc.materiaId === m.id ? 'selected' : ''}>${esc(m.nombre)}</option>`).join('')}</select>`}
      <label class="label" for="q">Pregunta:</label>
      <textarea class="textarea" id="q" placeholder="¿Cuál es la pregunta?">${esc(fc ? fc.pregunta : '')}</textarea>
      <label class="label" for="r">Respuesta:</label>
      <textarea class="textarea" id="r" placeholder="Escribe la respuesta">${esc(fc ? fc.respuesta : '')}</textarea>
      <div class="error" id="err"></div>
      <div class="row"><button class="btn" data-x="no">Cancelar</button><button class="btn" data-x="ok">Guardar</button></div>
    </div></div>`;
    $('[data-x=no]', o).onclick = closeOverlay;
    $('[data-x=ok]', o).onclick = () => {
      const materiaId = materiaFija || $('#m', o).value;
      const pregunta = $('#q', o).value.trim(), respuesta = $('#r', o).value.trim();
      if (!materiaId) return ($('#err', o).textContent = 'Selecciona la materia.');
      if (!pregunta || !respuesta) return ($('#err', o).textContent = 'Escribe la pregunta y la respuesta.');
      closeOverlay(); onSave({ materiaId, pregunta, respuesta });
    };
  }

  views.flashcards = () => {
    const ms = data().materias;
    const count = (id) => data().flashcards.filter((f) => f.materiaId === id).length;
    return {
      html: `<div class="screen with-nav">
        ${topbar('Flashcard', '/inicio')}
        <p class="center" style="margin:4px 0 16px">Elige una materia para repasar. Toca una tarjeta para ver la respuesta.</p>
        <div class="dd" id="dd"><button id="ddb">Selecciona la materia ${ic('chevD')}</button>
          <div class="opts">${ms.map((m) => `<button data-go="/flashcards/${m.id}">${esc(m.nombre)} (${count(m.id)})</button>`).join('') || '<div class="empty">Primero agrega una materia.</div>'}</div></div>
        <h3 class="list-title mt-l">Tus materias</h3>
        <div class="chips">${ms.map((m) => `<button class="chip" data-go="/flashcards/${m.id}">${esc(m.nombre)}<br><small style="font-size:12px;color:var(--muted)">${count(m.id)} tarjetas</small></button>`).join('')}</div>
      </div>
      <div class="fab-wrap"><div class="fab-inner"><button class="btn fab" id="nueva">${ic('plus')}Flashcard</button></div></div>
      ${nav('inicio')}`,
      mount(root) {
        $('#ddb', root).onclick = () => $('#dd', root).classList.toggle('open');
        $('#nueva', root).onclick = () => {
          if (!ms.length) return go('/materias/nueva', 'Primero crea una materia');
          flashcardModal({
            titulo: 'Nueva Flashcard',
            onSave: (f) => { data().flashcards.push({ id: uid(), ...f }); save(); go('/flashcards/' + f.materiaId, 'Flashcard creada'); },
          });
        };
      },
    };
  };

  views['flashcards/materia'] = (id) => {
    const m = data().materias.find((x) => x.id === id);
    if (!m) return views.flashcards();
    const fcs = data().flashcards.filter((f) => f.materiaId === id);
    return {
      html: `<div class="screen with-nav">
        ${topbar('Flashcard', '/flashcards')}
        <h2 style="font-family:Nunito,sans-serif;font-size:19px;margin:4px 0 18px">${esc(m.nombre)}</h2>
        ${fcs.map((f) => `<div class="fc-row">
            <button class="fc" data-flip="${f.id}"><span><small>Pregunta</small>${esc(f.pregunta)}</span></button>
            <div class="fc-acts"><button class="icon-btn" data-edit="${f.id}" aria-label="Editar">${ic('edit')}</button>
            <button class="icon-btn del" data-del="${f.id}" aria-label="Eliminar">${ic('trash')}</button></div></div>`).join('')
          || '<div class="empty">Aún no hay flashcards en esta materia.</div>'}
        <div style="height:60px"></div>
      </div>
      <div class="fab-wrap"><div class="fab-inner"><button class="btn fab" id="nueva">${ic('plus')}Flashcard</button></div></div>
      ${nav('inicio')}`,
      mount(root) {
        $$('[data-flip]', root).forEach((b) => (b.onclick = () => {
          const f = fcs.find((x) => x.id === b.dataset.flip);
          const back = b.classList.toggle('back');
          b.innerHTML = `<span><small>${back ? 'Respuesta' : 'Pregunta'}</small>${esc(back ? f.respuesta : f.pregunta)}</span>`;
        }));
        $$('[data-edit]', root).forEach((b) => (b.onclick = () => {
          const f = fcs.find((x) => x.id === b.dataset.edit);
          flashcardModal({ fc: f, materiaFija: id, onSave: (v) => { Object.assign(f, v); save(); go('/flashcards/' + id, 'Flashcard actualizada'); } });
        }));
        $$('[data-del]', root).forEach((b) => (b.onclick = () => confirmDelete({
          titulo: '¿Eliminar esta flashcard?',
          onOk: () => { data().flashcards = data().flashcards.filter((x) => x.id !== b.dataset.del); save(); go('/flashcards/' + id, 'Flashcard eliminada'); },
        })));
        $('#nueva', root).onclick = () => flashcardModal({
          titulo: 'Nueva Flashcard', materiaFija: id,
          onSave: (f) => { data().flashcards.push({ id: uid(), ...f }); save(); go('/flashcards/' + id, 'Flashcard creada'); },
        });
      },
    };
  };

  // ----- Pomodoro -----
  views.pomodoro = () => ({
    html: `<div class="screen with-nav">
      ${topbar('Pomodoro', '/inicio')}
      <div class="card"><div style="font-size:14px;margin-bottom:8px">Pomodoro</div>${pomoWidget()}
      <p class="hint center" style="margin-top:12px">Usa + y − para cambiar el tiempo de estudio (de 5 en 5 minutos). "Descansar" inicia 5 minutos de pausa.</p></div>
    </div>${nav('inicio')}`,
    mount(root) { bindPomo(root); },
  });

  // ----- Calendario -----
  let calSel = null;
  views.calendario = () => {
    if (!calSel) calSel = today();
    const sel = parseISO(calSel);
    const lunes = addDays(calSel, -dayIndex(sel));
    const dias = Array.from({ length: 7 }, (_, i) => addDays(lunes, i));
    const nombreDia = DIAS[dayIndex(sel)];
    const clases = data().materias.flatMap((m) => horariosDe(m).filter((h) => h.dia === nombreDia).map((h) => ({ ...m, hora: h.hora })))
      .sort((a, b) => a.hora.localeCompare(b.hora));
    const finClase = (h) => { const [hh, mm] = h.split(':').map(Number); return `${pad(Math.min(23, hh + 2))}:${pad(mm)}`; };
    const tareasDia = data().tareas.filter((t) => !t.hecha && t.fecha === calSel);
    return {
      html: `<div class="screen with-nav">
        ${topbar('Calendario', '/inicio')}
        <div class="week-nav">
          <button class="icon-btn" data-w="-7" aria-label="Semana anterior">${ic('back')}</button>
          <h2 class="month">${MESES[sel.getMonth()].toUpperCase()} ${sel.getFullYear()}</h2>
          <button class="icon-btn" data-w="7" aria-label="Semana siguiente">${ic('chevR')}</button>
        </div>
        <div class="week">
          ${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d) => `<div class="dn">${d}</div>`).join('')}
          ${dias.map((iso) => `<button data-d="${iso}" class="${iso === calSel ? 'on' : ''} ${iso === today() ? 'today' : ''}">${parseISO(iso).getDate()}</button>`).join('')}
        </div>
        <h2 class="cal-h">HORARIO DE ESTUDIO</h2>
        ${clases.map((m) => `<div class="slot"><b>${m.hora} – ${finClase(m.hora)}</b><span>${esc(m.nombre)}${m.salon ? ' • Salón ' + esc(m.salon) : ''}</span></div>`).join('')
          || `<div class="empty">No tienes clases el ${nombreDia.toLowerCase()}.</div>`}
        <h2 class="cal-h">TAREAS PENDIENTES</h2>
        ${tareasDia.map((t) => `<div class="todo"><button class="circle" data-tog="${t.id}" aria-label="Marcar hecha"></button>${esc(t.titulo)}</div>`).join('')
          || '<div class="empty">No hay tareas para este día.</div>'}
        <div class="right mt"><button class="btn small caps" data-go="/tareas">Ver tareas ${ic('arrowR')}</button></div>
      </div>${nav('calendario')}`,
      mount(root) {
        $$('[data-d]', root).forEach((b) => (b.onclick = () => { calSel = b.dataset.d; render(); }));
        $$('[data-w]', root).forEach((b) => (b.onclick = () => { calSel = addDays(calSel, Number(b.dataset.w)); render(); }));
        $$('[data-tog]', root).forEach((b) => (b.onclick = () => {
          data().tareas.find((x) => x.id === b.dataset.tog).hecha = true; save(); go('/calendario', '¡Tarea completada!');
        }));
      },
    };
  };

  // ----- Simulador de notas -----
  views.simulador = () => ({
    html: `<div class="screen with-nav">
      ${topbar('Simulador de notas', '/inicio')}
      <p style="font-size:18px;margin:24px 4px 16px">Selecciona una materia</p>
      ${data().materias.map((m) => `<button class="method-link" style="padding:16px 20px;margin-bottom:6px" data-go="/simulador/${m.id}"><span>${esc(m.nombre)}</span>→</button>`).join('')
        || '<div class="empty">Primero agrega una materia.</div>'}
      <p class="hint" style="margin:14px 4px">Selecciona una materia para calcular</p>
    </div>${nav('simulador')}`,
  });

  views['simulador/materia'] = (id) => {
    const m = data().materias.find((x) => x.id === id);
    if (!m) return views.simulador();
    const n = data().notas[id] || (data().notas[id] = { periodos: 3, notas: [] });
    const w = pesosDe(n);
    const total = () => w.reduce((a, b) => a + (Number(b) || 0), 0);
    return {
      html: `<div class="screen with-nav">
        ${topbar('Simulador de notas', '/simulador')}
        <h2 style="font-family:Nunito,sans-serif;font-size:var(--fs-m);margin:0 0 12px">${esc(m.nombre)}</h2>
        <div class="card">
          <div class="sim-head"><div class="ic">${ic('shield')}</div><h2>Calificaciones</h2></div>
          <p>Escribe el porcentaje de cada corte y tus notas. Se muestra la nota que debes obtener en el último período para aprobar la asignatura (3.0).</p>
          <div style="display:flex;align-items:center;gap:12px;margin:8px 0 12px">${ic('cal').replace('<svg', '<svg style="width:26px;height:26px;color:var(--sage)"')}
            <select class="select" id="per" style="width:auto;border:0;padding-left:4px;font-weight:600">
              ${[2, 3, 4, 5, 6].map((k) => `<option value="${k}" ${k === n.periodos ? 'selected' : ''}>Períodos: ${k}</option>`).join('')}</select></div>
          <div class="per per-head"><span class="n"></span><small>%</small><small>Nota</small></div>
          ${w.map((p, i) => `<div class="per ${i === w.length - 1 ? 'last' : ''}">
              <span class="n">Periodo ${i + 1}</span>
              <input inputmode="numeric" data-p="${i}" value="${esc(p)}" aria-label="Porcentaje periodo ${i + 1}">
              ${i < w.length - 1
                ? `<input inputmode="decimal" data-i="${i}" placeholder="0.0" value="${esc(n.notas[i] || '')}" aria-label="Nota periodo ${i + 1}">`
                : '<b class="falta">?</b>'}
            </div>`).join('')}
          <div class="per-total" id="total"></div>
          <button class="sim-ask" id="ask">${ic('arrowR').replace('<svg', '<svg style="width:24px;height:24px"')} Preguntar</button>
        </div>
        <div class="card mt">
          <div class="sim-head"><div class="ic">${ic('arrows')}</div><h2>Tu situación</h2></div>
          <div class="situ" id="situ">Digita tus notas<br>y pregúntame tu situación</div>
        </div>
      </div>${nav('simulador')}`,
      mount(root) {
        const showTotal = () => {
          const t = total(), el = $('#total', root);
          el.textContent = `Total: ${t}%${t === 100 ? '' : ' (debe sumar 100%)'}`;
          el.classList.toggle('bad', t !== 100);
        };
        showTotal();
        $('#per', root).onchange = (e) => {
          n.periodos = Number(e.target.value);
          n.pesos = pesosBase(n.periodos);
          n.notas = n.notas.slice(0, n.periodos - 1);
          save(); render();
        };
        $$('[data-p]', root).forEach((inp) => (inp.oninput = () => {
          w[Number(inp.dataset.p)] = Number(inp.value.replace(',', '.')) || 0;
          n.pesos = w.slice(); save(); showTotal();
        }));
        $$('[data-i]', root).forEach((inp) => (inp.oninput = () => { n.notas[Number(inp.dataset.i)] = inp.value.trim(); save(); }));
        $('#ask', root).onclick = () => {
          const out = $('#situ', root);
          if (total() !== 100) { out.innerHTML = `Los porcentajes suman ${total()}%.<br>Ajústalos para que sumen 100%.`; return; }
          if (!w[w.length - 1]) { out.innerHTML = `El último periodo debe tener<br>un porcentaje mayor a 0%.`; return; }
          let acum = 0;
          for (let i = 0; i < w.length - 1; i++) {
            const x = parseFloat(String(n.notas[i] || '').replace(',', '.'));
            if (isNaN(x) || x < 0 || x > 5) { out.innerHTML = `Revisa la nota del periodo ${i + 1}.<br>Debe estar entre 0.0 y 5.0`; return; }
            acum += x * w[i] / 100;
          }
          const need = (3 - acum) / (w[w.length - 1] / 100);
          const msg = need <= 0 ? '¡Ya aprobaste la materia! 🎉'
            : need > 5 ? 'Necesitarías más de 5.0. Habla con tu docente y busca refuerzos.'
            : need <= 3 ? 'Vas muy bien, ¡sigue así!' : '¡Tú puedes! Dale prioridad a esta materia.';
          out.innerHTML = `Necesitas sacar en el periodo ${w.length}:<span class="num">${Math.max(0, need).toFixed(1)}</span>${msg}`;
        };
      },
    };
  };

  // =====================================================================
  // RUTAS
  // =====================================================================
  const PUBLIC = ['login', 'registro', 'recuperar', 'nueva-contrasena'];
  function resolve() {
    const parts = (location.hash.replace(/^#\/?/, '') || '').split('/').filter(Boolean);
    const [a, b, c] = parts;
    if (!a) return { name: me() ? 'inicio' : 'login' };
    if (a === 'materias' && b === 'editar') return { name: 'materias/editar', arg: c };
    if (a === 'tareas' && b === 'editar') return { name: 'tareas/editar', arg: c };
    if (a === 'flashcards' && b) return { name: 'flashcards/materia', arg: b };
    if (a === 'simulador' && b) return { name: 'simulador/materia', arg: b };
    return { name: b ? `${a}/${b}` : a };
  }

  function render() {
    let { name, arg } = resolve();
    if (!views[name]) name = me() ? 'inicio' : 'login';
    if (!PUBLIC.includes(name) && !me()) { location.hash = '/login'; return; }
    if (PUBLIC.includes(name) && name !== 'nueva-contrasena' && me()) { location.hash = '/inicio'; return; }
    closeOverlay();
    const v = views[name](arg);
    const app = $('#app');
    app.innerHTML = v.html;
    app.scrollTop = 0;
    // Enlaces de navegación y botón "atrás"
    $$('[data-go]', app).forEach((el) => el.addEventListener('click', () => go(el.dataset.go)));
    $$('[data-back]', app).forEach((el) => el.addEventListener('click', () => {
      if (history.length > 1) history.back(); else go(el.dataset.back || '/inicio');
    }));
    if (v.mount) v.mount(app);
    pomoRefresh();
    if (pendingToast) { toast(pendingToast); pendingToast = null; }
  }

  // Hora real en la barra de estado del marco de celular
  const sbTime = () => { const d = new Date(); $('#sb-time').textContent = `${d.getHours()}:${pad(d.getMinutes())}`; };
  sbTime(); setInterval(sbTime, 15000);

  window.addEventListener('hashchange', render);
  if (me()) touchStreak();
  render();

  // Permite instalar la app y abrirla sin internet
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
    // Cuando se publica una versión nueva, recarga una vez para mostrarla.
    // (En la primera visita no hay versión anterior, así que no recarga.)
    const habiaVersion = !!navigator.serviceWorker.controller;
    let recargado = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (recargado || !habiaVersion) return;
      recargado = true; location.reload();
    });
  }
})();
