import Link from "next/link";
import { teacher } from "@/app/lib/feed";
import { CameraIcon } from "@/app/components/icons";

export default function PostComposer() {
  return (
    <Link
      href="#"
      aria-disabled="true"
      className="flex items-center gap-[14px] bg-surface border border-line rounded-[18px] px-[18px] py-[14px] mb-6 shadow-[0_4px_14px_-10px_rgba(120,90,60,0.4)]"
    >
      <div className="w-10 h-10 rounded-full bg-[#f2937a] text-white font-fredoka font-semibold text-[16px] flex items-center justify-center flex-none">
        {teacher.initials}
      </div>
      <span className="flex-1 text-ink-soft text-[15px]">Compartí un momento…</span>
      <span className="w-[38px] h-[38px] rounded-[12px] bg-coral-soft text-coral flex items-center justify-center">
        <CameraIcon className="w-[19px] h-[19px]" />
      </span>
    </Link>
  );
}