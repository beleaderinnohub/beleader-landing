// Program catalogue. Edit this file to add, remove, or update bootcamps
// and promotions — the Programs section renders straight from it.
export interface Program {
  id: string;
  stage: "Foundations" | "Practitioner" | "Production" | "Mastery";
  title: string;
  summary: string;
  format: string;      // e.g. "6-month cohort · part-time"
  status: "open" | "upcoming" | "waitlist";
  startNote: string;   // human-readable timing, e.g. "Next cohort: Sept 2026"
}

export const programs: Program[] = [
  {
    id: "cloud-foundations",
    stage: "Foundations",
    title: "Cloud & Linux Foundations",
    summary:
      "Start from zero. The command line, Linux, networking, and how the cloud actually works before touching any platform.",
    format: "8 weeks · part-time",
    status: "open",
    startNote: "Next cohort: September 2026",
  },
  {
    id: "devops-practitioner",
    stage: "Practitioner",
    title: "DevOps Practitioner Bootcamp",
    summary:
      "Git, CI/CD with GitHub Actions, containers, and Infrastructure as Code with Terraform. Build and ship a real service.",
    format: "12 weeks · part-time",
    status: "upcoming",
    startNote: "Registering interest",
  },
  {
    id: "kubernetes-production",
    stage: "Production",
    title: "Kubernetes in Production",
    summary:
      "Run workloads on Kubernetes the way teams do in production: GitOps with Flux, autoscaling, policy, and observability.",
    format: "10 weeks · part-time",
    status: "upcoming",
    startNote: "Registering interest",
  },
  {
    id: "mastery-track",
    stage: "Mastery",
    title: "Platform Engineering Mastery",
    summary:
      "Multi-cloud platform engineering, internal developer platforms, and the judgement to design systems, not just operate them.",
    format: "Cohort · advanced",
    status: "waitlist",
    startNote: "Join the waitlist",
  },
];
