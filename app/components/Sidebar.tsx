import Link from "next/link";
import { navItems } from "@/app/lib/navigation";
import { teacher } from "@/app/lib/feed";
import { BellIcon, ChildrenIcon, HomeIcon, LogoutIcon, PlusIcon, SunIcon, UserIcon } from "@/app/components/icons";

const navIconMap = {
  home: HomeIcon,
  children: ChildrenIcon,
  bell: BellIcon,
  user: UserIcon,
};

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-[248px] flex-none bg-surface border-r border-line flex-col px-4 py-6 sticky top-0 h-dvh">
      <Link href="#" aria-disabled="true" className="flex items-center gap-[11px] px-2 pb-[22px]">
        <div className="w-[38px] h-[38px] rounded-[12px] bg-gradient-to-br from-[#f8c3a8] to-[#f2937a] flex items-center justify-center flex-none">
          <SunIcon className="w-[21px] h-[21px] text-white" />
        </div>
        <div>
          <div className="font-fredoka font-semibold text-[17px] text-ink leading-none">OpenDayCare</div>
          <div className="text-[11.5px] text-ink-soft mt-[2px]">Sala Soles</div>
        </div>
      </Link>

      <Link
        href="#"
        aria-disabled="true"
        className="flex items-center justify-center gap-2 w-full px-3 py-3 rounded-[14px] bg-gradient-to-b from-[#f4977e] to-[#ee8164] text-white font-extrabold text-[14.5px] shadow-[0_8px_18px_-8px_rgba(238,129,100,0.75)] mb-[18px]"
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
    </aside>
  );
}