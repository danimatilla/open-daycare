import Link from "next/link";
import type { FeedPost } from "@/app/lib/feed";
import { CommentIcon, HeartIcon, ImageIcon, MegaphoneIcon } from "@/app/components/icons";
import PostKindBadge from "@/app/components/PostKindBadge";

const avatarStyles = {
  child: "bg-avatar-child-bg text-avatar-child-fg",
  system: "bg-avatar-system-bg text-avatar-system-fg",
};

export default function PostCard({ post }: { post: FeedPost }) {
  const isSystem = post.authorVariant === "system";

  return (
    <div className="bg-surface border border-line rounded-[20px] px-[22px] py-5 shadow-[0_4px_16px_-12px_rgba(120,90,60,0.5)]">
      <div className="flex items-center gap-3 mb-[14px]">
        {isSystem ? (
          <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-none ${avatarStyles.system}`}>
            <MegaphoneIcon className="w-5 h-5" />
          </div>
        ) : (
          <div className={`w-11 h-11 rounded-full font-fredoka font-semibold text-[17px] flex items-center justify-center flex-none ${avatarStyles.child}`}>
            {post.authorInitials}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-fredoka font-semibold text-[16.5px] text-ink">{post.authorName}</div>
          <div className="text-[12.5px] text-ink-soft">{post.time} · publicado por vos</div>
        </div>
        <PostKindBadge kind={post.kind} />
      </div>

      <div className="text-[12.5px] text-ink-soft mb-[10px]">{post.audience}</div>
      <p className="text-[15.5px] leading-[1.55] text-[#4a4038] m-0">{post.body}</p>

      {post.photoLabel ? (
        <Link
          href="#"
          aria-disabled="true"
          className="flex flex-col items-center justify-center gap-2 mt-[14px] border-[1.5px] border-dashed border-[#dbcdbA] rounded-[16px] bg-[#f4ece1] h-[200px] text-[#b0a290]"
        >
          <ImageIcon className="w-[30px] h-[30px]" />
          <span className="text-[13.5px]">{post.photoLabel}</span>
        </Link>
      ) : null}

      <div className="flex items-center gap-[18px] mt-4 pt-[14px] border-t border-line-soft">
        <span className="flex items-center gap-[7px] text-coral font-bold text-[14px]">
          <HeartIcon className="w-[19px] h-[19px]" style={{ fill: "currentColor" }} />
          {post.likes}
        </span>
        <Link href="#" aria-disabled="true" className="flex items-center gap-[7px] text-ink-muted font-bold text-[14px]">
          <CommentIcon className="w-[18px] h-[18px]" />
          {post.comments}
        </Link>
        <span className="flex-1" />
        <Link href="#" aria-disabled="true" className="text-[#c5503a] font-extrabold text-[14px]">
          Editar
        </Link>
      </div>
    </div>
  );
}