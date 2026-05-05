function drawGlitchEffect(x, y) {
  for (let i = 0; i < 3; i++) {
    const dx = (Math.random() - 0.5) * 4;
    const dy = (Math.random() - 0.5) * 4;
    ctx.globalAlpha = 0.5 + Math.random() * 0.5;
    ctx.drawImage(tallGrassImg, x + dx, y + dy, tileSize, tileSize);
  }
  ctx.globalAlpha = 1;
}
