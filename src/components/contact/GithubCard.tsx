import { FiGithub } from "react-icons/fi";
import Card from "../ui/Card";
import { CONTACT, PINNED_REPOS, type PinnedRepo } from "@/data/contact";

function RepoChip({ repo }: { repo: PinnedRepo }) {
  return (
    <div className="w-56 shrink-0 rounded-xl border border-line bg-bg/40 px-4 py-3.5">
      <p className="truncate text-[0.82rem] font-semibold text-fg">{repo.name}</p>
      <p className="mt-1 text-[0.72rem] leading-snug text-muted">{repo.description}</p>
    </div>
  );
}

/**
 * Two marquee rows running opposite directions. The list is rendered twice so
 * the track can loop by translating exactly one copy's width.
 */
function MarqueeRow({ items, reverse }: { items: PinnedRepo[]; reverse?: boolean }) {
  return (
    <div className="flex w-max gap-3" data-marquee={reverse ? "reverse" : "forward"}>
      {[0, 1].map((copy) => (
        <div key={copy} className="flex gap-3" aria-hidden={copy === 1}>
          {items.map((repo) => (
            <RepoChip key={`${copy}-${repo.name}`} repo={repo} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function GithubCard({ className = "" }: { className?: string }) {
  const rowOne = PINNED_REPOS;
  const rowTwo = [...PINNED_REPOS].reverse();

  return (
    <Card variant="glass" className={`flex flex-col justify-center gap-5 px-5 py-5 ${className}`}>
      <div className="flex items-center gap-3">
        <FiGithub size={26} className="shrink-0 text-fg" aria-hidden />
        <a
          href={CONTACT.github.url}
          target="_blank"
          rel="noreferrer"
          className="min-w-0 flex-1 truncate text-base font-medium tracking-tight text-fg no-underline sm:text-lg"
        >
          github/{CONTACT.github.handle}
        </a>
        <a
          href={CONTACT.github.url}
          target="_blank"
          rel="noreferrer"
          className="cursor-target shrink-0 rounded-lg bg-fg px-4 py-2 text-[0.8rem] font-medium text-bg no-underline transition-opacity hover:opacity-90"
        >
          Follow
        </a>
      </div>

      {/* Edges fade out so chips dissolve rather than clipping at the border. */}
      <div
        className="flex flex-col gap-3 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <MarqueeRow items={rowOne} />
        <MarqueeRow items={rowTwo} reverse />
      </div>
    </Card>
  );
}
