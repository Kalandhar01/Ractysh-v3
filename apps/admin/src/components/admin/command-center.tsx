"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpenText,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  CircleDot,
  Copy,
  Download,
  Eye,
  FileText,
  FolderKanban,
  Globe2,
  ImageIcon,
  Inbox,
  LayoutDashboard,
  LogOut,
  Pencil,
  RefreshCw,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Star,
  Radio,
  Trash2,
  Upload
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { z } from "zod";
import type {
  AdminCommandCenterData,
  AdminView,
  ActivityRow,
  AlertRow,
  AnalyticsSeries,
  ApplicationRow,
  AuditLogRow,
  BlogRow,
  BusinessRow,
  ContactRow,
  DocumentRow,
  DomainMappingRow,
  JobRow,
  LeadFilter,
  LeadRow,
  MediaRow,
  NotificationRow,
  ProjectKey,
  ProjectRow,
  ReviewRow,
  NewsletterRow,
  ServiceRow,
  SettingsRow,
  SubscriberRow
} from "@ractysh/types/admin";
import { adminProjectRoutes, groupProjectKey } from "@/lib/admin/projects";
import { cn } from "@/lib/utils";

type CommandResponse = {
  success: boolean;
  message?: string;
  data?: AdminCommandCenterData;
};

const commandCenterIntroStorageKey = "ractysh-command-center-v3-opened";
const commandCenterIntroCompleteMs = 3_000;
const commandCenterIntroFailsafeMs = 3_500;
const dashboardEntranceTransition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

function debugCommandCenterIntro(message: string, reason?: string) {
  if (process.env.NODE_ENV === "development") {
    console.debug(`[CommandCenterIntro] ${message}${reason ? ` (${reason})` : ""}`);
  }
}

function hasCompletedCommandCenterIntro() {
  try {
    return window.sessionStorage.getItem(commandCenterIntroStorageKey) === "1";
  } catch {
    return false;
  }
}

function markCommandCenterIntroComplete() {
  try {
    window.sessionStorage.setItem(commandCenterIntroStorageKey, "1");
  } catch {
    // Storage can be unavailable on some mobile browsing modes. The state transition must still complete.
  }
}

function clearCommandCenterIntroSession() {
  try {
    window.sessionStorage.removeItem(commandCenterIntroStorageKey);
  } catch {
    // Ignore storage failures during logout.
  }
}

type Column<T> = ColumnDef<T, unknown> & {
  meta?: {
    width?: string;
  };
};

const views: Array<{ key: AdminView; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { key: "overview", label: "Dashboard", icon: LayoutDashboard },
  { key: "businesses", label: "Businesses", icon: Building2 },
  { key: "domains", label: "Domains", icon: Globe2 },
  { key: "command", label: "Command Center", icon: Activity },
  { key: "leads", label: "Leads", icon: Inbox },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "services", label: "Services", icon: ShieldCheck },
  { key: "blogs", label: "Blogs", icon: BookOpenText },
  { key: "media", label: "Media", icon: ImageIcon },
  { key: "careers", label: "Careers", icon: BriefcaseBusiness },
  { key: "newsletter", label: "Newsletter", icon: Send },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "audit", label: "Audit Logs", icon: Archive },
  { key: "settings", label: "Settings", icon: Settings },
];

const leadFilters: LeadFilter[] = ["New", "Read", "Responded", "Archived"];
const mediaFolders = ["Infrastructure", "Architecture", "Construction", "Real Estate", "Import Export", "OTC", "Founder", "Blogs", "Careers"];
const founderHomeProjects: Array<{ key: ProjectKey; label: string; description: string }> = [
  { key: "architecture", label: "Architecture", description: "Manage projects, services, leads and content." },
  { key: "construction", label: "Construction", description: "Manage infrastructure and execution operations." },
  { key: "real-estate", label: "Real Estate", description: "Manage assets, opportunities and enquiries." },
  { key: "import-export", label: "Import & Export", description: "Manage trade operations and documentation." },
  { key: "otc-exchange", label: "OTC Exchange", description: "Manage transactions and governance." }
];
const founderLiveStatuses = founderHomeProjects.map((project) => project.label);
const fieldClass =
  "h-10 rounded-[8px] border border-[#232323] bg-[#080808] px-3 text-sm text-[#F5F5F5] outline-none transition placeholder:text-[#666666] focus:border-[#8F1118]";
const textareaClass =
  "min-h-24 rounded-[8px] border border-[#232323] bg-[#080808] px-3 py-2 text-sm leading-6 text-[#F5F5F5] outline-none transition placeholder:text-[#666666] focus:border-[#8F1118]";

const blogFormSchema = z.object({
  id: z.string().optional(),
  division: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().optional(),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  coverImage: z.string().optional(),
  coverImageAlt: z.string().optional(),
  author: z.string().min(1),
  category: z.string().min(1),
  tags: z.string().optional(),
  featured: z.boolean().optional(),
  status: z.enum(["draft", "scheduled", "published", "archived"]),
  publishedAt: z.string().optional(),
  readTime: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  canonicalUrl: z.string().optional()
});

const newsletterFormSchema = z.object({
  id: z.string().optional(),
  division: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().optional(),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  coverImage: z.string().optional(),
  category: z.string().min(1),
  author: z.string().min(1),
  featured: z.boolean().optional(),
  status: z.enum(["draft", "scheduled", "published", "archived"]),
  publishDate: z.string().optional(),
  tags: z.string().optional(),
  readTime: z.string().optional()
});

const serviceFormSchema = z.object({
  id: z.string().optional(),
  division: z.string().min(1),
  companyId: z.string().optional(),
  title: z.string().min(1),
  slug: z.string().optional(),
  summary: z.string().min(1),
  description: z.string().optional(),
  category: z.string().min(1),
  href: z.string().optional(),
  imageUrl: z.string().optional(),
  tags: z.string().optional(),
  images: z.string().optional(),
  heroContent: z.string().refine(isJson, "Invalid JSON"),
  metrics: z.string().refine(isJson, "Invalid JSON"),
  sections: z.string().refine(isJson, "Invalid JSON"),
  cta: z.string().refine(isJson, "Invalid JSON"),
  seo: z.string().refine(isJson, "Invalid JSON"),
  status: z.enum(["draft", "published", "archived"]),
  position: z.coerce.number().int()
});

const jobFormSchema = z.object({
  id: z.string().optional(),
  division: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().optional(),
  location: z.string().min(1),
  type: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["draft", "published", "archived"])
});

const businessFormSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1),
  name: z.string().min(1),
  legalName: z.string().optional(),
  summary: z.string().min(1),
  description: z.string().optional(),
  website: z.string().optional(),
  status: z.enum(["active", "inactive", "archived"]),
  position: z.coerce.number().int()
});

const domainFormSchema = z.object({
  id: z.string().optional(),
  domain: z.string().min(1),
  division: z.string().min(1),
  companyId: z.string().optional(),
  status: z.enum(["active", "inactive", "archived"]),
  primary: z.boolean().optional(),
  notes: z.string().optional()
});

type BlogFormValues = z.infer<typeof blogFormSchema>;
type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;
type ServiceFormValues = z.infer<typeof serviceFormSchema>;
type JobFormValues = z.infer<typeof jobFormSchema>;
type BusinessFormValues = z.infer<typeof businessFormSchema>;
type DomainFormValues = z.infer<typeof domainFormSchema>;

function isJson(value: string): boolean {
  try {
    JSON.parse(value || "{}");
    return true;
  } catch {
    return false;
  }
}

function parseJson(value: string, fallback: unknown) {
  if (!value.trim()) return fallback;
  return JSON.parse(value);
}

function csv(value?: string): string[] {
  return (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function jsonText(value: unknown, fallback: unknown): string {
  return JSON.stringify(value ?? fallback, null, 2);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en", { notation: value > 9999 ? "compact" : "standard" }).format(value);
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en", {
    currency: "USD",
    maximumFractionDigits: 0,
    notation: value > 999999 ? "compact" : "standard",
    style: "currency"
  }).format(value);
}

function formatMetricValue(value: number, format?: "number" | "currency" | "percent"): string {
  if (format === "currency") return formatCurrency(value);
  if (format === "percent") return `${formatNumber(value)}%`;
  return formatNumber(value);
}

function formatDate(value?: string | null): string {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Invalid";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function timeAgo(value?: string | null): string {
  if (!value) return "Not set";
  const date = new Date(value).getTime();
  if (Number.isNaN(date)) return "Invalid";
  const seconds = Math.max(1, Math.floor((Date.now() - date) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function TimeAgoText({ value, className }: { value?: string | null; className?: string }) {
  return (
    <span className={className} suppressHydrationWarning>
      {timeAgo(value)}
    </span>
  );
}

function adminGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function isToday(value?: string | null): boolean {
  if (!value) return false;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  const today = new Date();

  return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
}

function toDateTimeLocal(value?: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
}

function statusClass(status: string): string {
  if (["critical", "high", "unread"].includes(status)) {
    return "border-[#8F1118]/50 bg-[#8F1118]/15 text-[#F5F5F5]";
  }
  if (["medium", "read", "empty"].includes(status)) {
    return "border-[#232323] bg-[#151515] text-[#9B9B9B]";
  }
  if (["low"].includes(status)) {
    return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300";
  }
  if (["published", "active", "hired", "selected", "won", "Responded"].includes(status)) {
    return "border-emerald-500/25 bg-emerald-500/10 text-emerald-300";
  }
  if (["scheduled", "reviewed", "shortlisted", "Read"].includes(status)) {
    return "border-[#B71C24]/35 bg-[#B71C24]/10 text-[#F5F5F5]";
  }
  if (["archived", "rejected", "Archived"].includes(status)) {
    return "border-[#232323] bg-[#080808] text-[#9B9B9B]";
  }
  return "border-[#232323] bg-[#151515] text-[#F5F5F5]";
}

function careerLabel(status: string): string {
  if (status === "new") return "Applied";
  if (status === "reviewed") return "Reviewing";
  if (status === "shortlisted") return "Interview";
  if (status === "hired") return "Selected";
  if (status === "rejected") return "Rejected";
  return status;
}

function projectLabel(data: AdminCommandCenterData, project: ProjectKey): string {
  return data.projectOptions.find((option) => option.key === project)?.label || "Ractysh Group";
}

function textMatchesProject(project: ProjectKey, data: AdminCommandCenterData, ...values: Array<string | null | undefined>): boolean {
  if (project === groupProjectKey) return true;
  const option = data.projectOptions.find((item) => item.key === project);
  if (!option) return true;
  const text = values.filter(Boolean).join(" ").toLowerCase();
  return option.keywords.some((keyword) => text.includes(keyword)) || text.includes(option.label.toLowerCase());
}

function scopedRows<T>(
  rows: T[],
  project: ProjectKey,
  data: AdminCommandCenterData,
  division: (row: T) => ProjectKey | null | undefined,
  text: (row: T) => Array<string | null | undefined>
): T[] {
  if (project === groupProjectKey) return rows;
  return rows.filter((row) => division(row) === project || textMatchesProject(project, data, ...text(row)));
}

function buildAnalyticsFromScopedRows(
  fallback: AnalyticsSeries[],
  rows: { leads: LeadRow[]; blogs: BlogRow[]; subscribers: SubscriberRow[]; applications: ApplicationRow[] }
): AnalyticsSeries[] {
  const countBy = <T,>(items: T[], label: (item: T) => string) => {
    const counts = new Map<string, number>();
    for (const item of items) {
      const key = label(item) || "Unknown";
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return Array.from(counts, ([label, value]) => ({ label, value }));
  };
  const totalLeads = rows.leads.length || 1;
  const newLeads = rows.leads.filter((lead) => lead.status === "New").length;
  const respondedLeads = rows.leads.filter((lead) => lead.status === "Responded").length;
  const archivedLeads = rows.leads.filter((lead) => lead.status === "Archived").length;

  return [
    { key: "leadSources", label: "Lead Sources", points: countBy(rows.leads, (lead) => lead.kind) },
    {
      key: "conversionRate",
      label: "Conversion Rate",
      format: "percent",
      points: [
        { label: "Responded", value: Math.round((respondedLeads / totalLeads) * 100) },
        { label: "Archived", value: Math.round((archivedLeads / totalLeads) * 100) },
        { label: "Unread", value: Math.round((newLeads / totalLeads) * 100) }
      ]
    },
    fallback.find((series) => series.key === "consultationGrowth") || { key: "consultationGrowth", label: "Consultation Growth", points: [] },
    { key: "blogPerformance", label: "Blog Performance", points: rows.blogs.slice(0, 12).map((blog) => ({ label: blog.title, value: blog.views })) },
    fallback.find((series) => series.key === "subscriberGrowth") || { key: "subscriberGrowth", label: "Subscriber Growth", points: [] },
    { key: "careerApplications", label: "Career Applications", points: countBy(rows.applications, (application) => careerLabel(application.status)) }
  ];
}

function scopedData(data: AdminCommandCenterData, project: ProjectKey): AdminCommandCenterData {
  if (project === groupProjectKey) return data;

  const leads = scopedRows(data.leads, project, data, (lead) => lead.division, (lead) => [lead.kind, lead.company, lead.service, lead.message]);
  const blogs = scopedRows(data.blogs, project, data, (blog) => blog.division, (blog) => [blog.title, blog.category, blog.tags.join(" ")]);
  const newsletters = scopedRows(data.newsletters, project, data, (newsletter) => newsletter.division, (newsletter) => [newsletter.title, newsletter.category, newsletter.tags.join(" ")]);
  const services = scopedRows(data.services, project, data, (service) => service.division, (service) => [service.companyName, service.category, service.title, service.summary]);
  const media = scopedRows(data.media, project, data, (asset) => asset.division, (asset) => [asset.folder, asset.title, asset.url]);
  const jobs = scopedRows(data.jobs, project, data, (job) => job.division, (job) => [job.title, job.location, job.summary]);
  const applications = scopedRows(data.applications, project, data, (application) => application.division, (application) => [application.position, application.message]);
  const contacts = scopedRows(data.contacts, project, data, (contact) => contact.division, (contact) => [contact.service, contact.company, contact.subject, contact.message]);
  const projects = data.projects.filter((item) => item.divisionKey === project || item.project === project);
  const documents = scopedRows(data.documents, project, data, (document) => document.division, (document) => [document.category, document.projectName, document.filename]);
  const notifications = data.notifications.filter((notification) => notification.division === project);
  const activities = data.activities.filter((activity) => activity.division === project);
  const criticalAlerts = data.criticalAlerts.filter((alert) => alert.division === project);
  const pendingReviews = data.pendingReviews.filter((review) => review.division === project);
  const approvalQueue = data.approvalQueue.filter((review) => review.division === project);
  const subscribers = data.subscribers.filter((subscriber) => subscriber.division === project);
  const business = data.businesses.filter((item) => item.key === project);
  const domainMappings = data.domainMappings.filter((item) => item.division === project);
  const newLeads = leads.filter((lead) => lead.status === "New").length;
  const readLeads = leads.filter((lead) => lead.status === "Read").length;
  const respondedLeads = leads.filter((lead) => lead.status === "Responded").length;
  const archivedLeads = leads.filter((lead) => lead.status === "Archived").length;
  const revenuePipeline = projects.reduce((total, item) => total + (item.budget || 0), 0);
  const openOpportunities = Math.max(0, leads.length - archivedLeads);

  return {
    ...data,
    overview: [
      { key: "contactRequests", label: "Contact Requests", value: contacts.length, detail: `${projectLabel(data, project)} contact records` },
      { key: "consultationRequests", label: "Consultation Requests", value: leads.filter((lead) => lead.kind === "Consultation").length, detail: "Scoped consultation records" },
      { key: "careerApplications", label: "Career Applications", value: applications.length, detail: "Scoped application records" },
      { key: "newsletterSubscribers", label: "Newsletter Subscribers", value: subscribers.length, detail: "Scoped subscriber records" },
      { key: "blogPosts", label: "Blog Posts", value: blogs.length, detail: "Scoped blog records" },
      { key: "publishedServices", label: "Published Services", value: services.filter((service) => service.status === "published").length, detail: "Scoped published services" }
    ],
    executiveMetrics: [
      { key: "revenuePipeline", label: "Revenue Pipeline", value: revenuePipeline, detail: "Scoped project budgets", format: "currency" },
      { key: "openOpportunities", label: "Open Opportunities", value: openOpportunities, detail: "Scoped open lead pipeline" },
      { key: "unreadLeads", label: "Unread Leads", value: newLeads, detail: "Scoped new items" },
      { key: "projectsActive", label: "Projects Active", value: projects.filter((item) => item.status === "active").length, detail: "Scoped active projects" },
      { key: "consultations", label: "Consultations", value: leads.filter((lead) => lead.kind === "Consultation").length, detail: "Scoped consultation requests" },
      { key: "applications", label: "Applications", value: applications.length, detail: "Scoped applications" },
      { key: "subscribers", label: "Subscribers", value: subscribers.length, detail: "Scoped subscribers" }
    ],
    pipeline: [
      { label: "New", value: newLeads },
      { label: "Read", value: readLeads },
      { label: "Responded", value: respondedLeads },
      { label: "Archived", value: archivedLeads }
    ],
    revenuePipeline,
    openOpportunities,
    leads,
    projects,
    documents,
    blogs,
    subscribers,
    newsletters,
    services,
    media,
    jobs,
    applications,
    contacts,
    notifications,
    unreadNotifications: notifications.filter((notification) => notification.status === "unread").length,
    activities,
    criticalAlerts,
    pendingReviews,
    approvalQueue,
    analytics: buildAnalyticsFromScopedRows(data.analytics, { leads, blogs, subscribers, applications }),
    businesses: business.length ? business : data.businesses,
    domainMappings
  };
}

function searchResults(data: AdminCommandCenterData, query: string) {
  const value = query.trim().toLowerCase();
  if (!value) return [];
  const matches = (text: string) => text.toLowerCase().includes(value);
  const results: Array<{ id: string; type: AdminView; label: string; detail: string }> = [];

  for (const blog of data.blogs) if (matches(`${blog.title} ${blog.category} ${blog.excerpt}`)) results.push({ id: blog.id, type: "blogs", label: blog.title, detail: "Blog" });
  for (const lead of data.leads) if (matches(`${lead.name} ${lead.email} ${lead.service} ${lead.message}`)) results.push({ id: lead.id, type: "leads", label: lead.name, detail: lead.kind });
  for (const application of data.applications) if (matches(`${application.fullName} ${application.email} ${application.position}`)) results.push({ id: application.id, type: "careers", label: application.fullName, detail: "Applicant" });
  for (const service of data.services) if (matches(`${service.title} ${service.category} ${service.summary}`)) results.push({ id: service.id, type: "services", label: service.title, detail: "Service" });
  for (const project of data.projects) if (matches(`${project.title} ${project.division} ${project.summary}`)) results.push({ id: project.id, type: "projects", label: project.title, detail: "Project" });
  for (const business of data.businesses) if (matches(`${business.label} ${business.summary} ${business.primaryDomain || ""}`)) results.push({ id: business.id, type: "businesses", label: business.label, detail: "Business" });
  for (const domain of data.domainMappings) if (matches(`${domain.domain} ${domain.divisionLabel}`)) results.push({ id: domain.id, type: "domains", label: domain.domain, detail: domain.divisionLabel });
  for (const setting of data.settings) if (matches(`${setting.key} ${setting.label} ${setting.scope}`)) results.push({ id: setting.id, type: "settings", label: setting.label, detail: "Settings" });
  for (const asset of data.media) if (matches(`${asset.title} ${asset.folder} ${asset.url}`)) results.push({ id: asset.id, type: "media", label: asset.title, detail: "Media" });

  return results.slice(0, 8);
}

function csvEscape(value: unknown): string {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function downloadCsv(filename: string, rows: Array<Record<string, unknown>>) {
  if (!rows.length) {
    toast.message("No rows to export.");
    return;
  }

  const headers = Object.keys(rows[0]);
  const csvText = [headers.join(","), ...rows.map((row) => headers.map((key) => csvEscape(row[key])).join(","))].join("\n");
  const blob = new Blob([csvText], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function Table<T extends object>({
  rows,
  columns,
  search,
  empty
}: {
  rows: T[];
  columns: Column<T>[];
  search: string;
  empty: string;
}) {
  const [scrollTop, setScrollTop] = React.useState(0);
  const filteredRows = React.useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((row) => JSON.stringify(row).toLowerCase().includes(query));
  }, [rows, search]);
  const table = useReactTable({
    data: filteredRows,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  const tableRows = table.getRowModel().rows;
  const rowHeight = 58;
  const viewportHeight = Math.min(420, Math.max(180, tableRows.length * rowHeight || 180));
  const start = Math.max(0, Math.floor(scrollTop / rowHeight) - 4);
  const visibleCount = Math.ceil(viewportHeight / rowHeight) + 8;
  const visibleRows = tableRows.slice(start, start + visibleCount);
  const gridTemplateColumns = table
    .getAllLeafColumns()
    .map((column) => (column.columnDef.meta as { width?: string } | undefined)?.width || "minmax(12rem,1fr)")
    .join(" ");

  return (
    <div className="overflow-hidden rounded-[8px] border border-[#232323] bg-[#111111]">
      <div className="overflow-x-auto">
        <div className="min-w-[58rem]">
          {table.getHeaderGroups().map((headerGroup) => (
            <div
              key={headerGroup.id}
              className="grid border-b border-[#232323] bg-[#151515] text-xs font-semibold text-[#9B9B9B]"
              style={{ gridTemplateColumns }}
            >
              {headerGroup.headers.map((header) => (
                <div key={header.id} className="px-4 py-3">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </div>
              ))}
            </div>
          ))}

          {tableRows.length ? (
            <div
              className="relative overflow-y-auto"
              style={{ height: viewportHeight }}
              onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
            >
              <div style={{ height: tableRows.length * rowHeight }}>
                {visibleRows.map((row) => (
                  <div
                    key={row.id}
                    className="absolute left-0 grid w-full border-b border-[#232323]/80 text-sm text-[#F5F5F5]"
                    style={{
                      height: rowHeight,
                      transform: `translateY(${row.index * rowHeight}px)`,
                      gridTemplateColumns
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <div key={cell.id} className="flex min-w-0 items-center px-4 py-2">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="px-4 py-10 text-sm text-[#9B9B9B]">{empty}</div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusPill({ value }: { value: string }) {
  return <span className={cn("rounded-[8px] border px-2.5 py-1 text-xs", statusClass(value))}>{value}</span>;
}

function Panel({
  title,
  action,
  children
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[8px] border border-[#232323] bg-[#111111] p-4">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-lg font-semibold tracking-tight text-[#F5F5F5]">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function IconButton({
  label,
  onClick,
  children,
  danger,
  disabled
}: {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#232323] bg-[#151515] text-[#F5F5F5] transition hover:border-[#8F1118] disabled:pointer-events-none disabled:opacity-45",
        danger && "text-red-300 hover:border-red-500/50"
      )}
    >
      {children}
    </button>
  );
}

function ProjectSwitcher({
  activeProject,
  options,
  onProjectChange
}: {
  activeProject: ProjectKey;
  options: AdminCommandCenterData["projectOptions"];
  onProjectChange: (project: ProjectKey) => void;
}) {
  const switcherValue = options.some((project) => project.key === activeProject) ? activeProject : options[0]?.key || groupProjectKey;

  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border border-[#232323] bg-[#111111]">
        <ShieldCheck className="h-5 w-5 text-[#B71C24]" />
      </div>
      <div className="min-w-0">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9B9B9B]">Division</p>
        <label className="relative block min-w-0">
          <span className="sr-only">Switch Division</span>
          <select
            value={switcherValue}
            onChange={(event) => onProjectChange(event.target.value as ProjectKey)}
            className="h-10 max-w-[17rem] appearance-none rounded-[8px] border border-[#232323] bg-[#111111] pl-3 pr-9 text-sm font-semibold text-[#F5F5F5] outline-none transition hover:border-[#8F1118] focus:border-[#8F1118]"
          >
            {options.map((project) => (
              <option key={project.key} value={project.key}>
                {project.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9B9B9B]" />
        </label>
      </div>
    </div>
  );
}

function ActivityList({ rows, empty }: { rows: ActivityRow[]; empty: string }) {
  if (!rows.length) return <p className="text-sm text-[#9B9B9B]">{empty}</p>;

  return (
    <div className="grid gap-2">
      {rows.slice(0, 12).map((activity) => (
        <div key={activity.id} className="grid gap-1 rounded-[8px] border border-[#232323] bg-[#151515] p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="min-w-0 truncate text-sm font-semibold text-[#F5F5F5]">{activity.title}</p>
            <TimeAgoText value={activity.createdAt} className="shrink-0 text-xs text-[#9B9B9B]" />
          </div>
          <p className="text-xs text-[#9B9B9B]">{activity.actor} · {activity.detail}</p>
        </div>
      ))}
    </div>
  );
}

function AlertList({ rows, empty }: { rows: AlertRow[]; empty: string }) {
  if (!rows.length) return <p className="text-sm text-[#9B9B9B]">{empty}</p>;

  return (
    <div className="grid gap-2">
      {rows.slice(0, 10).map((alert) => (
        <div key={alert.id} className="rounded-[8px] border border-[#8F1118]/40 bg-[#8F1118]/10 p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#F5F5F5]">{alert.title}</p>
            <StatusPill value={alert.priority} />
          </div>
          <p className="mt-2 text-xs leading-5 text-[#9B9B9B]">{alert.detail}</p>
        </div>
      ))}
    </div>
  );
}

function ReviewList({ rows, empty }: { rows: ReviewRow[]; empty: string }) {
  if (!rows.length) return <p className="text-sm text-[#9B9B9B]">{empty}</p>;

  return (
    <div className="grid gap-2">
      {rows.slice(0, 10).map((review) => (
        <div key={review.id} className="grid gap-1 rounded-[8px] border border-[#232323] bg-[#151515] p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="min-w-0 truncate text-sm font-semibold text-[#F5F5F5]">{review.title}</p>
            <TimeAgoText value={review.createdAt} className="shrink-0 text-xs text-[#9B9B9B]" />
          </div>
          <p className="text-xs text-[#9B9B9B]">{review.type} · {review.detail}</p>
        </div>
      ))}
    </div>
  );
}

function BarChart({ series }: { series: AnalyticsSeries }) {
  const max = Math.max(...series.points.map((point) => point.value), 1);

  return (
    <div className="grid gap-3">
      {series.points.length ? (
        series.points.map((point) => (
          <div key={point.label} className="grid gap-2">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="min-w-0 truncate text-[#9B9B9B]">{point.label}</span>
              <span className="font-semibold text-[#F5F5F5]">{formatMetricValue(point.value, series.format)}</span>
            </div>
            <div className="h-2 rounded-full bg-[#080808]">
              <div className="h-2 rounded-full bg-[#8F1118]" style={{ width: `${Math.max(3, (point.value / max) * 100)}%` }} />
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-[#9B9B9B]">No chart data found in Prisma.</p>
      )}
    </div>
  );
}

function QuickActions({ setActiveView }: { setActiveView: (view: AdminView) => void }) {
  const actions: Array<{ label: string; view: AdminView; icon: React.ComponentType<{ className?: string }> }> = [
    { label: "Create Blog", view: "blogs", icon: BookOpenText },
    { label: "Create Job", view: "careers", icon: BriefcaseBusiness },
    { label: "Upload Media", view: "media", icon: Upload },
    { label: "Create Service Update", view: "services", icon: ShieldCheck },
    { label: "Send Newsletter", view: "newsletter", icon: Send }
  ];

  return (
    <div className="fixed bottom-20 right-4 z-40 hidden rounded-[8px] border border-[#232323] bg-[#111111]/95 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur lg:block">
      <div className="grid gap-1">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              type="button"
              onClick={() => setActiveView(action.view)}
              className="flex h-9 items-center gap-2 rounded-[8px] px-3 text-left text-xs font-semibold text-[#F5F5F5] transition hover:bg-[#151515]"
            >
              <Icon className="h-4 w-4 text-[#B71C24]" />
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AnimatedCounter({ value, active, format }: { value: number; active: boolean; format?: "number" | "currency" | "percent" }) {
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!active) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const totalFrames = 72;
    const start = performance.now();
    let raf = 0;

    const tick = () => {
      frame += 1;
      const elapsed = performance.now() - start;
      const progress = Math.min(1, Math.max(frame / totalFrames, elapsed / 1800));
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);

  return <>{formatMetricValue(display, format)}</>;
}

function OpeningExperience({ data, active }: { data: AdminCommandCenterData; active: boolean }) {
  const divisions = data.projectOptions.map((option) => option.label);
  const bootItems = [
    "Loading Enterprise Assets",
    "Loading Project Intelligence",
    "Loading Lead Network",
    "Loading Executive Reports",
    "Loading Command Streams",
    "Loading Subscriber Network"
  ];
  const publishedContent =
    data.blogs.filter((blog) => blog.status === "published").length +
    data.newsletters.filter((newsletter) => newsletter.status === "published").length +
    data.services.filter((service) => service.status === "published").length;
  const counters = [
    { label: "Projects Online", value: data.projects.filter((project) => project.status === "active").length || data.projects.length },
    { label: "Active Leads", value: data.openOpportunities },
    { label: "Applications", value: data.applications.length },
    { label: "Subscribers", value: data.subscribers.length },
    { label: "Published Content", value: publishedContent }
  ];
  const particles = React.useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        top: `${(index * 19) % 100}%`,
        delay: (index % 9) * 0.25,
        duration: 4 + (index % 5) * 0.55
      })),
    []
  );

  return (
    <motion.section
      className="fixed inset-0 z-[100] overflow-hidden bg-[#080808] text-[#F5F5F5]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.015 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Ractysh Command Center opening"
    >
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,245,245,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(245,245,245,.09) 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}
      />
      <motion.div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B71C24] to-transparent"
        animate={{ x: ["-20%", "20%", "-20%"], opacity: [0.25, 0.7, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#c7a15a] to-transparent"
        animate={{ x: ["18%", "-18%", "18%"], opacity: [0.15, 0.45, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(143,17,24,.18),transparent_24%,transparent_72%,rgba(183,28,36,.12))]" />
      <div className="absolute inset-x-0 top-1/3 h-56 bg-[linear-gradient(90deg,transparent,rgba(143,17,24,.16),transparent)] blur-3xl" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-1 w-1 rounded-[2px] bg-[#B71C24]/45"
          style={{ left: particle.left, top: particle.top }}
          animate={{ y: [-12, 16, -12], opacity: [0.08, 0.55, 0.08], scale: [0.8, 1.25, 0.8] }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-8">
        <div className="grid w-full max-w-6xl gap-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto grid max-w-3xl justify-items-center text-center"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-[8px] border border-[#8F1118]/45 bg-[#111111] shadow-[0_0_80px_rgba(143,17,24,.24)]">
              <ShieldCheck className="h-12 w-12 text-[#B71C24]" />
            </div>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.95] tracking-tight text-[#F5F5F5] sm:text-7xl">Ractysh Command Center</h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#9B9B9B]">Enterprise Operations Network</p>
          </motion.div>

          <div className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="grid gap-3">
              {divisions.map((division, index) => (
                <motion.div
                  key={division}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.62, delay: 0.55 + index * 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3 rounded-[8px] border border-[#232323]/80 bg-[#111111]/75 px-4 py-3 backdrop-blur"
                >
                  <span className="h-px w-8 bg-[#B71C24]" />
                  <span className="text-lg font-semibold text-[#F5F5F5]">{division}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[8px] border border-[#232323] bg-[#111111]/80 p-4 backdrop-blur"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9B9B9B]">System Boot Sequence</p>
              <div className="mt-4 grid gap-3">
                {bootItems.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0.25 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35, delay: 0.5 + index * 0.28 }}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-[#9B9B9B]">{item}</span>
                    <motion.span
                      className="h-1.5 w-16 overflow-hidden rounded-full bg-[#080808]"
                      initial={false}
                    >
                      <motion.span
                        className="block h-full rounded-full bg-[#8F1118]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.7, delay: 0.62 + index * 0.28, ease: "easeOut" }}
                      />
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mx-auto grid w-full max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {counters.map((counter, index) => (
              <motion.div
                key={counter.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.15 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[8px] border border-[#232323] bg-[#111111]/80 p-4 text-center backdrop-blur"
              >
                <p className="text-2xl font-semibold tracking-normal text-[#F5F5F5]">
                  <AnimatedCounter value={counter.value} active={active} />
                </p>
                <p className="mt-2 text-xs text-[#9B9B9B]">{counter.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export function AdminCommandCenter({
  initialData,
  initialProject,
  dashboardTitle
}: {
  initialData: AdminCommandCenterData;
  initialProject: ProjectKey;
  dashboardTitle: string;
}) {
  const router = useRouter();
  const [data, setData] = React.useState(initialData);
  const [activeView, setActiveView] = React.useState<AdminView>("overview");
  const [activeProject, setActiveProject] = React.useState<ProjectKey>(initialProject);
  const [search, setSearch] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [showOpening, setShowOpening] = React.useState(true);
  const [showDashboard, setShowDashboard] = React.useState(false);
  const introCompletedRef = React.useRef(false);
  const scoped = React.useMemo(() => scopedData(data, activeProject), [activeProject, data]);
  const globalResults = React.useMemo(() => searchResults(scoped, search), [scoped, search]);
  const activeProjectOption = data.projectOptions.find((option) => option.key === activeProject);
  const activeProjectRoute = adminProjectRoutes.find((route) => route.key === activeProject);
  const activeDashboardTitle = activeProjectRoute?.title || (activeProjectOption ? `${activeProjectOption.label} Dashboard` : dashboardTitle);

  const completeIntro = React.useCallback((reason: "animation" | "session" | "failsafe") => {
    if (introCompletedRef.current) return;

    introCompletedRef.current = true;
    markCommandCenterIntroComplete();
    if (reason !== "session") debugCommandCenterIntro("Animation Completed", reason);
    setShowDashboard(true);
    setShowOpening(false);
  }, []);

  React.useEffect(() => {
    setActiveProject(initialProject);
    setActiveView("overview");
    setSearch("");
  }, [initialProject]);

  const switchProject = React.useCallback(
    (project: ProjectKey) => {
      const option = data.projectOptions.find((item) => item.key === project);
      if (!option) return;

      setActiveProject(project);
      setActiveView("overview");
      setSearch("");
      router.push(option.href);
    },
    [data.projectOptions, router]
  );

  const runIntent = React.useCallback(
    async (body: Record<string, unknown>, successMessage: string) => {
      setPending(true);
      try {
        const response = await fetch("/api/admin/command-center", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        const payload = (await response.json().catch(() => ({}))) as CommandResponse;

        if (!response.ok || !payload.success || !payload.data) {
          throw new Error(payload.message || "Admin action failed.");
        }

        setData(payload.data);
        toast.success(successMessage);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Admin action failed.");
      } finally {
        setPending(false);
      }
    },
    []
  );

  const refresh = React.useCallback(async (silent = false) => {
    if (!silent) setPending(true);
    try {
      const response = await fetch("/api/admin/command-center", { cache: "no-store" });
      const payload = (await response.json().catch(() => ({}))) as CommandResponse;
      if (!response.ok || !payload.data) throw new Error(payload.message || "Refresh failed.");
      setData(payload.data);
      if (!silent) toast.success("Command center refreshed.");
    } catch (error) {
      if (!silent) toast.error(error instanceof Error ? error.message : "Refresh failed.");
    } finally {
      if (!silent) setPending(false);
    }
  }, []);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        refresh(true);
      }
    }, 25_000);

    return () => window.clearInterval(timer);
  }, [refresh]);

  React.useEffect(() => {
    debugCommandCenterIntro("Dashboard Mounted");
  }, []);

  React.useEffect(() => {
    if (hasCompletedCommandCenterIntro()) {
      completeIntro("session");
      return;
    }

    if (!showOpening || introCompletedRef.current) return;

    debugCommandCenterIntro("Animation Started");

    const completeTimer = window.setTimeout(() => completeIntro("animation"), commandCenterIntroCompleteMs);
    const failsafeTimer = window.setTimeout(() => completeIntro("failsafe"), commandCenterIntroFailsafeMs);

    return () => {
      window.clearTimeout(completeTimer);
      window.clearTimeout(failsafeTimer);
    };
  }, [completeIntro, showOpening]);

  React.useEffect(() => {
    if (showDashboard) debugCommandCenterIntro("Dashboard Visible");
  }, [showDashboard]);

  const logout = React.useCallback(async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    clearCommandCenterIntroSession();
    window.location.assign("/");
  }, []);

  return (
    <main className="min-h-screen bg-[#080808] text-[#F5F5F5]">
      <Toaster theme="dark" richColors position="top-right" />
      <AnimatePresence>{showOpening ? <OpeningExperience data={data} active={showOpening} /> : null}</AnimatePresence>
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <motion.aside
          className="fixed inset-x-0 bottom-0 z-40 border-t border-[#232323] bg-[#080808]/95 px-2 py-2 backdrop-blur lg:sticky lg:inset-y-0 lg:h-screen lg:border-r lg:border-t-0 lg:px-0 lg:py-4"
          initial={false}
          animate={showDashboard ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={dashboardEntranceTransition}
          style={{ pointerEvents: showDashboard ? "auto" : "none" }}
        >
          <nav className="flex justify-start gap-1 overflow-x-auto lg:grid lg:overflow-visible lg:px-3 lg:gap-2">
            {views.map((item) => {
              const Icon = item.icon;
              const active = activeView === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  title={item.label}
                  aria-label={`Navigation ${item.label}`}
                  onClick={() => setActiveView(item.key)}
                  className={cn(
                    "flex h-11 w-11 items-center justify-center gap-2 rounded-[8px] border text-[#9B9B9B] transition lg:w-full lg:justify-start lg:px-3",
                    active ? "border-[#8F1118] bg-[#8F1118] text-[#F5F5F5]" : "border-transparent hover:border-[#232323] hover:bg-[#111111]"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden truncate text-sm font-medium lg:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </motion.aside>

        <div className="min-w-0 pb-20 lg:pb-0">
          <motion.header
            className="sticky top-0 z-30 border-b border-[#232323] bg-[#080808]/92 px-4 py-3 backdrop-blur sm:px-6"
            initial={false}
            animate={showDashboard ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ ...dashboardEntranceTransition, delay: showDashboard ? 0.08 : 0 }}
            style={{ pointerEvents: showDashboard ? "auto" : "none" }}
          >
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <ProjectSwitcher activeProject={activeProject} options={data.projectOptions} onProjectChange={switchProject} />
              </div>
              <div className="flex min-w-0 flex-1 items-center gap-2 xl:max-w-3xl">
                <div className="relative min-w-0 flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9B9B9B]" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search command center"
                    suppressHydrationWarning
                    className="h-10 w-full rounded-[8px] border border-[#232323] bg-[#111111] pl-9 pr-3 text-sm text-[#F5F5F5] outline-none transition focus:border-[#8F1118]"
                  />
                  {globalResults.length ? (
                    <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-[8px] border border-[#232323] bg-[#111111] shadow-[0_24px_70px_rgba(0,0,0,0.5)]">
                      {globalResults.map((result) => (
                        <button
                          key={`${result.type}:${result.id}`}
                          type="button"
                          onClick={() => setActiveView(result.type)}
                          className="flex w-full items-center justify-between gap-3 border-b border-[#232323]/70 px-3 py-2 text-left text-sm last:border-b-0 hover:bg-[#151515]"
                        >
                          <span className="min-w-0 truncate text-[#F5F5F5]">{result.label}</span>
                          <span className="shrink-0 text-xs text-[#9B9B9B]">{result.detail}</span>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveView("notifications")}
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#232323] bg-[#111111] text-[#F5F5F5] transition hover:border-[#8F1118]"
                  aria-label="Notifications"
                  title="Notifications"
                >
                  <Bell className="h-4 w-4" />
                  {scoped.unreadNotifications ? (
                    <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-[#8F1118] px-1.5 py-0.5 text-[10px] font-semibold text-[#F5F5F5]">
                      {scoped.unreadNotifications}
                    </span>
                  ) : null}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView("command")}
                  className="hidden h-10 items-center gap-2 rounded-[8px] border border-[#232323] bg-[#111111] px-3 text-sm text-[#F5F5F5] transition hover:border-[#8F1118] md:inline-flex"
                >
                  <Activity className="h-4 w-4 text-[#B71C24]" />
                  Activity Stream
                </button>
                <div className="hidden h-10 items-center gap-2 rounded-[8px] border border-emerald-500/20 bg-emerald-500/10 px-3 text-sm text-emerald-300 md:inline-flex">
                  <Radio className="h-4 w-4 animate-pulse" />
                  System Health
                </div>
                <IconButton label="Refresh" onClick={() => refresh(false)} disabled={pending}>
                  <RefreshCw className={cn("h-4 w-4", pending && "animate-spin")} />
                </IconButton>
                <IconButton label="Logout" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                </IconButton>
              </div>
            </div>
          </motion.header>

          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={showDashboard ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ ...dashboardEntranceTransition, delay: showDashboard ? 0.12 : 0 }}
            className="mx-auto grid w-full max-w-[1440px] gap-5 px-4 py-5 sm:px-6"
            style={{ pointerEvents: showDashboard ? "auto" : "none" }}
          >
            <div className="rounded-[8px] border border-[#232323] bg-[#111111] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B71C24]">Enterprise Workspace</p>
              <h1 className="mt-2 font-display text-4xl font-semibold leading-[0.95] tracking-tight text-[#F5F5F5] sm:text-5xl">
                {activeDashboardTitle}
              </h1>
            </div>
            {activeView === "overview" ? <Overview data={scoped} search={search} setActiveView={setActiveView} /> : null}
            {activeView === "businesses" ? <BusinessManagement data={scoped} search={search} runIntent={runIntent} pending={pending} /> : null}
            {activeView === "domains" ? <DomainManagement data={scoped} search={search} runIntent={runIntent} pending={pending} /> : null}
            {activeView === "command" ? <CommandCenterView data={scoped} setActiveView={setActiveView} /> : null}
            {activeView === "leads" ? <LeadCenter data={scoped} search={search} runIntent={runIntent} pending={pending} /> : null}
            {activeView === "projects" ? <ProjectsView data={scoped} search={search} /> : null}
            {activeView === "blogs" ? <BlogManager data={scoped} activeProject={activeProject} search={search} runIntent={runIntent} pending={pending} /> : null}
            {activeView === "newsletter" ? <NewsletterManager data={scoped} activeProject={activeProject} search={search} runIntent={runIntent} setData={setData} pending={pending} /> : null}
            {activeView === "services" ? <ServiceManager data={scoped} activeProject={activeProject} search={search} runIntent={runIntent} pending={pending} /> : null}
            {activeView === "media" ? <MediaLibrary data={scoped} activeProject={activeProject} search={search} runIntent={runIntent} setData={setData} pending={pending} /> : null}
            {activeView === "careers" ? <CareersManager data={scoped} activeProject={activeProject} search={search} runIntent={runIntent} pending={pending} /> : null}
            {activeView === "analytics" ? <AnalyticsView data={scoped} /> : null}
            {activeView === "notifications" ? <NotificationsView data={scoped} runIntent={runIntent} pending={pending} /> : null}
            {activeView === "settings" ? <SettingsManager data={scoped} search={search} runIntent={runIntent} pending={pending} /> : null}
            {activeView === "audit" ? <AuditLogs data={scoped} search={search} /> : null}
          </motion.div>
          <QuickActions setActiveView={setActiveView} />
        </div>
      </div>
    </main>
  );
}

function FounderHome({
  data,
  setActiveProject,
  setActiveView
}: {
  data: AdminCommandCenterData;
  setActiveProject: (project: ProjectKey) => void;
  setActiveView: (view: AdminView) => void;
}) {
  const newLeads = data.leads.filter((lead) => lead.status === "New").length;
  const consultationRequests = data.leads.filter((lead) => lead.kind === "Consultation").length;
  const blogDrafts = data.blogs.filter((blog) => blog.status === "draft").length;
  const todaysGrowth =
    data.leads.filter((lead) => isToday(lead.createdAt)).length +
    data.applications.filter((application) => isToday(application.createdAt)).length +
    data.subscribers.filter((subscriber) => isToday(subscriber.createdAt)).length +
    data.blogs.filter((blog) => isToday(blog.publishedAt || blog.updatedAt)).length;
  const founderStats = [
    { label: "Current Active Projects", value: data.projects.filter((project) => project.status === "active").length },
    { label: "Open Opportunities", value: data.openOpportunities },
    { label: "Unread Leads", value: newLeads },
    { label: "Today's Growth", value: todaysGrowth }
  ];
  const quickOverview = [
    { label: "New Leads", value: newLeads, icon: Inbox },
    { label: "Career Applications", value: data.applications.length, icon: BriefcaseBusiness },
    { label: "Subscribers", value: data.subscribers.length, icon: Send },
    { label: "Consultation Requests", value: consultationRequests, icon: CircleDot },
    { label: "Blog Drafts", value: blogDrafts, icon: BookOpenText }
  ];
  const shortcuts: Array<{ label: string; view: AdminView; icon: React.ComponentType<{ className?: string }> }> = [
    { label: "Create Blog", view: "blogs", icon: BookOpenText },
    { label: "Create Job", view: "careers", icon: BriefcaseBusiness },
    { label: "Upload Media", view: "media", icon: Upload },
    { label: "View Leads", view: "leads", icon: Inbox },
    { label: "Manage Services", view: "services", icon: ShieldCheck }
  ];

  function openProject(project: ProjectKey) {
    setActiveProject(project);
    setActiveView("command");
  }

  return (
    <div className="grid gap-6">
      <section className="relative overflow-hidden rounded-[8px] border border-[#232323] bg-[#080808] px-5 py-8 sm:px-8 lg:px-10">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,245,245,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(245,245,245,.08) 1px, transparent 1px)",
            backgroundSize: "44px 44px"
          }}
        />
        <div className="absolute -left-32 top-12 h-72 w-72 rounded-full bg-[#8F1118]/20 blur-3xl" />
        <div className="absolute -right-24 bottom-8 h-64 w-64 rounded-full bg-[#B71C24]/10 blur-3xl" />
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#c7a15a]/60 to-transparent" />

        <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1fr)_25rem] xl:items-stretch">
          <div className="flex min-h-[30rem] flex-col justify-between gap-8">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B71C24]">Founder Command Center</p>
              <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-tight text-[#F5F5F5] sm:text-7xl">
                Good Morning, Fawaz.
              </h1>
              <p className="mt-6 max-w-3xl text-2xl font-semibold leading-tight text-[#F5F5F5] sm:text-3xl">
                Welcome back to the Ractysh Command Center.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#9B9B9B]">
                Your enterprise ecosystem is operational and running across all active divisions.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 rounded-[8px] border border-[#232323] bg-[#111111]/70 p-3 backdrop-blur">
              {founderLiveStatuses.map((division) => (
                <div key={division} className="flex min-w-[13rem] flex-1 items-center justify-between gap-3 rounded-[8px] border border-[#232323]/80 bg-[#080808]/70 px-3 py-2">
                  <span className="whitespace-nowrap text-sm font-medium text-[#F5F5F5]">{division}</span>
                  <span className="inline-flex shrink-0 items-center gap-2 text-xs text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,.8)]" />
                    Operational
                  </span>
                </div>
              ))}
            </div>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-14 overflow-hidden rounded-[8px] border border-[#8F1118]/30 bg-[#111111]/70 p-5 shadow-[0_32px_90px_rgba(0,0,0,.45)] backdrop-blur lg:mt-0"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B71C24] to-transparent" />
            <div className="absolute -right-20 top-10 h-40 w-40 rounded-full bg-[#8F1118]/20 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9B9B9B]">Founder</p>
                  <span className="inline-flex items-center gap-2 rounded-[8px] border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
                    <Radio className="h-3.5 w-3.5 animate-pulse" />
                    Online
                  </span>
                </div>
                <h2 className="mt-6 font-display text-5xl font-semibold tracking-tight text-[#F5F5F5]">Fawaz</h2>
                <p className="mt-3 text-base font-medium text-[#F5F5F5]">Chairman & Managing Director</p>
                <p className="mt-1 text-sm text-[#9B9B9B]">Ractysh Group</p>
              </div>

              <div className="grid gap-3">
                {founderStats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between gap-4 border-b border-[#232323]/80 pb-3 last:border-b-0 last:pb-0">
                    <span className="text-sm text-[#9B9B9B]">{stat.label}</span>
                    <span className="text-xl font-semibold text-[#F5F5F5]">{formatNumber(stat.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="grid gap-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B71C24]">Project Ecosystem</p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[#F5F5F5]">Choose an operating division</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[#9B9B9B]">Each command center opens with the same login, the same Prisma data layer, and a scoped view of enterprise operations.</p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {founderHomeProjects.map((project, index) => (
            <motion.button
              key={project.key}
              type="button"
              onClick={() => openProject(project.key)}
              aria-label={`Open ${project.label} Command Center`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group relative min-h-64 overflow-hidden rounded-[8px] border border-[#232323] bg-[#111111] p-5 text-left transition hover:-translate-y-0.5 hover:border-[#8F1118]/80 hover:bg-[#151515]"
            >
              <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#8F1118]/70 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#8F1118]/0 blur-3xl transition group-hover:bg-[#8F1118]/20" />
              <div className="relative flex h-full flex-col justify-between gap-8">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-[8px] border border-emerald-500/15 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Operational
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-medium tracking-tight text-[#F5F5F5]">{project.label}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#9B9B9B]">{project.description}</p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5F5F5]">
                  Open Command Center
                  <ArrowRight className="h-4 w-4 text-[#B71C24] transition group-hover:translate-x-1" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <section className="rounded-[8px] border border-[#232323] bg-[#111111] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B71C24]">Quick Overview</p>
              <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-[#F5F5F5]">Enterprise pulse</h2>
            </div>
            <span className="text-xs text-[#9B9B9B]">Generated {formatDate(data.generatedAt)}</span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {quickOverview.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="rounded-[8px] border border-[#232323] bg-[#151515] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <Icon className="h-4 w-4 text-[#B71C24]" />
                    <p className="text-2xl font-semibold text-[#F5F5F5]">{formatNumber(metric.value)}</p>
                  </div>
                  <p className="mt-4 text-sm text-[#9B9B9B]">{metric.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-[8px] border border-[#232323] bg-[#111111] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B71C24]">Executive Shortcuts</p>
          <div className="mt-5 grid gap-2">
            {shortcuts.map((shortcut) => {
              const Icon = shortcut.icon;
              return (
                <button
                  key={shortcut.label}
                  type="button"
                  onClick={() => setActiveView(shortcut.view)}
                  className="flex h-11 items-center justify-between gap-3 rounded-[8px] border border-[#232323] bg-[#151515] px-3 text-left text-sm font-semibold text-[#F5F5F5] transition hover:border-[#8F1118]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon className="h-4 w-4 text-[#B71C24]" />
                    {shortcut.label}
                  </span>
                  <ArrowRight className="h-4 w-4 text-[#9B9B9B]" />
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <section className="rounded-[8px] border border-[#232323] bg-[#111111] p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B71C24]">Recent Activity</p>
            <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-[#F5F5F5]">Live enterprise feed</h2>
          </div>
          <button
            type="button"
            onClick={() => setActiveView("command")}
            className="inline-flex h-10 items-center gap-2 rounded-[8px] border border-[#232323] bg-[#151515] px-4 text-sm font-semibold text-[#F5F5F5] transition hover:border-[#8F1118]"
          >
            <Activity className="h-4 w-4 text-[#B71C24]" />
            Activity Stream
          </button>
        </div>
        <div className="mt-5 grid gap-2">
          {data.activities.length ? (
            data.activities.slice(0, 6).map((activity) => (
              <div key={activity.id} className="grid gap-3 rounded-[8px] border border-[#232323] bg-[#151515] p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusPill value={activity.priority} />
                    <span className="text-xs text-[#9B9B9B]">
                      {projectLabel(data, activity.project)} · <TimeAgoText value={activity.createdAt} />
                    </span>
                  </div>
                  <p className="mt-2 truncate text-sm font-semibold text-[#F5F5F5]">{activity.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#9B9B9B]">{activity.detail}</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9B9B9B]">{activity.action}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-[#9B9B9B]">No recent activity found in Prisma.</p>
          )}
        </div>
      </section>
    </div>
  );
}

function Overview({
  data,
  search,
  setActiveView
}: {
  data: AdminCommandCenterData;
  search: string;
  setActiveView: (view: AdminView) => void;
}) {
  const maxPipeline = Math.max(...data.pipeline.map((item) => item.value), 1);
  const todayStats = React.useMemo(
    () => [
      { label: "Today's Leads", value: data.leads.filter((lead) => isToday(lead.createdAt)).length },
      { label: "Consultations", value: data.leads.filter((lead) => lead.kind === "Consultation" && isToday(lead.createdAt)).length },
      { label: "Applications", value: data.applications.filter((application) => isToday(application.createdAt)).length },
      { label: "Subscribers", value: data.subscribers.filter((subscriber) => isToday(subscriber.createdAt)).length }
    ],
    [data.applications, data.leads, data.subscribers]
  );
  const leadColumns = React.useMemo<Column<LeadRow>[]>(
    () => [
      { accessorKey: "kind", header: "Source", meta: { width: "8rem" }, cell: ({ row }) => <StatusPill value={row.original.kind} /> },
      { accessorKey: "division", header: "Division", meta: { width: "12rem" }, cell: ({ row }) => projectLabel(data, row.original.division) },
      { accessorKey: "name", header: "Name", meta: { width: "14rem" } },
      { accessorKey: "email", header: "Email", meta: { width: "16rem" } },
      { accessorKey: "service", header: "Service", meta: { width: "16rem" }, cell: ({ row }) => row.original.service || "Not set" },
      { accessorKey: "status", header: "Status", meta: { width: "9rem" }, cell: ({ row }) => <StatusPill value={row.original.status} /> },
      { accessorKey: "createdAt", header: "Created", meta: { width: "10rem" }, cell: ({ row }) => formatDate(row.original.createdAt) }
    ],
    [data]
  );

  return (
    <>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_28rem]">
        <section className="rounded-[8px] border border-[#232323] bg-[#111111] p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-[#9B9B9B]">Generated {formatDate(data.generatedAt)}</p>
              <h1 className="mt-2 font-display text-3xl font-semibold leading-[0.95] tracking-tight text-[#F5F5F5] sm:text-5xl">{adminGreeting()}, Admin.</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#9B9B9B]">Enterprise ecosystem operational.</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveView("leads")}
              className="inline-flex h-10 items-center gap-2 rounded-[8px] bg-[#8F1118] px-4 text-sm font-semibold text-[#F5F5F5] transition hover:bg-[#B71C24]"
            >
              <Inbox className="h-4 w-4" />
              Lead Center
            </button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {todayStats.map((metric) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[8px] border border-[#232323] bg-[#151515] p-4"
              >
                <p className="text-sm text-[#9B9B9B]">{metric.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-normal text-[#F5F5F5]">{formatNumber(metric.value)}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {data.overview.map((metric) => (
              <div key={metric.key} className="rounded-[8px] border border-[#232323] bg-[#151515] p-4">
                <p className="text-sm text-[#9B9B9B]">{metric.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-normal text-[#F5F5F5]">{formatMetricValue(metric.value, metric.format)}</p>
                <p className="mt-2 text-xs text-[#9B9B9B]">{metric.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <Panel title="Pipeline">
          <div className="grid gap-4">
            {data.pipeline.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-[#9B9B9B]">{item.label}</span>
                  <span className="font-semibold text-[#F5F5F5]">{formatNumber(item.value)}</span>
                </div>
                <div className="h-2 rounded-full bg-[#080808]">
                  <div
                    className="h-2 rounded-full bg-[#8F1118]"
                    style={{ width: `${Math.max(2, (item.value / maxPipeline) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {data.executiveMetrics.map((metric) => (
          <div key={metric.key} className="rounded-[8px] border border-[#232323] bg-[#111111] p-4">
            <p className="text-sm text-[#9B9B9B]">{metric.label}</p>
            <p className="mt-3 text-2xl font-semibold tracking-normal text-[#F5F5F5]">{formatMetricValue(metric.value, metric.format)}</p>
            <p className="mt-2 text-xs text-[#9B9B9B]">{metric.detail}</p>
          </div>
        ))}
      </div>

      <Panel title="Latest unified leads">
        <Table rows={data.leads.slice(0, 24)} columns={leadColumns} search={search} empty="No lead records found in Prisma." />
      </Panel>
    </>
  );
}

function CommandCenterView({ data, setActiveView }: { data: AdminCommandCenterData; setActiveView: (view: AdminView) => void }) {
  const applicationPipeline = React.useMemo(
    () =>
      ["new", "reviewed", "shortlisted", "hired", "rejected"].map((status) => ({
        label: careerLabel(status),
        value: data.applications.filter((application) => application.status === status).length
      })),
    [data.applications]
  );
  const maxApplications = Math.max(...applicationPipeline.map((item) => item.value), 1);

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_25rem]">
      <div className="grid gap-5">
        <section className="rounded-[8px] border border-[#232323] bg-[#111111] p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-[#9B9B9B]">Live Command Center · {formatDate(data.generatedAt)}</p>
              <h1 className="mt-2 font-display text-3xl font-semibold leading-[0.95] tracking-tight text-[#F5F5F5] sm:text-5xl">Operational command layer</h1>
            </div>
            <button
              type="button"
              onClick={() => setActiveView("notifications")}
              className="inline-flex h-10 items-center gap-2 rounded-[8px] bg-[#8F1118] px-4 text-sm font-semibold text-[#F5F5F5] transition hover:bg-[#B71C24]"
            >
              <Bell className="h-4 w-4" />
              {data.unreadNotifications} unread
            </button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[8px] border border-[#232323] bg-[#151515] p-4">
              <p className="text-sm text-[#9B9B9B]">Critical Alerts</p>
              <p className="mt-3 text-3xl font-semibold text-[#F5F5F5]">{formatNumber(data.criticalAlerts.length)}</p>
            </div>
            <div className="rounded-[8px] border border-[#232323] bg-[#151515] p-4">
              <p className="text-sm text-[#9B9B9B]">Pending Reviews</p>
              <p className="mt-3 text-3xl font-semibold text-[#F5F5F5]">{formatNumber(data.pendingReviews.length)}</p>
            </div>
            <div className="rounded-[8px] border border-[#232323] bg-[#151515] p-4">
              <p className="text-sm text-[#9B9B9B]">Waiting Approval</p>
              <p className="mt-3 text-3xl font-semibold text-[#F5F5F5]">{formatNumber(data.approvalQueue.length)}</p>
            </div>
            <div className="rounded-[8px] border border-[#232323] bg-[#151515] p-4">
              <p className="text-sm text-[#9B9B9B]">Live Events</p>
              <p className="mt-3 text-3xl font-semibold text-[#F5F5F5]">{formatNumber(data.activities.length)}</p>
            </div>
          </div>
        </section>

        <Panel title="Recent Activities">
          <ActivityList rows={data.activities} empty="No activity rows found in Prisma." />
        </Panel>
      </div>

      <div className="grid gap-5">
        <Panel title="Critical Alerts">
          <AlertList rows={data.criticalAlerts} empty="No critical alerts." />
        </Panel>
        <Panel title="Pending Reviews">
          <ReviewList rows={data.pendingReviews} empty="No pending lead reviews." />
        </Panel>
        <Panel title="Content Waiting Approval">
          <ReviewList rows={data.approvalQueue} empty="No content waiting approval." />
        </Panel>
        <Panel title="Application Pipeline">
          <div className="grid gap-4">
            {applicationPipeline.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-[#9B9B9B]">{item.label}</span>
                  <span className="font-semibold text-[#F5F5F5]">{formatNumber(item.value)}</span>
                </div>
                <div className="h-2 rounded-full bg-[#080808]">
                  <div className="h-2 rounded-full bg-[#8F1118]" style={{ width: `${Math.max(2, (item.value / maxApplications) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function ProjectsView({ data, search }: { data: AdminCommandCenterData; search: string }) {
  const projectColumns = React.useMemo<Column<ProjectRow>[]>(
    () => [
      { accessorKey: "title", header: "Project", meta: { width: "18rem" } },
      { accessorKey: "divisionKey", header: "Business", meta: { width: "12rem" }, cell: ({ row }) => projectLabel(data, row.original.divisionKey) },
      { accessorKey: "division", header: "Division", meta: { width: "12rem" } },
      { accessorKey: "status", header: "Status", meta: { width: "10rem" }, cell: ({ row }) => <StatusPill value={row.original.status} /> },
      { accessorKey: "location", header: "Location", meta: { width: "12rem" }, cell: ({ row }) => row.original.location || "Not set" },
      { accessorKey: "progress", header: "Progress", meta: { width: "8rem" }, cell: ({ row }) => (row.original.progress === null ? "Not set" : `${row.original.progress}%`) },
      { accessorKey: "budget", header: "Budget", meta: { width: "9rem" }, cell: ({ row }) => (row.original.budget ? formatCurrency(row.original.budget) : "Not set") },
      { accessorKey: "updatedAt", header: "Updated", meta: { width: "10rem" }, cell: ({ row }) => formatDate(row.original.updatedAt) }
    ],
    [data]
  );
  const documentColumns = React.useMemo<Column<DocumentRow>[]>(
    () => [
      { accessorKey: "filename", header: "Document", meta: { width: "18rem" } },
      { accessorKey: "division", header: "Business", meta: { width: "12rem" }, cell: ({ row }) => projectLabel(data, row.original.division) },
      { accessorKey: "category", header: "Category", meta: { width: "12rem" } },
      { accessorKey: "projectName", header: "Project", meta: { width: "14rem" }, cell: ({ row }) => row.original.projectName || "Unassigned" },
      { accessorKey: "provider", header: "Provider", meta: { width: "9rem" } },
      {
        id: "url",
        header: "Open",
        meta: { width: "7rem" },
        cell: ({ row }) =>
          row.original.url ? (
            <a className="text-[#B71C24] underline" href={row.original.url} target="_blank" rel="noreferrer">
              View
            </a>
          ) : (
            "None"
          )
      },
      { accessorKey: "uploadDate", header: "Uploaded", meta: { width: "10rem" }, cell: ({ row }) => formatDate(row.original.uploadDate) }
    ],
    [data]
  );
  const divisionCards = data.projectOptions
    .filter((project) => project.key !== groupProjectKey)
    .map((project) => {
      const projects = data.projects.filter((row) => row.project === project.key);
      return {
        project,
        projects,
        leads: data.leads.filter((lead) => lead.division === project.key || textMatchesProject(project.key, data, lead.service, lead.company, lead.message)).length,
        documents: data.documents.filter((document) => document.division === project.key || textMatchesProject(project.key, data, document.category, document.projectName, document.filename)).length,
        media: data.media.filter((asset) => asset.division === project.key || textMatchesProject(project.key, data, asset.folder, asset.title, asset.url)).length
      };
    });

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {divisionCards.map((card) => (
          <div key={card.project.key} className="rounded-[8px] border border-[#232323] bg-[#111111] p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-medium tracking-tight text-[#F5F5F5]">{card.project.label}</h2>
              <StatusPill value={card.projects.length ? "active" : "empty"} />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 text-center">
              <div><p className="text-xl font-semibold">{card.projects.length}</p><p className="text-[11px] text-[#9B9B9B]">Overview</p></div>
              <div><p className="text-xl font-semibold">{card.leads}</p><p className="text-[11px] text-[#9B9B9B]">Leads</p></div>
              <div><p className="text-xl font-semibold">{card.documents}</p><p className="text-[11px] text-[#9B9B9B]">Docs</p></div>
              <div><p className="text-xl font-semibold">{card.media}</p><p className="text-[11px] text-[#9B9B9B]">Media</p></div>
            </div>
          </div>
        ))}
      </div>
      <Panel title="Project Portfolio">
        <Table rows={data.projects} columns={projectColumns} search={search} empty="No project records found in Prisma." />
      </Panel>
      <Panel title="Project Documents">
        <Table rows={data.documents} columns={documentColumns} search={search} empty="No project documents found in Prisma." />
      </Panel>
    </div>
  );
}

function AnalyticsView({ data }: { data: AdminCommandCenterData }) {
  const [activeChart, setActiveChart] = React.useState(data.analytics[0]?.key || "");
  const series = data.analytics.find((item) => item.key === activeChart) || data.analytics[0];

  return (
    <div className="grid gap-5 xl:grid-cols-[18rem_minmax(0,1fr)]">
      <Panel title="Analytics">
        <div className="grid gap-2">
          {data.analytics.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveChart(item.key)}
              className={cn(
                "flex h-10 items-center justify-between rounded-[8px] border px-3 text-left text-sm transition",
                activeChart === item.key ? "border-[#8F1118] bg-[#8F1118] text-[#F5F5F5]" : "border-[#232323] bg-[#151515] text-[#9B9B9B]"
              )}
            >
              {item.label}
              <BarChart3 className="h-4 w-4" />
            </button>
          ))}
        </div>
      </Panel>
      <Panel title={series?.label || "Analytics"}>
        {series ? <BarChart series={series} /> : <p className="text-sm text-[#9B9B9B]">No analytics rows found in Prisma.</p>}
      </Panel>
    </div>
  );
}

function NotificationsView({
  data,
  runIntent,
  pending
}: {
  data: AdminCommandCenterData;
  runIntent: (body: Record<string, unknown>, successMessage: string) => Promise<void>;
  pending: boolean;
}) {
  return (
    <Panel
      title="Notifications"
      action={
        <button
          type="button"
          disabled={pending || !data.unreadNotifications}
          onClick={() => runIntent({ intent: "notification.markAllRead" }, "Notifications marked read.")}
          className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#232323] px-3 text-sm disabled:opacity-50"
        >
          <Check className="h-4 w-4" />
          Mark all read
        </button>
      }
    >
      <div className="grid gap-2">
        {data.notifications.length ? (
          data.notifications.map((notification) => (
            <div key={notification.id} className="grid gap-3 rounded-[8px] border border-[#232323] bg-[#151515] p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill value={notification.priority} />
                  <StatusPill value={notification.status} />
                  <span className="text-xs text-[#9B9B9B]">
                    {projectLabel(data, notification.project)} · <TimeAgoText value={notification.createdAt} />
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-[#F5F5F5]">{notification.title}</p>
                <p className="mt-1 text-sm leading-6 text-[#9B9B9B]">{notification.message}</p>
              </div>
              <div className="flex gap-2">
                <IconButton
                  label="Mark read"
                  disabled={pending || notification.status !== "unread"}
                  onClick={() => runIntent({ intent: "notification.markRead", id: notification.id }, "Notification marked read.")}
                >
                  <Check className="h-4 w-4" />
                </IconButton>
                <IconButton
                  label="Archive"
                  disabled={pending || notification.status === "archived"}
                  onClick={() => runIntent({ intent: "notification.archive", id: notification.id }, "Notification archived.")}
                >
                  <Archive className="h-4 w-4" />
                </IconButton>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-[#9B9B9B]">No notifications found in Prisma.</p>
        )}
      </div>
    </Panel>
  );
}

function BusinessManagement({
  data,
  search,
  runIntent,
  pending
}: {
  data: AdminCommandCenterData;
  search: string;
  runIntent: (body: Record<string, unknown>, successMessage: string) => Promise<void>;
  pending: boolean;
}) {
  const [editing, setEditing] = React.useState<BusinessRow | null>(null);
  const form = useForm<BusinessFormValues>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      slug: "",
      name: "",
      legalName: "",
      summary: "",
      description: "",
      website: "",
      status: "active",
      position: 0
    }
  });

  React.useEffect(() => {
    form.reset(
      editing
        ? {
            id: editing.id,
            slug: editing.slug,
            name: editing.label,
            legalName: editing.legalName,
            summary: editing.summary,
            description: editing.description || "",
            website: editing.website || "",
            status: editing.status as BusinessFormValues["status"],
            position: editing.position
          }
        : {
            slug: "",
            name: "",
            legalName: "",
            summary: "",
            description: "",
            website: "",
            status: "active",
            position: data.businesses.length
          }
    );
  }, [data.businesses.length, editing, form]);

  const columns = React.useMemo<Column<BusinessRow>[]>(
    () => [
      { accessorKey: "label", header: "Business", meta: { width: "15rem" } },
      { accessorKey: "slug", header: "Division", meta: { width: "12rem" } },
      { accessorKey: "primaryDomain", header: "Domain", meta: { width: "15rem" }, cell: ({ row }) => row.original.primaryDomain || "Not mapped" },
      { accessorKey: "status", header: "Status", meta: { width: "9rem" }, cell: ({ row }) => <StatusPill value={row.original.status} /> },
      { accessorKey: "updatedAt", header: "Updated", meta: { width: "10rem" }, cell: ({ row }) => row.original.updatedAt.startsWith("1970") ? "Default" : formatDate(row.original.updatedAt) },
      {
        id: "actions",
        header: "Actions",
        meta: { width: "7rem" },
        cell: ({ row }) => (
          <IconButton label="Edit" onClick={() => setEditing(row.original)}>
            <Pencil className="h-4 w-4" />
          </IconButton>
        )
      }
    ],
    []
  );

  return (
    <div className="grid gap-5 xl:grid-cols-[24rem_minmax(0,1fr)]">
      <Panel title={editing ? "Edit Business" : "Create Business"}>
        <form
          className="grid gap-3"
          onSubmit={form.handleSubmit((values) =>
            runIntent({ intent: "business.upsert", ...values }, editing ? "Business updated." : "Business created.").then(() => setEditing(null))
          )}
        >
          <input type="hidden" {...form.register("id")} />
          <input className={fieldClass} placeholder="division-slug" {...form.register("slug")} />
          <input className={fieldClass} placeholder="Business name" {...form.register("name")} />
          <input className={fieldClass} placeholder="Legal name" {...form.register("legalName")} />
          <textarea className={textareaClass} placeholder="Summary" {...form.register("summary")} />
          <textarea className={textareaClass} placeholder="Description" {...form.register("description")} />
          <input className={fieldClass} placeholder="Website URL" {...form.register("website")} />
          <select className={fieldClass} {...form.register("status")}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="archived">Archived</option>
          </select>
          <input className={fieldClass} type="number" {...form.register("position")} />
          <div className="flex gap-2">
            <button className="h-10 flex-1 rounded-[8px] bg-[#8F1118] px-4 text-sm font-semibold text-[#F5F5F5]" disabled={pending}>
              Save
            </button>
            {editing ? (
              <button type="button" className="h-10 rounded-[8px] border border-[#232323] px-4 text-sm" onClick={() => setEditing(null)}>
                Clear
              </button>
            ) : null}
          </div>
        </form>
      </Panel>
      <Panel title="Business Management">
        <Table rows={data.businesses} columns={columns} search={search} empty="No business records found in Prisma." />
      </Panel>
    </div>
  );
}

function DomainManagement({
  data,
  search,
  runIntent,
  pending
}: {
  data: AdminCommandCenterData;
  search: string;
  runIntent: (body: Record<string, unknown>, successMessage: string) => Promise<void>;
  pending: boolean;
}) {
  const [editing, setEditing] = React.useState<DomainMappingRow | null>(null);
  const defaultDivision = data.projectOptions.find((option) => option.key !== groupProjectKey)?.key || groupProjectKey;
  const form = useForm<DomainFormValues>({
    resolver: zodResolver(domainFormSchema),
    defaultValues: { domain: "", division: defaultDivision, companyId: "", status: "active", primary: false, notes: "" }
  });

  React.useEffect(() => {
    form.reset(
      editing
        ? {
            id: editing.id,
            domain: editing.domain,
            division: editing.division,
            companyId: editing.companyId || "",
            status: editing.status as DomainFormValues["status"],
            primary: editing.primary,
            notes: editing.notes || ""
          }
        : { domain: "", division: defaultDivision, companyId: "", status: "active", primary: false, notes: "" }
    );
  }, [defaultDivision, editing, form]);

  const columns = React.useMemo<Column<DomainMappingRow>[]>(
    () => [
      { accessorKey: "domain", header: "Domain", meta: { width: "16rem" } },
      { accessorKey: "divisionLabel", header: "Business", meta: { width: "14rem" } },
      { accessorKey: "status", header: "Status", meta: { width: "9rem" }, cell: ({ row }) => <StatusPill value={row.original.status} /> },
      { accessorKey: "primary", header: "Primary", meta: { width: "8rem" }, cell: ({ row }) => (row.original.primary ? "Yes" : "No") },
      { accessorKey: "updatedAt", header: "Updated", meta: { width: "10rem" }, cell: ({ row }) => formatDate(row.original.updatedAt) },
      {
        id: "actions",
        header: "Actions",
        meta: { width: "9rem" },
        cell: ({ row }) => (
          <div className="flex gap-2">
            <IconButton label="Edit" onClick={() => setEditing(row.original)}>
              <Pencil className="h-4 w-4" />
            </IconButton>
            <IconButton label="Delete" danger disabled={pending} onClick={() => runIntent({ intent: "domain.delete", id: row.original.id }, "Domain deleted.")}>
              <Trash2 className="h-4 w-4" />
            </IconButton>
          </div>
        )
      }
    ],
    [pending, runIntent]
  );

  return (
    <div className="grid gap-5 xl:grid-cols-[24rem_minmax(0,1fr)]">
      <Panel title={editing ? "Edit Domain" : "Map Domain"}>
        <form
          className="grid gap-3"
          onSubmit={form.handleSubmit((values) =>
            runIntent({ intent: "domain.upsert", ...values, primary: Boolean(values.primary) }, editing ? "Domain updated." : "Domain mapped.").then(() => setEditing(null))
          )}
        >
          <input type="hidden" {...form.register("id")} />
          <input className={fieldClass} placeholder="domain.com" {...form.register("domain")} />
          <select className={fieldClass} {...form.register("division")}>
            {data.projectOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
          <select className={fieldClass} {...form.register("status")}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="archived">Archived</option>
          </select>
          <textarea className={textareaClass} placeholder="Notes" {...form.register("notes")} />
          <label className="flex items-center gap-2 text-sm text-[#9B9B9B]">
            <input type="checkbox" {...form.register("primary")} />
            Primary domain
          </label>
          <div className="flex gap-2">
            <button className="h-10 flex-1 rounded-[8px] bg-[#8F1118] px-4 text-sm font-semibold text-[#F5F5F5]" disabled={pending}>
              Save
            </button>
            {editing ? (
              <button type="button" className="h-10 rounded-[8px] border border-[#232323] px-4 text-sm" onClick={() => setEditing(null)}>
                Clear
              </button>
            ) : null}
          </div>
        </form>
      </Panel>
      <Panel title="Domain Management">
        <Table rows={data.domainMappings} columns={columns} search={search} empty="No domain mappings found in Prisma." />
      </Panel>
    </div>
  );
}

function LeadCenter({
  data,
  search,
  runIntent,
  pending
}: {
  data: AdminCommandCenterData;
  search: string;
  runIntent: (body: Record<string, unknown>, successMessage: string) => Promise<void>;
  pending: boolean;
}) {
  const [filter, setFilter] = React.useState<LeadFilter | "All">("All");
  const rows = React.useMemo(() => (filter === "All" ? data.leads : data.leads.filter((lead) => lead.status === filter)), [data.leads, filter]);
  const columns = React.useMemo<Column<LeadRow>[]>(
    () => [
      { accessorKey: "kind", header: "Pipeline", meta: { width: "8rem" }, cell: ({ row }) => <StatusPill value={row.original.kind} /> },
      { accessorKey: "division", header: "Division", meta: { width: "12rem" }, cell: ({ row }) => projectLabel(data, row.original.division) },
      { accessorKey: "name", header: "Name", meta: { width: "13rem" } },
      { accessorKey: "email", header: "Email", meta: { width: "16rem" } },
      { accessorKey: "service", header: "Service", meta: { width: "15rem" }, cell: ({ row }) => row.original.service || "Not set" },
      { accessorKey: "message", header: "Message", meta: { width: "22rem" }, cell: ({ row }) => <span className="truncate">{row.original.message}</span> },
      { accessorKey: "status", header: "Status", meta: { width: "10rem" }, cell: ({ row }) => <StatusPill value={row.original.status} /> },
      {
        id: "actions",
        header: "Actions",
        meta: { width: "15rem" },
        cell: ({ row }) => (
          <div className="flex gap-2">
            {leadFilters.map((status) => (
              <IconButton
                key={status}
                label={status}
                disabled={pending || row.original.status === status}
                onClick={() =>
                  runIntent(
                    { intent: "lead.updateStatus", id: row.original.entityId, kind: row.original.kind, status },
                    `Lead marked ${status}.`
                  )
                }
              >
                {status === "Archived" ? <Archive className="h-4 w-4" /> : <Check className="h-4 w-4" />}
              </IconButton>
            ))}
          </div>
        )
      }
    ],
    [data, pending, runIntent]
  );

  return (
    <Panel
      title="Lead Center"
      action={
        <div className="flex flex-wrap gap-2">
          {(["All", ...leadFilters] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={cn(
                "h-9 rounded-[8px] border px-3 text-sm transition",
                filter === item ? "border-[#8F1118] bg-[#8F1118] text-[#F5F5F5]" : "border-[#232323] bg-[#151515] text-[#9B9B9B]"
              )}
            >
              {item}
            </button>
          ))}
        </div>
      }
    >
      <Table rows={rows} columns={columns} search={search} empty="No unified lead records found in Prisma." />
    </Panel>
  );
}

function BlogManager({
  data,
  activeProject,
  search,
  runIntent,
  pending
}: {
  data: AdminCommandCenterData;
  activeProject: ProjectKey;
  search: string;
  runIntent: (body: Record<string, unknown>, successMessage: string) => Promise<void>;
  pending: boolean;
}) {
  const [editing, setEditing] = React.useState<BlogRow | null>(null);
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      division: activeProject,
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "",
      coverImageAlt: "",
      author: "Ractysh",
      category: "Enterprise",
      tags: "",
      featured: false,
      status: "draft",
      publishedAt: "",
      readTime: "",
      seoTitle: "",
      seoDescription: "",
      canonicalUrl: ""
    }
  });

  React.useEffect(() => {
    form.reset(
      editing
        ? {
            id: editing.id,
            division: editing.division,
            title: editing.title,
            slug: editing.slug,
            excerpt: editing.excerpt,
            content: editing.content,
            coverImage: editing.coverImage,
            coverImageAlt: editing.coverImageAlt || "",
            author: editing.author,
            category: editing.category,
            tags: editing.tags.join(", "),
            featured: editing.featured,
            status: editing.status as BlogFormValues["status"],
            publishedAt: toDateTimeLocal(editing.publishedAt),
            readTime: editing.readTime,
            seoTitle: editing.seoTitle || "",
            seoDescription: editing.seoDescription || "",
            canonicalUrl: editing.canonicalUrl || ""
          }
        : {
            division: activeProject,
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            coverImage: "",
            coverImageAlt: "",
            author: "Ractysh",
            category: "Enterprise",
            tags: "",
            featured: false,
            status: "draft",
            publishedAt: "",
            readTime: "",
            seoTitle: "",
            seoDescription: "",
            canonicalUrl: ""
      }
    );
  }, [activeProject, editing, form]);

  const blogPreview = form.watch();

  const columns = React.useMemo<Column<BlogRow>[]>(
    () => [
      { accessorKey: "title", header: "Title", meta: { width: "18rem" } },
      { accessorKey: "division", header: "Division", meta: { width: "12rem" }, cell: ({ row }) => projectLabel(data, row.original.division) },
      { accessorKey: "category", header: "Category", meta: { width: "10rem" } },
      { accessorKey: "status", header: "Status", meta: { width: "10rem" }, cell: ({ row }) => <StatusPill value={row.original.status} /> },
      { accessorKey: "featured", header: "Featured", meta: { width: "8rem" }, cell: ({ row }) => (row.original.featured ? "Yes" : "No") },
      { accessorKey: "views", header: "Views", meta: { width: "7rem" }, cell: ({ row }) => formatNumber(row.original.views) },
      { accessorKey: "updatedAt", header: "Updated", meta: { width: "10rem" }, cell: ({ row }) => formatDate(row.original.updatedAt) },
      {
        id: "actions",
        header: "Actions",
        meta: { width: "13rem" },
        cell: ({ row }) => (
          <div className="flex gap-2">
            <IconButton label="Edit" onClick={() => setEditing(row.original)}>
              <Pencil className="h-4 w-4" />
            </IconButton>
            <IconButton
              label={row.original.status === "published" ? "Unpublish" : "Publish"}
              disabled={pending}
              onClick={() =>
                runIntent(
                  { intent: "blog.status", id: row.original.id, status: row.original.status === "published" ? "draft" : "published" },
                  row.original.status === "published" ? "Blog unpublished." : "Blog published."
                )
              }
            >
              <Check className="h-4 w-4" />
            </IconButton>
            <IconButton
              label={row.original.featured ? "Unfeature" : "Feature"}
              disabled={pending}
              onClick={() => runIntent({ intent: "blog.feature", id: row.original.id, featured: !row.original.featured }, "Feature flag updated.")}
            >
              <Star className="h-4 w-4" />
            </IconButton>
            <IconButton label="Delete" danger disabled={pending} onClick={() => runIntent({ intent: "blog.delete", id: row.original.id }, "Blog deleted.")}>
              <Trash2 className="h-4 w-4" />
            </IconButton>
          </div>
        )
      }
    ],
    [data, pending, runIntent]
  );

  return (
    <div className="grid gap-5 xl:grid-cols-[24rem_minmax(0,1fr)]">
      <Panel title={editing ? "Edit Blog" : "Create Blog"}>
        <form
          className="grid gap-3"
          onSubmit={form.handleSubmit((values) =>
            runIntent(
              {
                intent: "blog.upsert",
                ...values,
                tags: csv(values.tags),
                featured: Boolean(values.featured)
              },
              editing ? "Blog updated." : "Blog created."
            ).then(() => setEditing(null))
          )}
        >
          <input type="hidden" {...form.register("id")} />
          <select className={fieldClass} {...form.register("division")}>
            {data.projectOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
          <input className={fieldClass} placeholder="Title" {...form.register("title")} />
          <input className={fieldClass} placeholder="Slug" {...form.register("slug")} />
          <textarea className={textareaClass} placeholder="Excerpt" {...form.register("excerpt")} />
          <textarea className={cn(textareaClass, "min-h-36")} placeholder="Content" {...form.register("content")} />
          <input className={fieldClass} placeholder="Cover image URL" {...form.register("coverImage")} />
          <input className={fieldClass} placeholder="Author" {...form.register("author")} />
          <input className={fieldClass} placeholder="Category" {...form.register("category")} />
          <input className={fieldClass} placeholder="Tags, comma separated" {...form.register("tags")} />
          <select className={fieldClass} {...form.register("status")}>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          <input className={fieldClass} type="datetime-local" {...form.register("publishedAt")} />
          <input className={fieldClass} placeholder="SEO title" {...form.register("seoTitle")} />
          <textarea className={textareaClass} placeholder="SEO description" {...form.register("seoDescription")} />
          <label className="flex items-center gap-2 text-sm text-[#9B9B9B]">
            <input type="checkbox" {...form.register("featured")} />
            Featured
          </label>
          <div className="flex gap-2">
            <button className="h-10 flex-1 rounded-[8px] bg-[#8F1118] px-4 text-sm font-semibold text-[#F5F5F5]" disabled={pending}>
              {editing ? "Save" : "Create"}
            </button>
            {editing ? (
              <button type="button" className="h-10 rounded-[8px] border border-[#232323] px-4 text-sm" onClick={() => setEditing(null)}>
                Clear
              </button>
            ) : null}
          </div>
        </form>
        <div className="mt-5 grid gap-3 border-t border-[#232323] pt-4">
          <div className="rounded-[8px] border border-[#232323] bg-[#080808] p-3">
            <p className="text-xs font-semibold uppercase text-[#9B9B9B]">SEO Preview</p>
            <p className="mt-2 truncate text-sm text-[#F5F5F5]">{blogPreview.seoTitle || blogPreview.title || "Untitled blog"}</p>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#9B9B9B]">{blogPreview.seoDescription || blogPreview.excerpt || "No description set."}</p>
            <p className="mt-2 truncate text-[11px] text-[#B71C24]">ractysh.com/blog/{blogPreview.slug || "draft-slug"}</p>
          </div>
          <div className="overflow-hidden rounded-[8px] border border-[#232323] bg-[#151515]">
            {blogPreview.coverImage ? (
              <img src={blogPreview.coverImage} alt="" className="h-28 w-full object-cover" />
            ) : (
              <div className="flex h-28 items-center justify-center bg-[#080808] text-xs text-[#9B9B9B]">Open Graph image</div>
            )}
            <div className="p-3">
              <p className="truncate text-sm font-semibold text-[#F5F5F5]">{blogPreview.title || "Open Graph Title"}</p>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#9B9B9B]">{blogPreview.excerpt || "Open Graph description appears here."}</p>
            </div>
          </div>
        </div>
      </Panel>

      <Panel title="Blog Management">
        <Table rows={data.blogs} columns={columns} search={search} empty="No blog records found in Prisma." />
      </Panel>
    </div>
  );
}

function NewsletterManager({
  data,
  activeProject,
  search,
  runIntent,
  setData,
  pending
}: {
  data: AdminCommandCenterData;
  activeProject: ProjectKey;
  search: string;
  runIntent: (body: Record<string, unknown>, successMessage: string) => Promise<void>;
  setData: React.Dispatch<React.SetStateAction<AdminCommandCenterData>>;
  pending: boolean;
}) {
  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      division: activeProject,
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "",
      category: "Campaign",
      author: "Ractysh",
      featured: false,
      status: "scheduled",
      publishDate: "",
      tags: "",
      readTime: ""
    }
  });
  const subscriberColumns = React.useMemo<Column<SubscriberRow>[]>(
    () => [
      { accessorKey: "email", header: "Email", meta: { width: "20rem" } },
      { accessorKey: "division", header: "Division", meta: { width: "12rem" }, cell: ({ row }) => projectLabel(data, row.original.division) },
      { accessorKey: "status", header: "Status", meta: { width: "10rem" }, cell: ({ row }) => <StatusPill value={row.original.status} /> },
      { accessorKey: "source", header: "Source", meta: { width: "14rem" } },
      { accessorKey: "createdAt", header: "Created", meta: { width: "10rem" }, cell: ({ row }) => formatDate(row.original.createdAt) },
      {
        id: "actions",
        header: "Actions",
        meta: { width: "7rem" },
        cell: ({ row }) => (
          <IconButton
            label="Delete"
            danger
            disabled={pending}
            onClick={() => runIntent({ intent: "subscriber.delete", id: row.original.id, table: row.original.table }, "Subscriber deleted.")}
          >
            <Trash2 className="h-4 w-4" />
          </IconButton>
        )
      }
    ],
    [data, pending, runIntent]
  );
  const newsletterColumns = React.useMemo<Column<NewsletterRow>[]>(
    () => [
      { accessorKey: "title", header: "Campaign", meta: { width: "18rem" } },
      { accessorKey: "division", header: "Division", meta: { width: "12rem" }, cell: ({ row }) => projectLabel(data, row.original.division) },
      { accessorKey: "status", header: "Status", meta: { width: "10rem" }, cell: ({ row }) => <StatusPill value={row.original.status} /> },
      { accessorKey: "publishDate", header: "Send Later", meta: { width: "12rem" }, cell: ({ row }) => formatDate(row.original.publishDate) },
      { accessorKey: "views", header: "Views", meta: { width: "7rem" }, cell: ({ row }) => formatNumber(row.original.views) },
      { accessorKey: "updatedAt", header: "Updated", meta: { width: "10rem" }, cell: ({ row }) => formatDate(row.original.updatedAt) }
    ],
    [data]
  );

  async function exportSubscribers() {
    await runIntent({ intent: "audit.export", entity: "Subscriber", summary: "Exported newsletter subscriber CSV." }, "Export recorded.");
    downloadCsv(
      "ractysh-newsletter-subscribers.csv",
      data.subscribers.map((subscriber) => ({
        email: subscriber.email,
        status: subscriber.status,
        source: subscriber.source,
        createdAt: subscriber.createdAt
      }))
    );
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[24rem_minmax(0,1fr)]">
      <Panel title="Send Campaign Later">
        <form
          className="grid gap-3"
          onSubmit={form.handleSubmit((values) =>
            runIntent(
              {
                intent: "newsletter.upsert",
                ...values,
                tags: csv(values.tags),
                featured: Boolean(values.featured)
              },
              "Newsletter campaign scheduled."
            ).then(() => form.reset({ division: activeProject, title: "", slug: "", excerpt: "", content: "", coverImage: "", category: "Campaign", author: "Ractysh", featured: false, status: "scheduled", publishDate: "", tags: "", readTime: "" }))
          )}
        >
          <select className={fieldClass} {...form.register("division")}>
            {data.projectOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
          <input className={fieldClass} placeholder="Campaign title" {...form.register("title")} />
          <input className={fieldClass} placeholder="Slug" {...form.register("slug")} />
          <textarea className={textareaClass} placeholder="Excerpt" {...form.register("excerpt")} />
          <textarea className={cn(textareaClass, "min-h-36")} placeholder="Campaign content" {...form.register("content")} />
          <input className={fieldClass} placeholder="Cover image URL" {...form.register("coverImage")} />
          <input className={fieldClass} placeholder="Category" {...form.register("category")} />
          <input className={fieldClass} placeholder="Author" {...form.register("author")} />
          <input className={fieldClass} placeholder="Tags, comma separated" {...form.register("tags")} />
          <select className={fieldClass} {...form.register("status")}>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          <input className={fieldClass} type="datetime-local" {...form.register("publishDate")} />
          <button className="h-10 rounded-[8px] bg-[#8F1118] px-4 text-sm font-semibold text-[#F5F5F5]" disabled={pending}>
            Schedule
          </button>
        </form>
      </Panel>

      <div className="grid gap-5">
        <Panel
          title="Subscriber List"
          action={
            <button type="button" onClick={exportSubscribers} className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#232323] px-3 text-sm">
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          }
        >
          <Table rows={data.subscribers} columns={subscriberColumns} search={search} empty="No subscriber records found in Prisma." />
        </Panel>
        <Panel title="Scheduled Campaigns">
          <Table rows={data.newsletters} columns={newsletterColumns} search={search} empty="No newsletter campaign records found in Prisma." />
        </Panel>
      </div>
    </div>
  );
}

function ServiceManager({
  data,
  activeProject,
  search,
  runIntent,
  pending
}: {
  data: AdminCommandCenterData;
  activeProject: ProjectKey;
  search: string;
  runIntent: (body: Record<string, unknown>, successMessage: string) => Promise<void>;
  pending: boolean;
}) {
  const [editing, setEditing] = React.useState<ServiceRow | null>(null);
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      division: activeProject,
      title: "",
      slug: "",
      summary: "",
      description: "",
      category: "Architecture",
      href: "",
      imageUrl: "",
      tags: "",
      images: "",
      heroContent: "{}",
      metrics: "[]",
      sections: "[]",
      cta: "{}",
      seo: "{}",
      status: "published",
      position: 0
    }
  });

  React.useEffect(() => {
    form.reset(
      editing
        ? {
            id: editing.id,
            division: editing.division,
            companyId: editing.companyId,
            title: editing.title,
            slug: editing.slug,
            summary: editing.summary,
            description: editing.description || "",
            category: editing.category,
            href: editing.href || "",
            imageUrl: editing.imageUrl || "",
            tags: editing.tags.join(", "),
            images: editing.images.join(", "),
            heroContent: jsonText(editing.heroContent, {}),
            metrics: jsonText(editing.metrics, []),
            sections: jsonText(editing.sections, []),
            cta: jsonText(editing.cta, {}),
            seo: jsonText(editing.seo, {}),
            status: editing.status as ServiceFormValues["status"],
            position: editing.position
          }
        : {
            division: activeProject,
            title: "",
            slug: "",
            summary: "",
            description: "",
            category: "Architecture",
            href: "",
            imageUrl: "",
            tags: "",
            images: "",
            heroContent: "{}",
            metrics: "[]",
            sections: "[]",
            cta: "{}",
            seo: "{}",
            status: "published",
            position: 0
          }
    );
  }, [activeProject, editing, form]);

  const columns = React.useMemo<Column<ServiceRow>[]>(
    () => [
      { accessorKey: "title", header: "Service", meta: { width: "17rem" } },
      { accessorKey: "division", header: "Division", meta: { width: "12rem" }, cell: ({ row }) => projectLabel(data, row.original.division) },
      { accessorKey: "category", header: "Category", meta: { width: "12rem" } },
      { accessorKey: "companyName", header: "Company", meta: { width: "14rem" } },
      { accessorKey: "status", header: "Status", meta: { width: "10rem" }, cell: ({ row }) => <StatusPill value={row.original.status} /> },
      { accessorKey: "updatedAt", header: "Updated", meta: { width: "10rem" }, cell: ({ row }) => formatDate(row.original.updatedAt) },
      {
        id: "actions",
        header: "Actions",
        meta: { width: "12rem" },
        cell: ({ row }) => (
          <div className="flex gap-2">
            <IconButton label="Edit" onClick={() => setEditing(row.original)}>
              <Pencil className="h-4 w-4" />
            </IconButton>
            <IconButton
              label={row.original.status === "published" ? "Unpublish" : "Publish"}
              disabled={pending}
              onClick={() =>
                runIntent(
                  { intent: "service.status", id: row.original.id, status: row.original.status === "published" ? "draft" : "published" },
                  "Service status updated."
                )
              }
            >
              <Check className="h-4 w-4" />
            </IconButton>
            <IconButton label="Delete" danger disabled={pending} onClick={() => runIntent({ intent: "service.delete", id: row.original.id }, "Service deleted.")}>
              <Trash2 className="h-4 w-4" />
            </IconButton>
          </div>
        )
      }
    ],
    [data, pending, runIntent]
  );

  return (
    <div className="grid gap-5 xl:grid-cols-[25rem_minmax(0,1fr)]">
      <Panel title={editing ? "Edit Service" : "Create Service"}>
        <form
          className="grid gap-3"
          onSubmit={form.handleSubmit((values) =>
            runIntent(
              {
                intent: "service.upsert",
                ...values,
                tags: csv(values.tags),
                images: csv(values.images),
                heroContent: parseJson(values.heroContent, {}),
                metrics: parseJson(values.metrics, []),
                sections: parseJson(values.sections, []),
                cta: parseJson(values.cta, {}),
                seo: parseJson(values.seo, {})
              },
              editing ? "Service updated." : "Service created."
            ).then(() => setEditing(null))
          )}
        >
          <input type="hidden" {...form.register("id")} />
          <select className={fieldClass} {...form.register("division")}>
            {data.projectOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
          <select className={fieldClass} {...form.register("companyId")}>
            <option value="">Default division</option>
            {data.companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
          <input className={fieldClass} placeholder="Service title" {...form.register("title")} />
          <input className={fieldClass} placeholder="Slug" {...form.register("slug")} />
          <input className={fieldClass} placeholder="Category" {...form.register("category")} />
          <textarea className={textareaClass} placeholder="Summary" {...form.register("summary")} />
          <textarea className={textareaClass} placeholder="Description" {...form.register("description")} />
          <input className={fieldClass} placeholder="CTA href" {...form.register("href")} />
          <input className={fieldClass} placeholder="Hero image URL" {...form.register("imageUrl")} />
          <input className={fieldClass} placeholder="Tags, comma separated" {...form.register("tags")} />
          <input className={fieldClass} placeholder="Images, comma separated URLs" {...form.register("images")} />
          <textarea className={textareaClass} placeholder="Hero content JSON" {...form.register("heroContent")} />
          <textarea className={textareaClass} placeholder="Metrics JSON" {...form.register("metrics")} />
          <textarea className={textareaClass} placeholder="Sections JSON" {...form.register("sections")} />
          <textarea className={textareaClass} placeholder="CTA JSON" {...form.register("cta")} />
          <textarea className={textareaClass} placeholder="SEO JSON" {...form.register("seo")} />
          <select className={fieldClass} {...form.register("status")}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <input className={fieldClass} type="number" {...form.register("position")} />
          <button className="h-10 rounded-[8px] bg-[#8F1118] px-4 text-sm font-semibold text-[#F5F5F5]" disabled={pending}>
            {editing ? "Save" : "Create"}
          </button>
        </form>
      </Panel>

      <Panel title="Service Management">
        <Table rows={data.services} columns={columns} search={search} empty="No service records found in Prisma." />
      </Panel>
    </div>
  );
}

function MediaLibrary({
  data,
  activeProject,
  search,
  runIntent,
  setData,
  pending
}: {
  data: AdminCommandCenterData;
  activeProject: ProjectKey;
  search: string;
  runIntent: (body: Record<string, unknown>, successMessage: string) => Promise<void>;
  setData: React.Dispatch<React.SetStateAction<AdminCommandCenterData>>;
  pending: boolean;
}) {
  const uploadRef = React.useRef<HTMLFormElement | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [urlTitle, setUrlTitle] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [urlFolder, setUrlFolder] = React.useState(mediaFolders[0]);
  const [urlDivision, setUrlDivision] = React.useState(activeProject);
  const [folderFilter, setFolderFilter] = React.useState("All");
  const rows = React.useMemo(
    () => (folderFilter === "All" ? data.media : data.media.filter((asset) => asset.folder === folderFilter)),
    [data.media, folderFilter]
  );
  const columns = React.useMemo<Column<MediaRow>[]>(
    () => [
      { accessorKey: "title", header: "Asset", meta: { width: "16rem" } },
      { accessorKey: "division", header: "Division", meta: { width: "12rem" }, cell: ({ row }) => projectLabel(data, row.original.division) },
      { accessorKey: "kind", header: "Kind", meta: { width: "8rem" }, cell: ({ row }) => <StatusPill value={row.original.kind} /> },
      { accessorKey: "folder", header: "Folder", meta: { width: "11rem" } },
      { accessorKey: "provider", header: "Provider", meta: { width: "10rem" } },
      { accessorKey: "url", header: "URL", meta: { width: "24rem" }, cell: ({ row }) => <span className="truncate">{row.original.url}</span> },
      { accessorKey: "updatedAt", header: "Updated", meta: { width: "10rem" }, cell: ({ row }) => formatDate(row.original.updatedAt) },
      {
        id: "actions",
        header: "Actions",
        meta: { width: "10rem" },
        cell: ({ row }) => (
          <div className="flex gap-2">
            <IconButton
              label="Copy URL"
              onClick={() => {
                navigator.clipboard.writeText(row.original.url).then(() => toast.success("URL copied."));
              }}
            >
              <Copy className="h-4 w-4" />
            </IconButton>
            <IconButton label="Delete" danger disabled={pending} onClick={() => runIntent({ intent: "media.delete", id: row.original.id }, "Media deleted.")}>
              <Trash2 className="h-4 w-4" />
            </IconButton>
          </div>
        )
      }
    ],
    [data, pending, runIntent]
  );

  React.useEffect(() => {
    setUrlDivision(activeProject);
  }, [activeProject]);

  async function upload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!uploadRef.current) return;
    setUploading(true);
    try {
      const formData = new FormData(uploadRef.current);
      formData.set("intent", "media.upload");
      const response = await fetch("/api/admin/command-center", { method: "POST", body: formData });
      const payload = (await response.json().catch(() => ({}))) as CommandResponse;
      if (!response.ok || !payload.data) throw new Error(payload.message || "Upload failed.");
      setData(payload.data);
      uploadRef.current.reset();
      toast.success("Media uploaded.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[24rem_minmax(0,1fr)]">
      <div className="grid gap-5">
        <Panel title="Cloudinary Upload">
          <form ref={uploadRef} onSubmit={upload} className="grid gap-3">
            <input name="title" className={fieldClass} placeholder="Title" />
            <input name="altText" className={fieldClass} placeholder="Alt text" />
            <select name="division" className={fieldClass} defaultValue={activeProject}>
              {data.projectOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
            <select name="kind" className={fieldClass} defaultValue="image">
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="document">Document</option>
              <option value="model">Model</option>
              <option value="other">Other</option>
            </select>
            <select name="folder" className={fieldClass} defaultValue={mediaFolders[0]}>
              {mediaFolders.map((folder) => (
                <option key={folder} value={folder}>
                  {folder}
                </option>
              ))}
            </select>
            <input name="file" type="file" className={fieldClass} />
            <button className="inline-flex h-10 items-center justify-center gap-2 rounded-[8px] bg-[#8F1118] px-4 text-sm font-semibold text-[#F5F5F5]" disabled={uploading}>
              <Upload className="h-4 w-4" />
              Upload
            </button>
          </form>
        </Panel>
        <Panel title="Add URL">
          <form
            className="grid gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              runIntent({ intent: "media.createUrl", title: urlTitle, url, folder: urlFolder, division: urlDivision, provider: "metadata", kind: "image" }, "Media URL added.");
              setUrlTitle("");
              setUrl("");
            }}
          >
            <input value={urlTitle} onChange={(event) => setUrlTitle(event.target.value)} className={fieldClass} placeholder="Title" />
            <input value={url} onChange={(event) => setUrl(event.target.value)} className={fieldClass} placeholder="URL" />
            <select value={urlDivision} onChange={(event) => setUrlDivision(event.target.value)} className={fieldClass}>
              {data.projectOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={urlFolder} onChange={(event) => setUrlFolder(event.target.value)} className={fieldClass}>
              {mediaFolders.map((folder) => (
                <option key={folder} value={folder}>
                  {folder}
                </option>
              ))}
            </select>
            <button className="h-10 rounded-[8px] border border-[#232323] px-4 text-sm" disabled={pending}>
              Add URL
            </button>
          </form>
        </Panel>
      </div>
      <Panel
        title="Media Library"
        action={
          <div className="flex flex-wrap gap-2">
            {["All", ...mediaFolders].map((folder) => (
              <button
                key={folder}
                type="button"
                onClick={() => setFolderFilter(folder)}
                className={cn(
                  "h-9 rounded-[8px] border px-3 text-sm transition",
                  folderFilter === folder ? "border-[#8F1118] bg-[#8F1118] text-[#F5F5F5]" : "border-[#232323] bg-[#151515] text-[#9B9B9B]"
                )}
              >
                {folder}
              </button>
            ))}
          </div>
        }
      >
        <Table rows={rows} columns={columns} search={search} empty="No media assets found in Prisma." />
      </Panel>
    </div>
  );
}

function CareersManager({
  data,
  activeProject,
  search,
  runIntent,
  pending
}: {
  data: AdminCommandCenterData;
  activeProject: ProjectKey;
  search: string;
  runIntent: (body: Record<string, unknown>, successMessage: string) => Promise<void>;
  pending: boolean;
}) {
  const [editing, setEditing] = React.useState<JobRow | null>(null);
  const [selectedApplication, setSelectedApplication] = React.useState<ApplicationRow | null>(null);
  const [applicationNotes, setApplicationNotes] = React.useState("");
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: { division: activeProject, title: "", slug: "", location: "", type: "", summary: "", description: "", status: "published" }
  });

  React.useEffect(() => {
    form.reset(
      editing
        ? {
            id: editing.id,
            division: editing.division,
            title: editing.title,
            slug: editing.slug,
            location: editing.location,
            type: editing.type,
            summary: editing.summary,
            description: editing.description || "",
            status: editing.status as JobFormValues["status"]
          }
        : { division: activeProject, title: "", slug: "", location: "", type: "", summary: "", description: "", status: "published" }
    );
  }, [activeProject, editing, form]);

  React.useEffect(() => {
    if (!selectedApplication) return;
    const fresh = data.applications.find((application) => application.id === selectedApplication.id);
    if (fresh) {
      setSelectedApplication(fresh);
      setApplicationNotes(fresh.notes || "");
    }
  }, [data.applications, selectedApplication]);

  const jobColumns = React.useMemo<Column<JobRow>[]>(
    () => [
      { accessorKey: "title", header: "Job", meta: { width: "16rem" } },
      { accessorKey: "division", header: "Division", meta: { width: "12rem" }, cell: ({ row }) => projectLabel(data, row.original.division) },
      { accessorKey: "location", header: "Location", meta: { width: "12rem" } },
      { accessorKey: "type", header: "Type", meta: { width: "10rem" } },
      { accessorKey: "status", header: "Status", meta: { width: "10rem" }, cell: ({ row }) => <StatusPill value={row.original.status} /> },
      { accessorKey: "updatedAt", header: "Updated", meta: { width: "10rem" }, cell: ({ row }) => formatDate(row.original.updatedAt) },
      {
        id: "actions",
        header: "Actions",
        meta: { width: "8rem" },
        cell: ({ row }) => (
          <div className="flex gap-2">
            <IconButton label="Edit" onClick={() => setEditing(row.original)}>
              <Pencil className="h-4 w-4" />
            </IconButton>
            <IconButton label="Delete" danger disabled={pending} onClick={() => runIntent({ intent: "job.delete", id: row.original.id }, "Job deleted.")}>
              <Trash2 className="h-4 w-4" />
            </IconButton>
          </div>
        )
      }
    ],
    [data, pending, runIntent]
  );
  const applicationColumns = React.useMemo<Column<ApplicationRow>[]>(
    () => [
      { accessorKey: "fullName", header: "Applicant", meta: { width: "14rem" } },
      { accessorKey: "division", header: "Division", meta: { width: "12rem" }, cell: ({ row }) => projectLabel(data, row.original.division) },
      { accessorKey: "email", header: "Email", meta: { width: "16rem" } },
      { accessorKey: "position", header: "Position", meta: { width: "14rem" } },
      { accessorKey: "experience", header: "Experience", meta: { width: "10rem" } },
      { accessorKey: "status", header: "Status", meta: { width: "10rem" }, cell: ({ row }) => <StatusPill value={careerLabel(row.original.status)} /> },
      {
        id: "resume",
        header: "Resume",
        meta: { width: "8rem" },
        cell: ({ row }) =>
          row.original.resumeUrl ? (
            <a className="text-[#B71C24] underline" href={row.original.resumeUrl} target="_blank" rel="noreferrer">
              View
            </a>
          ) : (
            "None"
          )
      },
      {
        id: "actions",
        header: "Actions",
        meta: { width: "18rem" },
        cell: ({ row }) => (
          <div className="flex gap-2">
            <IconButton
              label="Review"
              onClick={() => {
                setSelectedApplication(row.original);
                setApplicationNotes(row.original.notes || "");
              }}
            >
              <Eye className="h-4 w-4" />
            </IconButton>
            {(["new", "reviewed", "shortlisted", "hired", "rejected"] as const).map((status) => (
              <IconButton
                key={status}
                label={careerLabel(status)}
                disabled={pending || row.original.status === status}
                onClick={() => runIntent({ intent: "application.update", id: row.original.id, status, notes: row.original.notes }, "Application updated.")}
              >
                <Check className="h-4 w-4" />
              </IconButton>
            ))}
          </div>
        )
      }
    ],
    [data, pending, runIntent]
  );

  return (
    <div className="grid gap-5 xl:grid-cols-[24rem_minmax(0,1fr)]">
      <Panel title={editing ? "Edit Job" : "Create Job"}>
        <form
          className="grid gap-3"
          onSubmit={form.handleSubmit((values) =>
            runIntent({ intent: "job.upsert", ...values }, editing ? "Job updated." : "Job created.").then(() => setEditing(null))
          )}
        >
          <input type="hidden" {...form.register("id")} />
          <select className={fieldClass} {...form.register("division")}>
            {data.projectOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
          <input className={fieldClass} placeholder="Title" {...form.register("title")} />
          <input className={fieldClass} placeholder="Slug" {...form.register("slug")} />
          <input className={fieldClass} placeholder="Location" {...form.register("location")} />
          <input className={fieldClass} placeholder="Type" {...form.register("type")} />
          <textarea className={textareaClass} placeholder="Summary" {...form.register("summary")} />
          <textarea className={textareaClass} placeholder="Description" {...form.register("description")} />
          <select className={fieldClass} {...form.register("status")}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <button className="h-10 rounded-[8px] bg-[#8F1118] px-4 text-sm font-semibold text-[#F5F5F5]" disabled={pending}>
            {editing ? "Save" : "Create"}
          </button>
        </form>
      </Panel>
      <div className="grid gap-5">
        <Panel title="Jobs">
          <Table rows={data.jobs} columns={jobColumns} search={search} empty="No career jobs found in Prisma." />
        </Panel>
        {selectedApplication ? (
          <Panel
            title="Application Review"
            action={
              <button type="button" onClick={() => setSelectedApplication(null)} className="h-9 rounded-[8px] border border-[#232323] px-3 text-sm">
                Close
              </button>
            }
          >
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_18rem]">
              <div className="grid gap-3">
                <div>
                  <p className="text-xl font-semibold text-[#F5F5F5]">{selectedApplication.fullName}</p>
                  <p className="mt-1 text-sm text-[#9B9B9B]">{selectedApplication.email} · {selectedApplication.position}</p>
                </div>
                <div className="grid gap-2 sm:grid-cols-5">
                  {(["new", "reviewed", "shortlisted", "hired", "rejected"] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      disabled={pending}
                      onClick={() => runIntent({ intent: "application.update", id: selectedApplication.id, status, notes: applicationNotes }, "Application updated.")}
                      className={cn(
                        "flex h-10 items-center justify-center gap-2 rounded-[8px] border px-2 text-xs transition",
                        selectedApplication.status === status
                          ? "border-[#8F1118] bg-[#8F1118] text-[#F5F5F5]"
                          : "border-[#232323] bg-[#151515] text-[#9B9B9B]"
                      )}
                    >
                      <CircleDot className="h-3.5 w-3.5" />
                      {careerLabel(status)}
                    </button>
                  ))}
                </div>
                <textarea value={applicationNotes} onChange={(event) => setApplicationNotes(event.target.value)} className={cn(textareaClass, "min-h-28")} placeholder="Interview notes, offer notes, internal timeline updates" />
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => runIntent({ intent: "application.update", id: selectedApplication.id, status: selectedApplication.status, notes: applicationNotes }, "Application notes saved.")}
                  className="h-10 rounded-[8px] bg-[#8F1118] px-4 text-sm font-semibold text-[#F5F5F5]"
                >
                  Save Notes
                </button>
              </div>
              <div className="grid gap-3">
                <div className="rounded-[8px] border border-[#232323] bg-[#151515] p-3">
                  <p className="text-xs font-semibold uppercase text-[#9B9B9B]">Resume Viewer</p>
                  {selectedApplication.resumeUrl ? (
                    <a href={selectedApplication.resumeUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#232323] px-3 text-sm text-[#F5F5F5]">
                      <FileText className="h-4 w-4 text-[#B71C24]" />
                      Open resume
                    </a>
                  ) : (
                    <p className="mt-3 text-sm text-[#9B9B9B]">No resume attached.</p>
                  )}
                </div>
                <div className="rounded-[8px] border border-[#232323] bg-[#151515] p-3">
                  <p className="text-xs font-semibold uppercase text-[#9B9B9B]">Timeline</p>
                  <div className="mt-3 grid gap-2 text-sm text-[#9B9B9B]">
                    <p>Applied · {formatDate(selectedApplication.createdAt)}</p>
                    <p>Interview status · {careerLabel(selectedApplication.status)}</p>
                    <p>Offer status · {selectedApplication.status === "hired" ? "Selected" : selectedApplication.status === "rejected" ? "Rejected" : "Pending"}</p>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        ) : null}
        <Panel title="Applications">
          <Table rows={data.applications} columns={applicationColumns} search={search} empty="No career applications found in Prisma." />
        </Panel>
      </div>
    </div>
  );
}

function ContactManager({
  data,
  search,
  runIntent,
  pending
}: {
  data: AdminCommandCenterData;
  search: string;
  runIntent: (body: Record<string, unknown>, successMessage: string) => Promise<void>;
  pending: boolean;
}) {
  const columns = React.useMemo<Column<ContactRow>[]>(
    () => [
      { accessorKey: "name", header: "Name", meta: { width: "14rem" } },
      { accessorKey: "division", header: "Division", meta: { width: "12rem" }, cell: ({ row }) => projectLabel(data, row.original.division) },
      { accessorKey: "email", header: "Email", meta: { width: "16rem" } },
      { accessorKey: "service", header: "Service", meta: { width: "14rem" }, cell: ({ row }) => row.original.service || "Not set" },
      { accessorKey: "message", header: "Message", meta: { width: "22rem" }, cell: ({ row }) => <span className="truncate">{row.original.message}</span> },
      { accessorKey: "status", header: "Status", meta: { width: "10rem" }, cell: ({ row }) => <StatusPill value={row.original.status} /> },
      { accessorKey: "createdAt", header: "Created", meta: { width: "10rem" }, cell: ({ row }) => formatDate(row.original.createdAt) },
      {
        id: "actions",
        header: "Actions",
        meta: { width: "11rem" },
        cell: ({ row }) => (
          <div className="flex gap-2">
            <IconButton disabled={pending} label="Responded" onClick={() => runIntent({ intent: "contact.update", id: row.original.id, status: "contacted", notes: row.original.notes }, "Contact updated.")}>
              <Check className="h-4 w-4" />
            </IconButton>
            <IconButton disabled={pending} label="Archive" onClick={() => runIntent({ intent: "contact.update", id: row.original.id, status: "archived", notes: row.original.notes }, "Contact archived.")}>
              <Archive className="h-4 w-4" />
            </IconButton>
            <IconButton disabled={pending} danger label="Delete" onClick={() => runIntent({ intent: "contact.delete", id: row.original.id }, "Contact deleted.")}>
              <Trash2 className="h-4 w-4" />
            </IconButton>
          </div>
        )
      }
    ],
    [data, pending, runIntent]
  );

  return (
    <Panel
      title="Contact Management"
      action={
        <button
          type="button"
          onClick={async () => {
            await runIntent({ intent: "audit.export", entity: "ContactInquiry", summary: "Exported contact submissions CSV." }, "Export recorded.");
            downloadCsv(
              "ractysh-contact-submissions.csv",
              data.contacts.map((contact) => ({
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                company: contact.company,
                service: contact.service,
                status: contact.status,
                createdAt: contact.createdAt
              }))
            );
          }}
          className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#232323] px-3 text-sm"
        >
          <Download className="h-4 w-4" />
          Export
        </button>
      }
    >
      <Table rows={data.contacts} columns={columns} search={search} empty="No contact submissions found in Prisma." />
    </Panel>
  );
}

function SettingsManager({
  data,
  search,
  runIntent,
  pending
}: {
  data: AdminCommandCenterData;
  search: string;
  runIntent: (body: Record<string, unknown>, successMessage: string) => Promise<void>;
  pending: boolean;
}) {
  const filteredSettings = React.useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return data.settings;
    return data.settings.filter((setting) => JSON.stringify(setting).toLowerCase().includes(query));
  }, [data.settings, search]);

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {filteredSettings.length ? (
        filteredSettings.map((setting) => <SettingsEditor key={setting.id} setting={setting} runIntent={runIntent} pending={pending} />)
      ) : (
        <Panel title="Settings">
          <p className="text-sm text-[#9B9B9B]">No settings records found in Prisma.</p>
        </Panel>
      )}
    </div>
  );
}

function SettingsEditor({
  setting,
  runIntent,
  pending
}: {
  setting: SettingsRow;
  runIntent: (body: Record<string, unknown>, successMessage: string) => Promise<void>;
  pending: boolean;
}) {
  const [value, setValue] = React.useState(jsonText(setting.value, {}));

  React.useEffect(() => {
    setValue(jsonText(setting.value, {}));
  }, [setting.value]);

  return (
    <Panel title={setting.label}>
      <div className="grid gap-3">
        <p className="text-sm text-[#9B9B9B]">{setting.key}</p>
        <textarea value={value} onChange={(event) => setValue(event.target.value)} className={cn(textareaClass, "min-h-52 font-mono")} />
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            try {
              runIntent(
                { intent: "settings.update", id: setting.id, division: setting.division, key: setting.key, label: setting.label, scope: setting.scope, value: parseJson(value, {}) },
                "Settings updated."
              );
            } catch {
              toast.error("Settings JSON is invalid.");
            }
          }}
          className="h-10 rounded-[8px] bg-[#8F1118] px-4 text-sm font-semibold text-[#F5F5F5]"
        >
          Save Settings
        </button>
      </div>
    </Panel>
  );
}

function AuditLogs({ data, search }: { data: AdminCommandCenterData; search: string }) {
  const columns = React.useMemo<Column<AuditLogRow>[]>(
    () => [
      { accessorKey: "createdAt", header: "Time", meta: { width: "12rem" }, cell: ({ row }) => formatDate(row.original.createdAt) },
      { accessorKey: "actor", header: "Actor", meta: { width: "14rem" } },
      { accessorKey: "action", header: "Action", meta: { width: "9rem" }, cell: ({ row }) => <StatusPill value={row.original.action} /> },
      { accessorKey: "entity", header: "Entity", meta: { width: "12rem" } },
      { accessorKey: "summary", header: "Summary", meta: { width: "30rem" }, cell: ({ row }) => <span className="truncate">{row.original.summary}</span> }
    ],
    []
  );

  return (
    <Panel title="Audit Logs">
      <Table rows={data.auditLogs} columns={columns} search={search} empty="No audit logs found in Prisma." />
    </Panel>
  );
}
