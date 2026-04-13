import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { constants } from "../../constants";
import "./LandingPage.css";

export default function LandingPage() {
  const heroImage = constants.peopleOptions[0]?.imgURL;

  return (
    <div className="min-h-screen bg-background">
      <section className="relative min-h-[88vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 motion-safe:animate-fade-in"
          style={
            heroImage
              ? { backgroundImage: `url(${heroImage})` }
              : undefined
          }
        />
        <div className="landing-hero-overlay absolute inset-0" />
        <div className="landing-grain" aria-hidden />

        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end gap-10 px-5 pb-16 pt-28 md:flex-row md:items-end md:justify-between md:pb-20 md:pt-32 lg:px-8">
          <div className="max-w-xl space-y-6 md:pb-4">
            <p className="landing-reveal text-xs font-medium uppercase tracking-[0.35em] text-primary">
              Whisperer
            </p>
            <h1 className="landing-reveal landing-reveal-delay-1 font-display text-4xl font-semibold leading-[1.08] text-foreground md:text-5xl lg:text-6xl text-balance">
              Conversations
              <span className="block italic text-primary">through time</span>
            </h1>
            <p className="landing-reveal landing-reveal-delay-2 text-lg leading-relaxed text-muted-foreground md:text-xl text-balance">
              Step into dialogue with voices from history—curious, reflective,
              and shaped for the moment you are in.
            </p>
            <div className="landing-reveal landing-reveal-delay-3 flex flex-wrap items-center gap-4 pt-2">
              <Link to="/options" className="no-underline">
                <Button
                  size="lg"
                  className="h-12 rounded-sm bg-primary px-10 font-display text-base tracking-wide text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25"
                >
                  Begin a dialogue
                </Button>
              </Link>
              <span className="text-sm text-muted-foreground">
                No script—just you and the record.
              </span>
            </div>
          </div>

          <div className="landing-reveal landing-reveal-delay-2 w-full max-w-md md:max-w-sm">
            <div className="relative border border-border/80 bg-card/75 p-6 shadow-2xl backdrop-blur-md dark:bg-card/55">
              <div
                className="absolute -right-1 -top-1 h-16 w-16 rounded-br-[2rem] border-r border-t border-primary/40"
                aria-hidden
              />
              <p className="font-display text-xl font-medium italic leading-snug text-card-foreground">
                “We speak across centuries in the same room—the one you make
                with your attention.”
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Salon · manuscript tone
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-border/60 bg-gradient-to-b from-muted/40 to-background px-4 py-20 dark:from-muted/15">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
                Your partners
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-foreground md:text-4xl">
                Choose a mind to meet
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground md:text-right">
              Portraits open into full conversations—hover to glimpse who
              waits on the other side.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {constants.peopleOptions.map((figure) => (
              <article
                key={figure.name}
                className="landing-figure-card group bg-card"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={figure.imgURL}
                    alt={figure.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-1 p-4 transition-transform duration-500 group-hover:translate-y-0">
                    <h3 className="font-display text-xl font-semibold text-foreground drop-shadow-sm">
                      {figure.name}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-wider text-primary opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                      Available to speak
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
