import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Link } from 'react-router-dom'

export interface OptionProps {
    name: string;
    imgURL: string;
    description: string;
}

export default function Option({name, imgURL, description}: OptionProps) {
  return (
    <Link 
      to={"/".concat(name)} 
      state={{ conversee: name, user: "Ajit", imgURL: imgURL }} 
      className="no-underline"
    >
      <Card className="w-[370px] overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-[170px] overflow-hidden">
          <img
            src={imgURL}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="h-[200px] overflow-y-auto p-4">
          <CardTitle className="text-xl mb-2">{name}</CardTitle>
          <CardDescription className="text-sm">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}
