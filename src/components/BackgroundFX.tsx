/** Fundo animado do site inteiro (camada CSS, leve):
 *  auroras em movimento + formas geométricas flutuantes + scanline + grade.
 *  A cena 3D + partículas fica no componente <Unified3DCanvas />. */
export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* auroras em movimento */}
      <div className="animate-aurora absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-fuchsia-600/20 blur-[80px]" />
      <div className="animate-aurora absolute right-0 top-40 h-[380px] w-[380px] rounded-full bg-cyan-500/20 blur-[80px]" style={{ animationDelay: "-6s" }} />
      <div className="animate-aurora absolute bottom-0 left-1/3 h-[340px] w-[340px] rounded-full bg-violet-700/20 blur-[80px]" style={{ animationDelay: "-12s" }} />
      <div className="animate-aurora absolute left-1/2 top-1/3 h-[300px] w-[300px] rounded-full bg-pink-500/15 blur-[72px]" style={{ animationDelay: "-3s" }} />

      {/* grade técnica no topo */}
      <div className="grid-bg absolute inset-0" />

      {/* formas geométricas flutuantes */}
      <div className="animate-drift absolute left-[8%] top-[16%] h-24 w-24 rounded-full border-2 border-cyan-400/25" />
      <div className="animate-drift absolute right-[10%] top-[24%] h-16 w-16 rotate-45 rounded-lg border-2 border-fuchsia-400/25" style={{ animationDelay: "-7s" }} />
      <div className="animate-drift absolute left-[14%] top-[58%] h-14 w-14 bg-violet-500/15" style={{ clipPath: "polygon(50% 0,100% 100%,0 100%)", animationDelay: "-13s" }} />
      <div className="animate-drift absolute right-[16%] top-[66%] h-32 w-32 rounded-full border border-white/10 blur-[1px]" style={{ animationDelay: "-17s" }} />
      <div className="animate-drift absolute left-[45%] top-[8%] h-10 w-10 -rotate-12 rounded-md border-2 border-pink-400/25" style={{ animationDelay: "-22s" }} />
      <div className="animate-drift absolute right-[40%] top-[82%] h-20 w-20 rounded-full border-2 border-dashed border-emerald-400/20" style={{ animationDelay: "-27s" }} />

      {/* linha de varredura */}
      <div className="scanline absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />

      {/* vinheta */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,1,15,.85))]" />
    </div>
  );
}
