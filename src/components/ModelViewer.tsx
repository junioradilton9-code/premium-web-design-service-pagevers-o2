import { useEffect } from "react";

export type Model = {
  title: string;
  segment: string;
  url: string;
  img: string;
  tags: string[];
};

export default function ModelViewer({
  model,
  onClose,
}: {
  model: Model | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    document.body.style.overflow = model ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [model, onClose]);

  if (!model) return null;

  const choose = () => {
    window.dispatchEvent(new CustomEvent("nova:model", { detail: model }));
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-6"
      onClick={onClose}
    >
      <div
        className="glass comic-panel w-full max-w-3xl overflow-hidden rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "fadeUp .35s cubic-bezier(.2,.7,.3,1) both" }}
      >
        {/* barra do navegador */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-black/50 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
          <div className="ml-2 flex-1 truncate rounded-md bg-white/10 px-3 py-1 text-xs text-white/60">
            {model.url} — visualização em tela cheia
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white transition hover:bg-white/25"
          >
            ✕ Fechar
          </button>
        </div>

        {/* imagem com rolagem (scroll do mouse + rolagem automática) */}
        <div
          className="no-scrollbar max-h-[62vh] overflow-y-auto"
          onWheel={(e) => {
            const container = e.currentTarget;
            container.scrollTop += e.deltaY * 1.1;
          }}
        >
          <img src={model.img} alt={`Modelo de site ${model.title}`} decoding="async" className="block w-full" />
        </div>

        {/* rodapé */}
        <div className="flex flex-col gap-4 border-t border-white/10 bg-[#0b0620]/95 p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-white">{model.title}</h3>
              <span className="rounded-full bg-cyan-400/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                {model.segment}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {model.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={choose}
            className="shrink-0 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-600 px-6 py-3.5 text-sm font-black text-white shadow-[0_0_30px_-6px_rgba(168,85,247,.9)] transition hover:scale-105"
          >
            ✨ Quero este modelo
          </button>
        </div>
      </div>
    </div>
  );
}
