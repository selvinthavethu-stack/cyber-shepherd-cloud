import { StatCard } from '@/components/dfir/StatCard';
import { IncidentTable } from '@/components/dfir/IncidentTable';
import { dashboardStats, incidents } from '@/data/mockData';
import { AlertTriangle, Shield, Clock, Database, BookOpen, Zap, CheckCircle, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const activeIncidents = incidents.filter(i => i.status === 'active' || i.status === 'investigating');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Security Operations Center</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time DFIR monitoring and incident response</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Incidents" value={dashboardStats.activeIncidents} icon={AlertTriangle} variant="critical" trend="+2 today" />
        <StatCard title="Contained" value={dashboardStats.containedIncidents} icon={Shield} variant="warning" />
        <StatCard title="Resolved (7d)" value={dashboardStats.resolvedThisWeek} icon={CheckCircle} variant="success" />
        <StatCard title="MTTR" value={dashboardStats.mttr} icon={Clock} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <StatCard title="Evidence Collected" value={dashboardStats.evidenceCollected} icon={Database} />
        <StatCard title="Rules Active" value={dashboardStats.rulesActive} icon={BookOpen} />
        <StatCard title="Alerts Today" value={dashboardStats.alertsToday} icon={Zap} />
        <StatCard title="Total Incidents" value={dashboardStats.totalIncidents} icon={Activity} />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Recent Incidents</h2>
          <span className="text-xs font-mono text-muted-foreground">{incidents.length} total</span>
        </div>
        <IncidentTable incidents={incidents} />
      </motion.div>
    </div>
  );
};

export default Dashboard;
