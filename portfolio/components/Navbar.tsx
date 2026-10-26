"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cvPath, nav, site } from "@/data/site";
import { MenuIcon, CloseIcon } from "./Icons";
import SmartLink from "./SmartLink";

const pathOf = (href: string) => href.split("#")[0] || "/";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  /* Lock the page behind the drawer without a layout shift. */
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [open]);

  /* Escape closes the drawer. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => {
    const path = pathOf(href);
    if (path === "/") return false; // hash chapters are not a "page" state
    return pathname === path;
  };

  return (
    <>
      <header className="nav-shell">
        <nav
          className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5"
          aria-label="Primary"
        >
          <Link href="/" onClick={close} className="brand" aria-label={`${site.name}, home`}>
            Khaled<span className="brand-dot">.</span>
          </Link>

          <div className="nav-links-desktop items-center gap-1">
            {nav.map((item) => (
              <SmartLink
                key={item.href}
                href={item.href}
                onNavigate={close}
                ariaCurrent={isActive(item.href) ? "page" : undefined}
                className={`nav-link ${isActive(item.href) ? "active" : ""}`}
              >
                {item.label}
              </SmartLink>
            ))}
            <a
              href={cvPath}
              className="nav-cv"
              aria-label="Download Khaled Seifullaha's CV as PDF"
            >
              CV <span aria-hidden="true">↓</span>
            </a>
          </div>

          <button
            className="menu-btn md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            type="button"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      <div
        className={`menu-backdrop md:hidden ${open ? "open" : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      <div
        id="mobile-menu"
        className={`mobile-menu md:hidden ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        <p className="mobile-menu-label">Index</p>
        {nav.map((item) => (
          <SmartLink
            key={item.href}
            href={item.href}
            onNavigate={close}
            ariaCurrent={isActive(item.href) ? "page" : undefined}
            className={isActive(item.href) ? "active" : ""}
          >
            {item.label}
          </SmartLink>
        ))}
        <div className="mobile-cta">
          <a href={cvPath} className="btn btn-secondary mb-2 w-full" onClick={close}>
            Download CV
          </a>
          <SmartLink href="/#contact" onNavigate={close} className="btn btn-primary w-full">
            Let&apos;s Talk
          </SmartLink>
        </div>
      </div>
    </>
  );
}
