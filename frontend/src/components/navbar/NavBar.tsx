import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AccountNav from './AccountNav';
import { Button } from '@/components/ui/button';
import { Menu, Moon, Sun } from 'lucide-react';
import { ThemeContext } from '../../App';

interface NavItem {
  name: string,
  routerUrl: string
}

const navItems: NavItem[] = [
  {
    name: "Home",
    routerUrl: "/"
  },
  {
    name: "Options",
    routerUrl: "/options"
  }
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"
        aria-hidden
      />
      <div className="container flex h-[4.25rem] items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-8 flex items-center gap-3 no-underline">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-primary/35 bg-primary/10 font-display text-lg font-semibold text-primary"
              aria-hidden
            >
              W
            </span>
            <span className="font-display text-xl font-semibold tracking-tight text-foreground">
              Whisperer
            </span>
          </Link>
          <nav className="flex items-center gap-8 text-[0.95rem]">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.routerUrl}
                className="relative text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <Button
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          variant="ghost"
          onClick={handleDrawerToggle}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="mr-1 rounded-sm text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <AccountNav />
        </div>
      </div>
      {mobileOpen && (
        <div className="fixed inset-0 top-[4.25rem] z-50 grid h-[calc(100vh-4.25rem)] grid-flow-row auto-rows-max overflow-auto border-t border-border/60 bg-background/95 p-6 pb-32 shadow-inner animate-in slide-in-from-bottom-80 md:hidden">
          <div className="relative z-20 grid gap-2 rounded-sm border border-border bg-card p-5 text-card-foreground shadow-lg">
            <nav className="grid grid-flow-row auto-rows-max gap-1 text-base">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.routerUrl}
                  className="rounded-sm px-3 py-2.5 font-medium text-foreground transition-colors hover:bg-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}
