import { EMAIL, mail, wa } from "../utils/contact";

/** Dois botões flutuantes: WhatsApp (verde) + E-mail (roxo). */
export default function FloatingContacts() {
  return (
    <div className="fixed bottom-24 left-4 z-50 flex flex-col items-start gap-3 sm:bottom-5">
      <a
        href={wa("Olá Adilton! Quero um orçamento para meu site.")}
        target="_blank"
        rel="noreferrer"
        className="animate-pulse-ring icon-hover-freeze flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition hover:scale-110"
        aria-label="WhatsApp"
        title="WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.599 5.317l-.999 3.648 3.889-.664zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.372-.025-.521-.074-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414z" />
        </svg>
      </a>
      <a
        href={mail("Contato pelo site", "Olá Adilton! Vim pelo site e quero conversar sobre meu projeto.")}
        className="icon-hover-freeze flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-xl text-white shadow-xl transition hover:scale-110"
        aria-label="E-mail"
        title={EMAIL}
      >
        ✉️
      </a>
    </div>
  );
}
