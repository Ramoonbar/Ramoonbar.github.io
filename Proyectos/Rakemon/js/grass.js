// ================== TEXTURAS ==================
const tallGrassImg = new Image();
tallGrassImg.src = "assets/images/tall-grass.png";

const routeImg = new Image();
routeImg.src = "assets/images/grass-template-route.png";

const treeImg = new Image();
treeImg.src = "assets/images/tree-grass.png";

const pokeCenterImg = new Image();
pokeCenterImg.src = "assets/images/pokemon-center.png";

const pokeMartImg = new Image();
pokeMartImg.src = "assets/images/pokemon-mart.png";

const pokeballImg = new Image();
pokeballImg.src = "assets/images/pokeball-01.png";

const waterImg = new Image();
waterImg.src = "assets/images/wather-template.png";

// ================== ESTADOS ==================
let tallGrassTiles = [];
let routeTiles     = [];
let routeSet       = new Set();
let treeBlocks     = []; // bloques 2x2
let pokeballs      = []; // {x,y,c,r}

let lakeTiles = [];
let lakeSet   = new Set();

// Cruz principal
let routeC0 = 0;
let routeR0 = 0;
let routePathW = 2;

// Edificios
let pokeCenter = null;   // {c,r,bw,bh,x,y,doorOffsetC?}
let pokeMart   = null;   // {c,r,bw,bh,x,y,doorOffsetC?}

// ================== HELPERS ==================
function inView(x,y,w=tileSize,h=tileSize){
  const { w:vw, h:vh } = cssViewport();
  return !(x+w<0 || x>vw || y+h<0 || y>vh);
}
function K(c,r){ return `${c},${r}`; }
function isRouteCR(c, r){ return routeSet.has(K(c,r)); }
function isLakeCR(c, r){ return lakeSet.has(K(c,r)); }

function freeTile(c,r){
  if (c<0||r<0||c>=MAP_COLS||r>=MAP_ROWS) return false;
  const k = K(c,r);
  if (isLakeCR(c,r)) return false;
  if (blockedTiles.has(k)) return false; // árboles/edificios/perímetro
  return true;
}
function lineClearRow(r, c1, c2){
  const a = Math.min(c1,c2), b = Math.max(c1,c2);
  for (let c=a; c<=b; c++){
    if (!freeTile(c,r)) return false;
  }
  return true;
}
function lineClearCol(c, r1, r2){
  const a = Math.min(r1,r2), b = Math.max(r1,r2);
  for (let r=a; r<=b; r++){
    if (!freeTile(c,r)) return false;
  }
  return true;
}

// Evitar route dentro de edificios/lago/bloqueos
function addRouteCR(c,r){
  if (c<0||r<0||c>=MAP_COLS||r>=MAP_ROWS) return;

  if (pokeCenter &&
      c >= pokeCenter.c && c < pokeCenter.c+pokeCenter.bw &&
      r >= pokeCenter.r && r < pokeCenter.r+pokeCenter.bh) return;

  if (pokeMart &&
      c >= pokeMart.c && c < pokeMart.c+pokeMart.bw &&
      r >= pokeMart.r && r < pokeMart.r+pokeMart.bh) return;

  if (isLakeCR(c,r)) return;

  const k = K(c,r);
  if (blockedTiles.has(k)) return;

  if (!routeSet.has(k)){
    routeSet.add(k);
    routeTiles.push({ x:c*tileSize, y:r*tileSize });
  }
}
function carveLineH(r, c1, c2){
  const a = Math.min(c1,c2), b = Math.max(c1,c2);
  for (let c=a; c<=b; c++){
    for (let w=0; w<routePathW; w++){
      addRouteCR(c, r + w - Math.floor(routePathW/2));
    }
  }
}
function carveLineV(c, r1, r2){
  const a = Math.min(r1,r2), b = Math.max(r1,r2);
  for (let r=a; r<=b; r++){
    for (let w=0; w<routePathW; w++){
      addRouteCR(c + w - Math.floor(routePathW/2), r);
    }
  }
}

// =====================================================
//                      RUTA EN CRUZ
// =====================================================
function initRoute(){
  routeTiles = []; routeSet.clear();

  const cols = MAP_COLS, rows = MAP_ROWS;
  routeC0 = Math.floor(cols/2);
  routeR0 = Math.floor(rows/2);
  routePathW = 2;

  for (let r=0; r<rows; r++) carveLineV(routeC0, r, r);
  for (let c=0; c<cols; c++) carveLineH(routeR0, c, c);
}

function drawRoute(){
  if (!routeImg.complete || routeImg.naturalWidth===0) return;

  for (const t of routeTiles){
    const x = t.x - cameraX, y = t.y - cameraY;
    if (!inView(x,y)) continue;
    ctx.drawImage(routeImg, x, y, tileSize, tileSize);
  }

  // Extensión visual fuera del mapa
  const { w:vw, h:vh } = cssViewport();

  // vertical
  const vx = routeC0 * tileSize - cameraX;
  for (let i=1; i<=6; i++){
    const uy = -i*tileSize;
    if (vx < vw && vx + tileSize > 0 && uy < vh)
      ctx.drawImage(routeImg, Math.floor(vx), Math.floor(uy), tileSize, tileSize);
    const dy = (mapHeight - cameraY) + (i-1)*tileSize;
    if (vx < vw && vx + tileSize > 0 && dy > -tileSize)
      ctx.drawImage(routeImg, Math.floor(vx), Math.floor(dy), tileSize, tileSize);
  }
  // horizontal
  const hy = routeR0 * tileSize - cameraY;
  for (let i=1; i<=6; i++){
    const lx = -i*tileSize;
    if (hy < vh && hy + tileSize > 0 && lx < vw)
      ctx.drawImage(routeImg, Math.floor(lx), Math.floor(hy), tileSize, tileSize);
    const rx = (mapWidth - cameraX) + (i-1)*tileSize;
    if (hy < vh && hy + tileSize > 0 && rx > -tileSize)
      ctx.drawImage(routeImg, Math.floor(rx), Math.floor(hy), tileSize, tileSize);
  }
}

// =====================================================
//                          LAGO
// =====================================================
function initLake(){
  lakeTiles = []; lakeSet.clear();

  const c0 = 2, r0 = 2;
  const W  = 16, H = 12;
  const cx = c0 + W/2, cy = r0 + H/2;

  for (let c=c0; c<c0+W; c++){
    for (let r=r0; r<r0+H; r++){
      const dx = (c - cx) / (W*0.55);
      const dy = (r - cy) / (H*0.55);
      const h = (((c*73856093) ^ (r*19349663) ^ seed) >>> 0) % 1000 / 1000;
      const jitter = (h - 0.5) * 0.35;
      const d2 = dx*dx + dy*dy + jitter;
      if (d2 <= 1.0){
        const k = K(c,r);
        lakeSet.add(k);
        lakeTiles.push({ x:c*tileSize, y:r*tileSize });
      }
    }
  }
}

function drawLake(){
  if (!waterImg.complete || waterImg.naturalWidth === 0) return;
  for (const t of lakeTiles){
    const x = t.x - cameraX, y = t.y - cameraY;
    if (!inView(x,y)) continue;
    ctx.drawImage(waterImg, Math.floor(x), Math.floor(y), tileSize, tileSize);
  }
}

// =====================================================
//        ÁRBOLES + BLOQUEOS PERÍMETRO
// =====================================================
function initTrees(){
  treeBlocks = [];
  blockedTiles.clear();

  // reservar lago
  for (const kk of lakeSet) blockedTiles.add(kk);

  const cols = MAP_COLS, rows = MAP_ROWS;

  function addBlock(c, r){
    for (let dc=0; dc<2; dc++){
      for (let dr=0; dr<2; dr++){
        const kk = K(c+dc,r+dr);
        if (isLakeCR(c+dc, r+dr)) continue;
        blockedTiles.add(kk);
      }
    }
    treeBlocks.push({ c, r });
  }

  function blockOverlapsForbidden(c, r){
    for (let dc=0; dc<2; dc++){
      for (let dr=0; dr<2; dr++){
        const cc=c+dc, rr=r+dr;
        if (isRouteCR(cc,rr) || isLakeCR(cc,rr)) return true;
      }
    }
    return false;
  }

  // Perímetro sin cruz ni lago
  for (let c=0; c<cols; c+=2){
    if (!blockOverlapsForbidden(c,0)) addBlock(c,0);
    if (!blockOverlapsForbidden(c,rows-2)) addBlock(c,rows-2);
  }
  for (let r=0; r<rows; r+=2){
    if (!blockOverlapsForbidden(0,r)) addBlock(0,r);
    if (!blockOverlapsForbidden(cols-2,r)) addBlock(cols-2,r);
  }

  // Más árboles interiores
  function areaFree2x2(c, r){
    if (c < 1 || r < 1 || c+1 >= cols-1 || r+1 >= rows-1) return false;
    for (let dc=0; dc<2; dc++){
      for (let dr=0; dr<2; dr++){
        const cc=c+dc, rr=r+dr;
        if (isRouteCR(cc, rr) || isLakeCR(cc, rr) || blockedTiles.has(K(cc,rr))) return false;
      }
    }
    const overlapWith = (b) => b &&
      !(c+1 < b.c || c > b.c+b.bw-1 || r+1 < b.r || r > b.r+b.bh-1);
    if (overlapWith(pokeCenter) || overlapWith(pokeMart)) return false;
    return true;
  }

  const CLUSTERS = 16;
  for (let n=0; n<CLUSTERS; n++){
    let c0 = 2 + Math.floor(seededRandom() * (cols - 4));
    let r0 = 2 + Math.floor(seededRandom() * (rows - 4));
    c0 -= c0 % 2; r0 -= r0 % 2;

    const size = 1 + Math.floor(seededRandom()*4);
    let steps = 0;
    while (steps < size){
      if (areaFree2x2(c0, r0)) addBlock(c0, r0);
      const dir = Math.floor(seededRandom()*4);
      const dc = dir===0? 2 : dir===1? -2 : 0;
      const dr = dir===2? 2 : dir===3? -2 : 0;
      const nc = c0 + dc, nr = r0 + dr;
      if (nc>=2 && nr>=2 && nc<=cols-4 && nr<=rows-4){ c0 = nc; r0 = nr; }
      steps++;
    }
  }

  // Bloquear edificios
  if (pokeCenter){
    for (let dc=0; dc<pokeCenter.bw; dc++)
      for (let dr=0; dr<pokeCenter.bh; dr++)
        blockedTiles.add(K(pokeCenter.c+dc, pokeCenter.r+dr));
  }
  if (pokeMart){
    for (let dc=0; dc<pokeMart.bw; dc++)
      for (let dr=0; dr<pokeMart.bh; dr++)
        blockedTiles.add(K(pokeMart.c+dc, pokeMart.r+dr));
  }
}

function drawTrees(){
  if (!treeImg.complete || treeImg.naturalWidth===0) return;
  for (const b of treeBlocks){
    const x = b.c*tileSize - cameraX;
    const y = b.r*tileSize - cameraY;
    if (!inView(x,y, 2*tileSize, 2*tileSize)) continue;
    ctx.drawImage(treeImg, x, y, 2*tileSize, 2*tileSize);
  }
}

// =====================================================
//                    HIERBA ALTA
// =====================================================
function initTallGrass(){
  tallGrassTiles = [];
  const cols = MAP_COLS, rows = MAP_ROWS;

  const occupied = new Set();
  const PATCHES = 22;

  for (let p=0; p<PATCHES; p++){
    const w = 3 + Math.floor(seededRandom() * 5);
    const h = 2 + Math.floor(seededRandom() * 5);
    const c0 = 1 + Math.floor(seededRandom() * (cols - w - 2));
    const r0 = 1 + Math.floor(seededRandom() * (rows - h - 2));

    for (let c=c0; c<c0+w; c++){
      for (let r=r0; r<r0+h; r++){
        const kk = K(c,r);
        if (isRouteCR(c,r) || isLakeCR(c,r) || occupied.has(kk) || blockedTiles.has(kk)) continue;
        occupied.add(kk);
        tallGrassTiles.push({ x:c*tileSize, y:r*tileSize, c, r });
      }
    }

    const extras = 3 + Math.floor(seededRandom() * 5);
    for (let i=0; i<extras; i++){
      const ec = c0 + Math.floor(seededRandom() * w) + (seededRandom() < 0.5 ? -1 : +1);
      const er = r0 + Math.floor(seededRandom() * h) + (seededRandom() < 0.5 ? -1 : +1);
      if (ec<1||er<1||ec>=cols-1||er>=rows-1) continue;
      const kk = K(ec,er);
      if (isRouteCR(ec,er) || isLakeCR(ec,er) || occupied.has(kk) || blockedTiles.has(kk)) continue;
      occupied.add(kk);
      tallGrassTiles.push({ x:ec*tileSize, y:er*tileSize, c:ec, r:er });
    }
  }

  const STRAYS = 80;
  for (let i=0; i<STRAYS; i++){
    const c = Math.floor(seededRandom() * MAP_COLS);
    const r = Math.floor(seededRandom() * MAP_ROWS);
    const kk = K(c,r);
    if (isRouteCR(c,r) || isLakeCR(c,r) || blockedTiles.has(kk)) continue;
    tallGrassTiles.push({ x:c*tileSize, y:r*tileSize, c, r });
  }
}

function drawTallGrassBelow(){
  if (!tallGrassImg.complete || tallGrassImg.naturalWidth===0) return;
  for (const t of tallGrassTiles){
    const x = t.x - cameraX, y = t.y - cameraY;
    if (!inView(x,y)) continue;
    ctx.drawImage(tallGrassImg, x, y, tileSize, tileSize);
  }
}

function drawTallGrassAbove(){
  if (!tallGrassImg.complete || tallGrassImg.naturalWidth===0) return;
  for (const t of tallGrassTiles){
    const coll =
      player.x < t.x + tileSize &&
      player.x + tileSize > t.x &&
      player.y < t.y + tileSize &&
      player.y + tileSize > t.y;
    if (!coll) continue;
    const x = t.x - cameraX, y = t.y - cameraY;
    if (!inView(x,y)) continue;
    drawGlitchEffect(x, y);
  }
}

// =====================================================
//        EDIFICIOS
// =====================================================
function initPokemonCenter(){
  const BW = 4, BH = 4;
  const targetCenterC = Math.floor(MAP_COLS * 0.78);
  const c = clamp(targetCenterC - Math.floor(BW/2), 2, MAP_COLS - BW - 2);
  const r = 2;
  pokeCenter = { c, r, bw: BW, bh: BH, x: c*tileSize, y: r*tileSize, doorOffsetC: 0 };

  for (let dc=0; dc<BW; dc++)
    for (let dr=0; dr<BH; dr++)
      blockedTiles.add(K(c+dc,r+dr));
}

function drawPokemonCenter(){
  if (!pokeCenter || !pokeCenterImg.complete || pokeCenterImg.naturalWidth === 0) return;
  const w = pokeCenter.bw * tileSize, h = pokeCenter.bh * tileSize;
  const x = pokeCenter.x - cameraX, y = pokeCenter.y - cameraY;
  if (!inView(x,y,w,h)) return;
  ctx.drawImage(pokeCenterImg, Math.floor(x), Math.floor(y), w, h);
}

function initPokemonMart(){
  const BW = 5, BH = 4;
  const targetCenterC = Math.floor(MAP_COLS * 0.20);
  const c = clamp(targetCenterC - Math.floor(BW/2), 2, MAP_COLS - BW - 2);
  const r = MAP_ROWS - BH - 6; // subido 1 tile respecto a borde
  pokeMart = { c, r, bw: BW, bh: BH, x: c*tileSize, y: r*tileSize, doorOffsetC: +1 };

  for (let dc=0; dc<BW; dc++)
    for (let dr=0; dr<BH; dr++)
      blockedTiles.add(K(c+dc,r+dr));
}

function drawPokemonMart(){
  if (!pokeMart || !pokeMartImg.complete || pokeMartImg.naturalWidth === 0) return;
  const w = pokeMart.bw * tileSize, h = pokeMart.bh * tileSize;
  const x = pokeMart.x - cameraX, y = pokeMart.y - cameraY;
  if (!inView(x,y,w,h)) return;
  ctx.drawImage(pokeMartImg, Math.floor(x), Math.floor(y), w, h);
}

// Caminos
function connectBuildingsToRoute(){
  if (pokeCenter){
    let doorC = pokeCenter.c + Math.floor(pokeCenter.bw/2) + (pokeCenter.doorOffsetC || 0);
    doorC = clamp(doorC, pokeCenter.c, pokeCenter.c + pokeCenter.bw - 1);
    const startR = pokeCenter.r + pokeCenter.bh;
    carveLineV(doorC, startR, routeR0);
  }
  if (pokeMart){
    const rowUnder = Math.min(pokeMart.r + pokeMart.bh + 1, MAP_ROWS - 1); // bajo 1 tile
    carveLineH(rowUnder, routeC0, 0);
  }
}

// =====================================================
//        POKÉBALLS (10 unidades, accesibles y variadas)
// =====================================================
function initPokeballs(count=10){
  pokeballs = [];
  const placed = [];
  const taken = new Set();
  const minDist2 = 4*4;

  const addBall = (c,r)=>{
    if (!freeTile(c,r)) return false;
    const kk = K(c,r);
    if (taken.has(kk)) return false;
    for (const b of placed){
      const dc = b.c - c, dr = b.r - r;
      if (dc*dc + dr*dr < minDist2) return false;
    }
    taken.add(kk);
    placed.push({c,r});
    pokeballs.push({ x:c*tileSize, y:r*tileSize, c, r });
    return true;
  };

  // 1) Orilla lago con corredor a la cruz
  if (lakeTiles.length){
    let minC=MAP_COLS, maxC=0, minR=MAP_ROWS, maxR=0;
    for (const t of lakeTiles){
      const c=t.x/tileSize, r=t.y/tileSize;
      if (c<minC) minC=c; if (c>maxC) maxC=c;
      if (r<minR) minR=r; if (r>maxR) maxR=r;
    }
    minC=Math.max(1,Math.floor(minC)-2); maxC=Math.min(MAP_COLS-2,Math.ceil(maxC)+2);
    minR=Math.max(1,Math.floor(minR)-2); maxR=Math.min(MAP_ROWS-2,Math.ceil(maxR)+2);

    outer:
    for (let r=minR; r<=maxR; r++){
      for (let c=minC; c<=maxC; c++){
        if (isLakeCR(c,r)) continue;
        const adjWater = (isLakeCR(c+1,r)||isLakeCR(c-1,r)||isLakeCR(c,r+1)||isLakeCR(c,r-1));
        if (!adjWater) continue;
        if (!freeTile(c,r)) continue;
        if (!lineClearRow(r, Math.min(c, routeC0), Math.max(c, routeC0))) continue;
        if (addBall(c,r)) break outer;
      }
    }
  }

  // 2) Dos en tall grass
  let tgPlaced=0, triesTG=0;
  while (tgPlaced<2 && triesTG<600 && tallGrassTiles.length){
    triesTG++;
    const s = tallGrassTiles[Math.floor(seededRandom()*tallGrassTiles.length)];
    if (addBall(s.c, s.r)) tgPlaced++;
  }

  // 3) Dos junto a árboles con salida libre
  let nearTreePlaced=0, triesTree=0;
  const neigh4 = [[1,0],[-1,0],[0,1],[0,-1]];
  while (nearTreePlaced<2 && triesTree<1500){
    triesTree++;
    const c = Math.floor(seededRandom()*MAP_COLS);
    const r = Math.floor(seededRandom()*MAP_ROWS);
    if (!freeTile(c,r)) continue;
    let touchesTree=false;
    for (const [dc,dr] of neigh4){
      const k = K(c+dc,r+dr);
      if (blockedTiles.has(k) && !isLakeCR(c+dc,r+dr)) { touchesTree=true; break; }
    }
    if (!touchesTree) continue;
    if (!(lineClearRow(r, Math.min(c, routeC0), Math.max(c, routeC0)) ||
          lineClearCol(c, Math.min(r, routeR0), Math.max(r, routeR0)))) continue;
    if (addBall(c,r)) nearTreePlaced++;
  }

  // 4) Relleno hasta 'count'
  let triesFill=0;
  while (pokeballs.length < count && triesFill < 3000){
    triesFill++;
    const c = Math.floor(seededRandom()*MAP_COLS);
    const r = Math.floor(seededRandom()*MAP_ROWS);
    addBall(c,r);
  }
}

function drawPokeballs(){
  if (!pokeballImg.complete || pokeballImg.naturalWidth === 0) return;
  const size = Math.floor(tileSize * 0.6);
  const off  = Math.floor((tileSize - size) / 2);
  for (const p of pokeballs){
    const x = p.x - cameraX + off;
    const y = p.y - cameraY + off;
    if (!inView(x-off,y-off,tileSize,tileSize)) continue;
    ctx.drawImage(pokeballImg, x, y, size, size);
  }
}
