"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/app/lib/navigation";
import { teacher } from "@/app/lib/feed";
import {
  BellIcon,
  ChildrenIcon,
  CloseIcon,
  HomeIcon,
  LogoutIcon,
  MenuIcon,
  PlusIcon,
  SunIcon,
  UserIcon,
} from "@/app/components/icons";

const navIconMap = {
  home: HomeIcon,
  children: ChildrenIcon,
  bell: BellIcon,
  user: UserIcon,
};

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const triggerEl = triggerRef.current;

    // Focus close button when opened
    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const drawer = document.getElementById("mobile-drawer-panel");
      if (!drawer) return;
      const focusable = drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      triggerEl?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="lg:hidden sticky top-0 z-40 bg-surface border-b border-line px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-[10px]">
          <div className="w-[36px] h-[36px] rounded-[12px] bg-gradient-to-br from-[#f8c3a8] to-[#f2937a] flex items-center justify-center flex-none">
            <SunIcon className="w-[20px] h-[20px] text-white" />
          </div>
          <div className="leading-none">
            <div className="font-fredoka font-semibold text-[17px] text-ink">OpenDayCare</div>
            <div className="text-[11.5px] text-ink-soft mt-[2px]">Sala Soles</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[34px] h-[34px] rounded-full bg-[#f2937a] text-white font-fredoka font-semibold text-[15px] flex items-center justify-center">
            {teacher.initials}
          </div>
          <Link
            href="#"
            aria-disabled="true"
            title="Cerrar sesión"
            className="w-9 h-9 rounded-[10px] bg-cream text-[#94887b] flex items-center justify-center"
          >
            <LogoutIcon className="w-4 h-4" />
          </Link>
          <button
            ref={triggerRef}
            type="button"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="w-9 h-9 rounded-[10px] bg-cream text-ink flex items-center justify-center"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        </div>
      </header>

      {open ? (
        <div className="lg:hidden fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Cerrar menú"
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="absolute left-0 top-0 h-dvh w-[280px] max-w-[85vw] bg-surface border-r border-line p-4 flex flex-col shadow-xl"
          >
            <div className="flex items-center justify-between pb-4">
              <div className="flex items-center gap-[10px]">
                <div className="w-[36px] h-[36px] rounded-[12px] bg-gradient-to-br from-[#f8c3a8] to-[#f2937a] flex items-center justify-center flex-none">
                  <SunIcon className="w-[20px] h-[20px] text-white" />
                </div>
                <div className="leading-none">
                  <div className="font-fredoka font-semibold text-[17px] text-ink">OpenDayCare</div>
                  <div className="text-[11.5px] text-ink-soft mt-[2px]">Sala Soles</div>
                </div>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-[10px] bg-cream text-ink flex items-center justify-center"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <Link
              href="#"
              aria-disabled="true"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-3 py-3 rounded-[14px] bg-gradient-to-b from-[#f4977e] to-[#ee8164] text-white font-extrabold text-[14.5px] shadow-[0_8px_18px_-8px_rgba(238,129,100,0.75)] mb-4"
            >
              <PlusIcon className="w-[17px] h-[17px]" />
              Nueva publicación
            </Link>

            <nav className="flex flex-col gap-1 flex-1">
              {navItems.map((item) => {
                const Icon = navIconMap[item.icon];
                const isActive = item.active;
                return (
                  <Link
                    key={item.id}
                    href="#"
                    aria-disabled="true"
                    onClick={() => setOpen(false)}
                    className={
                      isActive
                        ? "flex items-center gap-3 px-3 py-[11px] rounded-[12px] bg-coral-soft text-brand font-extrabold text-[14.5px]"
                        : "flex items-center gap-3 px-3 py-[11px] rounded-[12px] bg-transparent text-[#6e6359] font-semibold text-[14.5px]"
                    }
                  >
                    <Icon className="w-[19px] h-[19px]" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-line pt-[14px] mt-[10px]">
              <div className="flex items-center gap-[11px] px-2 py-[6px]">
                <div className="w-[38px] h-[38px] rounded-full bg-[#f2937a] text-white font-fredoka font-semibold text-[16px] flex items-center justify-center flex-none">
                  {teacher.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-[14px] text-ink truncate">{teacher.name}</div>
                  <div className="text-[12px] text-ink-soft">{teacher.role}</div>
                </div>
                <Link
                  href="#"
                  aria-disabled="true"
                  title="Cerrar sesión"
                  className="flex-none w-8 h-8 rounded-[10px] bg-cream text-[#94887b] flex items-center justify-center"
                >
                  <LogoutIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}