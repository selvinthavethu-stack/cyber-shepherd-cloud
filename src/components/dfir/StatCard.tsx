import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  variant?: 'default' | 'critical' | 'warning' | 'success';
}

const variantStyles = {
  default: 'border-border',
  critical: 'border-destructive/30 glow-destructive',
  warning: 'border-warning/30 glow-warning',
  success: 'border-success/30 glow-success',
};

const iconVariants = {
  default: 'text-primary',
  critical: 'text-destructive',
  warning: 'text-warning',
  success: 'text-success',
};

export const StatCard = ({ title, value, icon: Icon, trend, variant = 'default' }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn('bg-card border rounded-lg p-5 flex flex-col gap-3', variantStyles[variant])}
  >
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</span>
      <Icon className={cn('w-4 h-4', iconVariants[variant])} />
    </div>
    <div className="flex items-end gap-2">
      <span className="text-3xl font-mono font-bold text-foreground">{value}</span>
      {trend && <span className="text-xs text-muted-foreground mb-1">{trend}</span>}
    </div>
  </motion.div>
);
