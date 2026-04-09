export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type IncidentStatus = 'active' | 'investigating' | 'contained' | 'resolved';
export type EvidenceType = 'disk_snapshot' | 'memory_dump' | 'logs' | 'network_capture';

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: IncidentStatus;
  source: string;
  resource: string;
  resourceType: 'container' | 'pod' | 'vm' | 'service';
  cluster: string;
  namespace: string;
  detectedAt: string;
  updatedAt: string;
  assignee: string | null;
  tags: string[];
  ruleId: string;
  timeline: TimelineEvent[];
  evidence: Evidence[];
  notes: CaseNote[];
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  type: 'detection' | 'response' | 'collection' | 'analysis' | 'resolution';
  title: string;
  description: string;
  automated: boolean;
}

export interface Evidence {
  id: string;
  type: EvidenceType;
  name: string;
  size: string;
  hash: string;
  collectedAt: string;
  source: string;
  status: 'collecting' | 'stored' | 'analyzing' | 'analyzed';
}

export interface CaseNote {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface DetectionRule {
  id: string;
  name: string;
  description: string;
  severity: Severity;
  category: string;
  enabled: boolean;
  hits: number;
  lastTriggered: string | null;
  pattern: string;
}

export const incidents: Incident[] = [
  {
    id: 'INC-2024-001',
    title: 'Crypto Mining Process Detected in Production Container',
    description: 'Suspicious xmrig process detected running inside container web-api-7f8d9 in production cluster. Process is consuming 98% CPU and making outbound connections to known mining pool IPs.',
    severity: 'critical',
    status: 'investigating',
    source: 'Container Runtime Monitor',
    resource: 'web-api-7f8d9',
    resourceType: 'container',
    cluster: 'prod-us-east-1',
    namespace: 'production',
    detectedAt: '2024-01-15T14:23:00Z',
    updatedAt: '2024-01-15T15:45:00Z',
    assignee: 'Sarah Chen',
    tags: ['crypto-mining', 'container-compromise', 'high-cpu'],
    ruleId: 'RULE-003',
    timeline: [
      { id: 't1', timestamp: '2024-01-15T14:23:00Z', type: 'detection', title: 'Anomalous process detected', description: 'Container runtime monitor flagged xmrig process execution', automated: true },
      { id: 't2', timestamp: '2024-01-15T14:23:05Z', type: 'response', title: 'Network policy applied', description: 'Pod quarantined via restrictive NetworkPolicy', automated: true },
      { id: 't3', timestamp: '2024-01-15T14:23:10Z', type: 'collection', title: 'Evidence collection initiated', description: 'Disk snapshot and container logs captured', automated: true },
      { id: 't4', timestamp: '2024-01-15T14:30:00Z', type: 'analysis', title: 'Analyst assigned', description: 'Sarah Chen assigned to investigate', automated: false },
      { id: 't5', timestamp: '2024-01-15T15:00:00Z', type: 'analysis', title: 'Initial analysis complete', description: 'Entry vector identified: vulnerable npm package in base image', automated: false },
    ],
    evidence: [
      { id: 'e1', type: 'disk_snapshot', name: 'web-api-7f8d9-disk-snap', size: '2.4 GB', hash: 'sha256:a1b2c3d4...', collectedAt: '2024-01-15T14:23:12Z', source: 'Kubernetes PV', status: 'analyzed' },
      { id: 'e2', type: 'logs', name: 'container-runtime-logs', size: '145 MB', hash: 'sha256:e5f6g7h8...', collectedAt: '2024-01-15T14:23:15Z', source: 'containerd', status: 'analyzed' },
      { id: 'e3', type: 'network_capture', name: 'pod-network-pcap', size: '89 MB', hash: 'sha256:i9j0k1l2...', collectedAt: '2024-01-15T14:23:20Z', source: 'Network tap', status: 'analyzing' },
      { id: 'e4', type: 'memory_dump', name: 'process-memory-dump', size: '512 MB', hash: 'sha256:m3n4o5p6...', collectedAt: '2024-01-15T14:25:00Z', source: 'Runtime', status: 'stored' },
    ],
    notes: [
      { id: 'n1', author: 'Sarah Chen', content: 'Confirmed xmrig binary injected via compromised npm dependency. Base image uses node:18-alpine with outdated packages.', createdAt: '2024-01-15T15:00:00Z' },
      { id: 'n2', author: 'Sarah Chen', content: 'Outbound connections to mining pool at 185.xxx.xxx.xxx:3333. Network policy successfully blocked further communication.', createdAt: '2024-01-15T15:30:00Z' },
    ],
  },
  {
    id: 'INC-2024-002',
    title: 'Privilege Escalation Attempt in Staging Cluster',
    description: 'ServiceAccount token abuse detected. Pod attempted to list secrets across namespaces using elevated RBAC permissions.',
    severity: 'high',
    status: 'active',
    source: 'K8s Audit Log Analyzer',
    resource: 'debug-pod-x9k2',
    resourceType: 'pod',
    cluster: 'staging-eu-west-1',
    namespace: 'staging',
    detectedAt: '2024-01-15T16:10:00Z',
    updatedAt: '2024-01-15T16:10:00Z',
    assignee: null,
    tags: ['privilege-escalation', 'rbac-abuse', 'k8s-audit'],
    ruleId: 'RULE-004',
    timeline: [
      { id: 't1', timestamp: '2024-01-15T16:10:00Z', type: 'detection', title: 'RBAC abuse detected', description: 'Kubernetes audit log shows unauthorized secret listing across namespaces', automated: true },
      { id: 't2', timestamp: '2024-01-15T16:10:03Z', type: 'response', title: 'Pod network restricted', description: 'Egress network policy applied to pod', automated: true },
    ],
    evidence: [
      { id: 'e1', type: 'logs', name: 'k8s-audit-logs', size: '23 MB', hash: 'sha256:q7r8s9t0...', collectedAt: '2024-01-15T16:10:05Z', source: 'K8s API Server', status: 'collecting' },
    ],
    notes: [],
  },
  {
    id: 'INC-2024-003',
    title: 'Unusual Outbound Data Transfer from Database VM',
    description: 'Anomalous 4.2GB outbound data transfer detected from database VM to external IP. Pattern matches potential data exfiltration.',
    severity: 'critical',
    status: 'contained',
    source: 'VPC Flow Log Analyzer',
    resource: 'db-primary-01',
    resourceType: 'vm',
    cluster: 'prod-us-east-1',
    namespace: 'infrastructure',
    detectedAt: '2024-01-14T22:15:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    assignee: 'Marcus Johnson',
    tags: ['data-exfiltration', 'outbound-anomaly', 'database'],
    ruleId: 'RULE-006',
    timeline: [
      { id: 't1', timestamp: '2024-01-14T22:15:00Z', type: 'detection', title: 'Anomalous transfer detected', description: 'VPC Flow Logs show 4.2GB transfer to unknown external IP', automated: true },
      { id: 't2', timestamp: '2024-01-14T22:15:08Z', type: 'response', title: 'Security group updated', description: 'Restrictive security group applied, outbound blocked', automated: true },
      { id: 't3', timestamp: '2024-01-14T22:16:00Z', type: 'collection', title: 'Disk snapshot created', description: 'EBS snapshot initiated for forensic analysis', automated: true },
      { id: 't4', timestamp: '2024-01-15T08:00:00Z', type: 'analysis', title: 'Analyst assigned', description: 'Marcus Johnson began investigation', automated: false },
      { id: 't5', timestamp: '2024-01-15T10:30:00Z', type: 'analysis', title: 'Containment confirmed', description: 'No further exfiltration detected. Source identified as compromised cron job.', automated: false },
    ],
    evidence: [
      { id: 'e1', type: 'disk_snapshot', name: 'db-primary-ebs-snap', size: '120 GB', hash: 'sha256:u1v2w3x4...', collectedAt: '2024-01-14T22:20:00Z', source: 'AWS EBS', status: 'analyzed' },
      { id: 'e2', type: 'logs', name: 'vpc-flow-logs', size: '340 MB', hash: 'sha256:y5z6a7b8...', collectedAt: '2024-01-14T22:16:00Z', source: 'AWS VPC', status: 'analyzed' },
      { id: 'e3', type: 'logs', name: 'system-auth-logs', size: '56 MB', hash: 'sha256:c9d0e1f2...', collectedAt: '2024-01-14T22:18:00Z', source: 'syslog', status: 'analyzed' },
    ],
    notes: [
      { id: 'n1', author: 'Marcus Johnson', content: 'Compromised cron job was added via stolen SSH key. Key has been revoked and all authorized_keys audited.', createdAt: '2024-01-15T10:30:00Z' },
    ],
  },
  {
    id: 'INC-2024-004',
    title: 'Suspicious kubectl exec into Production Pod',
    description: 'Unauthorized interactive shell session opened via kubectl exec in production namespace from unrecognized IP.',
    severity: 'medium',
    status: 'resolved',
    source: 'K8s Audit Log Analyzer',
    resource: 'payment-svc-3d4f',
    resourceType: 'pod',
    cluster: 'prod-us-east-1',
    namespace: 'production',
    detectedAt: '2024-01-13T09:45:00Z',
    updatedAt: '2024-01-13T14:00:00Z',
    assignee: 'Alex Rivera',
    tags: ['kubectl-exec', 'unauthorized-access', 'production'],
    ruleId: 'RULE-001',
    timeline: [
      { id: 't1', timestamp: '2024-01-13T09:45:00Z', type: 'detection', title: 'Unauthorized exec detected', description: 'kubectl exec from IP 203.x.x.x not in allowlist', automated: true },
      { id: 't2', timestamp: '2024-01-13T09:45:05Z', type: 'response', title: 'Session terminated', description: 'Pod restarted, network policy applied', automated: true },
      { id: 't3', timestamp: '2024-01-13T10:00:00Z', type: 'analysis', title: 'Investigation started', description: 'Alex Rivera assigned', automated: false },
      { id: 't4', timestamp: '2024-01-13T14:00:00Z', type: 'resolution', title: 'Resolved - False positive', description: 'Authorized developer using VPN with new exit IP', automated: false },
    ],
    evidence: [
      { id: 'e1', type: 'logs', name: 'k8s-audit-exec-logs', size: '8 MB', hash: 'sha256:g3h4i5j6...', collectedAt: '2024-01-13T09:45:10Z', source: 'K8s API Server', status: 'analyzed' },
    ],
    notes: [
      { id: 'n1', author: 'Alex Rivera', content: 'Confirmed false positive. Developer was using a new VPN endpoint not yet whitelisted. VPN IP pool updated.', createdAt: '2024-01-13T14:00:00Z' },
    ],
  },
  {
    id: 'INC-2024-005',
    title: 'Container Image with Known CVE Deployed',
    description: 'Container deployed with critical CVE-2024-0001 in base image. Image scan was bypassed due to misconfigured admission controller.',
    severity: 'low',
    status: 'resolved',
    source: 'Image Scanner',
    resource: 'analytics-worker-8h2j',
    resourceType: 'container',
    cluster: 'dev-us-west-2',
    namespace: 'development',
    detectedAt: '2024-01-12T11:00:00Z',
    updatedAt: '2024-01-12T16:00:00Z',
    assignee: 'Sarah Chen',
    tags: ['cve', 'image-scan', 'admission-controller'],
    ruleId: 'RULE-008',
    timeline: [
      { id: 't1', timestamp: '2024-01-12T11:00:00Z', type: 'detection', title: 'Vulnerable image detected', description: 'Post-deploy scan found CVE-2024-0001', automated: true },
      { id: 't2', timestamp: '2024-01-12T11:30:00Z', type: 'response', title: 'Team notified', description: 'Development team alerted', automated: true },
      { id: 't3', timestamp: '2024-01-12T16:00:00Z', type: 'resolution', title: 'Image updated', description: 'Base image updated and admission controller fixed', automated: false },
    ],
    evidence: [
      { id: 'e1', type: 'logs', name: 'image-scan-report', size: '2 MB', hash: 'sha256:k7l8m9n0...', collectedAt: '2024-01-12T11:00:05Z', source: 'Trivy', status: 'analyzed' },
    ],
    notes: [],
  },
];

export const detectionRules: DetectionRule[] = [
  { id: 'RULE-001', name: 'Unauthorized kubectl exec', description: 'Detects interactive shell sessions from unrecognized IPs', severity: 'high', category: 'Unauthorized Access', enabled: true, hits: 23, lastTriggered: '2024-01-13T09:45:00Z', pattern: 'verb=exec AND sourceIP NOT IN allowlist' },
  { id: 'RULE-002', name: 'Container escape attempt', description: 'Detects attempts to break out of container namespace', severity: 'critical', category: 'Container Security', enabled: true, hits: 2, lastTriggered: '2024-01-10T03:22:00Z', pattern: 'syscall IN (unshare, setns) AND container=true' },
  { id: 'RULE-003', name: 'Crypto mining process', description: 'Detects known crypto mining binaries and patterns', severity: 'critical', category: 'Malware', enabled: true, hits: 7, lastTriggered: '2024-01-15T14:23:00Z', pattern: 'process IN (xmrig, minerd, cgminer) OR conn.dest IN mining_pools' },
  { id: 'RULE-004', name: 'RBAC privilege escalation', description: 'Detects ServiceAccount token abuse across namespaces', severity: 'high', category: 'Privilege Escalation', enabled: true, hits: 15, lastTriggered: '2024-01-15T16:10:00Z', pattern: 'verb IN (list, get) AND resource=secrets AND namespace!=own' },
  { id: 'RULE-005', name: 'Reverse shell detection', description: 'Detects reverse shell patterns in container processes', severity: 'critical', category: 'Malware', enabled: true, hits: 1, lastTriggered: '2024-01-08T19:00:00Z', pattern: 'process.cmdline MATCHES /bash.*-i.*\\/dev\\/tcp/' },
  { id: 'RULE-006', name: 'Anomalous outbound transfer', description: 'Detects large unexpected data transfers to external IPs', severity: 'high', category: 'Data Exfiltration', enabled: true, hits: 4, lastTriggered: '2024-01-14T22:15:00Z', pattern: 'flow.bytes_out > 1GB AND dest.ip NOT IN trusted_ranges' },
  { id: 'RULE-007', name: 'Suspicious DNS query', description: 'Detects DNS queries to known C2 domains or DGA patterns', severity: 'medium', category: 'Network', enabled: true, hits: 42, lastTriggered: '2024-01-15T12:00:00Z', pattern: 'dns.query MATCHES dga_pattern OR dns.query IN threat_intel' },
  { id: 'RULE-008', name: 'Vulnerable image deployment', description: 'Detects containers with critical CVEs in production', severity: 'low', category: 'Vulnerability', enabled: false, hits: 89, lastTriggered: '2024-01-12T11:00:00Z', pattern: 'image.cve.severity=CRITICAL AND namespace=production' },
];

export const dashboardStats = {
  totalIncidents: 47,
  activeIncidents: 3,
  containedIncidents: 8,
  resolvedThisWeek: 12,
  mttr: '2.4h',
  evidenceCollected: 156,
  rulesActive: 24,
  alertsToday: 89,
};
