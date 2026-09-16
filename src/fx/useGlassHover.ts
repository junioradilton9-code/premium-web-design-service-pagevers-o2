import { useEffect } from "react";
import { sound } from "./useSound";

/**
 * Liga as técnicas visuais aos elementos que já existem no site:
 *  • .glass-hover  → atualiza --gx/--gy para a refração seguir o cursor
 *  • botões/links  → som procedural no clique (chime) e no hover de CTA
 * Usa delegação de eventos: 2 listeners para o site inteiro (barato).
 */
export function useGlassHover() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(".glass-hover");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
    };

    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const btn = t.closest("button, a[href]");
      if (!btn) return;

      const txt = (btn.textContent ?? "").toLowerCase();
      // som conforme o tipo de ação
      if (txt.includes("whatsapp") || txt.includes("contratar") || txt.includes("quero")) {
        sound.pour();
      } else if (btn.closest("[data-panel]") || txt.includes("ampliar")) {
        sound.page();
      } else {
        sound.chime();
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, []);
}
