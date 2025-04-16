import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { constants } from "../../constants";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Hero Section */}
      <div className="relative h-[60vh]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${constants.peopleOptions[0].imgURL})` }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative h-full flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl bg-background/80 backdrop-blur-sm">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                  Conversations Through Time
                </h1>
                <h2 className="text-2xl font-semibold text-foreground/90">
                  Connect with History's Greatest Minds
                </h2>
              </div>
              <p className="text-lg text-foreground/80 text-center leading-relaxed">
                Step into the past and engage in meaningful conversations with some of history's most influential figures. 
                Through thoughtful dialogue, gain personal insights into their experiences, challenges, and wisdom. 
                Whether you're seeking guidance, historical perspective, or simply a fascinating conversation, 
                these timeless voices are ready to share their stories with you.
              </p>
              <div className="flex justify-center pt-4">
                <Link to="/options" className="no-underline">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg"
                  >
                    Talk Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Historical Figures Grid */}
      <div className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Your Conversation Partners</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {constants.peopleOptions.map((figure) => (
            <div key={figure.name} className="group relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={figure.imgURL}
                alt={figure.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-white">{figure.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
