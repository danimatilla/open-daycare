import { feedPosts, teacher } from "@/app/lib/feed";
import MobileNavigation from "@/app/components/MobileNavigation";
import PostCard from "@/app/components/PostCard";
import PostComposer from "@/app/components/PostComposer";
import Sidebar from "@/app/components/Sidebar";

export default function Home() {
  return (
    <div className="flex min-h-dvh bg-cream">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileNavigation />
        <main className="flex-1 min-w-0 lg:h-dvh lg:overflow-y-auto">
          <div className="max-w-[760px] w-full mx-auto px-6 py-8 lg:px-10 lg:py-[34px] lg:pb-20">
            <div className="mb-6">
              <div className="text-[12.5px] font-extrabold tracking-[0.8px] text-brand mb-1">
                GUARDERÍA · SALA SOLES
              </div>
              <h1 className="font-fredoka font-semibold text-[30px] m-0 text-ink">{teacher.greeting}</h1>
              <p className="mt-[5px] mb-0 text-ink-muted text-[14.5px]">{teacher.summary}</p>
            </div>

            <PostComposer />

            <div className="flex items-center gap-[14px] mb-[14px]">
              <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-[#8a7c6d]">PUBLICADO HOY</span>
              <span className="flex-1 h-px bg-[#e7dac8]" />
            </div>

            <div className="flex flex-col gap-4">
              {feedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}