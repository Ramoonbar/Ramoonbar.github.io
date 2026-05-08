// ================== Imágenes base ==================
const bgImg  = new Image();  bgImg.src  = "assets/images/grass-template.jpg";
const woodImg= new Image();  woodImg.src= "assets/images/wood-template.png";
const exitImg= new Image();  exitImg.src= "assets/images/exit-template.jpg";

// ================== NPCs: Pikachu ==================
const pikaFrames = [new Image(), new Image(), new Image(), new Image()];
pikaFrames[0].src = "assets/images/pikachu-01.png";
pikaFrames[1].src = "assets/images/pikachu-02.png";
pikaFrames[2].src = "assets/images/pikachu-03.png";
pikaFrames[3].src = "assets/images/pikachu-04.png";

let pikachus = [];           // {x,y,dir,speed,frame,ftimer,row,alive}
let pikaSpawnCooldown = 0;   // frames
const PIKA_MAX = 3;
let PIKA_HEIGHT = Math.floor(tileSize * 1.25); // tamaño “realista”

// ================== HUD: Pokéballs ==================
let pokeballsTotal = 10;
let pokeballsCollected = 0;

function drawHUD(){
  const pad = 12;
  const x = pad, y = pad;
  const icon = Math.floor(tileSize * 0.9);
  const boxW = icon + 140;
  const boxH = Math.max(icon, 30) + 10;

  // fondo
  ctx.save();
  ctx.globalAlpha = 0.9;
  ctx.fillStyle = "rgba(0,0,0,0.4)";
  ctx.fillRect(x-6, y-6, boxW, boxH);
  ctx.restore();

  // icono
  if (typeof pokeballImg !== "undefined" && pokeballImg.complete && pokeballImg.naturalWidth>0){
    ctx.drawImage(pokeballImg, x, y, icon, icon);
  } else {
    ctx.fillStyle = "#cc0000";
    ctx.fillRect(x, y, icon, icon);
  }

  // texto
  ctx.fillStyle = "#fff";
  ctx.font = "bold 24px monospace";
  ctx.textBaseline = "middle";
  ctx.fillText(`x ${pokeballsCollected}/${pokeballsTotal}`, x + icon + 10, y + icon/2);
}

// ================== Pikachus ==================
function initPikachus(){
  pikachus = [];
  pikaSpawnCooldown = 30;
}

function spawnPikachu(){
  if (pikachus.length >= PIKA_MAX) return;
  const dir = Math.random() < 0.5 ? 1 : -1;
  const r = 1 + Math.floor(Math.random() * (MAP_ROWS - 2));
  const x0 = dir === 1 ? -tileSize*2 : mapWidth + tileSize*2;
  const y0 = r * tileSize;
  const speed = 2 + Math.floor(Math.random() * 3); // 2..4 px/frame
  pikachus.push({ x:x0, y:y0, dir, speed, frame:0, ftimer:0, row:r, alive:true });
}

function updatePikachus(){
  if (pikaSpawnCooldown > 0) pikaSpawnCooldown--;
  else if (pikachus.length < PIKA_MAX){
    const toSpawn = 1 + (Math.random() < 0.4 ? 1 : 0);
    for (let i=0; i<toSpawn; i++) spawnPikachu();
    pikaSpawnCooldown = 90 + Math.floor(Math.random()*150);
  }
  for (const p of pikachus){
    if (!p.alive) continue;
    p.x += p.dir * p.speed;
    p.ftimer++; if (p.ftimer >= 8){ p.ftimer = 0; p.frame = (p.frame + 1) % 4; }
    if (p.dir === 1 && p.x > mapWidth + tileSize*4) p.alive = false;
    if (p.dir === -1 && p.x < -tileSize*4) p.alive = false;
  }
  pikachus = pikachus.filter(p => p.alive);
}

function drawPikachus(){
  for (const p of pikachus){
    const img = pikaFrames[p.frame];
    let drawH = PIKA_HEIGHT;
    let drawW = drawH;
    if (img.complete && img.naturalWidth>0 && img.naturalHeight>0){
      const ratio = img.naturalWidth / img.naturalHeight;
      drawW = Math.max(1, Math.floor(drawH * ratio));
    }
    const dx = Math.floor(p.x - cameraX);
    const dy = Math.floor(p.y - cameraY - (drawH - tileSize));
    const { w:vw, h:vh } = cssViewport();
    if (dx + drawW < 0 || dx > vw || dy + drawH < 0 || dy > vh) continue;

    if (!img.complete || img.naturalWidth === 0){
      ctx.fillStyle = "#ffd23f"; ctx.fillRect(dx, dy, drawW, drawH); continue;
    }
    if (p.dir === -1){
      ctx.save(); ctx.translate(dx + drawW, dy); ctx.scale(-1,1);
      ctx.drawImage(img, 0, 0, drawW, drawH); ctx.restore();
    } else {
      ctx.drawImage(img, dx, dy, drawW, drawH);
    }
  }
}

// ================== Estado mapas ==================
window.currentMap = "overworld"; // "overworld" | "other"
let transitionLock = 0;
let lastDoor = null; // {c, r}
const otherWorld = { room: null, portalC: 10, portalR: 10, exitRect: null };

// Congelar overworld
let blockedTilesOverworldBackup = null;

// ================== Helpers ==================
function clamp(v,a,b){ return Math.max(a, Math.min(b, v)); }
function cssViewport(){ const dpr = window.devicePixelRatio || 1; return { w: Math.floor(canvas.width/dpr), h: Math.floor(canvas.height/dpr) }; }
function call(fnName, ...args){ const f = window[fnName]; if (typeof f === "function") return f(...args); }
function rectsOverlap(a,b){ return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y; }

function playerFeetRect(){ const h = 10; return { x: player.x, y: player.y + tileSize - h, w: tileSize, h }; }
function playerBodyRect(){ // cuerpo completo alineado a suelo
  return { x: player.x, y: player.y - (player.height - tileSize), w: player.width, h: player.height };
}
function nextTileFromPlayer(){
  if (!player.activeDir) return null;
  const c = Math.floor(player.x / tileSize);
  const r = Math.floor(player.y / tileSize);
  if (player.activeDir==="up") return {c, r:r-1};
  if (player.activeDir==="down") return {c, r:r+1};
  if (player.activeDir==="left") return {c:c-1, r};
  if (player.activeDir==="right") return {c:c+1, r};
  return null;
}
function tileInsideBuilding(tc,tr,b){ return !!b && tc>=b.c && tc<b.c+b.bw && tr>=b.r && tr<b.r+b.bh; }

// ================== Canvas / cámara ==================
function resizeCanvas(){
  const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
  const cssW = Math.floor(window.innerWidth), cssH = Math.floor(window.innerHeight);
  canvas.width = cssW*dpr; canvas.height = cssH*dpr; canvas.style.width = cssW+"px"; canvas.style.height = cssH+"px";
  ctx.setTransform(dpr,0,0,dpr,0,0); ctx.imageSmoothingEnabled = false;
}
window.addEventListener("resize", resizeCanvas);

function updateCamera(){
  const { w, h } = cssViewport();
  cameraX = clamp(player.x - Math.floor(w/2), 0, Math.max(0, mapWidth  - w));
  cameraY = clamp(player.y - Math.floor(h/2), 0, Math.max(0, mapHeight - h));
}

// ================== Fondos ==================
function drawBackgroundOverworld(){
  const { w, h } = cssViewport();
  ctx.fillStyle = "#79c868"; ctx.fillRect(0, 0, w, h);
  if (bgImg.complete && bgImg.naturalWidth>0){
    const pat = ctx.createPattern(bgImg,"repeat");
    ctx.save(); ctx.translate(-(cameraX % bgImg.width), -(cameraY % bgImg.height));
    ctx.fillStyle = pat; ctx.fillRect(-bgImg.width, -bgImg.height, w+bgImg.width*2, h+bgImg.height*2);
    ctx.restore();
  }
}
function drawBackgroundOther(){
  const { w, h } = cssViewport(); ctx.fillStyle = "black"; ctx.fillRect(0,0,w,h);
}
function drawOtherWorld(){
  if (!otherWorld.room) return;
  const { c0,r0,w,h } = otherWorld.room;
  const px=c0*tileSize - cameraX, py=r0*tileSize - cameraY, pw=w*tileSize, ph=h*tileSize;
  if (woodImg.complete && woodImg.naturalWidth>0){
    const pat = ctx.createPattern(woodImg,"repeat");
    ctx.save(); ctx.translate(px,py); ctx.fillStyle = pat; ctx.fillRect(0,0,pw,ph); ctx.restore();
  } else { ctx.fillStyle="#6b4f3a"; ctx.fillRect(px,py,pw,ph); }
  if (otherWorld.exitRect && exitImg.complete && exitImg.naturalWidth>0){
    ctx.drawImage(exitImg, otherWorld.exitRect.x-cameraX, otherWorld.exitRect.y-cameraY, otherWorld.exitRect.w, otherWorld.exitRect.h);
  }
}

// ================== Congelar/Restaurar overworld ==================
function backupBlockedTiles(){
  if (typeof blockedTiles!=="undefined" && blockedTiles) blockedTilesOverworldBackup = new Set(blockedTiles);
}
function restoreBlockedTiles(){
  if (!blockedTilesOverworldBackup || typeof blockedTiles==="undefined" || !blockedTiles) return;
  blockedTiles.clear(); for (const k of blockedTilesOverworldBackup) blockedTiles.add(k);
}

// ================== Interior: sala y portal ==================
function buildInteriorRoom(){
  const ROOM_W = 14, ROOM_H = 10;
  const c0 = Math.floor(MAP_COLS/2) - Math.floor(ROOM_W/2);
  const r0 = Math.floor(MAP_ROWS/2) - Math.floor(ROOM_H/2);

  otherWorld.room = { c0, r0, w: ROOM_W, h: ROOM_H };
  otherWorld.portalC = c0 + Math.floor(ROOM_W/2);
  otherWorld.portalR = r0;
  otherWorld.exitRect = { x: otherWorld.portalC*tileSize, y: otherWorld.portalR*tileSize, w: tileSize, h: tileSize };

  if (typeof blockedTiles!=="undefined" && blockedTiles){
    blockedTiles.clear();
    for (let c=0;c<MAP_COLS;c++){
      for (let r=0;r<MAP_ROWS;r++){
        const inside = (c>=c0 && c<c0+ROOM_W && r>=r0 && r<r0+ROOM_H);
        if (!inside) blockedTiles.add(`${c},${r}`);
      }
    }
  }
}

function enterMap(name){
  if (name === "overworld"){
    restoreBlockedTiles();
    otherWorld.room = null;
    window.currentMap = "overworld";
    return;
  }
  buildInteriorRoom();
  window.currentMap = "other";
}

// ================== Transiciones ==================
function checkTransitions(){
  if (transitionLock > 0) return;
  if (window.currentMap !== "overworld") return;

  const center = (typeof pokeCenter!=="undefined") ? pokeCenter : null;
  const mart   = (typeof pokeMart!=="undefined")   ? pokeMart   : null;
  const next = nextTileFromPlayer();

  function tryEnter(b){
    if (!b || !next) return false;
    if (tileInsideBuilding(next.c, next.r, b)){
      lastDoor = { c: clamp(next.c, b.c, b.c+b.bw-1), r: b.r + b.bh - 1 };
      enterMap("other");
      player.x = otherWorld.portalC * tileSize;
      player.y = (otherWorld.portalR + 1) * tileSize;
      player.targetX = player.x; player.targetY = player.y; player.moving = false;
      player.activeDir = null;
      updateCamera();
      transitionLock = 18;
      return true;
    }
    return false;
  }

  if (tryEnter(center)) return;
  if (tryEnter(mart))   return;
}

// ================== Colección de Pokéballs ==================
function checkPokeballPickup(){
  if (window.currentMap !== "overworld") return;

  if (typeof pokeballs === "undefined" || !Array.isArray(pokeballs) || pokeballs.length === 0) return;

  const feet = playerFeetRect();
  for (let i = pokeballs.length - 1; i >= 0; i--){
    const p = pokeballs[i];
    const ballRect = { x: p.c * tileSize, y: p.r * tileSize, w: tileSize, h: tileSize };
    if (rectsOverlap(feet, ballRect)){
      pokeballs.splice(i, 1);
      pokeballsCollected = Math.min(pokeballsCollected + 1, pokeballsTotal);
    }
  }
}

// ================== Colisión Pikachu => Reset ==================
function getPikachuRect(p){
  const img = pikaFrames[p.frame];
  let h = PIKA_HEIGHT;
  let w = h;
  if (img.complete && img.naturalWidth>0 && img.naturalHeight>0){
    w = Math.max(1, Math.floor(h * (img.naturalWidth / img.naturalHeight)));
  }
  return { x: p.x, y: p.y - (h - tileSize), w, h };
}

function resetGame(){
  // volver al overworld y restaurar colisiones
  enterMap("overworld");
  // reiniciar coleccionables y NPCs
  pokeballsCollected = 0;
  if (typeof initPokeballs === "function") initPokeballs(pokeballsTotal);
  initPikachus();
  // reposicionar jugador
  if (typeof centerPlayer === "function") centerPlayer();
  updateCamera();
  transitionLock = 12;
}

function checkPikachuCollision(){
  if (window.currentMap !== "overworld") return;
  const pRect = playerBodyRect();
  for (const npc of pikachus){
    const r = getPikachuRect(npc);
    if (rectsOverlap(pRect, r)){
      resetGame();
      return;
    }
  }
}

// ================== Bucle ==================
function update(){
  if (window.currentMap === "overworld"){
    updatePikachus();
    checkPikachusAlive = true;
    checkPokeballPickup();
    checkPikachuCollision(); // <- reinicia si te toca
  }

  call("updatePlayer");
  updateCamera();

  if (window.currentMap === "other" && transitionLock === 0){
    const feet = playerFeetRect();
    const ex = otherWorld.exitRect;
    if (ex && feet.x < ex.x + ex.w && feet.x + feet.w > ex.x && feet.y < ex.y + ex.h && feet.y + feet.h > ex.y){
      enterMap("overworld");
      const doorC = lastDoor ? lastDoor.c : Math.floor(MAP_COLS/2);
      const doorROut = (lastDoor ? lastDoor.r : Math.floor(MAP_ROWS/2)) + 1;
      player.x = doorC*tileSize; player.y = (doorROut+0)*tileSize;
      player.targetX = player.x; player.targetY = player.y; player.moving = false;
      player.activeDir = null;
      updateCamera();
      transitionLock = 18;
    }
  }

  checkTransitions();

  if (transitionLock > 0) transitionLock--;
}

function draw(){
  if (window.currentMap === "overworld"){
    drawBackgroundOverworld();
    call("drawLake");
    call("drawRoute");
    call("drawTrees");
    call("drawTallGrassBelow");
    call("drawPokeballs");
    call("drawPokemonCenter");
    call("drawPokemonMart");
    drawPikachus();           // NPCs antes del jugador
    call("drawPlayer", ctx);
    call("drawTallGrassAbove");
  } else {
    drawBackgroundOther();
    drawOtherWorld();
    call("drawPlayer", ctx);
  }

  // HUD siempre visible
  drawHUD();
}

function loop(){ try{update();}catch(e){} try{draw();}catch(e){} requestAnimationFrame(loop); }

// ================== Inicio ==================
function start(){
  window.canvas = document.getElementById("game");
  window.ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  resizeCanvas();
  call("initRoute");
  call("initPokemonCenter");
  call("initPokemonMart");
  call("connectBuildingsToRoute");
  call("initLake");
  call("initTrees");
  call("initTallGrass");
  pokeballsCollected = 0;
  pokeballsTotal = 10;
  call("initPokeballs", pokeballsTotal); // 10 pokéballs
  initPikachus();
  call("centerPlayer");
  backupBlockedTiles();

  loop();
}
window.onload = start;
