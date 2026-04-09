import { useState } from 'react';
import { IncidentTable } from '@/components/dfir/IncidentTable';
import { incidents } from '@/data/mockData';
import type { Severity, IncidentStatus } from '@/data/mockData';
import { cn } from '@/lib/utils';

const severityFilters: (Severity | 'all')[] = ['all', 'critical', 'high', 'medium', 'low'];
const statusFilters: (IncidentStatus | 'all')[] = ['all', 'active', 'investigating', 'contained', 'resolved'];

const Incidents = () => {
  const [severityFilter, setSeverityFilter] = useState<Severity | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<IncidentStatus | 'all'>('all');

  const filtered = incidents.filter(i => {
    if (severityFilter !== 'all' && i.severity !== severityFilter) return false;
    if (statusFilter !== 'all' && i.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Incidents</h1>
        <p className="text-sm text-muted-foreground mt-1">All security incidents across your infrastructure</p>
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground uppercase">Severity:</span>
          <div className="flex gap-1">
            {severityFilters.map(s => (
              <button
                key={s}
                onClick={() => setSeverityFilter(s)}
                className={cn(
                  'px-2.5 py-1 text-xs font-mono rounded-md border transition-colors',
                  severityFilter === s
                    ? 'bg-primary/10 text-primary border-primary/30'
                    : 'text-muted-foreground border-border hover:text-foreground hover:bg-secondary'
                )}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground uppercase">Status:</span>
          <div className="flex gap-1">
            {statusFilters.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  'px-2.5 py-1 text-xs font-mono rounded-md border transition-colors',
                  statusFilter === s
                    ? 'bg-primary/10 text-primary border-primary/30'
                    : 'text-muted-foreground border-border hover:text-foreground hover:bg-secondary'
                )}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <IncidentTable incidents={filtered} />
    </div>
  );
};

export default Incidents;
