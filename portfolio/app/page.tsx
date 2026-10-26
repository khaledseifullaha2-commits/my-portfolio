import type { Metadata } from "next";
import Link from "next/link";
import ThreeDCard from "@/components/ThreeDCard";
import Reveal from "@/components/Reveal";
import WaveDivider from "@/components/WaveDivider";
import MagneticButton from "@/components/MagneticButton";
import RoleTypewriter from "@/components/RoleTypewriter";
import { site, experience, projects, skillsUniverse, contactLinks } from "@/data/site";

export const metadata: Metadata = {
  title: `${site.name} | ${site.role}`,
  description: site.description,
};

const CV_PATH = "/Khaled-Seifullaha-CV.pdf";

export default function HomePage() {
  const role = experience[0];

  return (
    <>
      {/* ─── 00 · Masthead ─── */}
      <section className="relative overflow-hidden" aria-label="Introduction">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-20 lg:grid-cols-2 lg:pt-24">
          <div className="relative">
            <Reveal>
              <p className="masthead-eyebrow">Talent &amp; Recruitment Automation</p>
            </Reveal>
            <Reveal delay={70}>
              <h1 className="hero-title mt-7">
                <span className="gradient-text">{site.name}</span>
                <br />
                Executive talent,{" "}
                <span className="serif-accent">sourced</span> with intelligence.
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <p className="hero-badge">
                  <span className="status-dot" aria-hidden="true" />
                  Talent Specialist at Enroute International Limited
                </p>
                <p className="hero-role">
                  <RoleTypewriter />
                </p>
              </div>
            </Reveal>
            <Reveal delay={210}>
              <p className="hero-sub mt-6">{site.heroSub}</p>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <MagneticButton>
                  <Link href="#projects" className="btn btn-primary">
                    Explore Projects
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <a
                    href={CV_PATH}
                    className="btn btn-secondary"
                    aria-label="Download Khaled Seifullaha's CV as PDF"
                  >
                    Download CV
                  </a>
                </MagneticButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <ThreeDCard />
          </Reveal>
        </div>
        <WaveDivider />
      </section>

      {/* ─── 01 · Selected Work ─── */}
      <section className="section" id="projects">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="section-index">01 / Selected Work</p>
            <h2 className="section-title mt-5">
              Tools that give recruiters <span className="serif-accent">their hours back</span>
            </h2>
            <p className="section-subtitle mt-4">
              Recruitment workflows, AI agents, and web tools built to remove the manual
              busywork from hiring.
            </p>
          </Reveal>
          <div className="project-grid mt-12">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <article className="project-card">
                  <span className="project-index">{p.index}</span>
                  <h3 className="project-name">{p.name}</h3>
                  <p className="project-tagline">{p.tagline}</p>
                  {p.stack?.length ? (
                    <div className="stack-chips">
                      {p.stack.map((t) => (
                        <span key={t} className="stack-chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className="project-links">
                    {p.external ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        {p.cta} ↗
                      </a>
                    ) : (
                      <Link href={p.href} className="project-link">
                        {p.cta} →
                      </Link>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 02 · Experience ─── */}
      <section className="section" id="experience">
        <div className="hero-orb hero-orb-2" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="section-index">02 / Experience</p>
            <h2 className="section-title mt-5">
              End-to-end recruitment, <span className="serif-accent">done carefully</span>
            </h2>
            <p className="section-subtitle mt-4">
              Managing the full candidate lifecycle at {role.company}, from first sourcing
              message to signed offer.
            </p>
          </Reveal>
          <div className="timeline mt-12">
            <Reveal>
              <div className="timeline-item">
                <span className="timeline-dot" aria-hidden="true" />
                <div className="timeline-card">
                  <p className="timeline-date">{role.date}</p>
                  <h3>{role.role}</h3>
                  <p className="timeline-company">
                    {role.company} · {role.location}
                  </p>
                  <ul>
                    {role.responsibilities.slice(0, 4).map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link
                      href="/experience"
                      className="nav-link inline-flex items-center gap-2 text-accent-light hover:text-foreground"
                    >
                      Full career timeline →
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── 03 · Skills Universe ─── */}
      <section className="section" id="skills">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="section-index">03 / Skills Universe</p>
            <h2 className="section-title mt-5">
              Recruitment craft, <span className="serif-accent">AI-native habits</span>
            </h2>
            <p className="section-subtitle mt-4">
              The operating system behind the work: sourcing discipline plus modern
              automation tooling.
            </p>
          </Reveal>
          <div className="skill-groups mt-12">
            {skillsUniverse.map((group, i) => (
              <Reveal key={group.label} delay={i * 60}>
                <div className="skill-group">
                  <p className="skill-group-label">{group.label}</p>
                  <div className="stack-chips">
                    {group.items.map((item) => (
                      <span key={item} className="stack-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={skillsUniverse.length * 60}>
              <div className="skill-group">
                <p className="skill-group-label">Explore Further</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  The full bento of competencies, services, and the live case study behind
                  the job poster tool.
                </p>
                <div className="mt-5">
                  <Link
                    href="/skills-services"
                    className="nav-link inline-flex items-center gap-2 text-accent-light hover:text-foreground"
                  >
                    Skills &amp; Services →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── 04 · Contact ─── */}
      <section className="section" id="contact">
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="section-index">04 / Contact</p>
            <h2 className="section-title mt-5">
              Building your next team? <span className="serif-accent">Let&apos;s talk.</span>
            </h2>
            <div className="mt-8">
              <a href={`mailto:${site.email}`} className="contact-hero-link">
                {site.email}
              </a>
            </div>
          </Reveal>
          <div className="contact-links mt-10">
            {contactLinks.map((link, i) => (
              <Reveal key={link.label} delay={i * 60}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    <span className="contact-icon" aria-hidden="true">
                      {link.icon}
                    </span>
                    {link.label}
                  </a>
                ) : (
                  <a href={link.href} className="contact-link">
                    <span className="contact-icon" aria-hidden="true">
                      {link.icon}
                    </span>
                    {link.label}
                  </a>
                )}
              </Reveal>
            ))}
            <Reveal delay={contactLinks.length * 60}>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-icon" aria-hidden="true">
                  ⌨️
                </span>
                {site.githubHandle}
              </a>
            </Reveal>
          </div>
          <Reveal>
            <div className="offer-callout mt-12">
              <p className="offer-callout-label">When to bring me in</p>
              <p className="offer-callout-text">
                High-volume sourcing, executive talent search, or modernizing HR workflows
                with AI-assisted tooling.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
