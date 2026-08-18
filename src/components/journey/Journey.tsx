"use client";

import { useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import Timeline from "./Timeline";
import JourneyTab from "./JourneyTab";
import { JOURNEY } from "@/data/journey";

export default function Journey() {
  const [activeId, setActiveId] = useState(JOURNEY[0].id);
  const track = JOURNEY.find((t) => t.id === activeId) ?? JOURNEY[0];

  return (
    <section id="experience" className="pb-32" aria-label="Experience and education">
      <div className="flex justify-center py-10">
        <div role="tablist" aria-label="Journey" className="flex items-center gap-4 sm:gap-7">
          {JOURNEY.map((item) => (
            <JourneyTab
              key={item.id}
              label={item.tab}
              isActive={item.id === activeId}
              onSelect={() => setActiveId(item.id)}
              controls={`journey-panel-${item.id}`}
            />
          ))}
        </div>
      </div>

      <div
        className="maincontainer"
        id={`journey-panel-${track.id}`}
        role="tabpanel"
        aria-labelledby={`journey-tab-${track.id}`}
      >
        {/* Keyed so switching tracks remounts the panel and replays its entrance. */}
        <div key={track.id} className="animate-[journey-in_450ms_ease-out]">
          <SectionHeading
            eyebrow={track.eyebrow}
            title={
              <>
                {track.heading[0]}
                <br />
                {track.heading[1]}
              </>
            }
            description={track.description}
          />

          <Timeline entries={track.entries} />
        </div>
      </div>
    </section>
  );
}
