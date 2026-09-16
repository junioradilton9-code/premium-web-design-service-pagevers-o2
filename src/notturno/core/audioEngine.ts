/**
 * AUDIO ENGINE (Web Audio API)
 * Som 100% procedural — sem arquivos de áudio no bundle.
 *   .wash   → ruído de tinta/vento (virar página)
 *   .chime  → brilho retrô (lar de HQ)
 *   .ripple → ondulação líquida
 */

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;

  unlock() {
    if (this.ctx) return;
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.25;
    this.master.connect(this.ctx.destination);

    // pré-gera buffer de ruído branco (barato, reutilizado por todos os sons)
    const len = this.ctx.sampleRate * 1;
    this.noiseBuffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  }

  playPageTurn() {
    if (!this.ctx || !this.master || !this.noiseBuffer) return;
    if (this.ctx.state === "suspended") void this.ctx.resume();

    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;

    // band-pass sweep = "wash" de tinta
    const bp = this.ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(260, t);
    bp.frequency.exponentialRampToValueAtTime(1400, t + 0.18);
    bp.Q.value = 1.2;

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.5, t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);

    src.connect(bp).connect(g).connect(this.master);
    src.start(t);
    src.stop(t + 0.3);
  }

  playChime() {
    if (!this.ctx || !this.master) return;
    if (this.ctx.state === "suspended") void this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(523.25, t); // C5
    osc.frequency.exponentialRampToValueAtTime(1046.5, t + 0.12); // C6

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);

    osc.connect(g).connect(this.master);
    osc.start(t);
    osc.stop(t + 0.55);
  }

  playPour() {
    if (!this.ctx || !this.master || !this.noiseBuffer) return;
    if (this.ctx.state === "suspended") void (this.ctx as AudioContext).resume();

    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.playbackRate.value = 0.6;

    const lp = this.ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 420;

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.35, t + 0.05);
    g.gain.setValueAtTime(0.35, t + 0.18);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);

    src.connect(lp).connect(g).connect(this.master);
    src.start(t);
    src.stop(t + 0.55);
  }

  dispose() {
    void this.ctx?.close();
    this.ctx = null;
    this.master = null;
    this.noiseBuffer = null;
  }
}
