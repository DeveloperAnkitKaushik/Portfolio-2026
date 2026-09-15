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
    slug: "headsup",
    kicker: "Multi-Agent AI Investigation Platform for Early Product Safety Signals",
    title: "HeadsUp",
    description:
      "Open-source multi-agent platform that investigates web data across reviews, forums, and regulators to detect early product-safety risks before official recalls.",
    tech: [
      "LangGraph",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "Next.js",
      "TypeScript",
      "Docker",
    ],
    url: "headsup.ankitkaushik.in",
    liveUrl: "https://headsup.ankitkaushik.in/",
    repoUrl: "https://github.com/DeveloperAnkitKaushik/headsup",
    image: "/projects/headsup.png",
  },
  {
    slug: "orange",
    kicker: "Cost-Aware Model Routing Gateway for LLM Applications",
    title: "Orange",
    description:
      "OpenAI-compatible inference gateway that routes queries to the cheapest capable model using embedding scoring, semantic caching, and budget-aware failover.",
    tech: [
      "Python",
      "FastAPI",
      "LangChain",
      "FAISS",
      "Ollama",
      "OpenAI API",
      "Embeddings",
      "Docker",
    ],
    url: "orange.ankitkaushik.in",
    liveUrl: "https://orange.ankitkaushik.in/",
    repoUrl: "https://github.com/DeveloperAnkitKaushik/orange",
    image: "/projects/orange.png",
  },
  {
    slug: "akmovies",
    kicker: "Movie & TV Streaming Platform",
    title: "AKMovies",
    description:
      "Production-grade movie and TV streaming platform with intelligent content discovery, optimized API delivery, and a high-performance Next.js architecture.",
    tech: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Firebase",
      "Scraping & Mapping",
      "FFmpeg",
      "Vercel",
    ],
    url: "akmovies.ankitkaushik.in",
    liveUrl: "https://akmovies.ankitkaushik.in/",
    image: "/projects/akmovies.png",
  },
];
