type Props = {
  title: string;
  segment: string;
  url: string;
  img: string;
  tags: string[];
  onOpen?: () => void;
  onChoose?: () => void;
  floatDelay?: number;
  isHero?: boolean;
};

export default function SiteMock({
  title,
  segment,
  url,
  img,
  tags,
  onOpen,
  onChoose,
  floatDelay = 0,
  isHero = false,
}: Props) {
  return (
    <div className="scene group animate-floaty-sm" style={{ animationDelay: `${floatDelay}s` }}>
      <div
        className="tilt glass cursor-pointer overflow-hidden rounded-2xl"
        onClick={onOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onOpen?.()}
      >
        {/* browser bar */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-3 py-2">
          <span className="dot-pulse h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="dot-pulse h-2.5 w-2.5 rounded-full bg-yellow-400" style={{ animationDelay: ".4s" }} />
          <span className="dot-pulse h-2.5 w-2.5 rounded-full bg-green-400" style={{ animationDelay: ".8s" }} />
          <div className="ml-2 min-w-0 flex-1 break-all rounded-md bg-white/10 px-2 py-0.5 text-[10px] leading-tight text-white/60">
            {url}
          </div>
          {/* Botão Ampliar no topo direito do navegador */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen?.();
            }}
            aria-label={`Ampliar modelo ${title}`}
            className="ml-auto flex items-center gap-1 rounded-full border border-white/15 bg-[#1e293b] px-3 py-1.5 text-[10px] font-black text-white transition hover:bg-[#334155]"
          >
            🔍 Ampliar
          </button>
        </div>

        {/* miniatura animada com scroll (automático + manual) */}
        <div
          className="thumb relative h-56 overflow-hidden"
          onMouseEnter={(e) => {
            const imgEl = e.currentTarget.querySelector("img");
            if (imgEl) imgEl.style.transitionDuration = "1.8s";
          }}
          onMouseLeave={(e) => {
            const imgEl = e.currentTarget.querySelector("img");
            if (imgEl) imgEl.style.transitionDuration = "6s";
          }}
          onWheel={(e) => {
            const imgEl = e.currentTarget.querySelector("img") as HTMLImageElement;
            if (!imgEl) return;
            const current = parseFloat(imgEl.style.transform.replace(/[^0-9.-]/g, "")) || 0;
            const delta = e.deltaY * 0.8;
            const newY = Math.max(Math.min(current - delta, 0), -(imgEl.offsetHeight * 0.55));
            imgEl.style.transitionDuration = "0ms";
            imgEl.style.transform = `translateY(${newY}px)`;
          }}
        >
          <img
            src={img}
            alt={`Modelo de site para ${segment} — ${title}`}
            loading="lazy"
            decoding="async"
            className="strip block w-full object-cover object-top"
          />
          {/* brilho varrendo a tela de tempos em tempos */}
          <span className="shine-loop pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-transparent via-white/15 to-transparent" style={{ animationDelay: `${floatDelay + 1.5}s` }} />
          {/* botão ampliar */}
          <div className="absolute right-2 top-2 flex -translate-y-2 scale-90 items-center gap-1 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-2.5 py-1.5 text-[11px] font-bold text-white opacity-0 shadow-[0_14px_30px_rgba(34,211,238,0.35)] transition-all duration-300 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="h-3.5 w-3.5">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3M11 8v6M8 11h6" />
            </svg>
            Ampliar
          </div>
          {/* dica de rolagem */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-2 opacity-80 transition-all duration-300 group-hover:opacity-100">
            <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold text-white shadow-[0_8px_20px_rgba(34,211,238,0.2)] backdrop-blur">
              ↑ veja o site completo
            </span>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-20 transition-all duration-500 group-hover:opacity-80 group-hover:brightness-110 group-hover:saturate-125" />
        </div>

        {/* Rodapé customizado do hero */}
        {isHero ? (
          <div className="border-t border-cyan-500/25 bg-[#160a2c]/95 p-4 text-left backdrop-blur-md">
            <div className="flex items-center justify-between gap-2">
              <h3 className="min-w-0 break-words text-base font-extrabold leading-tight text-white">{title}</h3>
              <span className="max-w-[42%] shrink-0 text-right text-[10px] font-black uppercase leading-tight tracking-[0.12em] text-cyan-300">SITE PREMIUM</span>
            </div>
            <p className="mt-1 text-xs text-white/80">Sites premium, lojas virtuais e agentes de IA 24h</p>

            {/* Botões empilhados e funcionais */}
            <div className="mt-4 space-y-2.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen?.();
                }}
                className="flex w-full items-center justify-center gap-1.5 rounded-full border border-white/40 bg-white/10 py-3 text-center text-xs font-black uppercase tracking-widest text-white transition hover:bg-white/20"
              >
                🔍 Ver modelo ampliado
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onChoose?.();
                }}
                className="flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-600 py-3 text-center text-xs font-black uppercase tracking-widest text-white shadow-[0_4px_14px_rgba(34,211,238,0.4)] transition hover:scale-[1.02]"
              >
                🤖 Escolher este modelo
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-white">{title}</h3>
              <span className="shrink-0 text-[10px] uppercase tracking-widest text-cyan-300">{segment}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span key={t} className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-white/70">
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-3 text-[11px] font-semibold text-fuchsia-200 opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:text-fuchsia-100">
              Clique para ampliar e escolher →
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
