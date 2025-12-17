import { Calculator, FlaskConical, Globe, Languages, BookA, Flame, FileText, TrendingDown } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import SubjectCard from "@/components/dashboard/SubjectCard";
import PerformanceCard from "@/components/dashboard/PerformanceCard";
import StatCard from "@/components/dashboard/StatCard";

const DashboardPage = () => {
  const subjects = [
    {
      icon: <Calculator className="w-5 h-5 text-danger" />,
      name: "Mathematics",
      subtitle: "Surface Area and Volume",
      mastery: 25,
      color: "bg-danger/20",
      isActive: true,
    },
    {
      icon: <FlaskConical className="w-5 h-5 text-success" />,
      name: "Science",
      subtitle: "Active Practice",
      mastery: 45,
      color: "bg-success/20",
    },
    {
      icon: <Globe className="w-5 h-5 text-info" />,
      name: "Social Science",
      subtitle: "History & Geography",
      mastery: 62,
      color: "bg-info/20",
    },
    {
      icon: <Languages className="w-5 h-5 text-orange" />,
      name: "Hindi",
      subtitle: "Vyakaran",
      mastery: 78,
      color: "bg-orange/20",
    },
    {
      icon: <BookA className="w-5 h-5 text-warning" />,
      name: "English",
      subtitle: "Grammar Mastery",
      mastery: 55,
      color: "bg-warning/20",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-[200px] min-h-screen">
        <div className="h-screen overflow-y-auto scrollbar-thin">
          <div className="p-8 pb-16">
            <Header userName="Aayush Sharma" level="Level 1 Explorer" />
            
            {/* Subjects Section */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">Your Subjects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map((subject, index) => (
                  <SubjectCard key={index} {...subject} />
                ))}
              </div>
            </section>
            
            {/* Performance Card */}
            <section className="mb-8">
              <PerformanceCard
                subject="Mathematics"
                chapter="Current chapter: Surface Area and Volume"
                description="Complete practice sessions to improve your mastery score."
                mastery={25}
              />
            </section>
            
            {/* Stats Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard
                icon={<Flame className="w-5 h-5 text-primary" />}
                value={5}
                label="Current Streak"
                sublabel="Keep it Up"
              />
              <StatCard
                icon={<FileText className="w-5 h-5 text-primary" />}
                value={14}
                label="Tests Taken"
                sublabel="Total this month"
              />
              <StatCard
                icon={<TrendingDown className="w-5 h-5 text-danger" />}
                value={3}
                label="Active Weakness"
                sublabel="Study and practice"
                badge="Focus"
                badgeColor="text-pink"
              />
              <StatCard
                icon={<Flame className="w-5 h-5 text-primary" />}
                value={5}
                label="Current Streak"
                sublabel="Keep it Up"
                badge="Active"
                badgeColor="text-success"
              />
              <StatCard
                icon={<FileText className="w-5 h-5 text-primary" />}
                value={14}
                label="Tests Taken"
                sublabel="Total this month"
                badge="This Month"
                badgeColor="text-info"
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
