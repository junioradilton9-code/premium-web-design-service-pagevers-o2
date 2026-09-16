/** Contatos do Adilton — usados em todos os CTAs do site. */

// WhatsApp: DDD 69 (Rondônia) + número 99265-7490, com código do Brasil (55)
export const WHATSAPP_NUMBER = "5569992657490";
export const WHATSAPP_DISPLAY = "(69) 99265-7490";
export const EMAIL = "adilton.pvh.junior@gmail.com";

/**
 * Link universal do WhatsApp: abre o app no celular
 * e o WhatsApp Web (web.whatsapp.com) no computador.
 */
export const wa = (message: string) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;

/** E-mail já com assunto e corpo preenchidos */
export const mail = (subject: string, body: string) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

