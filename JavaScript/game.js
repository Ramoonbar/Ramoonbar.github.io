class ZipGame {
    constructor() {
        this.gridSize = 4;
        this.grid = [];
        this.path = [];
        this.visibleNumbers = [];
        this.currentNumIndex = 0;
        this.maxNum = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.isGameOver = true;
        this.hasStartedOnce = false;

        this.gridElement = document.getElementById('zip-grid');
        this.timerElement = document.getElementById('zip-timer');
        this.overlayElement = document.getElementById('game-overlay');
        this.startOverlay = document.getElementById('game-start-overlay');
        this.scoreElement = document.getElementById('final-score');

        this.isDragging = false;
        this.init();
        this.setupGlobalEvents();
    }

    init() {
        this.generatePuzzle();
        this.render();
    }

    setupGlobalEvents() {
        // Eventos para detectar fin de arrastre fuera del grid
        window.addEventListener('mouseup', () => { this.isDragging = false; });
        window.addEventListener('touchend', () => { this.isDragging = false; });

        // Evento de movimiento táctil global para detectar celdas bajo el dedo
        this.gridElement.addEventListener('touchmove', (e) => {
            if (this.isGameOver) return;
            e.preventDefault(); // Evitar scroll mientras se juega
            const touch = e.touches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            if (element && element.classList.contains('zip-cell')) {
                const r = parseInt(element.dataset.r);
                const c = parseInt(element.dataset.c);
                if (!isNaN(r) && !isNaN(c)) {
                    this.handleCellInteraction(r, c);
                }
            }
        }, { passive: false });
    }

    startGame() {
        this.isGameOver = false;
        this.hasStartedOnce = true;
        this.startOverlay.classList.remove('active');
        this.startTimer();
    }

    generatePuzzle() {
        this.grid = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(0));
        const path = this.findHamiltonianPath();
        this.maxNum = path.length;
        this.visibleNumbers = [];
        
        path.forEach((pos, index) => {
            const num = index + 1;
            if (num === 1 || num === this.maxNum || Math.random() < 0.3) {
                this.grid[pos.r][pos.c] = num;
                this.visibleNumbers.push(num);
            }
        });

        this.visibleNumbers.sort((a, b) => a - b);
        this.currentNumIndex = 0;
        this.path = [path[0]];
    }

    findHamiltonianPath() {
        const dr = [-1, 1, 0, 0];
        const dc = [0, 0, -1, 1];
        const totalCells = this.gridSize * this.gridSize;

        const solve = (r, c, visited) => {
            if (visited.length === totalCells) return visited;
            const dirs = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
            for (let i = 0; i < 4; i++) {
                const nr = r + dr[dirs[i]];
                const nc = c + dc[dirs[i]];
                if (nr >= 0 && nr < this.gridSize && nc >= 0 && nc < this.gridSize && 
                    !visited.some(p => p.r === nr && p.c === nc)) {
                    const result = solve(nr, nc, [...visited, {r: nr, c: nc}]);
                    if (result) return result;
                }
            }
            return null;
        };

        const startR = Math.floor(Math.random() * this.gridSize);
        const startC = Math.floor(Math.random() * this.gridSize);
        return solve(startR, startC, [{r: startR, c: startC}]);
    }

    render() {
        this.gridElement.innerHTML = '';
        for (let r = 0; r < this.gridSize; r++) {
            for (let c = 0; c < this.gridSize; c++) {
                const cell = document.createElement('div');
                cell.className = 'zip-cell';
                cell.dataset.r = r;
                cell.dataset.c = c;
                
                const num = this.grid[r][c];
                if (num > 0) {
                    cell.textContent = num;
                    cell.classList.add('number');
                }

                const pathIndex = this.path.findIndex(p => p.r === r && p.c === c);
                if (pathIndex !== -1) {
                    cell.classList.add('visited');
                    if (pathIndex === this.path.length - 1) cell.classList.add('active');
                }

                const nextNum = this.visibleNumbers[this.currentNumIndex + 1];
                if (num === nextNum) cell.classList.add('target');

                // Mouse Events
                cell.addEventListener('mousedown', () => {
                    this.isDragging = true;
                    this.handleCellInteraction(r, c);
                });
                cell.addEventListener('mouseenter', () => {
                    if (this.isDragging) this.handleCellInteraction(r, c);
                });

                // Touch Events
                cell.addEventListener('touchstart', (e) => {
                    if (this.isGameOver) return;
                    e.preventDefault();
                    this.isDragging = true;
                    this.handleCellInteraction(r, c);
                }, { passive: false });

                this.gridElement.appendChild(cell);
            }
        }
    }

    handleCellInteraction(r, c) {
        if (this.isGameOver) return;
        const last = this.path[this.path.length - 1];

        // Evitar procesar la misma celda si ya es la activa
        if (last.r === r && last.c === c) return;

        const existingIndex = this.path.findIndex(p => p.r === r && p.c === c);
        if (existingIndex !== -1) {
            // Permitir "retroceder" arrastrando hacia atrás
            if (existingIndex === this.path.length - 2) {
                this.undo();
            }
            return;
        }

        const dist = Math.abs(r - last.r) + Math.abs(c - last.c);
        if (dist !== 1) return;

        const cellNum = this.grid[r][c];
        if (cellNum > 0) {
            if (cellNum === this.visibleNumbers[this.currentNumIndex + 1]) {
                this.currentNumIndex++;
            } else {
                return;
            }
        }

        this.path.push({r, c});
        this.render();
        this.checkWin();
    }

    undo() {
        if (this.path.length <= 1) return;
        const removed = this.path.pop();
        if (this.grid[removed.r][removed.c] === this.visibleNumbers[this.currentNumIndex]) {
            this.currentNumIndex--;
        }
        this.render();
    }

    checkWin() {
        const lastVisible = this.visibleNumbers[this.visibleNumbers.length - 1];
        if (this.path.length === this.gridSize * this.gridSize && 
            this.grid[this.path[this.path.length-1].r][this.path[this.path.length-1].c] === lastVisible) {
            this.win();
        }
    }

    win() {
        this.isGameOver = true;
        this.isDragging = false;
        clearInterval(this.timerInterval);
        this.scoreElement.textContent = this.timerElement.textContent;
        this.overlayElement.classList.add('active');
    }

    startTimer() {
        this.startTime = Date.now();
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            const delta = Date.now() - this.startTime;
            const totalSeconds = Math.floor(delta / 1000);
            const ms = Math.floor((delta % 1000) / 100);
            
            if (totalSeconds >= 60) {
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                this.timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}.${ms}s`;
            } else {
                this.timerElement.textContent = `${totalSeconds}.${ms}s`;
            }
        }, 100);
    }

    reset() {
        this.overlayElement.classList.remove('active');
        this.timerElement.textContent = "0.0s";
        this.isDragging = false;
        this.init();
        
        if (!this.hasStartedOnce) {
            this.startOverlay.classList.add('active');
            this.isGameOver = true;
        } else {
            this.isGameOver = false;
            this.startTimer();
        }
    }
}

let game;
window.addEventListener('load', () => { game = new ZipGame(); });
function startGame() { game.startGame(); }
function resetGame() { game.reset(); }
function undoMove() { game.undo(); }
