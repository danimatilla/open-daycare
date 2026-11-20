import type { PostKind } from "@/app/lib/feed";

const badgeStyles: Record<PostKind, string> = {
  achievement: "bg-badge-achievement-bg text-badge-achievement-fg",
  activity: "bg-badge-activity-bg text-badge-activity-fg",
  announcement: "bg-badge-announcement-bg text-badge-announcement-fg",
};

const dotStyles: Record<PostKind, string> = {
  achievement: "bg-badge-achievement-fg",
  activity: "bg-badge-activity-fg",
  announcement: "bg-badge-announcement-fg",
};

const labelMap: Record<PostKind, string> = {
  achievement: "LOGRO",
  activity: "ACTIVIDAD",
  announcement: "ANUNCIO",
};

export default function PostKindBadge({ kind }: { kind: PostKind }) {
  return (
    <div className={`flex items-center gap-[7px] px-3 py-[6px] rounded-full ${badgeStyles[kind]}`}>
      <span className={`w-2 h-2 rounded-full ${dotStyles[kind]}`} />
      <span className="text-[12px] font-extrabold tracking-[0.5px]">{labelMap[kind]}</span>
    </div>
  );
}