import { cn } from '@/lib/utils';
import type { Evidence } from '@/data/mockData';
import { HardDrive, FileText, Network, Cpu } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const typeIcons: Record<Evidence['type'], typeof HardDrive> = {
  disk_snapshot: HardDrive,
  memory_dump: Cpu,
  logs: FileText,
  network_capture: Network,
};

const statusColors: Record<Evidence['status'], string> = {
  collecting: 'text-warning',
  stored: 'text-muted-foreground',
  analyzing: 'text-primary',
  analyzed: 'text-success',
};

export const EvidencePanel = ({ evidence }: { evidence: Evidence[] }) => (
  <div className="space-y-3">
    {evidence.map((item) => {
      const Icon = typeIcons[item.type];
      return (
        <div key={item.id} className="bg-secondary/50 border border-border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-md bg-card border border-border">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono font-medium text-foreground">{item.name}</span>
                <span className={cn('text-xs font-mono font-medium', statusColors[item.status])}>
                  {item.status.toUpperCase()}
                </span>
              </div>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground font-mono">
                <span>{item.size}</span>
                <span>{item.source}</span>
                <span>{formatDistanceToNow(new Date(item.collectedAt), { addSuffix: true })}</span>
              </div>
              <div className="mt-2 text-[10px] font-mono text-muted-foreground truncate">
                {item.hash}
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);
