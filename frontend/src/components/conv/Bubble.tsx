import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface BubbleProps {
  name: string;
  imgURL: string;
  dialogue: string;
}

export default function Bubble({ name, imgURL, dialogue }: BubbleProps) {
  return (
    <div className="flex items-start space-x-4 p-4">
      <Avatar>
        <AvatarImage src={imgURL} alt={name} />
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">{dialogue}</p>
      </div>
    </div>
  )
}
