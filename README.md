# Hábitos de Estudio · Prototipo Mobile
Taller 6 · Innovación Tecnológica · Universidad ECCI
**Integrantes:** Diana Martinez, Luis Ospina, Natalia Morales, Yafet Angola, Mauricio Gamboa

**Abrir la app:** https://luisenciadoc.github.io/Habitos-de-estudio---Movil/

### Qué incluye

- Iniciar sesión, crear cuenta, recuperar y cambiar contraseña.
- Inicio con racha de días, promedio del semestre, número de materias, tareas pendientes, progreso por materia y métodos de estudio.
- Mi perfil: cambiar nombre, contraseña y foto, eliminar perfil y cerrar sesión.
- Mis materias (con varios horarios por materia), Tareas y Flashcards: crear, editar y eliminar.
- Calendario semanal con horario de clases y tareas del día.
- Simulador de notas: porcentajes y número de cortes editables; calcula la nota que se necesita en el último corte para aprobar con 3.0.
- Pomodoro con iniciar, pausar, descansar y retomar el estudio.

### Con qué se construyó

- **HTML, CSS y JavaScript** puros, sin frameworks ni librerías.
- **PWA (Progressive Web App):** `manifest.json` y `sw.js` permiten instalarla en el celular y abrirla sin internet.
- **GitHub Pages:** publica la app gratis desde la rama `main`.
- Diseño basado en el prototipo de Figma, con tipografías **Lora** (títulos) y **Nunito** (cuerpo).

### Cómo se guardan los datos

La app no usa servidor ni base de datos en la nube. Todo (cuentas, materias, tareas, flashcards y notas) se guarda en el **almacenamiento del navegador** (`localStorage`) del mismo dispositivo. Por eso los datos no se comparten entre dispositivos y se borran si se limpian los datos del navegador.

"Continuar con Google" muestra cuentas de prueba con datos de ejemplo (y las cuentas creadas en ese navegador), ya que sin servidor no es posible validar cuentas reales de Google. Las cuentas nuevas creadas con "Regístrate" empiezan vacías.

## Prototipo interactivo (Figma)

Ver prototipo (inicia en Login):
https://www.figma.com/proto/xp2r5PY79otNoQkQih57B3/Mockups-APP?node-id=155-541&p=f&t=uRbaXPmW2niclGSg-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=155%3A541
Archivo de diseño (mockups):
https://www.figma.com/design/xp2r5PY79otNoQkQih57B3/Mockups-APP?node-id=0-1
