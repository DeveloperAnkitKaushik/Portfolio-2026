export type Project = {
  slug: string;
  /** Small ruled label above the title. */
  kicker: string;
  title: string;
  description: string;
  tech: string[];
  /** Shown in the browser mockup's address pill. */
  url: string;
  liveUrl?: string;
  repoUrl?: string;
  /** Path under /public. Leave undefined until the screenshot exists. */
  image?: string;
};

/**
 * Ordered strongest-first for an AI engineering audience: the two LLM
 * infrastructure projects lead, then the shipped production AI feature, then
 * the portfolio itself.
 */
export const PROJECTS: Project[] = [
  {
    slug: "llmrouter",
    kicker: "Cost-Aware Model Routing Gateway for LLM Applications",
    title: "LLMRouter",
    description:
      "A routing gateway that scores query complexity with local embeddings and dispatches each request to the cheapest capable model in a tiered pool, escalating only ambiguous queries to an LLM-based judge so classification stays off the hot path. Hardened for production with per-request budget ceilings, automatic failover on provider timeouts and rate limits, and structured logging of every routing decision.",
    tech: [
      "Python",
      "LLM Routing",
      "Embeddings",
      "FAISS",
      "Evaluation Harness",
      "Cost Benchmarking",
      "Structured Logging",
      "Failover",
    ],
    url: "github.com/DeveloperAnkitKaushik/LLMRouter",
    repoUrl: "https://github.com/DeveloperAnkitKaushik/LLMRouter",
  },
  {
    slug: "semcache",
    kicker: "Semantic Caching Layer for LLM Applications",
    title: "SemCache",
    description:
      "An embedding-based caching layer that matches semantically equivalent user queries — paraphrases, reworded prompts — to cached LLM responses, cutting redundant inference calls by ~55% on the eval workload. Similarity-threshold sweeps across ~1,200 query pairs pinned the operating point that keeps false-positive cache hits below 2%.",
    tech: [
      "Python",
      "FAISS",
      "Ollama",
      "Embeddings",
      "Semantic Caching",
      "Vector Search",
      "Threshold Tuning",
    ],
    url: "github.com/DeveloperAnkitKaushik/SemCache",
    repoUrl: "https://github.com/DeveloperAnkitKaushik/SemCache",
  },
  {
    slug: "grace-ai",
    kicker: "AI-Assisted Shopping Layer — Shipped at Wallmantra",
    title: "Grace AI",
    description:
      "An AI shopping assistant that lets customers find products in natural language and get personalised recommendations across the catalog. Shipped alongside LLM-powered support workflows that handle common queries automatically and keep responses consistent, cutting manual support load.",
    tech: [
      "Next.js",
      "Node.js",
      "LLM Integration",
      "RAG",
      "Recommendations",
      "Prompt Engineering",
      "Caching",
    ],
    url: "wallmantra.com",
    liveUrl: "https://wallmantra.com/",
  },
  {
    slug: "portfolio",
    kicker: "Developer Portfolio Website",
    title: "Portfolio",
    description:
      "A production-grade personal portfolio built with Next.js, TypeScript, and Tailwind CSS, combining a monochrome design system with Lenis smooth scrolling and GSAP-driven motion — a scroll-pinned project showcase, a magnetic tech grid, and a themed circular wipe between light and dark.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Lenis", "React Bits"],
    url: "kaushikankit.vercel.app",
    liveUrl: "http://kaushikankit.vercel.app/",
  },
];
