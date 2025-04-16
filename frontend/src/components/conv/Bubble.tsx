import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface BubbleProps {
  name: string;
  imgURL: string;
  dialogue: string;
  timestamp?: Date;
}

export default function Bubble({ name, imgURL, dialogue, timestamp }: BubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex items-start space-x-4 p-4 hover:bg-muted/50 transition-colors duration-200 rounded-lg">
      <Avatar className="h-10 w-10 border-2 border-primary/20">
        <AvatarImage src={imgURL} alt={name} />
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium leading-none text-primary">{name}</p>
          {timestamp && (
            <p className="text-xs text-muted-foreground">{formatTime(timestamp)}</p>
          )}
        </div>
        <div className="bg-muted/50 p-3 rounded-lg rounded-tl-none">
          <p className="text-sm text-foreground leading-relaxed">{dialogue}</p>
        </div>
      </div>
    </div>
  )
}
