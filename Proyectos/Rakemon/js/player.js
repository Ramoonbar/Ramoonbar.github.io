// --- Sprites del jugador ---
const playerImgs = {
  down:  { stop: new Image(), left: new Image(), right: new Image() },
  up:    { stop: new Image(), left: new Image(), right: new Image() },
  left:  { stop: new Image(), left: new Image(), right: new Image() },
  right: { stop: new Image(), left: new Image(), right: new Image() }
};

playerImgs.down.stop.src  = "assets/images/character-walk-down-stop.png";
playerImgs.down.left.src  = "assets/images/character-walk-down-left.png";
playerImgs.down.right.src = "assets/images/character-walk-down-right.png";
playerImgs.up.stop.src    = "assets/images/character-walk-up-stop.png";
playerImgs.up.left.src    = "assets/images/character-walk-up-left.png";
playerImgs.up.right.src   = "assets/images/character-walk-up-right.png";
playerImgs.left.stop.src  = "assets/images/character-walk-left-stop.png";
playerImgs.left.left.src  = "assets/images/character-walk-left-left.png";
playerImgs.left.right.src = "assets/images/character-walk-left-right.png";
playerImgs.right.stop.src  = "assets/images/character-walk-right-stop.png";
playerImgs.right.left.src  = "assets/images/character-walk-right-left.png";
playerImgs.right.right.src = "assets/images/character-walk-right-right.png";

// --- Estado del jugador ---
const player = {
  x: 0, y: 0,
  width: tileSize, height: 48,
  speedWalk: 4, speedRun: 7, run: false,
  targetX: 0, targetY: 0,
  moving: false,
  activeDir: null,
  heldOrder: [],
  currentDir: "down",
  currentImg: playerImgs.down.stop,
  walkFlip: false
};

// Centro del MAPA (no del viewport)
function centerPlayer(){
  const c = Math.floor(MAP_COLS/2);
  const r = Math.floor(MAP_ROWS/2);
  player.x = c * tileSize;
  player.y = r * tileSize;
  player.targetX = player.x;
  player.targetY = player.y;
}

// === Controles unificados (D-pad, flechas y WASD) ===
const keyToDir = {
  ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
  w: "up", a: "left", s: "down", d: "right"
};

function setRunUI(on){
  const btn = document.getElementById("btn-run");
  if (btn) btn.setAttribute("aria-pressed", on ? "true" : "false");
}

window.pushDir = function(dir){
  if (!dir) return;
  const i = player.heldOrder.indexOf(dir);
  if (i !== -1) player.heldOrder.splice(i,1);
  player.heldOrder.push(dir);
  player.activeDir = dir;
  if (!player.moving) beginStep();
};

window.releaseDir = function(dir){
  if (!dir) return;
  const i = player.heldOrder.indexOf(dir);
  if (i !== -1) player.heldOrder.splice(i,1);
  if (player.activeDir === dir) {
    player.activeDir = player.heldOrder[player.heldOrder.length-1] || null;
  }
};

// Teclado: flechas + WASD y RUN con Space
document.addEventListener("keydown",(e)=>{
  // RUN con espacio
  if (e.code === "Space" || e.key === " ") {
    if (!player.run){ player.run = true; setRunUI(true); }
    return;
  }
  // Dirección
  const k = (e.key && e.key.length === 1) ? e.key.toLowerCase() : e.key;
  const dir = keyToDir[k] || keyToDir[e.key];
  if (!dir) return;
  e.preventDefault();
  window.pushDir(dir);
});

document.addEventListener("keyup",(e)=>{
  // RUN
  if (e.code === "Space" || e.key === " ") {
    if (player.run){ player.run = false; setRunUI(false); }
    return;
  }
  // Dirección
  const k = (e.key && e.key.length === 1) ? e.key.toLowerCase() : e.key;
  const dir = keyToDir[k] || keyToDir[e.key];
  if (!dir) return;
  e.preventDefault();
  window.releaseDir(dir);
});

// Evitar teclas “atascadas” al perder foco
window.addEventListener("blur", ()=>{
  player.run = false; setRunUI(false);
  player.heldOrder.length = 0;
  player.activeDir = null;
});

// --- Colisiones con árboles/agua/edificios ---
function K(c,r){ return `${c},${r}`; }
function tileBlocked(c, r){
  // límites del mapa
  if (c < 0 || r < 0 || c >= MAP_COLS || r >= MAP_ROWS) return true;
  // árboles, edificios, paredes del interior, perímetro, etc.
  if (typeof blockedTiles !== "undefined" && blockedTiles && blockedTiles.has(K(c,r))) return true;
  // lago/agua
  if (typeof isLakeCR === "function" && isLakeCR(c, r)) return true;
  // pokéballs NO bloquean
  return false;
}

function imgReady(img){ return img && img.complete && img.naturalWidth > 0; }
function setTileFrame(){ const d = playerImgs[player.currentDir]; player.currentImg = player.walkFlip ? d.right : d.left; }

// Movimiento por tiles con colisiones
function beginStep(){
  if (!player.activeDir){ player.currentImg = playerImgs[player.currentDir].stop; return; }
  let nx = player.x, ny = player.y;
  if (player.activeDir === "up")    ny -= tileSize;
  if (player.activeDir === "down")  ny += tileSize;
  if (player.activeDir === "left")  nx -= tileSize;
  if (player.activeDir === "right") nx += tileSize;

  const maxX = mapWidth  - tileSize;
  const maxY = mapHeight - tileSize;
  // fuera del mapa
  if (nx < 0 || nx > maxX || ny < 0 || ny > maxY) { player.currentImg = playerImgs[player.currentDir].stop; return; }

  // chequear bloqueos del tile destino
  const nc = Math.floor(nx / tileSize);
  const nr = Math.floor(ny / tileSize);
  if (tileBlocked(nc, nr)) { player.currentImg = playerImgs[player.currentDir].stop; return; }

  player.targetX = nx; player.targetY = ny; player.moving = true;
  player.currentDir = player.activeDir; setTileFrame();
}

function updatePlayer(){
  if (!player.moving){
    if (player.activeDir){ beginStep(); if (!player.moving) player.currentImg = playerImgs[player.currentDir].stop; }
    else player.currentImg = playerImgs[player.currentDir].stop;
    return;
  }
  const dx = player.targetX - player.x;
  const dy = player.targetY - player.y;
  const spd = player.run ? player.speedRun : player.speedWalk;

  if (dx !== 0) player.x += Math.sign(dx) * Math.min(spd, Math.abs(dx));
  if (dy !== 0) player.y += Math.sign(dy) * Math.min(spd, Math.abs(dy));

  if (player.x === player.targetX && player.y === player.targetY){
    player.moving = false;
    player.walkFlip = !player.walkFlip; // alterna una vez por tile
    if (player.activeDir) beginStep(); else player.currentImg = playerImgs[player.currentDir].stop;
  }
}

function drawPlayer(ctx){
  const drawX = player.x - cameraX;
  const drawY = player.y - cameraY - (player.height - tileSize);
  if (!imgReady(player.currentImg)){ ctx.fillStyle="#ff3860"; ctx.fillRect(drawX,drawY,player.width,player.height); return; }
  ctx.drawImage(player.currentImg, drawX, drawY, player.width, player.height);
}
