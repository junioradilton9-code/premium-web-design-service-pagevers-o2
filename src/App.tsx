import { useEffect, useState } from "react";
import Reveal from "./components/Reveal";
import SiteMock from "./components/SiteMock";
import AiChat from "./components/AiChat";
import ModelViewer, { type Model } from "./components/ModelViewer";
import BackgroundFX from "./components/BackgroundFX";
import Unified3DCanvas from "./components/Unified3DCanvas";
import { wa, EMAIL, WHATSAPP_DISPLAY } from "./utils/contact";
import Counter from "./components/Counter";
import Faq from "./components/Faq";
import TrustBadges from "./components/TrustBadges";
import FloatingContacts from "./components/FloatingContacts";
import StatsStrip from "./components/StatsStrip";
import { HERO_STATS } from "./config/site";

const services = [
  { icon: "🚀", t: "Landing Pages de Alta Conversão", d: "Páginas rápidas, persuasivas e focadas em transformar visitantes em clientes reais." },
  { icon: "🏢", t: "Sites Institucionais Premium", d: "Presença digital sólida, moderna e com autoridade para sua empresa em qualquer segmento." },
  { icon: "🛒", t: "Lojas Virtuais / E-commerce", d: "Catálogo, carrinho, Pix, cartão e frete integrados. Venda 24 horas por dia." },
  { icon: "🤖", t: "Agentes de IA Conversacionais", d: "Atendimento automático 24h que qualifica leads e envia tudo pro seu WhatsApp." },
];

const portfolio = [
  { title: "Clínica Vida+", segment: "Saúde", url: "clinicavidamais.com.br", img: "/models/clinica.jpg", tags: ["Agendamento", "IA 24h", "SEO local"] },
  { title: "Lex Advocacia", segment: "Jurídico", url: "lexadvocacia.adv.br", img: "/models/advocacia.jpg", tags: ["Autoridade", "Blog", "Leads"] },
  { title: "Sabor Urbano", segment: "Restaurante", url: "saborurbano.com.br", img: "/models/restaurante.jpg", tags: ["Cardápio", "Delivery", "Pix"] },
  { title: "Iron Fit Academia", segment: "Fitness", url: "ironfit.com.br", img: "/models/academia.jpg", tags: ["Planos", "Matrícula", "App"] },
  { title: "Prime Imóveis", segment: "Imobiliária", url: "primeimoveis.com.br", img: "/models/imobiliaria.jpg", tags: ["Filtros", "Tour 360", "CRM"] },
  { title: "Nuvem Store", segment: "E-commerce", url: "nuvemstore.com.br", img: "/models/ecommerce.jpg", tags: ["Checkout", "Cupons", "Frete"] },
  { title: "Alpha Construtora", segment: "Construção", url: "alphaconstrutora.com", img: "/models/construtora.jpg", tags: ["Obras", "Portfólio", "Orçamento"] },
  { title: "TechNova Systems", segment: "Tecnologia", url: "technova.io", img: "/models/tecnologia.jpg", tags: ["SaaS", "Dashboard", "API"] },
];

const plans = [
  {
    name: "Essencial",
    price: "1.090",
    old: "3.500",
    tag: "Landing Page",
    items: ["Página única premium", "Design exclusivo 3D", "100% responsivo", "Botão WhatsApp + Pixel de anúncios", "Entrega em 5 dias", "Hospedagem + domínio 1º ano grátis", "Suporte 30 dias"],
  },
  {
    name: "Profissional",
    price: "2.430",
    old: "8.400",
    tag: "Mais vendido",
    featured: true,
    items: ["Até 6 páginas exclusivas", "Blog + SEO avançado", "Agente de IA incluso (treinado)", "Formulários e integrações", "Google Analytics + Meta Pixel", "Suporte 90 dias"],
  },
  {
    name: "Enterprise",
    price: "4.110",
    old: "19.600",
    tag: "Sob medida",
    items: ["E-commerce ou Sistema web", "Painel administrativo completo", "IA treinada na sua empresa", "Integrações e automações", "Ads + relatórios mensais", "Suporte prioritário 12 meses"],
  },
];

const steps = [
  { n: "01", t: "Conversa rápida", d: "Você fala comigo no WhatsApp e entendemos seu objetivo." },
  { n: "02", t: "Protótipo visual", d: "Em 48h você vê o layout do seu site antes de qualquer código." },
  { n: "03", t: "Desenvolvimento", d: "Construção com performance, SEO e Agente de IA integrado." },
  { n: "04", t: "Lançamento", d: "Publicação, treinamento e artes prontas pras redes sociais." },
];

const NAV_LINKS: [string, string][] = [
  ["Serviços", "#servicos"],
  ["Portfólio", "#portfolio"],
  ["IA", "#ia"],
  ["FAQ", "#faq"],
  ["Planos", "#planos"],
  ["Contato", "#contato"],
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [viewer, setViewer] = useState<Model | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-[#e7e9ff]">
      {/* fundo animado em todo o site: 3D WebGL + auroras + partículas */}
      <Unified3DCanvas />
      <BackgroundFX />

      {/* NAV */}
      <header className={`fixed inset-x-0 top-0 z-40 transition-all ${scrolled ? "glass py-2" : "py-4"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <a href="#top" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-fuchsia-600 font-black text-white">A</div>
            <span className="text-lg font-extrabold tracking-tight">Adilton<span className="gradient-text">Dev</span></span>
          </a>
          <nav className="hidden gap-7 text-sm text-white/70 md:flex">
            {NAV_LINKS.map(([n, h]) => (
              <a key={h} href={h} className="transition hover:text-cyan-300">{n}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={wa("Olá Adilton! Quero um site profissional para minha empresa.")} target="_blank" rel="noreferrer"
              className="rounded-full bg-gradient-to-r from-green-500 to-emerald-400 px-4 py-2 text-sm font-bold text-black shadow-lg transition hover:scale-105">
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition hover:border-cyan-400/40 md:hidden"
            >
              <span className="text-lg leading-none">{menuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="glass mx-4 mt-2 grid gap-1 rounded-2xl border border-white/10 p-3 md:hidden">
            {NAV_LINKS.map(([n, h]) => (
              <a key={h} href={h} onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-cyan-300">
                {n}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-32 md:grid-cols-2 md:pt-40">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold text-cyan-200">
            ⚡ Sites premium + Agente de IA 24h
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.045em] [text-wrap:balance] md:text-7xl">
            Seu negócio com um <span className="gradient-text">site premium</span> que vende sozinho.
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/75 md:text-lg">
            Design exclusivo, animações 3D, velocidade extrema e um Agente de IA que atende seus clientes 24 horas por dia.
            Para clínicas, lojas, advogados, restaurantes, academias, construtoras e qualquer tipo de empresa.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">
            {['Clínicas', 'Lojas', 'Advogados', 'Restaurantes', 'Academias'].map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">{item}</span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("nova:start"))}
              className="cta-primary">
              Quero meu site agora
            </button>
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="cta-secondary">
              Ver modelos prontos
            </a>
          </div>
          <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 text-center">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="glass rounded-2xl py-3 shadow-[0_0_30px_rgba(34,211,238,0.08)]">
                <p className="text-xl font-black gradient-text">
                  <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </p>
                <p className="text-[11px] uppercase tracking-widest text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200} className="scene">
          <div className="tilt glass rounded-[28px] p-4 shadow-[0_30px_100px_-30px_rgba(168,85,247,0.55)] ring-1 ring-cyan-400/20">
            <SiteMock
              title="Modelo Premium"
              segment="Demo ao vivo"
              url="seusite.com.br"
              img="/models/tecnologia.jpg"
              tags={["3D", "IA", "Mobile-first"]}
              isHero={true}
              onOpen={() =>
                setViewer({
                  title: "Modelo Premium",
                  segment: "Demo",
                  url: "seusite.com.br",
                  img: "/models/tecnologia.jpg",
                  tags: ["3D", "IA", "Mobile-first"],
                })
              }
              onChoose={() =>
                window.dispatchEvent(
                  new CustomEvent("nova:model", {
                    detail: {
                      title: "Modelo Premium",
                      segment: "Demo",
                      url: "seusite.com.br",
                      img: "/models/tecnologia.jpg",
                      tags: ["3D", "IA", "Mobile-first"],
                    },
                  })
                )
              }
            />

            {/* Miniaturas dos planos */}
            <div className="mt-6">
              <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300">Escolha seu plano</p>
              <div className="grid grid-cols-3 gap-2.5">
                {plans.map((p) => (
                  <button
                    key={p.name}
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent("nova:plan", { detail: { name: p.name, price: p.price } }))
                    }
                    className={`group/mini relative flex flex-col items-center overflow-hidden rounded-2xl border p-3 text-center transition hover:scale-[1.04] ${
                      p.featured
                        ? "border-fuchsia-400/50 bg-gradient-to-b from-fuchsia-600/25 to-violet-800/20 shadow-[0_0_20px_-6px_rgba(217,70,239,.6)]"
                        : "border-white/12 bg-white/[0.04]"
                    }`}
                  >
                    <span className="shine-loop pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    {p.featured && (
                      <span className="mb-1 rounded-full bg-fuchsia-500/30 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-fuchsia-100">
                        Top
                      </span>
                    )}
                    <span className="text-[11px] font-bold text-white">{p.name}</span>
                    <span className="mt-1 text-sm font-black gradient-text">R$ {p.price}</span>
                    <span className="mt-1 max-w-full text-[9px] uppercase leading-tight tracking-[0.12em] text-white/65 [overflow-wrap:anywhere]">{p.tag}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="mx-auto max-w-7xl px-4 py-20">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400">Serviços</p>
          <h2 className="mt-3 text-3xl font-black [text-wrap:balance] md:text-5xl">Tudo que sua empresa precisa <span className="gradient-text">para dominar a internet</span></h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
          {services.map((s, i) => (
            <Reveal key={s.t} delay={i * 60}>
              <div className="scene h-full">
                <div className="tilt glass group/svc relative h-full overflow-hidden rounded-2xl p-6">
                  <span className="shine-loop pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div
                    className="icon-float relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/30 to-fuchsia-500/30 text-2xl"
                    style={{ animationDelay: `${i * 0.45}s` }}
                  >
                    <span className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-cyan-400/25 to-fuchsia-500/25 blur-md transition duration-500 group-hover/svc:blur-lg" />
                    <span className="transition-transform duration-500 group-hover/svc:scale-150 group-hover/svc:rotate-12">
                      {s.icon}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">{s.d}</p>
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent("nova:service", { detail: { title: s.t } }))}
                    className="mt-4 inline-block text-sm font-semibold text-cyan-300 transition hover:text-fuchsia-300 hover:underline">
                    Falar sobre isso →
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PORTFÓLIO */}
      <section id="portfolio" className="mx-auto max-w-7xl px-4 py-20">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">Portfólio</p>
          <h2 className="mt-3 text-3xl font-black [text-wrap:balance] md:text-5xl">Modelos de <span className="gradient-text">referência</span> por segmento</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">Passe o mouse para ver o site rolando e <b className="text-white">clique para ampliar em tela cheia</b> — lá você escolhe o modelo e nosso robô de IA monta seu pedido na hora.</p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {portfolio.map((p, i) => (
            <Reveal key={p.title} delay={i * 50}>
              <SiteMock {...p} onOpen={() => setViewer(p)} floatDelay={i * 0.2} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <a href={wa("Olá! Gostei dos modelos do portfólio, quero um site assim.")} target="_blank" rel="noreferrer"
            className="inline-block rounded-full bg-gradient-to-r from-green-500 to-emerald-400 px-8 py-3.5 font-bold text-black transition hover:scale-105">
            Quero um site como esses
          </a>
        </Reveal>
      </section>

      {/* IA */}
      <section id="ia" className="mx-auto max-w-7xl px-4 py-20">
        <div className="glass grid gap-10 rounded-3xl p-8 md:grid-cols-2 md:p-14">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400">Agente de IA</p>
            <h2 className="mt-3 text-3xl font-black [text-wrap:balance] md:text-4xl">Um atendente que <span className="gradient-text">nunca dorme</span></h2>
            <p className="mt-4 text-white/80">
              Instalamos no seu site um agente de inteligência artificial treinado com os dados da sua empresa.
              Ele responde dúvidas, envia preços, agenda atendimentos e transfere o cliente pronto para o seu WhatsApp.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/85">
              {["Respostas instantâneas 24h / 7 dias", "Qualificação automática de leads", "Integração WhatsApp, Instagram e e-mail", "Treinado com produtos, preços e FAQ da sua empresa", "Relatórios de conversas e conversões"].map((i) => (
                <li key={i} className="flex gap-3"><span className="text-cyan-400">◆</span>{i}</li>
              ))}
            </ul>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("nova:service", { detail: { title: "Agentes de IA Conversacionais" } }))}
              className="mt-8 rounded-full bg-gradient-to-r from-cyan-400 to-violet-600 px-7 py-3.5 font-bold text-white transition hover:scale-105">
              Ativar IA no meu site
            </button>
          </Reveal>
          <Reveal delay={200} className="scene">
            <div className="tilt glass rounded-2xl p-5">
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-600 text-lg">🤖</div>
                <div><p className="text-sm font-bold">Nova · IA</p><p className="text-[11px] text-green-400">online</p></div>
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <p className="inline-block rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2">Olá! Quanto custa um site para minha clínica?</p>
                <p className="ml-auto block w-fit rounded-2xl rounded-br-sm bg-gradient-to-br from-cyan-500 to-violet-600 px-3 py-2">A partir de R$ 1.090 com IA inclusa. Quer ver um modelo?</p>
                <p className="inline-block rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2">Sim, quero falar agora 😃</p>
              </div>
              <p className="mt-5 text-center text-xs text-white/50">👉 Teste o robô no canto da tela</p>
            </div>
          </Reveal>
        </div>
      </section>

      <Faq />
      <StatsStrip />

      {/* PROCESSO */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <Reveal className="text-center">
          <h2 className="text-3xl font-black md:text-5xl"><span className="gradient-text">Como funciona</span></h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="glass group/step relative h-full overflow-hidden rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-2">
                <span className="shine-loop pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animationDelay: `${i * 0.9}s` }} />
                <p className="text-4xl font-black transition-transform duration-500 group-hover/step:scale-125 group-hover/step:origin-left"><span className="gradient-text">{s.n}</span></p>
                <h3 className="mt-3 font-bold">{s.t}</h3>
                 <p className="mt-2 text-sm text-white/80">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="mx-auto max-w-7xl px-4 py-20">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">Investimento</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">Planos <span className="gradient-text">alinhados ao mercado</span></h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <div className="scene h-full">
                <div className={`tilt relative h-full overflow-hidden rounded-3xl p-7 ${p.featured ? "glow-loop bg-gradient-to-b from-fuchsia-600/30 to-violet-800/20 border border-fuchsia-400/40" : "glass"}`}>
                  <span className="shine-loop pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animationDelay: `${i * 1.2}s` }} />
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black">{p.name}</h3>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-cyan-200">{p.tag}</span>
                  </div>
                  <p className="mt-5 flex items-center gap-2 text-sm text-white/70">
                    a partir de
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-white/55 line-through">mercado: R$ {p.old}</span>
                  </p>
                  <p className="text-4xl font-black">R$ {p.price}<span className="ml-1 text-sm font-semibold text-white/50">à vista</span></p>
                  <p className="mt-1 text-xs text-white/70">ou 12x de R$ {Math.round(parseInt(p.price.replace(".", "")) / 12 + 25)} no cartão</p>
                   <ul className="mt-6 space-y-2.5 text-sm text-white/85">
                    {p.items.map((it) => <li key={it} className="flex gap-2"><span className="text-green-400">✓</span>{it}</li>)}
                  </ul>
                  <button
                    type="button"
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent("nova:plan", { detail: { name: p.name, price: p.price } }))
                    }
                    className={`mt-7 block w-full rounded-full py-3 text-center font-bold transition hover:scale-105 ${p.featured ? "bg-white text-black" : "bg-gradient-to-r from-cyan-400 to-violet-600 text-white"}`}>
                    Contratar agora
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <div className="glass mx-auto flex max-w-3xl flex-col items-center gap-3 rounded-2xl p-5 text-center sm:flex-row sm:text-left">
            <span className="text-3xl">📊</span>
            <p className="text-sm leading-relaxed text-white/70">
              <b className="text-white">Preço calibrado pelo mercado 2026:</b> sites institucionais com SEO custam em média
              R$ 4.000–9.000 no Brasil. Você leva qualidade premium (design exclusivo + IA) por um valor de freelancer
              experiente. Manutenção opcional: <b className="text-cyan-300">R$ 210/mês</b> (atualizações, segurança e backups).
            </p>
          </div>
        </Reveal>
      </section>

      {/* SERVIÇOS CONTÍNUOS */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400">Potencializar</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">Potencialize com <span className="gradient-text">serviços contínuos</span></h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">Acelere seu crescimento com IA, tráfego pago e identidade visual completa de alto nível.</p>
        </Reveal>
        <div className="mt-12 grid gap-6 max-w-2xl mx-auto sm:grid-cols-2">
          {[
            { title: "Agente de IA 24h", desc: "Atendente virtual treinado com os dados da sua empresa. Responde, qualifica e transfere leads prontos para o seu WhatsApp.", price: "R$ 820", sub: "IMPLANTAÇÃO + R$ 170/MÊS", icon: "🤖" },
            { title: "Manutenção & Suporte", desc: "Backups diários, segurança, updates e melhorias contínuas para o seu site.", price: "R$ 210", sub: "POR MÊS", icon: "🛡️" },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className="scene h-full">
                <div className="tilt glass flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-[#0b0620]/80 p-6 transition-all duration-300 hover:border-fuchsia-500/50 hover:shadow-[0_0_30px_rgba(217,70,239,0.15)] relative overflow-hidden group/svc">
                  <span className="shine-loop pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ animationDelay: `${i * 1.5}s` }} />
                  <div>
                    <div
                      className="icon-float relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/30 to-fuchsia-500/30 text-2xl"
                      style={{ animationDelay: `${i * 0.45}s` }}
                    >
                      <span className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-cyan-400/25 to-fuchsia-500/25 blur-md transition duration-500 group-hover/svc:blur-lg" />
                      <span className="transition-transform duration-500 group-hover/svc:scale-150 group-hover/svc:rotate-12">{item.icon}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-white tracking-tight">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/70 min-h-[72px]">{item.desc}</p>
                  </div>
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="text-xl font-black tracking-tight">
                      {item.price.includes("a partir de") ? (
                        <>
                          <span className="text-[11px] font-black uppercase text-fuchsia-400 mr-1.5">a partir de</span>
                          <span className="text-xl font-black text-cyan-300">{item.price.replace("a partir de ", "")}</span>
                        </>
                      ) : (
                        <span className="text-cyan-300">{item.price}</span>
                      )}
                    </p>
                    <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-white/70">{item.sub}</p>
                    <button
                      onClick={() =>
                        window.dispatchEvent(
                          new CustomEvent("nova:service", { detail: { title: item.title === "Agente de IA 24h" ? "Agentes de IA Conversacionais" : "Manutenção" } })
                        )
                      }
                      className="mt-5 w-full rounded-full border border-cyan-500/30 bg-transparent py-2.5 text-center text-xs font-bold text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-white">
                      Contratar →
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="mx-auto max-w-5xl px-4 py-20">
        <Reveal>
          <div className="glass rounded-3xl p-8 text-center md:p-14">
            <h2 className="text-3xl font-black md:text-5xl">Vamos criar o seu <span className="gradient-text">site premium</span>?</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">Fale comigo agora mesmo. Respondo rápido e monto sua proposta personalizada sem compromisso.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={wa("Olá Adilton! Quero criar meu site profissional.")} target="_blank" rel="noreferrer"
                className="w-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 px-8 py-4 font-bold text-black transition hover:scale-105 sm:w-auto">
                📱 WhatsApp {WHATSAPP_DISPLAY}
              </a>
              <a href={`mailto:${EMAIL}?subject=Quero um site profissional`}
                className="w-full rounded-full border border-white/25 px-8 py-4 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300 sm:w-auto">
                ✉️ {EMAIL}
              </a>
            </div>
            <p className="mt-6 text-xs text-white/60">Atendimento de segunda a sábado · 8h às 20h · Porto Velho / RO e todo o Brasil</p>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/60">
        <TrustBadges compact />
        <p className="mt-6">© {new Date().getFullYear()} AdiltonDev · Sites, Sistemas e Agentes de IA · Feito com 💜 no Brasil</p>
      </footer>

      <ModelViewer model={viewer} onClose={() => setViewer(null)} />
      <FloatingContacts />
      <AiChat />
    </div>
  );
}
