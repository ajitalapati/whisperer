import Option from './Option'
import { OptionProps } from './Option';
import { constants } from "../../constants"

const people: OptionProps[] = constants.peopleOptions;

export default function OptionPage() {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-14 sm:px-8">
      <div
        className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl dark:bg-primary/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl space-y-12">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-primary">
            The salon
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl text-balance">
            Who will you speak with today?
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-balance">
            Each portrait is a door—step through into a voice shaped by its
            time, answering you in yours.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-10">
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
