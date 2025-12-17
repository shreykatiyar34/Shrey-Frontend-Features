import { ChevronRight } from "lucide-react";

interface PerformanceCardProps {
  subject: string;
  chapter: string;
  description: string;
  mastery: number;
}

const PerformanceCard = ({ subject, chapter, description, mastery }: PerformanceCardProps) => {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (mastery / 100) * circumference;

  return (
    <div className="bg-gradient-to-br from-card via-card to-secondary/30 rounded-xl p-6 border border-border relative overflow-hidden">
      {/* Subtle glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="flex items-center justify-between relative">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Analyzing Performance
            </span>
          </div>
          
          <h2 className="text-xl font-bold text-foreground mb-1">
            Mastery in <span className="text-primary">{subject}</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-sm">
            {chapter}. {description}
          </p>
          
          <button className="inline-flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
            View Report Card
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        {/* Circular Progress */}
        <div className="relative w-28 h-28 flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="56"
              cy="56"
              r="40"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="56"
              cy="56"
              r="40"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-foreground">{mastery}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCard;
