"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Height of the fixed status bar + navbar, plus breathing room. */
const HEADER_OFFSET = 102;

type SmartLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
  onClick?: () => void;
  external?: boolean;
  ariaCurrent?: "page" | undefined;
  ariaLabel?: string;
};

/**
 * Handles the `/#chapter` pattern used by the header and footer.
 *
 * - Already on the home page  → prevent default and smooth-scroll to the
 *   chapter, so the button always responds even though the URL is "the same".
 * - On any other page         → let Next.js navigate to `/#chapter`; the
 *   browser then jumps to the anchor once the home page has mounted.
 */
export default function SmartLink({
  href,
  children,
  className = "",
  onNavigate,
  onClick,
  external,
  ariaCurrent,
  ariaLabel,
}: SmartLinkProps) {
  const pathname = usePathname();
  const hashIndex = href.indexOf("#");
  const targetId = hashIndex > -1 ? href.slice(hashIndex + 1) : null;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    onClick?.();

    if (!targetId) return;
    if (pathname !== "/") return; // Next.js will route to /#id for us.

    const el = document.getElementById(targetId);
    if (!el) return;

    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: Math.max(top, 0), behavior: reduce ? "auto" : "smooth" });
    // Keep the address bar honest without triggering a scroll jump.
    window.history.replaceState(null, "", href);
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      aria-current={ariaCurrent}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
