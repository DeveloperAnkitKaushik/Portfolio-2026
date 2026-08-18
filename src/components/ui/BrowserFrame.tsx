import Image from "next/image";

type BrowserFrameProps = {
  /** Shown in the address pill. */
  url: string;
  src?: string;
  alt: string;
  priority?: boolean;
};

const DOTS = ["#ff5f57", "#febc2e", "#28c840"];

/**
 * Browser chrome around a project screenshot — traffic lights, an address
 * pill, and the shot itself. Falls back to an empty frame when there's no
 * image yet, so the layout is right before the screenshots exist.
 */
export default function BrowserFrame({ url, src, alt, priority }: BrowserFrameProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-line bg-panel shadow-2xl">
      <div className="relative flex items-center gap-2 border-b border-line px-4 py-3">
        <div className="flex gap-1.5">
          {DOTS.map((color) => (
            <span
              key={color}
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 rounded-md bg-card px-3 py-1 text-[0.65rem] text-muted">
          {url}
        </span>
      </div>

      <div className="relative aspect-[16/10] w-full bg-card">
        {src ? (
          <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority={priority} />
        ) : (
          <div className="grid h-full place-items-center text-[0.7rem] uppercase tracking-[0.2em] text-muted">
            Screenshot pending
          </div>
        )}
      </div>
    </div>
  );
}
