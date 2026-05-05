(function setupControls(){
  // D-Pad táctil
  const dpad = document.getElementById("dpad");
  if (dpad){
    const press = (dir) => window.pushDir && window.pushDir(dir);
    const release = (dir) => window.releaseDir && window.releaseDir(dir);

    const bind = (btn) => {
      const dir = btn.getAttribute("data-dir");
      btn.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        btn.setPointerCapture(e.pointerId);
        press(dir);
      });
      const up = (e) => { if (e) e.preventDefault(); release(dir); };
      btn.addEventListener("pointerup", up);
      btn.addEventListener("pointercancel", up);
      btn.addEventListener("lostpointercapture", up);
      btn.addEventListener("pointerleave", up);
    };

    dpad.querySelectorAll("button[data-dir]").forEach(bind);
  }

  // Botón RUN táctil
  const runBtn = document.getElementById("btn-run");
  if (runBtn){
    const setRun = (on) => { if (window.player) window.player.run = !!on; };
    const down = (e) => {
      e.preventDefault();
      runBtn.setPointerCapture(e.pointerId);
      setRun(true);
      runBtn.setAttribute("aria-pressed","true");
    };
    const up = (e) => {
      if (e) e.preventDefault();
      setRun(false);
      runBtn.setAttribute("aria-pressed","false");
    };
    runBtn.addEventListener("pointerdown", down);
    runBtn.addEventListener("pointerup",   up);
    runBtn.addEventListener("pointercancel", up);
    runBtn.addEventListener("lostpointercapture", up);
    runBtn.addEventListener("pointerleave", up);
  }
})();
