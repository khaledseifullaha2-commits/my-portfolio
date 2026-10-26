import Reveal from "./Reveal";
import { milestones } from "@/data/site";

const count = String(milestones.length).padStart(2, "0");

export default function Milestones() {
  return (
    <section className="section" id="milestones" aria-labelledby="milestones-title">
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="editorial-head">
          <div>
            <Reveal>
              <p className="section-index">A Chronology</p>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="section-title mt-5" id="milestones-title">
                The path <span className="serif-accent">so far</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <p className="editorial-meta">
              <span className="editorial-meta-num">{count}</span>
              <span className="editorial-meta-line" aria-hidden="true" />
              Milestones
            </p>
          </Reveal>
        </div>

        <ol className="milestone-rail mt-14">
          {milestones.map((m, i) => (
            <li key={m.index} className="milestone">
              <Reveal delay={i * 70}>
                <span className="milestone-node" aria-hidden="true" />
                <article className="milestone-card corner-frame">
                  <div className="milestone-top">
                    <span className="milestone-index">{m.index}</span>
                    <span className="milestone-range">{m.range}</span>
                  </div>
                  <h3 className="milestone-title">{m.title}</h3>
                  <p className="milestone-org">{m.org}</p>
                  <p className="milestone-text">{m.text}</p>
                  <div className="stack-chips">
                    {m.tags.map((t) => (
                      <span key={t} className="stack-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
