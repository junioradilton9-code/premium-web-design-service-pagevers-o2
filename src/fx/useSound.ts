import { AudioEngine } from "../notturno/core/audioEngine";

/**
 * Singleton de áudio procedural para o site inteiro.
 * Desbloqueia no primeiro toque/clique (política dos navegadores).
 */
let engine: AudioEngine | null = null;
let unlocked = false;
let muted = false;

function getEngine() {
  if (!engine) engine = new AudioEngine();
  return engine;
}

export function initSound() {
  if (unlocked) return;
  const unlock = () => {
    getEngine().unlock();
    unlocked = true;
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
  };
  window.addEventListener("pointerdown", unlock, { once: true });
  window.addEventListener("keydown", unlock, { once: true });
}

export const sound = {
  /** clique em CTA / abrir robô */
  chime() {
    if (muted || !unlocked) return;
    getEngine().playChime();
  },
  /** virar de seção / abrir modal */
  page() {
    if (muted || !unlocked) return;
    getEngine().playPageTurn();
  },
  /** segurar e arrastar / líquido */
  pour() {
    if (muted || !unlocked) return;
    getEngine().playPour();
  },
  toggleMute() {
    muted = !muted;
    return muted;
  },
  get isMuted() {
    return muted;
  },
};
