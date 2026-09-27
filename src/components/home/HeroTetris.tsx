import { useEffect, useRef, useState } from "react";
import { useHasFinePointer, usePrefersReducedMotion } from "../../hooks/useMediaQuery";
import { cn } from "../../utils/cn";

type Phase = "idle" | "playing" | "gameover";
type PieceType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";
type Cell = [number, number];

const COLS = 10;
const ROWS = 20;
const LOCK_DELAY = 0.4;
const SOFT_DROP_MS = 40;

const SHAPES: Record<PieceType, { size: number; cells: Cell[] }> = {
  I: { size: 4, cells: [[0, 1], [1, 1], [2, 1], [3, 1]] },
  O: { size: 2, cells: [[0, 0], [1, 0], [0, 1], [1, 1]] },
  T: { size: 3, cells: [[1, 0], [0, 1], [1, 1], [2, 1]] },
  S: { size: 3, cells: [[1, 0], [2, 0], [0, 1], [1, 1]] },
  Z: { size: 3, cells: [[0, 0], [1, 0], [1, 1], [2, 1]] },
  J: { size: 3, cells: [[0, 0], [0, 1], [1, 1], [2, 1]] },
  L: { size: 3, cells: [[2, 0], [0, 1], [1, 1], [2, 1]] },
};

const PIECE_TYPES = Object.keys(SHAPES) as PieceType[];

const COLORS: Record<PieceType, string> = {
  I: "#22d3ee",
  O: "#fbbf24",
  T: "#8b5cf6",
  S: "#10b981",
  Z: "#f43f5e",
  J: "#3b82f6",
  L: "#f97316",
};

function rotateCells(cells: Cell[], size: number): Cell[] {
  return cells.map(([x, y]) => [size - 1 - y, x] as Cell);
}

function computeRotations(type: PieceType): Cell[][] {
  const { size, cells } = SHAPES[type];
  const states: Cell[][] = [cells];
  let current = cells;
  for (let i = 0; i < 3; i++) {
    current = rotateCells(current, size);
    states.push(current);
  }
  return states;
}

const ROTATIONS: Record<PieceType, Cell[][]> = PIECE_TYPES.reduce(
  (acc, type) => {
    acc[type] = computeRotations(type);
    return acc;
  },
  {} as Record<PieceType, Cell[][]>,
);

interface Piece {
  type: PieceType;
  rot: number;
  x: number;
  y: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
}

interface TetrisState {
  phase: Phase;
  board: (PieceType | null)[][];
  queue: PieceType[];
  current: Piece;
  dropTimer: number;
  dropInterval: number;
  lockTimer: number;
  softDrop: boolean;
  score: number;
  level: number;
  lines: number;
  clearingRows: number[];
  clearTimer: number;
  stars: Star[];
  flash: number;
}

function makeBag(): PieceType[] {
  const bag = [...PIECE_TYPES];
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]];
  }
  return bag;
}

function makeEmptyBoard(): (PieceType | null)[][] {
  return Array.from({ length: ROWS }, () => new Array(COLS).fill(null));
}

function makeStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random(),
    size: 0.6 + Math.random() * 1.5,
    speed: 0.02 + Math.random() * 0.06,
  }));
}

function fits(board: (PieceType | null)[][], type: PieceType, rot: number, px: number, py: number): boolean {
  const cells = ROTATIONS[type][rot];
  for (const [cx, cy] of cells) {
    const x = px + cx;
    const y = py + cy;
    if (x < 0 || x >= COLS || y >= ROWS) return false;
    if (y >= 0 && board[y][x]) return false;
  }
  return true;
}

function takeNext(state: TetrisState): Piece {
  if (state.queue.length < 3) state.queue.push(...makeBag());
  const type = state.queue.shift()!;
  const size = SHAPES[type].size;
  return { type, rot: 0, x: Math.floor((COLS - size) / 2), y: 0 };
}

function createState(): TetrisState {
  const queue = [...makeBag(), ...makeBag()];
  const state: TetrisState = {
    phase: "idle",
    board: makeEmptyBoard(),
    queue,
    current: { type: "T", rot: 0, x: 3, y: 0 },
    dropTimer: 0,
    dropInterval: 800,
    lockTimer: 0,
    softDrop: false,
    score: 0,
    level: 1,
    lines: 0,
    clearingRows: [],
    clearTimer: 0,
    stars: makeStars(26),
    flash: 0,
  };
  state.current = takeNext(state);
  return state;
}

function tryMove(state: TetrisState, dx: number, dy: number): boolean {
  const { type, rot, x, y } = state.current;
  if (fits(state.board, type, rot, x + dx, y + dy)) {
    state.current.x += dx;
    state.current.y += dy;
    if (state.lockTimer > 0) state.lockTimer = 0;
    return true;
  }
  return false;
}

function tryRotate(state: TetrisState): boolean {
  const { type, rot, x, y } = state.current;
  const newRot = (rot + 1) % 4;
  for (const k of [0, -1, 1, -2, 2]) {
    if (fits(state.board, type, newRot, x + k, y)) {
      state.current.rot = newRot;
      state.current.x += k;
      state.lockTimer = 0;
      return true;
    }
  }
  return false;
}

function ghostY(state: TetrisState): number {
  let y = state.current.y;
  while (fits(state.board, state.current.type, state.current.rot, state.current.x, y + 1)) y++;
  return y;
}

function lockPiece(state: TetrisState, onScore: () => void, onGameOver: () => void) {
  const { type, rot, x, y } = state.current;
  for (const [cx, cy] of ROTATIONS[type][rot]) {
    const by = y + cy;
    const bx = x + cx;
    if (by >= 0) state.board[by][bx] = type;
  }
  const full: number[] = [];
  for (let r = 0; r < ROWS; r++) {
    if (state.board[r].every((c) => c !== null)) full.push(r);
  }
  if (full.length > 0) {
    state.clearingRows = full;
    state.clearTimer = 0.28;
    state.flash = 0.28;
  } else {
    const next = takeNext(state);
    state.current = next;
    state.dropTimer = 0;
    state.lockTimer = 0;
    if (!fits(state.board, next.type, next.rot, next.x, next.y)) {
      state.phase = "gameover";
      onGameOver();
    }
  }
  onScore();
}

function resolveClear(state: TetrisState, onScore: () => void, onGameOver: () => void) {
  const count = state.clearingRows.length;
  for (const row of [...state.clearingRows].sort((a, b) => a - b)) {
    state.board.splice(row, 1);
    state.board.unshift(new Array(COLS).fill(null));
  }
  state.clearingRows = [];
  const table = [0, 100, 300, 500, 800];
  state.score += (table[count] ?? 800) * state.level;
  state.lines += count;
  const newLevel = Math.floor(state.lines / 10) + 1;
  if (newLevel !== state.level) {
    state.level = newLevel;
    state.dropInterval = Math.max(120, 800 - (newLevel - 1) * 60);
  }
  const next = takeNext(state);
  state.current = next;
  state.dropTimer = 0;
  state.lockTimer = 0;
  if (!fits(state.board, next.type, next.rot, next.x, next.y)) {
    state.phase = "gameover";
    onGameOver();
  }
  onScore();
}

function hardDrop(state: TetrisState, onScore: () => void, onGameOver: () => void) {
  let dist = 0;
  while (fits(state.board, state.current.type, state.current.rot, state.current.x, state.current.y + 1)) {
    state.current.y += 1;
    dist += 1;
  }
  state.score += dist * 2;
  lockPiece(state, onScore, onGameOver);
}

function update(state: TetrisState, dt: number, onScore: () => void, onGameOver: () => void) {
  for (const s of state.stars) {
    s.y += s.speed * dt;
    if (s.y > 1) {
      s.y -= 1;
      s.x = Math.random();
    }
  }
  state.flash = Math.max(0, state.flash - dt);

  if (state.clearTimer > 0) {
    state.clearTimer -= dt;
    if (state.clearTimer <= 0) resolveClear(state, onScore, onGameOver);
    return;
  }

  const grounded = !fits(state.board, state.current.type, state.current.rot, state.current.x, state.current.y + 1);
  if (grounded) {
    state.lockTimer += dt;
    if (state.lockTimer >= LOCK_DELAY) {
      lockPiece(state, onScore, onGameOver);
    }
    return;
  }

  state.dropTimer += dt * 1000;
  const interval = state.softDrop ? SOFT_DROP_MS : state.dropInterval;
  if (state.dropTimer >= interval) {
    state.dropTimer -= interval;
    tryMove(state, 0, 1);
  }
}

function settleEffects(state: TetrisState, dt: number) {
  for (const s of state.stars) {
    s.y += s.speed * dt;
    if (s.y > 1) {
      s.y -= 1;
      s.x = Math.random();
    }
  }
}

interface Layout {
  cell: number;
  boardX: number;
  boardY: number;
  panelX: number;
  panelW: number;
}

function computeLayout(width: number, height: number): Layout {
  const padding = height * 0.035;
  const bottomBar = height * 0.16;
  const availH = height - padding * 2 - bottomBar;
  const cell = availH / ROWS;
  const boardX = padding;
  const boardY = padding;
  const gap = cell * 0.7;
  const panelX = boardX + cell * COLS + gap;
  const panelW = Math.max(0, width - padding - panelX);
  return { cell, boardX, boardY, panelX, panelW };
}

function draw(ctx: CanvasRenderingContext2D, state: TetrisState, width: number, height: number, dpr: number, bg: string) {
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#ffffff";
  for (const s of state.stars) {
    ctx.globalAlpha = 0.35 + s.speed * 5;
    ctx.fillRect(s.x * width, s.y * height, s.size, s.size);
  }
  ctx.globalAlpha = 1;

  const { cell, boardX, boardY, panelX, panelW } = computeLayout(width, height);
  const boardW = cell * COLS;
  const boardH = cell * ROWS;

  ctx.fillStyle = "rgba(255,255,255,0.03)";
  ctx.fillRect(boardX, boardY, boardW, boardH);
  ctx.strokeStyle = "rgba(255,255,255,0.07)";
  ctx.lineWidth = 1;
  for (let c = 0; c <= COLS; c++) {
    ctx.beginPath();
    ctx.moveTo(boardX + c * cell, boardY);
    ctx.lineTo(boardX + c * cell, boardY + boardH);
    ctx.stroke();
  }
  for (let r = 0; r <= ROWS; r++) {
    ctx.beginPath();
    ctx.moveTo(boardX, boardY + r * cell);
    ctx.lineTo(boardX + boardW, boardY + r * cell);
    ctx.stroke();
  }

  const drawBlock = (col: number, row: number, color: string, alpha = 1, glow = 6) => {
    if (row < 0) return;
    const x = boardX + col * cell;
    const y = boardY + row * cell;
    const inset = cell * 0.07;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.shadowColor = color;
    ctx.shadowBlur = glow;
    ctx.fillStyle = color;
    ctx.fillRect(x + inset, y + inset, cell - inset * 2, cell - inset * 2);
    ctx.restore();
  };

  for (let r = 0; r < ROWS; r++) {
    const flashing = state.clearingRows.includes(r);
    for (let c = 0; c < COLS; c++) {
      const value = state.board[r][c];
      if (!value) continue;
      if (flashing) {
        drawBlock(c, r, "#ffffff", 0.55 + Math.sin(state.flash * 40) * 0.25, 12);
      } else {
        drawBlock(c, r, COLORS[value]);
      }
    }
  }

  if (state.clearingRows.length === 0) {
    if (state.phase === "playing") {
      const gy = ghostY(state);
      for (const [cx, cy] of ROTATIONS[state.current.type][state.current.rot]) {
        drawBlock(state.current.x + cx, gy + cy, COLORS[state.current.type], 0.16, 0);
      }
    }
    for (const [cx, cy] of ROTATIONS[state.current.type][state.current.rot]) {
      drawBlock(state.current.x + cx, state.current.y + cy, COLORS[state.current.type], 1, 9);
    }
  }

  if (panelW > 20) {
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.strokeRect(panelX, boardY, panelW, cell * 4);
    const previewSize = 4;
    const previewCell = Math.min(panelW / (previewSize + 1), cell * 0.72);
    const nextType = state.queue[0];
    if (nextType) {
      const shape = SHAPES[nextType];
      const offset = (previewSize - shape.size) / 2;
      const originX = panelX + (panelW - previewCell * previewSize) / 2;
      const originY = boardY + cell * 0.5;
      for (const [cx, cy] of shape.cells) {
        const px = originX + (cx + offset) * previewCell;
        const py = originY + (cy + offset) * previewCell;
        ctx.save();
        ctx.shadowColor = COLORS[nextType];
        ctx.shadowBlur = 6;
        ctx.fillStyle = COLORS[nextType];
        const inset = previewCell * 0.08;
        ctx.fillRect(px + inset, py + inset, previewCell - inset * 2, previewCell - inset * 2);
        ctx.restore();
      }
    }
  }
}

export default function HeroTetris({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<TetrisState>(createState());
  const sizeRef = useRef({ width: 1, height: 1 });
  const rafRef = useRef<number | null>(null);
  const repeatRef = useRef<number | null>(null);
  const reduced = usePrefersReducedMotion();
  const hasFinePointer = useHasFinePointer();

  const [phase, setPhase] = useState<Phase>("idle");
  const [hud, setHud] = useState({ score: 0, level: 1, lines: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bg = getComputedStyle(document.documentElement).getPropertyValue("--color-background").trim() || "#0b0a12";
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      sizeRef.current = { width: rect.width, height: rect.height };
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const drawFrame = () => {
      const { width, height } = sizeRef.current;
      draw(ctx, stateRef.current, width, height, dpr, bg);
    };

    const syncHud = () =>
      setHud({ score: stateRef.current.score, level: stateRef.current.level, lines: stateRef.current.lines });
    const onGameOver = () => setPhase("gameover");

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      if (stateRef.current.phase === "playing") {
        update(stateRef.current, dt, syncHud, onGameOver);
      } else {
        settleEffects(stateRef.current, dt);
      }
      drawFrame();
      rafRef.current = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (rafRef.current !== null) return;
      last = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    };
    const stopLoop = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };

    drawFrame();
    startLoop();

    const onVisibility = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const startGame = () => {
      stateRef.current = createState();
      stateRef.current.phase = "playing";
      setHud({ score: 0, level: 1, lines: 0 });
      setPhase("playing");
    };

    const KEYS = new Set(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Space", "Enter", "KeyZ", "KeyX"]);
    const onKeyDown = (e: KeyboardEvent) => {
      if (!KEYS.has(e.code)) return;
      e.preventDefault();
      if (stateRef.current.phase !== "playing") {
        startGame();
        return;
      }
      if (e.repeat && (e.code === "ArrowUp" || e.code === "Space" || e.code === "KeyZ" || e.code === "KeyX")) return;
      if (e.code === "ArrowLeft") tryMove(stateRef.current, -1, 0);
      if (e.code === "ArrowRight") tryMove(stateRef.current, 1, 0);
      if (e.code === "ArrowUp" || e.code === "KeyX") tryRotate(stateRef.current);
      if (e.code === "ArrowDown") stateRef.current.softDrop = true;
      if (e.code === "Space") {
        hardDrop(stateRef.current, syncHud, onGameOver);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowDown") stateRef.current.softDrop = false;
    };

    const onPointerDownStart = () => {
      container.focus({ preventScroll: true });
      if (stateRef.current.phase !== "playing") startGame();
    };

    container.addEventListener("pointerdown", onPointerDownStart);
    container.addEventListener("keydown", onKeyDown);
    container.addEventListener("keyup", onKeyUp);

    return () => {
      stopLoop();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      container.removeEventListener("pointerdown", onPointerDownStart);
      container.removeEventListener("keydown", onKeyDown);
      container.removeEventListener("keyup", onKeyUp);
      if (repeatRef.current !== null) window.clearInterval(repeatRef.current);
    };
  }, []);

  const holdRepeat = (action: () => void) => {
    action();
    if (repeatRef.current !== null) window.clearInterval(repeatRef.current);
    repeatRef.current = window.setInterval(action, 110);
  };
  const releaseRepeat = () => {
    if (repeatRef.current !== null) {
      window.clearInterval(repeatRef.current);
      repeatRef.current = null;
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="application"
      aria-label="Minijuego: bloques descendentes tipo Tetris. Usa las flechas para mover y rotar, espacio para caída rápida, o los botones táctiles."
      className={cn(
        "relative touch-none select-none outline-none focus-visible:ring-2 focus-visible:ring-secondary/50",
        className,
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
      <div aria-hidden className="scanlines pointer-events-none absolute inset-0 opacity-70" />

      {phase === "playing" && (
        <div
          className="pointer-events-none absolute font-mono text-[9px] font-semibold uppercase tracking-wider text-white/85 sm:text-[10px]"
          style={{ left: "64%", top: "3.5%", right: "4%" }}
        >
          <p className="mt-1 text-secondary-light">Siguiente</p>
          <p className="mt-8 text-white">Ptos</p>
          <p className="text-sm font-extrabold text-white sm:text-base">{hud.score}</p>
          <p className="mt-1.5 text-accent-light">Nivel {hud.level}</p>
          <p className="text-white/60">Líneas {hud.lines}</p>
        </div>
      )}

      {phase === "idle" && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/30 text-center">
          <p className={cn("font-mono text-[11px] uppercase tracking-[0.2em] text-accent-light", !reduced && "animate-pulse-soft")}>
            Toca o presiona espacio
          </p>
          <p className="text-sm font-semibold text-white/80">para jugar</p>
        </div>
      )}

      {phase === "gameover" && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 bg-background/90 text-center backdrop-blur-[2px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-creative">Fin del juego</p>
          <p className="text-3xl font-extrabold text-white">{hud.score}</p>
          <p className="text-[11px] text-white/60">puntos</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-secondary-light">Toca para reintentar</p>
        </div>
      )}

      {phase === "playing" && !hasFinePointer && (
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 p-2">
          <button
            type="button"
            aria-label="Mover izquierda"
            onPointerDown={() => holdRepeat(() => tryMove(stateRef.current, -1, 0))}
            onPointerUp={releaseRepeat}
            onPointerLeave={releaseRepeat}
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-white/10 text-base text-white active:bg-white/20"
          >
            ◀
          </button>
          <button
            type="button"
            aria-label="Rotar"
            onPointerDown={() => tryRotate(stateRef.current)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-secondary/40 bg-secondary/25 text-base text-white active:bg-secondary/40"
          >
            ⟳
          </button>
          <button
            type="button"
            aria-label="Caída suave"
            onPointerDown={() => {
              stateRef.current.softDrop = true;
            }}
            onPointerUp={() => {
              stateRef.current.softDrop = false;
            }}
            onPointerLeave={() => {
              stateRef.current.softDrop = false;
            }}
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-white/10 text-base text-white active:bg-white/20"
          >
            ▼
          </button>
          <button
            type="button"
            aria-label="Mover derecha"
            onPointerDown={() => holdRepeat(() => tryMove(stateRef.current, 1, 0))}
            onPointerUp={releaseRepeat}
            onPointerLeave={releaseRepeat}
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-white/10 text-base text-white active:bg-white/20"
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
}
