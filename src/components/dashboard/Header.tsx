import { Sun } from "lucide-react";

interface HeaderProps {
  userName: string;
  level: string;
}

const Header = ({ userName, level }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Hi, {userName}
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-info/20 text-info text-xs font-medium">
            ⭐ {level}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Sun className="w-5 h-5" />
        </button>
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-semibold">A</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
