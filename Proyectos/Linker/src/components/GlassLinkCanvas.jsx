import React, { useEffect, useRef } from "react";

/**
 * Interactivas: profile + redes (drag/click). Fills: decorativas y empujables.
 * - Sombra estable.
 * - Aro único con degradado invertido (empieza suave y termina fuerte), rotación lenta y fade rápido.
 * - Escalado responsive sutil de esferas, logos y perfil.
 * - Fills pequeñas y discretas.
 */
export default function GlassLinkCanvas({
  background = "#FFE7C8",
  nodes = [],
  autoFills = 14,
}) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  const imgs = useRef({});
  const balls = useRef([]);
  const drag = useRef(null);
  const pointer = useRef({ x: -9999, y: -9999 });
  const clickMem = useRef({ t: 0, x: 0, y: 0 });

  // FX aro
  const ringFX = useRef(new Map()); // id -> {phase, alpha}
  const prevHoverId = useRef(null);

  const loadImage = (src) =>
    new Promise((res, rej) => {
      if (!src) return res(null);
      const im = new Image();
      im.onload = () => res(im);
      im.onerror = () => rej(new Error("No se pudo cargar: " + src));
      im.src = src;
    });

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv.getContext("2d");
    ctxRef.current = ctx;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      cv.width = Math.floor(w * DPR);
      cv.height = Math.floor(h * DPR);
      cv.style.width = w + "px";
      cv.style.height = h + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      placeInitialPositions(true);
    };

    const uiRects = () => {
      const W = cv.clientWidth, H = cv.clientHeight;
      const tEl = document.querySelector(".title");
      const sEl = document.querySelector(".subtitle");
      const t = tEl?.getBoundingClientRect() ?? { x: W/2-100, width: 200, top: H/2, bottom: H/2 };
      const s = sEl?.getBoundingClientRect() ?? { x: W/2-100, width: 200, top: H/2+24, bottom: H/2+40 };
      const centerX = t.x + t.width / 2;
      return { W, H, t, s, centerX };
    };

    const placeInitialPositions = (onlyUnset=false) => {
      const { W, H, t, s, centerX } = uiRects();

      // perfil sobre el título
      const pIdx = balls.current.findIndex(b => b.id === "profile");
      if (pIdx >= 0) {
        const b = balls.current[pIdx];
        const nx = centerX;
        const ny = Math.max(80, t.top - b.r - 24);
        if (!onlyUnset || b.x === undefined) { b.x = nx; b.y = ny; }
      }

      // redes en fila bajo subtítulo
      const row = balls.current.filter(b => b.interactive && b.id !== "profile" && !b.isFill);
      const gap = 28;
      const totalWidth = row.reduce((sum, b, i) => sum + (i ? gap : 0) + b.r * 2, 0);
      let startX = centerX - totalWidth / 2;
      const rowY = s.bottom + 72;
      for (const b of row) {
        const nx = startX + b.r, ny = rowY;
        if (!onlyUnset || b.x === undefined) { b.x = nx; b.y = ny; }
        startX += b.r * 2 + gap;
      }

      // fills aleatorios fuera del bloque central
      const margin = 24;
      const forbidden = {
        x: Math.min(t.x, s.x) - margin,
        y: Math.min(t.top, s.top) - margin,
        w: Math.max(t.x + t.width, s.x + s.width) - Math.min(t.x, s.x) + margin * 2,
        h: (s.bottom - t.top) + margin * 2,
      };
      for (const b of balls.current.filter(x => x.isFill)) {
        if (onlyUnset && b.x !== undefined) continue;
        let tries = 40;
        while (tries--) {
          const nx = Math.random() * (W - b.r * 2) + b.r;
          const ny = Math.random() * (H - b.r * 2) + b.r;
          const inside =
            nx > forbidden.x && nx < forbidden.x + forbidden.w &&
            ny > forbidden.y && ny < forbidden.y + forbidden.h;
          if (!inside) { b.x = nx; b.y = ny; break; }
        }
        if (b.x === undefined) { b.x = Math.random() * W; b.y = Math.random() * H; }
      }
    };

    // escala responsive sutil (más reducción en móvil)
    const viewScale = () => {
      const w = canvasRef.current.clientWidth || 1200;
      // 320px -> 0.82, 768px -> 0.92, 1280px -> 1.00
      if (w <= 320) return 0.82;
      if (w <= 768) return 0.82 + (w - 320) * (0.10 / 448);
      if (w >= 1280) return 1.0;
      return 0.92 + (w - 768) * (0.08 / 512);
    };

    const step = (dt) => {
      const arr = balls.current;
      const W = cv.clientWidth, H = cv.clientHeight;
      const s = viewScale();

      // radios según responsive (fills aún más pequeñas)
      for (const b of arr) b.r = b.r0 * (b.isFill ? s * 0.85 : s);

      for (const b of arr) {
        if (drag.current?.id === b.id) {
          b.vx = (pointer.current.x - b.x) * 0.25;
          b.vy = (pointer.current.y - b.y) * 0.25;
          b.x = pointer.current.x;
          b.y = pointer.current.y;
        } else {
          b.x += (b.vx || 0) * dt * 0.06;
          b.y += (b.vy || 0) * dt * 0.06;
          if (b.interactive) {
            b.vx = (b.vx || 0) * 0.993 + (Math.random() - 0.5) * 0.002;
            b.vy = (b.vy || 0) * 0.993 + (Math.random() - 0.5) * 0.002;
          } else {
            b.vx = (b.vx || 0) * 0.997;
            b.vy = (b.vy || 0) * 0.997;
          }
        }

        // paredes
        if (b.x - b.r < 0) { b.x = b.r; b.vx = Math.abs(b.vx || 0); }
        if (b.x + b.r > W) { b.x = W - b.r; b.vx = -Math.abs(b.vx || 0); }
        if (b.y - b.r < 0) { b.y = b.r; b.vy = Math.abs(b.vy || 0); }
        if (b.y + b.r > H) { b.y = H - b.r; b.vy = -Math.abs(b.vy || 0); }
      }

      // colisiones
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          const A = arr[i], B = arr[j];
          const dx = B.x - A.x, dy = B.y - A.y;
          const d2 = dx*dx + dy*dy, R = A.r + B.r;
          if (d2 > 0 && d2 < R*R) {
            const d = Math.sqrt(d2) || 0.0001, nx = dx/d, ny = dy/d;
            const overlap = R - d;
            const mA = A.mass, mB = B.mass, tot = mA + mB;
            A.x -= nx * overlap * (mB/tot); A.y -= ny * overlap * (mB/tot);
            B.x += nx * overlap * (mA/tot); B.y += ny * overlap * (mA/tot);
            const va = (A.vx||0)*nx + (A.vy||0)*ny;
            const vb = (B.vx||0)*nx + (B.vy||0)*ny;
            const dA = vb - va, dB = va - vb;
            A.vx = (A.vx||0) + dA*nx; A.vy = (A.vy||0) + dA*ny;
            B.vx = (B.vx||0) + dB*nx; B.vy = (B.vy||0) + dB*ny;
          }
        }
      }

      // hover y aro
      const hid = hoverId();
      const activeId = drag.current?.id || null;

      if (hid && prevHoverId.current !== hid) {
        ringFX.current.set(hid, { phase: 0, alpha: 0.06 });
      }
      prevHoverId.current = hid || null;

      for (const [id, fx] of Array.from(ringFX.current.entries())) {
        const isTarget = id === activeId || id === hid;
        fx.phase += dt * 0.0012;          // rotación lenta
        if (isTarget) {
          fx.alpha = Math.min(1, fx.alpha + dt * 0.009); // entra rápido
        } else {
          fx.alpha *= 0.88;               // se va rápido
          if (fx.alpha < 0.03) ringFX.current.delete(id);
        }
      }
    };

    const isInsideInteractive = (p, b) => {
      if (!b.interactive) return false;
      const dx = p.x - b.x, dy = p.y - b.y;
      return dx*dx + dy*dy <= b.r*b.r;
    };

    const hoverId = () => {
      for (let i = balls.current.length - 1; i >= 0; i--) {
        const b = balls.current[i];
        if (isInsideInteractive(pointer.current, b)) return b.id;
      }
      return null;
    };

    // dibujo
    const drawBall = (b) => {
      const ctx = ctxRef.current;
      const img = imgs.current[b.id];
      const r = b.r;

      // sombra estable
      ctx.save();
      ctx.filter = "blur(10px)";
      ctx.globalAlpha = 0.14 * (b.isFill ? 0.35 : 1);
      ctx.beginPath();
      ctx.ellipse(b.x, b.y + r * 0.55, r * 0.9, r * 0.34, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();
      ctx.restore();

      // esfera
      ctx.save();
      ctx.beginPath();
      ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = "rgba(255,255,255,0.16)";
      ctx.fillRect(b.x - r, b.y - r, r * 2, r * 2);

      const vign = ctx.createRadialGradient(b.x, b.y, r * 0.25, b.x, b.y, r);
      vign.addColorStop(0, "rgba(0,0,0,0.00)");
      vign.addColorStop(1, "rgba(0,0,0,0.10)");
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = vign;
      ctx.fillRect(b.x - r, b.y - r, r * 2, r * 2);

      // icono/foto responsive
      if (img) {
        const shrink = Math.min(1, r / (b.r0 || r));
        const iconK = 0.68 - (1 - shrink) * 0.06;
        const maxSide = r * 2 * iconK;
        const iw = img.naturalWidth || img.width;
        const ih = img.naturalHeight || img.height;
        const s = Math.min(maxSide / iw, maxSide / ih);
        const dw = iw * s, dh = ih * s;

        ctx.globalCompositeOperation = "source-over";
        if (b.id === "profile") {
          ctx.save();
          ctx.beginPath();
          ctx.arc(b.x, b.y, Math.min(dw, dh) / 2, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(img, b.x - dw / 2, b.y - dh / 2, dw, dh);
          ctx.restore();
        } else {
          ctx.drawImage(img, b.x - dw / 2, b.y - dh / 2, dw, dh);
        }
      }
      ctx.restore();

      // --- ARO "snake" INVERTIDO: empieza suave y termina fuerte ---
      const fx = ringFX.current.get(b.id);
      if (fx) {
        const ctx2 = ctxRef.current;
        const gap = Math.max(6, r * 0.12);
        const R = r + gap;
        const span = Math.PI * 1.75; // longitud
        const segs = 72;

        // grosor sutil; perfil más fino
        const baseLW = Math.max(1.5, r * 0.045);
        const lw = b.id === "profile" ? baseLW * 0.8 : baseLW;

        ctx2.lineCap = "round";
        for (let k = 0; k < segs; k++) {
          const a0 = fx.phase + (k / segs) * span;
          const a1 = fx.phase + ((k + 1) / segs) * span;
          const fade = k / segs; // 0->suave, 1->fuerte

          ctx2.save();
          ctx2.globalAlpha = fx.alpha * (0.25 + 0.75 * fade);
          ctx2.lineWidth = lw;
          ctx2.strokeStyle = "rgba(51,51,51,1)";
          ctx2.beginPath();
          ctx2.arc(b.x, b.y, R, a0, a1);
          ctx2.stroke();
          ctx2.restore();
        }
      }
    };

    const draw = () => {
      const ctx = ctxRef.current;
      const w = cv.clientWidth, h = cv.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, w, h);

      const activeId = drag.current?.id || null;
      const hid = hoverId();

      if (activeId && !ringFX.current.has(activeId)) {
        ringFX.current.set(activeId, { phase: 0, alpha: 0.9 });
      }
      if (hid && !ringFX.current.has(hid)) {
        ringFX.current.set(hid, { phase: 0, alpha: 0.06 });
      }

      for (const b of balls.current) drawBall(b);
      canvasRef.current.style.cursor = (hid || activeId) ? "pointer" : "default";
    };

    // input
    const toPoint = (ev) =>
      ev.touches?.[0]
        ? { x: ev.touches[0].clientX, y: ev.touches[0].clientY }
        : { x: ev.clientX, y: ev.clientY };

    const bringToFront = (idx) => {
      const b = balls.current[idx];
      balls.current.splice(idx, 1);
      balls.current.push(b);
    };

    const down = (ev) => {
      const p = toPoint(ev); pointer.current = p;
      for (let i = balls.current.length - 1; i >= 0; i--) {
        const b = balls.current[i];
        if (!b.interactive) continue;
        const dx = p.x - b.x, dy = p.y - b.y;
        if (dx*dx + dy*dy <= b.r*b.r) {
          drag.current = { id: b.id };
          clickMem.current = { t: performance.now(), x: p.x, y: p.y };
          ringFX.current.set(b.id, { phase: 0, alpha: 0.95 });
          bringToFront(i);
          ev.preventDefault();
          return;
        }
      }
    };

    const move = (ev) => { pointer.current = toPoint(ev); };

    const up = () => {
      const d = drag.current; drag.current = null;
      if (!d) return;
      const b = balls.current.find(x => x.id === d.id);
      if (!b) return;
      const t = performance.now() - clickMem.current.t;
      const moved = Math.hypot(pointer.current.x - clickMem.current.x, pointer.current.y - clickMem.current.y);
      if (b.url && t < 220 && moved < 5) window.open(b.url, "_blank", "noopener,noreferrer");
    };

    // init
    let mounted = true;
    let raf = 0;
    resize();

    (async () => {
      const settled = await Promise.allSettled(
        nodes.map((n) => loadImage(n.img).then((im) => [n.id, im]))
      );
      if (!mounted) return;
      imgs.current = Object.fromEntries(settled.filter(e => e.status === "fulfilled").map(e => e.value));

      // bolas base
      balls.current = nodes.map((n) => {
        const isFill = n.id?.startsWith("fill");
        const interactive = !isFill && (!!n.url || n.id === "profile" || !!n.img);
        const r0 = isFill ? Math.max(5, Math.min(14, (n.r ?? 12))) : (n.r ?? 48);
        return {
          id: n.id,
          isFill,
          interactive,
          x: undefined, y: undefined,
          vx: (Math.random() - 0.5) * (interactive ? 0.18 : 0.08),
          vy: (Math.random() - 0.5) * (interactive ? 0.18 : 0.08),
          r0, r: r0,
          url: n.url || null,
          mass: isFill ? 0.3 : (n.heavy ? 2 : 1),
        };
      });

      // auto-fills extra
      for (let i = 0; i < autoFills; i++) {
        const r0 = Math.floor(5 + Math.random() * 11); // 5–16
        balls.current.push({
          id: `fill_auto_${i}`,
          isFill: true,
          interactive: false,
          x: undefined, y: undefined,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          r0, r: r0,
          url: null,
          mass: 0.3 + r0 / 80,
        });
      }

      placeInitialPositions(false);

      let last = performance.now();
      const loop = () => {
        const now = performance.now();
        const dt = Math.min(32, now - last);
        last = now;
        step(dt);
        draw();
        raf = requestAnimationFrame(loop);
      };
      loop();
    })();

    // listeners
    window.addEventListener("resize", resize, { passive: true });
    cv.addEventListener("mousedown", down);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    cv.addEventListener("touchstart", down, { passive: false });
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", up);

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      cv.removeEventListener("mousedown", down);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      cv.removeEventListener("touchstart", down);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, [nodes, background, autoFills]);

  return (
    <div className="canvas-wrap" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
