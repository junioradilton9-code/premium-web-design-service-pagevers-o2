# AdiltonDev — Sites Premium e Agentes de IA

Landing page premium de venda de sites, lojas virtuais e agentes de IA, com robô de atendimento
que explica os serviços, monta o pedido e encaminha o cliente direto para o WhatsApp.



---

## ✨ Principais recursos

- **Agente de IA (Nova)** — explica serviços e planos, monta o pedido e leva o cliente ao WhatsApp
- **Portfólio interativo** — 8 modelos por segmento, com miniatura rolável e visualização em tela cheia
- **Planos** — Essencial, Profissional e Enterprise com CTA integrado ao robô
- **FAQ** em acordeão
- **Contadores animados** e selos de confiança
- **Fundo animado** (aurora, partículas, formas 3D, scanline)
- **100% responsivo** com menu mobile
- **SEO completo** — Open Graph, Twitter Card, Schema.org, sitemap e robots

---

## 🛠️ Tecnologias

- React + TypeScript
- Vite
- Tailwind CSS

---

## 🚀 Como rodar localmente

```bash
# instalar dependências
npm install

# ambiente de desenvolvimento
npm run dev

# build de produção
npm run build

# pré-visualizar o build
npm run preview
```

O build final fica na pasta `dist/`.

---

## ⚙️ Configuração

### 1. Contatos

Arquivo: `src/utils/contact.ts`

```ts
export const WHATSAPP_NUMBER = "5569992657490";
export const WHATSAPP_DISPLAY = "(69) 99265-7490";
export const EMAIL = "adilton.pvh.junior@gmail.com";
```

### 2. Domínio e números de prova social

Arquivo: `src/config/site.ts`

```ts
export const SITE_URL = "https://www.adiltondev.com.br";

export const STATS = {
  projetos: 40,        // projetos realmente publicados
  avaliacao: 5.0,      // média real de avaliação
  noPrazo: 100,        // % de entregas no prazo
  prototipoHoras: 48,  // horas para o protótipo
};
```

> ⚠️ Use apenas números **reais**. Dados inflados quebram a confiança do cliente.

### 3. Ao trocar de domínio

Atualize em **4 lugares**:

| Arquivo | O que alterar |
|---|---|
| `src/config/site.ts` | `SITE_URL` |
| `index.html` | `canonical`, `og:url`, `og:image`, `twitter:image`, `schema` |
| `public/robots.txt` | linha `Sitemap:` |
| `public/sitemap.xml` | tag `<loc>` |

---

## 📦 Deploy

### Netlify
1. Conecte o repositório
2. Build command: `npm run build`
3. Publish directory: `dist`

O arquivo `public/_redirects` já está incluído.

### Vercel
1. Importe o repositório
2. Framework: **Vite** (detectado automaticamente)
3. Output directory: `dist`

### Hospedagem tradicional (cPanel / Hostinger)
1. Rode `npm run build`
2. Envie **todo o conteúdo** de `dist/` para `public_html`

### GitHub Pages
O workflow em `.github/workflows/deploy.yml` publica automaticamente a cada push na `main`.
Ative em **Settings → Pages → Source: GitHub Actions**.

---

## 📁 Estrutura

```
src/
├── components/
│   ├── AiChat.tsx          # Robô Nova
│   ├── BackgroundFX.tsx    # Fundo animado
│   ├── Counter.tsx         # Contador animado
│   ├── Faq.tsx             # Acordeão
│   ├── FloatingContacts.tsx# WhatsApp + e-mail flutuantes
│   ├── ModelViewer.tsx     # Modal tela cheia
│   ├── Reveal.tsx          # Animação ao rolar
│   ├── SiteMock.tsx        # Card de modelo
│   ├── StatsStrip.tsx      # Faixa de estatísticas
│   └── TrustBadges.tsx     # Selos de confiança
├── config/
│   └── site.ts             # Domínio e prova social
├── utils/
│   └── contact.ts          # WhatsApp e e-mail
├── App.tsx
├── index.css
└── main.tsx

public/
├── models/                 # Imagens do portfólio
├── _redirects
├── robots.txt
└── sitemap.xml
```

---

## 📞 Contato

- **WhatsApp:** (69) 99265-7490
- **E-mail:** adilton.pvh.junior@gmail.com
- **Atendimento:** segunda a sábado, 8h às 20h

---

© AdiltonDev — Todos os direitos reservados.
