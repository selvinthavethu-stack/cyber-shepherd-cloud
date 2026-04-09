import { cn } from '@/lib/utils';
import type { TimelineEvent } from '@/data/mockData';
import { Shield, Zap, Database, Search, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const typeConfig: Record<TimelineEvent['type'], { icon: typeof Shield; color: string }> = {
  detection: { icon: Zap, color: 'text-destructive border-destructive/30 bg-destructive/10' },
  response: { icon: Shield, color: 'text-warning border-warning/30 bg-warning/10' },
  collection: { icon: Database, color: 'text-primary border-primary/30 bg-primary/10' },
  analysis: { icon: Search, color: 'text-foreground border-border bg-secondary' },
  resolution: { icon: CheckCircle, color: 'text-success border-success/30 bg-success/10' },
};

export const AttackTimeline = ({ events }: { events: TimelineEvent[] }) => (
  <div className="relative space-y-0">
    <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
    {events.map((event, i) => {
      const { icon: Icon, color } = typeConfig[event.type];
      return (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="relative flex items-start gap-4 py-4"
        >
          <div className={cn('relative z-10 flex items-center justify-center w-10 h-10 rounded-full border', color)}>
            <Icon className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-foreground">{event.title}</span>
              {event.automated && (
                <span className="px-1.5 py-0.5 text-[10px] font-mono bg-primary/10 text-primary border border-primary/20 rounded">AUTO</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{event.description}</p>
            <span className="text-[10px] font-mono text-muted-foreground mt-1 block">
              {format(new Date(event.timestamp), 'HH:mm:ss.SSS')}
            </span>
          </div>
        </motion.div>
      );
    })}
  </div>
);
