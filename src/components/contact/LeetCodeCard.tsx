import { SiLeetcode } from "react-icons/si";
import Card from "../ui/Card";
import { CONTACT } from "@/data/contact";

// 11 rows x 22 columns heatmap data matching 11-row grid
const HEATMAP_PATTERN: string[][] = [
  // cols 0..3: space under LeetCode logo
  ["", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", ""],

  // cols 4..7: '4'
  ["", "", "lc-hot", "lc-mid", "lc-hot", "lc-hot", "lc-mid", "lc-low", "", "", ""],
  ["", "", "", "", "lc-mid", "lc-hot", "", "", "", "", ""],
  ["", "lc-hot", "lc-hot", "lc-hot", "lc-hot", "lc-hot", "lc-hot", "lc-hot", "lc-mid", "", ""],
  ["", "lc-mid", "lc-hot", "lc-hot", "lc-hot", "lc-hot", "lc-mid", "lc-low", "", "", ""],

  // col 8: spacer
  ["", "", "", "", "", "", "", "", "", "", ""],

  // cols 9..12: '8' / '5'
  ["", "lc-hot", "lc-hot", "lc-hot", "lc-hot", "lc-hot", "lc-hot", "lc-hot", "lc-mid", "", ""],
  ["", "lc-hot", "lc-hot", "", "lc-hot", "", "lc-hot", "lc-hot", "", "", ""],
  ["", "lc-hot", "lc-hot", "lc-hot", "lc-hot", "lc-hot", "lc-hot", "lc-hot", "lc-mid", "", ""],
  ["", "", "", "", "", "", "", "", "", "", ""],

  // cols 13..16: '0'
  ["", "lc-hot", "lc-hot", "lc-hot", "lc-hot", "lc-hot", "lc-hot", "lc-hot", "lc-mid", "", ""],
  ["", "lc-hot", "lc-hot", "", "", "", "lc-hot", "lc-hot", "", "", ""],
  ["", "lc-hot", "lc-hot", "", "", "", "lc-hot", "lc-hot", "", "", ""],
  ["", "lc-hot", "lc-hot", "lc-hot", "lc-hot", "lc-hot", "lc-hot", "lc-hot", "lc-mid", "", ""],

  // cols 17..21: activity columns
  ["", "", "", "lc-mid", "lc-hot", "", "lc-low", "", "", "", ""],
  ["", "lc-low", "", "lc-mid", "", "lc-hot", "", "lc-low", "", "", ""],
  ["", "", "lc-hot", "", "lc-low", "", "lc-mid", "", "lc-hot", "", ""],
  ["", "lc-mid", "lc-low", "", "lc-hot", "", "", "lc-mid", "", "", ""],
  ["", "", "", "lc-low", "", "lc-mid", "", "", "lc-low", "", ""],
];

export default function LeetCodeCard({ className = "" }: { className?: string }) {
  return (
    <Card variant="glass" className={`relative flex flex-col justify-between gap-6 overflow-hidden p-5 ${className}`}>
      {/* Scoped styles for the LeetCode heatmap grid */}
      <style>{`
        .lc-heatmap {
          display: grid;
          grid-template-rows: repeat(11, minmax(0, 1fr));
          grid-auto-flow: column;
          grid-auto-columns: minmax(0, 1fr);
          gap: 3px;
          position: absolute;
          inset: 0;
          padding: 6px;
          pointer-events: none;
          overflow: hidden;
        }
        .lc-cell {
          aspect-ratio: 1 / 1;
          border-radius: 1px;
          background-color: var(--color-fg, #fafafa);
          opacity: 0.2;
        }
        .lc-cell.lc-low {
          opacity: 0.40;
        }
        .lc-cell.lc-mid {
          opacity: 0.60;
        }
        .lc-cell.lc-hot {
          opacity: 0.80;
        }
      `}</style>

      {/* Background Heatmap */}
      <div
        className="lc-heatmap rounded-2xl"
        aria-hidden="true"
        style={{ opacity: 0.45 }}
      >
        {HEATMAP_PATTERN.map((col, colIdx) =>
          col.map((intensity, rowIdx) => (
            <div
              key={`${colIdx}-${rowIdx}`}
              className={`lc-cell ${intensity}`}
            />
          ))
        )}
      </div>

      {/* Top: LeetCode Logo */}
      <div className="relative z-10">
        <SiLeetcode size={38} className="text-fg" aria-hidden />
      </div>

      {/* Bottom: Profile Link Pill */}
      <div className="relative z-10">
        <a
          href={CONTACT.leetcode.url}
          target="_blank"
          rel="noreferrer"
          className="cursor-target block w-full truncate rounded-lg border border-line bg-bg/70 px-3 py-2 text-center text-[0.7rem] text-muted backdrop-blur transition-colors hover:text-fg hover:bg-bg/90"
        >
          {CONTACT.leetcode.label}
        </a>
      </div>
    </Card>
  );
}
