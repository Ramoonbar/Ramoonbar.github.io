// --- Config base (mapa fijo, igual en móvil y PC) ---
const tileSize = 32;

const MAP_COLS = 60;                 // ancho del mapa en tiles
const MAP_ROWS = 60;                 // alto del mapa en tiles
const mapWidth  = MAP_COLS * tileSize;
const mapHeight = MAP_ROWS * tileSize;

// Cámara con scroll
let cameraX = 0, cameraY = 0;

// Utilidades
function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }
function cssViewport(){
  const dpr = window.devicePixelRatio || 1;
  return { w: Math.floor(canvas.width / dpr), h: Math.floor(canvas.height / dpr) };
}
function key(c,r){ return `${c},${r}`; }

// Colisiones (si más adelante vuelves a usar árboles)
window.blockedTiles = new Set();

// =====================================================
//   Generador aleatorio con semilla fija (repetible)
// =====================================================
let seed = 12345; // cambia este número si quieres un layout distinto
function seededRandom(){
  seed ^= seed << 13;
  seed ^= seed >> 17;
  seed ^= seed << 5;
  // normaliza a [0,1)
  return ((seed < 0 ? ~seed + 1 : seed) % 1000000) / 1000000;
}
