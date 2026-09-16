import Counter from "./Counter";
import Reveal from "./Reveal";
import { STATS_STRIP } from "../config/site";

export default function StatsStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <Reveal>
        <div className="glass grid grid-cols-2 gap-3 rounded-3xl border border-white/10 p-4 md:grid-cols-4 md:p-6">
          {STATS_STRIP.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/[0.03] px-3 py-4 text-center">
              <p className="text-2xl font-black gradient-text md:text-3xl">
                <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </p>
              <p className="mt-1 text-[11px] font-medium leading-snug text-white/55 md:text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
