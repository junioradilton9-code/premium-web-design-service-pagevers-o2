import { useState } from "react";
import Reveal from "./Reveal";

const ITEMS = [
  {
    q: "Quanto tempo leva para entregar meu site?",
    a: "Landing page em 3 a 5 dias úteis, site institucional em 7 a 12 dias e e-commerce/sistemas em 20 a 30 dias. Projetos urgentes entram em modo turbo.",
  },
  {
    q: "Posso pagar parcelado?",
    a: "Sim. Parcelamos em até 12x no cartão. Também aceitamos Pix (com desconto) e entrada + saldo. Tudo alinhado antes de começar.",
  },
  {
    q: "O site fica no meu nome?",
    a: "Sim. Domínio e hospedagem ficam no seu CPF/CNPJ. Você é o dono do site, dos arquivos e do acesso. Eu entrego tudo documentado.",
  },
  {
    q: "Os planos incluem domínio e hospedagem?",
    a: "No Essencial e no Profissional você ganha domínio .com.br + hospedagem no 1º ano. Depois a renovação fica em torno de R$ 30–80/mês.",
  },
  {
    q: "O Agente de IA realmente funciona 24 horas?",
    a: "Sim. Ele responde visitantes a qualquer hora, qualifica leads, envia preços e encaminha o cliente pronto para o seu WhatsApp.",
  },
  {
    q: "E se eu não gostar do visual?",
    a: "Em até 48h você recebe o protótipo. Só avançamos para o código depois da sua aprovação. Ajustes de layout entram no pacote durante o desenvolvimento.",
  },
  {
    q: "Serve para MEI e empresas pequenas?",
    a: "Sim. Temos planos a partir de R$ 1.090 pensados para quem está começando e quer presença profissional sem gastar como agência grande.",
  },
  {
    q: "Como falo com o Adilton?",
    a: "WhatsApp (69) 99265-7490 e e-mail adilton.pvh.junior@gmail.com. Atendimento seg–sáb, 8h às 20h.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20">
      <Reveal className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">Dúvidas frequentes</p>
        <h2 className="mt-3 text-3xl font-black md:text-5xl">
          FAQ <span className="gradient-text">interativo</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/60">
          Toque em uma pergunta para abrir. Ainda com dúvida? Fale com a Nova ou com o Adilton.
        </p>
      </Reveal>

      <div className="mt-10 space-y-3">
        {ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q} delay={i * 40}>
              <div
                className={`overflow-hidden rounded-2xl border transition-all ${
                  isOpen
                    ? "border-cyan-400/40 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-bold text-white md:text-base">{item.q}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm transition ${
                      isOpen
                        ? "rotate-45 border-cyan-400/50 bg-cyan-400/20 text-cyan-200"
                        : "border-white/15 bg-white/5 text-white/70"
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-white/70">{item.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
