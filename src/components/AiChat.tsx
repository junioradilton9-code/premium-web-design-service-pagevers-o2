import { useEffect, useRef, useState } from "react";
import { wa as WA, EMAIL } from "../utils/contact";

const PLANS = [
  {
    name: "Essencial",
    price: "R$ 1.090",
    desc: "landing page premium, 5 dias",
    kw: ["essencial", "1.090", "1090"],
    explain:
      "💎 *Plano Essencial — R$ 1.090*\nIdeal para quem quer captar clientes rápido com uma página de alta conversão.\n\n*Como funciona:*\n1️⃣ Você me conta o objetivo (vender, captar leads, divulgar)\n2️⃣ Criamos o design premium 3D com a sua marca\n3️⃣ Publicamos em até *5 dias úteis*\n4️⃣ Você divulga o link e recebe contatos no WhatsApp\n\n✅ Inclui: página única premium, 100% responsivo, botão WhatsApp + Pixel, hospedagem + domínio no 1º ano e suporte 30 dias.\n\n📊 No mercado isso custa cerca de R$ 2.200–3.500.",
  },
  {
    name: "Profissional",
    price: "R$ 2.430",
    desc: "site completo + blog + IA inclusa",
    kw: ["profissional", "2.430", "2430"],
    explain:
      "⭐ *Plano Profissional — R$ 2.430* (mais vendido)\nO site completo da sua empresa, com autoridade e Agente de IA incluso.\n\n*Como funciona:*\n1️⃣ Definimos até 6 páginas (Home, Sobre, Serviços, Blog, Contato...)\n2️⃣ Protótipo visual em até 48h para você aprovar\n3️⃣ Desenvolvimento com SEO, formulários e *Agente de IA 24h*\n4️⃣ Lançamento em 7–12 dias + 90 dias de suporte\n\n✅ Inclui: blog, Google Analytics, Meta Pixel, IA treinada e integrações.\n\n📊 No mercado um site assim custa R$ 5.600–9.000 em agências.",
  },
  {
    name: "Enterprise",
    price: "R$ 4.110",
    desc: "e-commerce/sistema + IA treinada",
    kw: ["enterprise", "4.110", "4110"],
    explain:
      "👑 *Plano Enterprise — R$ 4.110*\nPara quem quer loja virtual ou sistema sob medida, com IA treinada na empresa.\n\n*Como funciona:*\n1️⃣ Mapeamos produtos/fluxos e regras do seu negócio\n2️⃣ Montamos e-commerce ou sistema web com painel admin\n3️⃣ Integramos Pix, cartão, frete e automações\n4️⃣ Entregamos com IA treinada + suporte prioritário por 12 meses\n\n✅ Inclui: painel completo, relatórios, ads sob demanda e prioridade no atendimento.\n\n📊 No mercado projetos assim vão de R$ 11.500 a R$ 26.000+.",
  },
];

type Cta = { label: string; href: string };
type Msg = { from: "bot" | "user"; text: string; options?: string[]; cta?: Cta };

const PLAN_OPTIONS = [
  "💎 Plano Essencial — R$ 1.090",
  "⭐ Plano Profissional — R$ 2.430",
  "👑 Plano Enterprise — R$ 4.110",
  "Falar com o Adilton",
];

const SERVICE_INFO: Record<string, string> = {
  "Landing Pages de Alta Conversão":
    "🚀 *Landing Pages de Alta Conversão*\nPágina única criada para um único objetivo: gerar contato ou venda.\n\n*Como funciona:*\n1️⃣ Entendemos sua oferta e seu público\n2️⃣ Layout persuasivo com gatilhos mentais, animações 3D e botão de WhatsApp fixo\n3️⃣ Publicação em até 5 dias, com SEO e velocidade 95+ no PageSpeed\n4️⃣ Você divulga o link nas redes sociais e nos anúncios\n\n✅ Incluído: design exclusivo, copywriting, formulário, pixel do Meta/Google e botão direto pro seu WhatsApp.\n\n📊 Mercado: R$ 2.200–3.500 → 💰 *Aqui: R$ 1.090* • Entrega em 5 dias",
  "Sites Institucionais Premium":
    "🏢 *Sites Institucionais Premium*\nA sede digital da sua empresa, com autoridade e credibilidade.\n\n*Como funciona:*\n1️⃣ Mapeamos as páginas (Home, Sobre, Serviços, Blog, Contato...)\n2️⃣ Layout com a sua identidade visual + protótipo em 48h\n3️⃣ Desenvolvimento com blog, SEO avançado e formulários\n4️⃣ Lançamento em 7–12 dias com domínio e hospedagem configurados\n\n✅ Incluído: até 6 páginas, blog para atrair clientes do Google, Google Analytics e 90 dias de suporte.\n\n📊 Mercado: R$ 5.600–9.000 → 💰 *Aqui: R$ 2.430* (Plano Profissional)",
  "Lojas Virtuais / E-commerce":
    "🛒 *Lojas Virtuais / E-commerce*\nSua loja vendendo 24h por dia, sozinha.\n\n*Como funciona:*\n1️⃣ Cadastro dos produtos com fotos, variações e frete\n2️⃣ Pagamentos: Pix, cartão e boleto (Mercado Pago, Stripe, PagSeguro)\n3️⃣ Painel simples pra você gerenciar tudo do celular\n4️⃣ Cupons, relatórios de vendas e pedidos caindo direto no seu WhatsApp\n\n✅ Incluído: vitrine, carrinho, checkout otimizado, cálculo de frete e treinamento em vídeo.\n\n📊 Mercado: R$ 11.500–26.000 → 💰 *Aqui: a partir de R$ 4.110* (Plano Enterprise)",
  "Agentes de IA Conversacionais":
    "🤖 *Agentes de IA Conversacionais*\nUm atendente que nunca dorme, treinado com os dados da SUA empresa — igual a mim!\n\n*Como funciona:*\n1️⃣ Você envia seus produtos, preços e dúvidas frequentes\n2️⃣ Eu treino o agente com a personalidade da sua marca\n3️⃣ Ele atende 24h no seu site: responde, qualifica leads, oferece planos e monta o pedido\n4️⃣ Ao final, transfere tudo pronto pro SEU WhatsApp — você só fecha a venda\n\n✅ Incluído: integração WhatsApp/Instagram/e-mail, relatórios de conversas e melhoria contínua.\n\n📊 Mercado: R$ 700–1.800/mês de operação → 💰 *Aqui: implantação R$ 820 + R$ 170/mês* (evolução contínua da IA inclusa) • Já incluso no Plano Profissional",
  "SEO + Google & Meta Ads":
    "📈 *SEO + Google & Meta Ads*\nSeu site aparecendo e vendendo todos os dias.\n\n*Como funciona:*\n1️⃣ SEO técnico completo no site (velocidade, palavras-chave, schema)\n2️⃣ Criação e gestão das campanhas no Google Ads e Instagram/Facebook\n3️⃣ Otimização semanal para baixar o custo por lead\n4️⃣ Relatório mensal simples: investimento x contatos gerados\n\n✅ Incluído: configuração de conversões, remarketing e criativos dos anúncios.\n\n📊 Mercado (fee de gestão): R$ 997–2.500/mês → 💰 *Aqui: R$ 387/mês* + verba de anúncio (você define, sugerido a partir de R$ 1.500/mês)",
  "Design & Redes Sociais":
    "🎨 *Design & Redes Sociais*\nSua marca bonita e consistente em todo lugar.\n\n*Como funciona:*\n1️⃣ Criação ou renovação do logotipo e paleta de cores\n2️⃣ Kit de artes prontas: posts, stories e capas (Instagram, Facebook, WhatsApp)\n3️⃣ Banners para divulgar seu novo site no lançamento\n4️⃣ Pacote recorrente de artes mensais, se quiser\n\n✅ Incluído: arquivos em alta resolução + versões para todas as redes.\n\n📊 Mercado: R$ 500–3.000 → 💰 *Aqui: kit de lançamento R$ 237* • Pacote mensal (12 artes): R$ 297/mês",
};

/** Escapa HTML para evitar injeção (o texto do usuário é ecoado nas respostas). */
const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Formata *negrito* com segurança, escapando o restante. */
const formatMsg = (s: string) => escapeHtml(s).replace(/\*(.+?)\*/g, "<b>$1</b>");

/** Verifica se a palavra existe isolada (evita "ia" casar dentro de "dia"/"família"). */
const hasWord = (text: string, word: string) =>
  new RegExp(`(^|[^a-zà-ú0-9])${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-zà-ú0-9]|$)`, "i").test(text);

const KB: { keys: string[]; answer: string; options?: string[] }[] = [
  {
    keys: ["prazo", "tempo", "quanto tempo", "entrega", "rápido"],
    answer:
      "⏱️ Prazos médios: landing page em 3–5 dias úteis, site institucional em 7–12 dias e e-commerce/sistemas em 20–30 dias. Projetos urgentes entram em modo turbo.",
    options: ["Ver planos", "Quero um orçamento", "Falar no WhatsApp"],
  },
  {
    keys: ["ia", "inteligência", "inteligencia", "agente", "chatbot", "bot", "automação", "automacao"],
    answer:
      "🤖 Sim! Instalamos um Agente de IA igual a este no seu site: responde clientes 24h, oferece planos, confirma pedidos e envia tudo pronto para o seu WhatsApp. Integra com Instagram Direct e e-mail.",
    options: ["Ver planos", "Falar com o Adilton"],
  },
  {
    keys: ["serviço", "servico", "fazem", "o que"],
    answer:
      "🚀 Criamos: Landing Pages, Sites institucionais, Lojas virtuais, Sistemas web, Agentes de IA, SEO/Google Ads e artes para redes sociais.",
    options: ["Ver planos", "Ver portfólio", "Falar no WhatsApp"],
  },
  {
    keys: ["portfólio", "portfolio", "exemplo", "referência", "referencia"],
    answer:
      "🎨 Role até a seção Portfólio — toque em qualquer modelo para ampliar e escolher comigo aqui no chat. Temos clínicas, advocacia, restaurantes, academias, imobiliárias, e-commerce, construtoras e tecnologia.",
    options: ["Ver planos", "Falar com o Adilton"],
  },
  {
    keys: ["seo", "google", "aparecer", "tráfego", "trafego", "ads"],
    answer:
      "📈 Todo site sai com SEO técnico + nota alta no PageSpeed. Também gerenciamos Google Ads e Meta Ads com relatórios mensais.",
    options: ["Ver planos", "Falar no WhatsApp"],
  },
  {
    keys: ["celular", "mobile", "smartphone", "responsivo"],
    answer: "📱 100% responsivo, mobile-first, carregando em menos de 2 segundos.",
    options: ["Ver planos", "Falar no WhatsApp"],
  },
  {
    keys: ["email", "e-mail", "contato", "telefone", "whats"],
    answer:
      "📞 WhatsApp: (69) 99265-7490 • ✉️ E-mail: adilton.pvh.junior@gmail.com — Atendimento de segunda a sábado, 8h às 20h.",
    options: ["Falar no WhatsApp", "Ver planos"],
  },
  {
    keys: ["dúvida", "duvida", "dúvidas", "duvidas", "tirar dúvidas", "ajuda"],
    answer:
      "Claro! 🙋 Posso responder sobre:\n\n• *Preços e planos*\n• *Prazos de entrega*\n• *Agente de IA 24h*\n• *Portfólio e modelos*\n• *SEO e anúncios*\n\nÉ só perguntar ou tocar em uma opção:",
    options: ["Ver planos", "Ver prazos", "Ver portfólio", "Falar com o Adilton"],
  },
  {
    keys: ["oi", "olá", "ola", "bom dia", "boa tarde", "boa noite", "e aí", "eai"],
    answer: "👋 Olá! Sou a *Nova*, agente de IA da Adilton Dev. Como posso te ajudar hoje?",
    options: ["Ver serviços", "Ver planos", "Quero um orçamento"],
  },
  {
    keys: ["preço", "preco", "valor", "quanto", "custa", "orçamento", "orcamento", "plano", "quero"],
    answer:
      "💰 Investimento de mercado (Brasil 2026): landing pages custam R$ 2.200–3.500 e sites profissionais R$ 5.600–9.000. Nosso time entrega o mesmo nível por menos:\n\n💎 *Essencial* — R$ 1.090 (landing premium + Pixel)\n⭐ *Profissional* — R$ 2.430 (site completo + blog + IA)\n👑 *Enterprise* — R$ 4.110 (e-commerce/sistema + IA treinada)\n\nParcelamos em até 12x. Escolha um plano para eu montar seu pedido:",
    options: PLAN_OPTIONS,
  },
];

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const orderRef = useRef<{ model?: string; plan?: (typeof PLANS)[number] }>({});
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      text: "👋 Oi! Sou a *Nova*, agente de IA da Adilton Dev. Respondo sobre modelos, planos e fecho seu pedido em segundos.",
      options: ["Ver planos", "Tirar dúvidas", "Falar com o Adilton"],
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!open) return;
    // block:"nearest" evita que a página inteira role ao abrir o chat
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [msgs, typing, open]);

  // limpa timeouts pendentes ao desmontar (evita setState em componente desmontado)
  useEffect(() => {
    const list = timers;
    return () => {
      list.current.forEach((id) => clearTimeout(id));
      list.current = [];
    };
  }, []);

  const pushBot = (msg: Msg, delay = 800) => {
    setTyping(true);
    const id = window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, msg]);
      timers.current = timers.current.filter((t) => t !== id);
    }, delay);
    timers.current.push(id);
  };

  const plansMsg = (): Msg => ({
    from: "bot",
    text: "💎 Nossos planos (o mesmo trabalho custa R$ 5.600–9.000 em agências):\n\n• *Essencial* — R$ 1.090 → landing page premium, 5 dias\n• *Profissional* — R$ 2.430 → site completo, blog + IA\n• *Enterprise* — R$ 4.110 → e-commerce/sistema sob medida\n\nParcelamos em até 12x. Toque em um deles para continuar:",
    options: PLAN_OPTIONS,
  });

  const orderSummary = (plan?: (typeof PLANS)[number]) =>
    `Novo pedido — AdiltonDev ✨\n\n🧩 Modelo de referência: ${orderRef.current.model ?? "personalizar do zero"}\n💎 Plano: ${(plan ?? orderRef.current.plan)?.name ?? "a combinar"} (${
      (plan ?? orderRef.current.plan)?.price ?? "a combinar"
    })\n\nPedido confirmado pelo chat. Quero iniciar a produção do meu site! Quais os próximos passos?`;

  const checkoutMsg = (): Msg => ({
    from: "bot",
    text:
      `Pedido registrado com sucesso! 🎉\n\n📋 *Resumo:*\n🧩 Modelo: ${orderRef.current.model ?? "personalizado"}\n💎 Plano: ${orderRef.current.plan?.name ?? "a combinar"} (${
        orderRef.current.plan?.price ?? "a combinar"
      })\n\n➡️ Último passo: toque no botão verde abaixo para enviar seu pedido direto ao *Adilton*. Ele responde rapidinho, alinha cores, logotipo e textos com você e já inicia a produção. 👨‍💻`,
    cta: { label: "🟢 Finalizar venda no WhatsApp", href: WA(orderSummary()) },
    options: ["Corrigir meu pedido", "Enviar por e-mail"],
  });

  const smartReply = (t: string): Msg => {
    const low = t.toLowerCase();

    // escolha de plano
    const plan = PLANS.find((p) => p.kw.some((k) => low.includes(k)));
    if (plan) {
      orderRef.current.plan = plan;
      return {
        from: "bot",
        text:
          `${plan.explain}\n\n🧩 Modelo de referência: *${orderRef.current.model ?? "personalizado (montamos do zero para sua marca)"}*\n\n📞 *Fale com o Adilton para fechar:*\n• WhatsApp: (69) 99265-7490\n• E-mail: ${EMAIL}\n\nQuer que eu envie o pedido agora?`,
        cta: {
          label: "🟢 Falar com o Adilton no WhatsApp",
          href: WA(
            `Olá Adilton! Tenho interesse no Plano ${plan.name} (${plan.price}). A Nova me explicou como funciona e quero continuar a conversa.`
          ),
        },
        options: ["✅ Confirmar pedido", "Quero outro plano", "Enviar e-mail"],
      };
    }

    // ajuda para escolher o plano
    if (low.includes("me ajude") || low.includes("ajude a escolher") || low.includes("qual plano")) {
      return {
        from: "bot",
        text:
          "Vou te ajudar! 🤝 Responda rápido:\n\n• Precisa só de *uma página* para divulgar e captar contatos? → *Essencial (R$ 1.090)*\n• Quer o *site completo* da empresa, com blog, SEO e IA atendendo 24h? → *Profissional (R$ 2.430)* ⭐ mais indicado\n• Vai *vender produtos online* ou precisa de sistema/painel? → *Enterprise (R$ 4.110)*\n\nQual desses casos é o seu?",
        options: PLAN_OPTIONS,
      };
    }

    // erro/correção
    if (low.includes("outro plano") || low.includes("corrigir")) return plansMsg();

    // confirmação da venda
    if (low.includes("confirmar") || low.includes("✅")) return checkoutMsg();

    // e-mail do pedido
    if ((low.includes("e-mail") || low.includes("email")) && low.includes("enviar")) {
      const href = `mailto:${EMAIL}?subject=${encodeURIComponent("Novo pedido — site premium")}&body=${encodeURIComponent(
        `Modelo: ${orderRef.current.model ?? "personalizado"}\nPlano: ${orderRef.current.plan?.name ?? "a combinar"} (${orderRef.current.plan?.price ?? ""})\n\nQuero iniciar a produção!`
      )}`;
      return { from: "bot", text: "Clique abaixo para enviar o pedido por e-mail ao Adilton: 📩", cta: { label: "✉️ Enviar e-mail com pedido", href } };
    }

    // base de conhecimento (saudações primeiro, para "bom dia" não cair em "ia")
    const greeting = KB.find((k) => k.keys.includes("oi"));
    if (greeting && greeting.keys.some((key) => hasWord(low, key))) {
      return { from: "bot", text: greeting.answer, options: greeting.options };
    }

    const hit = KB.find((k) =>
      k.keys.some((key) => (key.length <= 3 ? hasWord(low, key) : low.includes(key)))
    );
    if (hit) return { from: "bot", text: hit.answer, options: hit.options };

    return {
      from: "bot",
      text: `Entendi: "${t}". 📝 Posso te mostrar planos, falar de prazos, portfólio — ou você toca em um modelo na seção Portfólio e eu monto o pedido completo aqui.`,
      options: ["Ver planos", "Ver prazos", "Falar com o Adilton"],
    };
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;

    setMsgs((m) => [...m, { from: "user", text: t }]);
    setInput("");

    const low0 = t.toLowerCase();
    if (low0.includes("portfólio") || low0.includes("portfolio")) scrollToSection("portfolio");
    if (low0.includes("ver planos")) scrollToSection("planos");

    if (/falar com o adilton|falar no whatsapp/i.test(t)) {
      pushBot({
        from: "bot",
        text: "Perfeito! Toque no botão e fale direto com o Adilton: 👇\n\n📞 WhatsApp: (69) 99265-7490\n✉️ E-mail: " + EMAIL,
        cta: { label: "🟢 Abrir WhatsApp do Adilton", href: WA("Olá Adilton! Vim pelo seu site e quero conversar sobre meu projeto.") },
      });
      return;
    }

    if (/enviar e-mail|enviar email/i.test(t)) {
      const href = `mailto:${EMAIL}?subject=${encodeURIComponent("Contato pelo site — Agente de IA")}&body=${encodeURIComponent("Olá Adilton! Vim pelo seu site e quero conversar sobre o Agente de IA / meu projeto.")}`;
      pushBot({
        from: "bot",
        text: `Claro! Toque no botão para me enviar um e-mail direto: 📩\n\n✉️ ${EMAIL}`,
        cta: { label: "✉️ Enviar e-mail ao Adilton", href },
      });
      return;
    }

    pushBot(smartReply(t));
  };

  // eventos: outra parte do site escolhe um modelo → abre o robô oferecendo planos
  useEffect(() => {
    const onModel = (e: Event) => {
      const d = (e as CustomEvent).detail as { title: string; segment: string } | undefined;
      if (!d) return;
      orderRef.current.model = d.title;
      setOpen(true);
      setMsgs((m) => [...m, { from: "user", text: `✨ Escolhi o modelo ${d.title}` }]);
      pushBot({
        from: "bot",
        text: `Ótima escolha! 🎨 O modelo *${d.title}* (${d.segment}) combina muito com esse segmento — totalmente personalizável com suas cores, logotipo e textos.\n\nAgora escolha o plano:`,
        options: PLAN_OPTIONS,
      });
    };
    window.addEventListener("nova:model", onModel as EventListener);

    const onService = (e: Event) => {
      const d = (e as CustomEvent).detail as { title: string } | undefined;
      if (!d) return;
      setOpen(true);
      setMsgs((m) => [...m, { from: "user", text: `Me explica como funciona: ${d.title}` }]);
      const info =
        SERVICE_INFO[d.title] ??
        `Aqui está como funciona *${d.title}*: montamos tudo sob medida para a sua empresa, do layout à publicação, com suporte total. Quer os detalhes com o Adilton?`;
      pushBot({
        from: "bot",
        text: `${info}\n\n📞 *Fale direto com o Adilton:*\n• WhatsApp: (69) 99265-7490\n• E-mail: ${EMAIL}\n\n➡️ Toque no botão abaixo e continue a conversa comigo no WhatsApp — o Adilton tira as últimas dúvidas e já inicia seu projeto:`,
        cta: {
          label: "🟢 Falar com o Adilton no WhatsApp",
          href: WA(`Olá Adilton! Tenho interesse em: ${d.title}. A Nova me explicou como funciona e quero continuar a conversa.`),
        },
        options: ["Ver planos", "Ver portfólio", "Enviar e-mail"],
      });
    };
    window.addEventListener("nova:service", onService as EventListener);

    const onPlan = (e: Event) => {
      const d = (e as CustomEvent).detail as { name: string; price: string } | undefined;
      if (!d) return;
      const plan = PLANS.find((p) => p.name.toLowerCase() === d.name.toLowerCase()) ?? {
        name: d.name,
        price: d.price.startsWith("R$") ? d.price : `R$ ${d.price}`,
        desc: "",
        kw: [],
        explain: `💎 *Plano ${d.name}* — R$ ${d.price}\nPlano selecionado no site. Posso te explicar os detalhes e chamar o Adilton.`,
      };
      orderRef.current.plan = plan as (typeof PLANS)[number];
      setOpen(true);
      setMsgs((m) => [...m, { from: "user", text: `Quero o Plano ${d.name} — R$ ${d.price}` }]);
      pushBot({
        from: "bot",
        text:
          `${plan.explain}\n\n🧩 Modelo: *${orderRef.current.model ?? "personalizado (montamos do zero para sua marca)"}*\n\n📞 *Fale direto com o Adilton:*\n• WhatsApp: (69) 99265-7490\n• E-mail: ${EMAIL}\n\n➡️ Toque no botão verde para continuar no WhatsApp, ou confirme o pedido aqui:`,
        cta: {
          label: "🟢 Falar com o Adilton no WhatsApp",
          href: WA(
            `Olá Adilton! Tenho interesse no Plano ${plan.name} (${plan.price}). A Nova me explicou como funciona e quero fechar.`
          ),
        },
        options: ["✅ Confirmar pedido", "Ver outros planos", "Enviar e-mail"],
      });
    };
    window.addEventListener("nova:plan", onPlan as EventListener);

    // "Quero meu site agora" → apresenta os planos e depois leva ao contato
    const onStart = () => {
      setOpen(true);
      setMsgs((m) => [...m, { from: "user", text: "Quero meu site agora 🚀" }]);
      pushBot({
        from: "bot",
        text:
          "Perfeito! 🚀 Vou te explicar rapidinho como funciona:\n\n1️⃣ Você escolhe um plano (ou eu te ajudo a escolher)\n2️⃣ Em até *48h* você recebe o protótipo visual\n3️⃣ Aprovando, desenvolvemos com SEO, velocidade e IA\n4️⃣ Publicamos e você começa a receber clientes\n\n💎 *Nossos planos:*\n• *Essencial* — R$ 1.090 → landing page premium (5 dias)\n• *Profissional* — R$ 2.430 → site completo + blog + IA (mais vendido)\n• *Enterprise* — R$ 4.110 → e-commerce/sistema + IA treinada\n\nParcelamos em até 12x. Qual combina mais com você?",
        options: PLAN_OPTIONS,
      });
      // logo depois, reforça o contato direto
      pushBot(
        {
          from: "bot",
          text: `Se preferir, já pode falar direto com o *Adilton*:\n\n📞 WhatsApp: (69) 99265-7490\n✉️ E-mail: ${EMAIL}`,
          cta: {
            label: "🟢 Falar com o Adilton no WhatsApp",
            href: WA("Olá Adilton! Quero meu site agora. A Nova me explicou os planos e quero fechar."),
          },
          options: ["🤝 Me ajude a escolher", "Enviar e-mail"],
        },
        2200
      );
    };
    window.addEventListener("nova:start", onStart as EventListener);

    return () => {
      window.removeEventListener("nova:model", onModel as EventListener);
      window.removeEventListener("nova:service", onService as EventListener);
      window.removeEventListener("nova:plan", onPlan as EventListener);
      window.removeEventListener("nova:start", onStart as EventListener);
    };
  }, []);

  return (
    <>
      {/* botão flutuante do robô (WhatsApp/e-mail ficam no FloatingContacts à esquerda) */}
      <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3">
        <button
          onClick={() => setOpen((o) => !o)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-violet-600 text-2xl shadow-xl transition hover:scale-110"
          aria-label="Agente de IA"
        >
          {open ? "✕" : "🤖"}
        </button>
      </div>

      {/* janela do chat */}
      {open && (
        <div className="fixed bottom-24 right-3 z-[55] flex h-[70vh] max-h-[560px] w-[92vw] max-w-sm flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#0b0620]/95 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 bg-gradient-to-r from-violet-700 via-fuchsia-600 to-cyan-500 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xl">🤖</div>
            <div>
              <p className="text-sm font-bold text-white">Nova · Agente de Vendas IA</p>
              <p className="flex items-center gap-1 text-[11px] text-white/80">
                <span className="h-2 w-2 rounded-full bg-green-300" /> online agora
              </p>
            </div>
          </div>

          <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === "user" ? "text-right" : ""}>
                <div
                  className={`inline-block max-w-[88%] rounded-2xl px-3.5 py-2.5 text-left text-sm leading-relaxed whitespace-pre-line ${
                    m.from === "user"
                      ? "rounded-br-sm bg-gradient-to-br from-cyan-500 to-violet-600 text-white"
                      : "rounded-bl-sm bg-white/10 text-white/90"
                  }`}
                  dangerouslySetInnerHTML={{ __html: formatMsg(m.text) }}
                />
                {m.cta && (
                  <div className="mt-2">
                    <a
                      href={m.cta.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 px-5 py-2.5 text-[13px] font-black text-black shadow-lg transition hover:scale-105"
                    >
                      {m.cta.label}
                    </a>
                  </div>
                )}
                {m.options && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.options.map((o) => (
                      <button
                        key={o}
                        onClick={() => send(o)}
                        className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-[11px] text-cyan-200 transition hover:bg-cyan-400/25"
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="inline-flex gap-1 rounded-2xl bg-white/10 px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-white"
                    style={{ animation: `blink 1.2s ${i * 0.15}s infinite` }}
                  />
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-white/10 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 rounded-full bg-white/10 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/40 focus:ring-2 focus:ring-cyan-400"
            />
            <button
              type="submit"
              className="rounded-full bg-gradient-to-br from-cyan-400 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}
