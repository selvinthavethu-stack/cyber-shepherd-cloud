import { cn } from '@/lib/utils';
import type { Severity, IncidentStatus } from '@/data/mockData';

const severityStyles: Record<Severity, string> = {
  critical: 'bg-destructive/20 text-destructive border-destructive/30',
  high: 'bg-warning/20 text-warning border-warning/30',
  medium: 'bg-primary/20 text-primary border-primary/30',
  low: 'bg-muted text-muted-foreground border-border',
};

const statusStyles: Record<IncidentStatus, string> = {
  active: 'bg-destructive/20 text-destructive border-destructive/30',
  investigating: 'bg-warning/20 text-warning border-warning/30',
  contained: 'bg-primary/20 text-primary border-primary/30',
  resolved: 'bg-success/20 text-success border-success/30',
};

export const SeverityBadge = ({ severity }: { severity: Severity }) => (
  <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border', severityStyles[severity])}>
    <span className={cn('w-1.5 h-1.5 rounded-full', {
      'bg-destructive animate-pulse-glow': severity === 'critical',
      'bg-warning': severity === 'high',
      'bg-primary': severity === 'medium',
      'bg-muted-foreground': severity === 'low',
    })} />
    {severity.toUpperCase()}
  </span>
);

export const StatusBadge = ({ status }: { status: IncidentStatus }) => (
  <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border', statusStyles[status])}>
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </span>
);
