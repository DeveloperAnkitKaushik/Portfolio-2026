import type { IconType } from "react-icons";
import {
  SiAnthropic,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGooglegemini,
  SiHtml5,
  SiHuggingface,
  SiJavascript,
  SiJsonwebtokens,
  SiLangchain,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiN8N,
  SiNextdotjs,
  SiNodedotjs,
  SiOllama,
  SiOpenjdk,
  SiPostman,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

export type StackItem = { name: string; Icon: IconType };

/**
 * Every logo comes from Simple Icons via react-icons, which ships them as
 * single-path SVGs drawn in `currentColor` — that's what lets the whole grid
 * flip between white and black with the theme without a second icon set.
 *
 * AI/LLM tooling leads the grid, since that's the work this portfolio is
 * pointed at. Ordered by group: AI, languages, frontend, backend, then infra.
 */
export const STACK: StackItem[] = [
  // AI / LLM
  { name: "LangChain", Icon: SiLangchain },
  { name: "Ollama", Icon: SiOllama },
  { name: "Hugging Face", Icon: SiHuggingface },
  { name: "Anthropic", Icon: SiAnthropic },
  { name: "Gemini", Icon: SiGooglegemini },
  { name: "n8n", Icon: SiN8N },

  // Languages
  { name: "Python", Icon: SiPython },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "C++", Icon: SiCplusplus },
  { name: "Java", Icon: SiOpenjdk },

  // Frontend
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "HTML5", Icon: SiHtml5 },
  { name: "CSS", Icon: SiCss },

  // Backend
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express", Icon: SiExpress },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "MySQL", Icon: SiMysql },
  { name: "JWT", Icon: SiJsonwebtokens },
  { name: "Firebase", Icon: SiFirebase },

  // Infra & tooling
  { name: "Docker", Icon: SiDocker },
  { name: "GitHub Actions", Icon: SiGithubactions },
  { name: "Git", Icon: SiGit },
  { name: "GitHub", Icon: SiGithub },
  { name: "Linux", Icon: SiLinux },
  { name: "Vercel", Icon: SiVercel },
  { name: "Postman", Icon: SiPostman },
  { name: "Figma", Icon: SiFigma },
];
