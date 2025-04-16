import Option from './Option'
import { OptionProps } from './Option';
import { constants } from "../../constants"

const people: OptionProps[] = constants.peopleOptions;

export default function OptionPage() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-foreground">
          Who do you want to talk to today?
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {people.map((x: OptionProps) => (
            <div key={x.name} className="flex justify-center">
              <Option
                name={x.name}
                imgURL={x.imgURL}
                description={x.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}