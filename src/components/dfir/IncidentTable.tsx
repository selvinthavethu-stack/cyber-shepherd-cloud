import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SeverityBadge, StatusBadge } from './StatusBadge';
import type { Incident } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

export const IncidentTable = ({ incidents }: { incidents: Incident[] }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground font-mono text-xs uppercase">ID</TableHead>
            <TableHead className="text-muted-foreground font-mono text-xs uppercase">Incident</TableHead>
            <TableHead className="text-muted-foreground font-mono text-xs uppercase">Severity</TableHead>
            <TableHead className="text-muted-foreground font-mono text-xs uppercase">Status</TableHead>
            <TableHead className="text-muted-foreground font-mono text-xs uppercase">Resource</TableHead>
            <TableHead className="text-muted-foreground font-mono text-xs uppercase">Detected</TableHead>
            <TableHead className="text-muted-foreground font-mono text-xs uppercase">Assignee</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.map((incident, i) => (
            <motion.tr
              key={incident.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/incident/${incident.id}`)}
              className="border-border cursor-pointer hover:bg-secondary/50 transition-colors"
            >
              <TableCell className="font-mono text-sm text-primary">{incident.id}</TableCell>
              <TableCell className="max-w-xs">
                <div className="text-sm font-medium text-foreground truncate">{incident.title}</div>
                <div className="text-xs text-muted-foreground">{incident.source}</div>
              </TableCell>
              <TableCell><SeverityBadge severity={incident.severity} /></TableCell>
              <TableCell><StatusBadge status={incident.status} /></TableCell>
              <TableCell>
                <div className="font-mono text-xs text-foreground">{incident.resource}</div>
                <div className="text-xs text-muted-foreground">{incident.cluster}</div>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(incident.detectedAt), { addSuffix: true })}
              </TableCell>
              <TableCell className="text-sm text-foreground">{incident.assignee || <span className="text-muted-foreground italic">Unassigned</span>}</TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
