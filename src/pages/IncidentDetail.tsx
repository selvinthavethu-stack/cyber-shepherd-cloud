import { useParams, useNavigate } from 'react-router-dom';
import { incidents } from '@/data/mockData';
import { SeverityBadge, StatusBadge } from '@/components/dfir/StatusBadge';
import { AttackTimeline } from '@/components/dfir/AttackTimeline';
import { EvidencePanel } from '@/components/dfir/EvidencePanel';
import { ArrowLeft, User, Server, MapPin, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

const IncidentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const incident = incidents.find(i => i.id === id);

  if (!incident) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Incident not found</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-sm text-primary">{incident.id}</span>
              <SeverityBadge severity={incident.severity} />
              <StatusBadge status={incident.status} />
            </div>
            <h1 className="text-xl font-bold text-foreground">{incident.title}</h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl">{incident.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase">Resource</p>
              <p className="text-sm font-mono text-foreground">{incident.resource}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase">Cluster</p>
              <p className="text-sm font-mono text-foreground">{incident.cluster}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase">Assignee</p>
              <p className="text-sm text-foreground">{incident.assignee || 'Unassigned'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase">Detected</p>
              <p className="text-sm font-mono text-foreground">{format(new Date(incident.detectedAt), 'MMM d, HH:mm')}</p>
            </div>
          </div>
        </div>

        {incident.tags.length > 0 && (
          <div className="flex gap-2 mt-4 flex-wrap">
            {incident.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 text-[10px] font-mono bg-secondary text-muted-foreground border border-border rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="timeline" className="font-mono text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Timeline</TabsTrigger>
          <TabsTrigger value="evidence" className="font-mono text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Evidence ({incident.evidence.length})</TabsTrigger>
          <TabsTrigger value="notes" className="font-mono text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Notes ({incident.notes.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="mt-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <AttackTimeline events={incident.timeline} />
          </div>
        </TabsContent>

        <TabsContent value="evidence" className="mt-4">
          <EvidencePanel evidence={incident.evidence} />
        </TabsContent>

        <TabsContent value="notes" className="mt-4">
          <div className="space-y-3">
            {incident.notes.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No notes yet.</p>
            ) : (
              incident.notes.map(note => (
                <div key={note.id} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{note.author}</span>
                    <span className="text-xs font-mono text-muted-foreground">{format(new Date(note.createdAt), 'MMM d, HH:mm')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{note.content}</p>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default IncidentDetail;
