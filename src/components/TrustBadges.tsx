import Reveal from "./Reveal";

const BADGES = [
  { icon: "🔒", t: "Site seguro (SSL)", d: "Certificado e conexão criptografada" },
  { icon: "⚡", t: "Hospedagem otimizada", d: "CDN, backups e alta disponibilidade" },
  { icon: "📱", t: "100% Responsivo", d: "Celular, tablet e desktop" },
  { icon: "🎯", t: "Google Partner ready", d: "Pixel, Analytics e SEO técnico" },
  { icon: "🤖", t: "IA de atendimento", d: "Agente 24h no seu site" },
  { icon: "✅", t: "Protótipo em 48h", d: "Você aprova antes do código" },
];

export default function TrustBadges({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {BADGES.map((b) => (
          <span
            key={b.t}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white/70"
          >
            <span>{b.icon}</span> {b.t}
          </span>
        ))}
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <Reveal className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">Confiança</p>
        <h2 className="mt-3 text-2xl font-black md:text-4xl">
          Selos e <span className="gradient-text">certificações</span>
        </h2>
      </Reveal>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {BADGES.map((b, i) => (
          <Reveal key={b.t} delay={i * 40}>
            <div className="glass flex h-full flex-col items-center rounded-2xl border border-white/10 p-4 text-center transition hover:border-cyan-400/30">
              <span className={`text-2xl ${["icon-anim-a", "icon-anim-b", "icon-anim-c"][i % 3]}`} style={{ animationDelay: `${i * 0.35}s` }}>{b.icon}</span>
              <p className="mt-2 text-xs font-black uppercase tracking-wider text-white">{b.t}</p>
              <p className="mt-1 text-[10px] leading-snug text-white/50">{b.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
