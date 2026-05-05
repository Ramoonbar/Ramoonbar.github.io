import React, { useState, useRef } from "react";
import { news } from "./newsData";

const DUR_SWIPE = 380;   
const DUR_CLICK = 600;   
const EASE = "cubic-bezier(.22,.8,.2,1)";

export default function App() {
  const [idx, setIdx] = useState(0);

  const [currX, setCurrX] = useState(0);
  const [nextX, setNextX] = useState(0);
  const [currY, setCurrY] = useState(0);
  const [nextY, setNextY] = useState(0);
  
  const [tCurOn, setTCurOn] = useState(false);
  const [tNextOn, setTNextOn] = useState(false);

  const [dragging, setDragging] = useState(false);
  const [dir, setDir] = useState(0);      // -1 retrocede, 1 avanza
  const [axis, setAxis] = useState("x"); 
  const [animDur, setAnimDur] = useState(DUR_SWIPE);

  const startX = useRef(0);
  const startY = useRef(0);
  const timer = useRef(null);

  const W = () => window.innerWidth;
  const H = () => window.innerHeight;
  const nextIndex = (i, d) => (d === 1 ? (i + 1) % news.length : (i - 1 + news.length) % news.length);
  const clearT = () => { if (timer.current) { clearTimeout(timer.current); timer.current = null; } };

  const commit = (d, duration, fromClick, finalAxis) => {
    clearT();
    setAnimDur(duration);
    setDir(d);
    
    setTCurOn(false); setTNextOn(false);
    
    const sizeW = W();
    const sizeH = H();
    
    if (fromClick) {
      setCurrX(0); setCurrY(0);
      setNextX(d * sizeW); setNextY(0);
      finalAxis = "x";
    }

    requestAnimationFrame(() => {
      setTCurOn(true); setTNextOn(true);
      if (finalAxis === "x") {
        setCurrX(d === 1 ? -sizeW : sizeW);
        setCurrY(0);
        setNextX(0);
        setNextY(0);
      } else {
        setCurrY(d === 1 ? -sizeH : sizeH);
        setCurrX(0);
        setNextY(0);
        setNextX(0);
      }
    });

    timer.current = setTimeout(() => {
      setIdx(i => nextIndex(i, d));
      setTCurOn(false); setTNextOn(false);
      setCurrX(0); setNextX(0); setCurrY(0); setNextY(0); setDir(0);
    }, duration + 20);
  };

  const cancel = () => {
    clearT();
    setAnimDur(DUR_SWIPE);
    setTCurOn(true); setTNextOn(true);
    setCurrX(0); setCurrY(0);
    setNextX(axis === "x" ? (dir * W()) : 0);
    setNextY(axis === "y" ? (dir * H()) : 0);
    
    timer.current = setTimeout(() => {
      setTCurOn(false); setTNextOn(false);
      setCurrX(0); setNextX(0); setCurrY(0); setNextY(0); setDir(0);
    }, DUR_SWIPE + 20);
  };

  const onPointerDown = (e) => {
    if (e.target.closest?.("a")) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDragging(true);
    startX.current = e.clientX ?? 0;
    startY.current = e.clientY ?? 0;
    setTCurOn(false); setTNextOn(false);
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    const dx = (e.clientX ?? 0) - startX.current;
    const dy = (e.clientY ?? 0) - startY.current;
    
    setCurrX(dx);
    setCurrY(dy);

    const currentAxis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    setAxis(currentAxis);
    
    const d = currentAxis === "x" ? (dx < 0 ? 1 : -1) : (dy < 0 ? 1 : -1);
    setDir(d);

    if (currentAxis === "x") {
      setNextX(d * W() + dx);
      setNextY(dy);
    } else {
      setNextY(d * H() + dy);
      setNextX(dx);
    }
  };

  const onPointerUp = (e) => {
    if (e.target.closest?.("a")) { setDragging(false); return; }
    setDragging(false);

    if (Math.abs(currX) <= 5 && Math.abs(currY) <= 5) {
      commit((e.clientX ?? 0) > window.innerWidth / 2 ? 1 : -1, DUR_CLICK, true, "x");
      return;
    }

    const size = axis === "x" ? W() : H();
    const delta = axis === "x" ? currX : currY;
    const thr = Math.max(60, size * 0.15);
    
    Math.abs(delta) >= thr ? commit(delta < 0 ? 1 : -1, DUR_SWIPE, false, axis) : cancel();
  };

  const current = news[idx];
  const incomingIdx = nextIndex(idx, dir || 1);
  const incoming = news[incomingIdx];

  const tCur = {
    transform: `translate3d(${currX}px, ${currY}px, 0)`,
    transition: tCurOn ? `transform ${animDur}ms ${EASE}` : "none",
    zIndex: 2,
  };
  const tNext = {
    transform: `translate3d(${nextX}px, ${nextY}px, 0)`,
    transition: tNextOn ? `transform ${animDur}ms ${EASE}` : "none",
    zIndex: 1,
  };

  return (
    <div
      className="stage"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="application"
      aria-label="Noticias deslizables"
      style={{ touchAction: "none" }}
    >
      <div className="smoke" aria-hidden />
      <div className="frame">
        <article className="card ghost" style={tNext}>
          <header className="source">
            <a href={incoming.url} target="_blank" rel="noreferrer">{incoming.source}</a>
          </header>
          <div className="content">
            <h1 className="headline">{incoming.title}</h1>
            <p className="summary">{incoming.summary}</p>
          </div>
          <footer className="meta">
            <span>{incomingIdx + 1} / {news.length}</span>
            <span className="hint">desliza en cualquier dirección</span>
          </footer>
        </article>

        <article className="card current" style={tCur}>
          <header className="source">
            <a href={current.url} target="_blank" rel="noreferrer">{current.source}</a>
          </header>
          <div className="content">
            <h1 className="headline">{current.title}</h1>
            <p className="summary">{current.summary}</p>
          </div>
          <footer className="meta">
            <span>{idx + 1} / {news.length}</span>
            <span className="hint">desliza en cualquier dirección</span>
          </footer>
        </article>
      </div>
    </div>
  );
}
