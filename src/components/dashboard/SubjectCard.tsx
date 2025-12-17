interface SubjectCardProps {
  icon: React.ReactNode;
  name: string;
  subtitle: string;
  mastery: number;
  color: string;
  isActive?: boolean;
}

const SubjectCard = ({ icon, name, subtitle, mastery, color, isActive }: SubjectCardProps) => {
  return (
    <div className="bg-card rounded-xl p-4 border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
        {isActive && (
          <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-full bg-primary/20 text-primary">
            Active
          </span>
        )}
      </div>
      
      <h3 className="font-semibold text-foreground mb-0.5">{name}</h3>
      <p className="text-xs text-muted-foreground mb-4">{subtitle}</p>
      
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Mastery</span>
          <span className={`text-xs font-semibold ${getProgressColor(mastery)}`}>{mastery}%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getProgressBarColor(mastery)}`}
            style={{ width: `${mastery}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const getProgressColor = (value: number) => {
  if (value >= 70) return "text-success";
  if (value >= 50) return "text-warning";
  return "text-danger";
};

const getProgressBarColor = (value: number) => {
  if (value >= 70) return "bg-success";
  if (value >= 50) return "bg-warning";
  return "bg-danger";
};

export default SubjectCard;
