"use client";

import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import { codeStream, techFilters, techUniverse, type TechCategory } from "@/data/site";

type Filter = "All Skills" | TechCategory;

export default function TechTransmission() {
  const [active, setActive] = useState<Filter>("All Skills");

  const items = useMemo(
    () =>
      active === "All Skills"
        ? techUniverse
        : techUniverse.filter((t) => t.category === active),
    [active]
  );

  const countFor = (filter: Filter) =>
    filter === "All Skills"
      ? techUniverse.length
      : techUniverse.filter((t) => t.category === filter).length;

  return (
    <section className="section transmission" id="tech" aria-labelledby="tech-title">
      {/* Falling syntax backdrop — purely decorative */}
      <div className="code-stream" aria-hidden="true">
        <div className="code-stream-track">
          {[0, 1, 2, 3].map((col) => (
            <div className="code-col" key={col}>
              {/* duplicated once so the fall loops seamlessly */}
              {[...codeStream, ...codeStream].map((line, i) => (
                <span key={`${col}-${i}`}>{line}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="transmission-veil" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="editorial-head">
          <div>
            <Reveal>
              <p className="live-head">
                <span className="live-dot" aria-hidden="true" />
                Live Technology Transmission
              </p>
            </Reveal>
            <h2 className="section-title mt-5" id="tech-title">
              The stack behind <span className="serif-accent">the work</span>
            </h2>
            <p className="section-subtitle mt-4">
              Recruitment operations run on discipline. These are the tools that make it
              faster — filter by lane.
            </p>
          </div>
          <p className="editorial-meta">
            <span className="editorial-meta-num">{String(techUniverse.length).padStart(2, "0")}</span>
            <span className="editorial-meta-line" aria-hidden="true" />
            Technologies
          </p>
        </div>

        <div className="filter-row mt-10" role="tablist" aria-label="Filter technologies">
          {techFilters.map((filter) => {
            const isActive = active === filter;
            const count = countFor(filter);
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`filter-chip ${isActive ? "is-active" : ""}`}
                onClick={() => setActive(filter)}
              >
                {filter}
                <span className="filter-count" aria-hidden="true">
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        <ul className="tech-grid mt-10" key={active} aria-live="polite">
          {items.map((t, i) => (
            <li
              className="tech-badge corner-frame"
              key={t.name}
              style={{ animationDelay: `${Math.min(i, 12) * 35}ms` }}
            >
              <span className="tech-badge-name">{t.name}</span>
              <span className="tech-badge-cat">{t.category}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
