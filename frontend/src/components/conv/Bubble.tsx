import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface BubbleProps {
  name: string;
  imgURL: string;
  dialogue: string;
  timestamp?: Date;
  isUser?: boolean;
}

export default function Bubble({ name, imgURL, dialogue, timestamp, isUser }: BubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={cn(
        "flex gap-3 p-3 transition-colors duration-200 sm:gap-4 sm:p-4",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar
        className={cn(
          "h-10 w-10 shrink-0 border-2 sm:h-11 sm:w-11",
          isUser
            ? "border-primary/30"
            : "border-primary/40 ring-2 ring-primary/10"
        )}
      >
        <AvatarImage src={imgURL} alt="" />
      </Avatar>
      <div
        className={cn(
          "min-w-0 flex-1 space-y-1.5",
          isUser ? "text-right" : "text-left"
        )}
      >
        <div
          className={cn(
            "flex items-baseline gap-2",
            isUser ? "flex-row-reverse justify-start" : "flex-row"
          )}
        >
          <p
            className={cn(
              "text-sm font-semibold leading-none",
              isUser ? "text-muted-foreground" : "text-primary"
            )}
          >
            {name}
          </p>
          {timestamp && (
            <p className="text-xs text-muted-foreground tabular-nums">
              {formatTime(timestamp)}
            </p>
          )}
        </div>
        <div
          className={cn(
            "inline-block max-w-[min(100%,42rem)] rounded-sm border px-3.5 py-3 text-left text-[0.9375rem] leading-relaxed shadow-sm",
            isUser
              ? "border-primary/25 bg-primary/12 text-foreground rounded-tr-md"
              : "border-border/80 bg-muted/60 text-foreground rounded-tl-md dark:bg-muted/35"
          )}
        >
          <p className="whitespace-pre-wrap">{dialogue}</p>
        </div>
      </div>
    </div>
  )
}
