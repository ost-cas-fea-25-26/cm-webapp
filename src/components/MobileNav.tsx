"use client";

import { useState } from "react";
import { tv } from "tailwind-variants";

const mobileNavStyles = tv({
  slots: {
    button: [
      "md:hidden",
      "p-2",
      "text-white",
      "rounded",
      "transition-colors",
      "relative",
      "z-50",
    ],
    overlay: [
      "fixed",
      "flex",
      "inset-0",
      "bg-black/50",
      "z-[9998]",
      "md:hidden",
      "transition-opacity",
    ],
    drawer: [
      "fixed",
      "top-4",
      "bottom-4",
      "rounded-2xl",
      "right-0",
      "w-64",
      "bg-violet-600",
      "shadow-xl",
      "z-[9999]",
      "transform",
      "transition-transform",
      "md:hidden",
    ],
    nav: ["flex", "flex-col", "p-4", "gap-2", "items-center"],
    navWrapper: ["flex", "flex-col", "items-center", "gap-2", "w-full"],
    navItem: [
      "px-4",
      "py-3",
      "text-slate-700",
      "rounded",
      "transition-colors",
      "cursor-pointer",
      "font-medium",
      "text-white",
    ],
    header: ["flex", "justify-end", "p-2"],
    closeButton: ["p-2", "text-white", "rounded", "transition-colors"],
  },
});

type MobileNavProps = {
  children: React.ReactNode;
};

const MobileNav = ({ children }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { button, overlay, drawer, nav, navWrapper, header, closeButton } =
    mobileNavStyles();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className={button()}
        onClick={toggleMenu}
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className={overlay()}
          onClick={closeMenu}
          style={{ opacity: isOpen ? 1 : 0 }}
        />
      )}

      {/* Drawer */}
      <div
        className={drawer()}
        style={{
          transform: isOpen ? "translateX(-1rem)" : "translateX(100%)",
        }}
      >
        <div className={header()}>
          <button
            className={closeButton()}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className={nav()}>
          <div onClick={closeMenu} className={navWrapper()}>
            {children}
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileNav;
