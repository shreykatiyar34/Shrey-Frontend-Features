interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  sublabel: string;
  badge?: string;
  badgeColor?: string;
}

const StatCard = ({ icon, value, label, sublabel, badge, badgeColor = "text-primary" }: StatCardProps) => {
  return (
    <div className="bg-card rounded-xl p-5 border border-border hover:border-primary/20 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
          {icon}
        </div>
        {badge && (
          <span className={`text-[10px] font-semibold uppercase tracking-wide ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
      
      <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">{sublabel}</p>
    </div>
  );
};

export default StatCard;
