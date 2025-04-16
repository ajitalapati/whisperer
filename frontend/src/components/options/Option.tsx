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
      state={{ conversee: name, imgURL: imgURL }}
      className="no-underline"
    >
      <Card className="w-[370px] overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <div className="relative h-[170px] overflow-hidden">
          <img
            src={imgURL}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="h-[200px] flex flex-col">
          <CardTitle className="text-xl mb-2 flex-shrink-0 pt-2">{name}</CardTitle>
          <div className="overflow-y-auto">
            <CardDescription className="text-sm prose prose-sm dark:prose-invert">
              <ReactMarkdown>{description}</ReactMarkdown>
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
