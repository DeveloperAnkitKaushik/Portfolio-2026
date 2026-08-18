import { FiExternalLink, FiGithub } from "react-icons/fi";
import Button from "../ui/Button";
import Tag from "../ui/Tag";
import BrowserFrame from "../ui/BrowserFrame";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
  total: number;
  priority?: boolean;
};

export default function ProjectCard({ project, index, total, priority }: ProjectCardProps) {
  return (
    <article className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="flex flex-col items-start">
        <p className="border-b border-fg/70 pb-1.5 text-[0.8rem] font-semibold tracking-tight">
          {project.kicker}
        </p>

        <h3 className="mt-6 text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl">
          {project.title}
        </h3>

        <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.liveUrl ? (
            <Button
              as="a"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              size="sm"
              icon={<FiExternalLink size={14} />}
            >
              Live Demo
            </Button>
          ) : null}
          {project.repoUrl ? (
            <Button
              as="a"
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              size="sm"
              icon={<FiGithub size={14} />}
            >
              View Code
            </Button>
          ) : null}

          <span className="ml-2 select-none font-semibold leading-none text-muted/50">
            <span className="text-3xl">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-sm">/{String(total).padStart(2, "0")}</span>
          </span>
        </div>
      </div>

      <BrowserFrame
        url={project.url}
        src={project.image}
        alt={`${project.title} screenshot`}
        priority={priority}
      />
    </article>
  );
}
