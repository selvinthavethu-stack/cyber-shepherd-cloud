import { detectionRules } from '@/data/mockData';
import { SeverityBadge } from '@/components/dfir/StatusBadge';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

const DetectionRules = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Detection Rules</h1>
      <p className="text-sm text-muted-foreground mt-1">Rule-based threat detection engine configuration</p>
    </div>

    <div className="grid gap-3">
      {detectionRules.map((rule, i) => (
        <motion.div
          key={rule.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-card border border-border rounded-lg p-5"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-mono text-xs text-primary">{rule.id}</span>
                <SeverityBadge severity={rule.severity} />
                <span className="px-2 py-0.5 text-[10px] font-mono bg-secondary text-muted-foreground border border-border rounded-full">{rule.category}</span>
                <span className={cn('px-2 py-0.5 text-[10px] font-mono rounded-full border', rule.enabled ? 'bg-success/10 text-success border-success/20' : 'bg-muted text-muted-foreground border-border')}>
                  {rule.enabled ? 'ENABLED' : 'DISABLED'}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-foreground">{rule.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{rule.description}</p>
              <div className="mt-3 p-2 bg-muted/50 rounded-md border border-border">
                <code className="text-[11px] font-mono text-primary/80">{rule.pattern}</code>
              </div>
            </div>
            <div className="text-right ml-4 shrink-0">
              <div className="text-2xl font-mono font-bold text-foreground">{rule.hits}</div>
              <div className="text-[10px] text-muted-foreground">hits</div>
              {rule.lastTriggered && (
                <div className="text-[10px] font-mono text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(rule.lastTriggered), { addSuffix: true })}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default DetectionRules;
