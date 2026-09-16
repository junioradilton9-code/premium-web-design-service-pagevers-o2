/**
 * ⚙️ CONFIGURAÇÃO CENTRAL DO SITE
 * Altere aqui — vale para o site inteiro.
 */

/**
 * 🌐 DOMÍNIO REAL
 * Troque pelo seu domínio definitivo (sem barra no final).
 * Depois de alterar aqui, atualize também:
 *   - index.html      (canonical, og:url, og:image, twitter:image, schema)
 *   - public/robots.txt (linha Sitemap)
 *   - public/sitemap.xml (tag <loc>)
 */
export const SITE_URL = "https://adiltondev.netlify.app";

export const SITE_NAME = "AdiltonDev";

/**
 * 📊 PROVA SOCIAL
 * ⚠️ IMPORTANTE: use apenas números REAIS.
 * Números inflados geram quebra de confiança e problemas com o Código de Defesa do Consumidor.
 * Ajuste os valores abaixo conforme o seu histórico atual.
 */
export const STATS = {
  /** Projetos realmente publicados */
  projetos: 40,
  /** Média de avaliação (use a real; se ainda não tiver, remova este item) */
  avaliacao: 5.0,
  /** % de entregas dentro do prazo combinado */
  noPrazo: 100,
  /** Horas para o primeiro protótipo visual */
  prototipoHoras: 48,
};

/** Faixa exibida abaixo do FAQ */
export const STATS_STRIP = [
  { to: STATS.noPrazo, suffix: "%", label: "entregas dentro do prazo combinado" },
  { to: STATS.avaliacao, decimals: 1, suffix: "★", label: "média de avaliação dos clientes" },
  { to: STATS.projetos, prefix: "+", label: "projetos publicados" },
  { to: STATS.prototipoHoras, suffix: "h", label: "para o primeiro protótipo" },
];

/** Contadores do topo (hero) */
export const HERO_STATS = [
  { to: STATS.projetos, prefix: "+", label: "Projetos" },
  { to: STATS.avaliacao, decimals: 1, suffix: "★", label: "Avaliação" },
  { to: STATS.prototipoHoras, suffix: "h", label: "Protótipo" },
];
