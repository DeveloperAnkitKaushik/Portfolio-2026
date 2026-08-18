import { CONTACT } from "@/data/contact";

/**
 * Absolute origin of the deployed site. Every canonical URL, sitemap entry,
 * OG image and JSON-LD `@id` is built from this, so it must have no trailing
 * slash and must match the domain Search Console is verified against.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://ankitkaaushik.vercel.app";

export const SITE_NAME = "Ankit Kaushik";

export const SITE_TITLE = "Ankit Kaushik — Full-Stack & Gen AI Engineer";

export const SITE_DESCRIPTION =
  "Ankit Kaushik is a Full-Stack & Gen AI Engineer building production LLM applications — AI agents, RAG pipelines, and workflow automation across Python, Next.js, and Node. Portfolio, projects, experience and contact.";

/**
 * Every profile that also ranks for the name. Listing them as `sameAs` is what
 * lets Google merge this site with the GitHub/LinkedIn/LeetCode profiles into
 * one entity, which is the whole game for a "<name>" query.
 */
export const SAME_AS = [
  CONTACT.github.url,
  CONTACT.linkedin.url,
  CONTACT.leetcode.url,
];

/** Person + WebSite graph, injected once in the root layout. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Ankit Kaushik",
        alternateName: ["Ankit", "DeveloperAnkitKaushik"],
        url: SITE_URL,
        image: `${SITE_URL}${CONTACT.photo}`,
        jobTitle: CONTACT.role,
        description: SITE_DESCRIPTION,
        email: `mailto:${CONTACT.email}`,
        sameAs: SAME_AS,
        knowsAbout: [
          "Generative AI",
          "Large Language Models",
          "Retrieval-Augmented Generation",
          "AI Agents",
          "Full-Stack Development",
          "Next.js",
          "React",
          "Python",
          "Node.js",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: SITE_TITLE,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#person` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
}
