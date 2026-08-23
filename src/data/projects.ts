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
    slug: "orange",
    kicker: "Cost-Aware Model Routing Gateway for LLM Applications",
    title: "Orange",
    description:
      "A LLMRouter & OpenAI-compatible inference gateway that intelligently routes requests to the cheapest capable AI model using local embedding-based complexity scoring, semantic caching, and budget-aware failover—optimizing cost without compromising response quality.",
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
    image: "/projects/graceai.png",
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
