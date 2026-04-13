import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

export interface OptionProps {
    name: string;
    imgURL: string;
    description: string;
}

export default function Option({ name, imgURL, description }: OptionProps) {
  return (
    <Link
      to={`/${name}`}
      state={{ conversee: name, imgURL, description }}
      className="no-underline"
    >
      <Card className="group w-full max-w-[370px] overflow-hidden rounded-sm border border-border/80 bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
        <div className="relative h-[180px] overflow-hidden">
          <div
            className="absolute inset-0 z-10 bg-gradient-to-t from-card/90 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80"
            aria-hidden
          />
          <img
            src={imgURL}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div
            className="absolute inset-0 z-20 border-b border-primary/20"
            aria-hidden
          />
        </div>
        <CardContent className="flex h-[200px] flex-col gap-2 pt-5">
          <CardTitle className="font-display text-2xl font-semibold tracking-tight text-card-foreground">
            {name}
          </CardTitle>
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <CardDescription className="prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-p:text-muted-foreground">
              <ReactMarkdown>{description}</ReactMarkdown>
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
