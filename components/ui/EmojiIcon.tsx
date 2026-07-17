export function EmojiIcon({
  emoji,
  className = "",
}: {
  emoji: string;
  className?: string;
}) {
  return (
    <span
      className={`grid h-14 w-14 place-items-center rounded-2xl bg-master-50 text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${className}`}
      aria-hidden
    >
      {emoji}
    </span>
  );
}
