// Gallery items. Point each entry at an image in /public/gallery and/or an
// external link (GitHub repo, YouTube video, live demo). Both are optional
// but at least one of image/link should be set.
export interface GalleryItem {
  title: string;
  blurb: string;
  image?: string;   // e.g. "/gallery/paypulse.png"
  link?: string;    // e.g. a GitHub repo or YouTube URL
  linkLabel?: string;
}

export const gallery: GalleryItem[] = [
  {
    title: "PayPulse — production-grade demo",
    blurb: "A Node.js payments API showcasing the full commit-to-production lifecycle: CI/CD, containers, Kubernetes, and observability.",
    link: "https://github.com/beleaderinnohub",
    linkLabel: "View on GitHub",
  },
  {
    title: "Cloud & DevOps on YouTube",
    blurb: "Free tutorial series on Azure, Kubernetes, FluxCD, and Terraform — the same material our cohorts go deeper on.",
    link: "https://www.youtube.com/@PRINCEUGOCHIME",
    linkLabel: "Watch on YouTube",
  },
  {
    title: "GitOps on AKS",
    blurb: "A production-shaped lab: Workload Identity, Kyverno policy, cosign signing, and cert-manager on Azure Kubernetes Service.",
    link: "https://github.com/beleaderinnohub",
    linkLabel: "View on GitHub",
  },
];
