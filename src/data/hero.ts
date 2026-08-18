export type AvailabilityStatus = "available" | "on-demand" | "not-available";

export interface HeroData {
  status: AvailabilityStatus;
  headline: string;
  roles: string[];
  description: string;
}

export const HERO: HeroData = {
  // Change status to "on-demand" (yellow) or "not-available" (red) to update the UI indicator
  status: "available",
  // The rotating word completes this line, so every role has to read cleanly
  // after "A Full-Stack & Gen AI —" hence single nouns rather than phrases.
  headline: "Hello! I'm Ankit Kaushik. A Full-Stack & Gen AI",
  roles: ["ENGINEER", "BUILDER", "DEVELOPER"],
  description:
    "I build production LLM applications — AI agents, RAG pipelines, and workflow automation — across Python, Next.js, and Node. I focus on turning real business problems into AI-assisted products, from natural-language product discovery to multi-step agent workflows.",
};
