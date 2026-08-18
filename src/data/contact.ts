export const CONTACT = {
  name: "Ankit Kaushik",
  role: "Full-Stack & Gen AI Engineer",
  initials: "AK",
  email: "DeveloperAnkitKaushik@gmail.com",
  /** Optional black-and-white portrait under /public, e.g. "/me.jpg". */
  photo: "/contact/me.png",
  github: {
    handle: "DeveloperAnkitKaushik",
    url: "https://github.com/DeveloperAnkitKaushik",
  },
  linkedin: {
    label: "linkedin.com/in/ankitkaushik",
    url: "https://www.linkedin.com/in/ankitkaushik",
  },
  leetcode: {
    label: "leetcode.com/u/ankit_kaushik",
    url: "https://leetcode.com/u/ankit_kaushik",
  },
  tagline: "Let's connect and build something amazing together.",
};

export type PinnedRepo = { name: string; description: string };

/** Shown in the scrolling marquee on the GitHub card. */
export const PINNED_REPOS: PinnedRepo[] = [
  { name: "LLMRouter", description: "Cost-Aware Model Routing Gateway" },
  { name: "SemCache", description: "Semantic Caching Layer for LLMs" },
  { name: "Portfolio", description: "Developer Portfolio Website" },
  { name: "Grace AI", description: "AI-Assisted Shopping Layer" },
];
