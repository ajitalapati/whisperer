import Option from './Option'
import { OptionProps } from './Option';
import { constants } from "../../constants"

const people: OptionProps[] = constants.peopleOptions;

export default function OptionPage() {
  return (
    <div className="p-5">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">
          Who do you want to talk to today?
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {people.map((x: OptionProps) => (
            <div key={x.name}>
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