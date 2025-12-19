import { FileText, BookOpen, Target, BarChart3, FlaskConical } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[200px] bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">k</span>
          </div>
          <span className="font-semibold text-foreground">kyoorious.ai</span>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="p-4">
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          <button className="flex-1 py-2 px-3 text-xs font-medium rounded-md bg-primary text-primary-foreground">
            Learn Mode
          </button>
          <button className="flex-1 py-2 px-3 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground transition-colors">
            Exam Mode
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <div className="mb-6">
          <button className="w-full py-2.5 px-3 text-sm font-medium rounded-lg bg-secondary text-foreground flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </button>
        </div>

        <div className="space-y-1">
          <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Chapter Focus
          </p>
          <NavItem icon={<FileText className="w-4 h-4" />} label="Test" />
          <NavItem icon={<BookOpen className="w-4 h-4" />} label="Study" />
          <NavItem icon={<Target className="w-4 h-4" />} label="Practice" />
          <NavItem icon={<BarChart3 className="w-4 h-4" />} label="Report Card" />
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Aayush Sharma</p>
            <p className="text-xs text-muted-foreground">Class 10</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Weekly Streak</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-1.5 h-4 rounded-sm ${
                  i <= 4 ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button className="w-full py-2.5 px-3 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 flex items-center gap-2 transition-colors">
    {icon}
    {label}
  </button>
);

export default Sidebar;
