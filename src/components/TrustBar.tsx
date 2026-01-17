import { content } from "@/content";

export function TrustBar() {
  return (
    <div className="w-full border-b border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-2 text-center text-xs font-medium text-zinc-700">
        {content.site.trustBarText}
      </div>
    </div>
  );
}
