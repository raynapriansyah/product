import { House } from "lucide-react";

export default function Navbar() {
  return (
    <div>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <a
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <House className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">irc</span>
          </a>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5"></nav>
      </aside>
    </div>
  );
}
