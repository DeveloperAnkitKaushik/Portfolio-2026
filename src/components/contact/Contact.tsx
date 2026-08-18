import BracketFrame from "../ui/BracketFrame";
import ContactThreads from "./ContactThreads";
import Card from "../ui/Card";
import EmailCard from "./EmailCard";
import GithubCard from "./GithubCard";
import LinkedInCard from "./LinkedInCard";
import LeetCodeCard from "./LeetCodeCard";
import ProfileCard from "./ProfileCard";
import { CONTACT } from "@/data/contact";

/**
 * Contact bento.
 *
 * Not a row-aligned grid — the tiles in each column don't line up with their
 * neighbours, so this is three independent stacks (3 / 6 / 3 of twelve) that
 * each distribute their own height. The portrait and the LinkedIn tile take the
 * slack in their columns, which is what keeps the outer edges flush.
 */
export default function Contact() {
  // `overflow-x-clip` contains the threads' full-bleed layer: it's sized in
  // `vw`, which counts the vertical scrollbar's width, so centring it pushes a
  // little past both edges and the page picks up a horizontal scrollbar. `clip`
  // rather than `hidden` — hidden would make this a scroll container and break
  // any sticky descendant.
  return (
    <section
      id="contact"
      className="relative isolate overflow-x-clip pb-20 pt-8"
      aria-label="Get in touch"
    >
      <div className="maincontainer relative z-10">
        {/*
          Threads are anchored to the grid's own box rather than the section's:
          the section is padded unevenly (pt-8 vs pb-20) and carries a footer
          line, so centring on it drops the threads below the tiles.

          `isolate` on the section keeps this z-0/z-10 pair from competing with
          the fixed chrome (cursor, menu, progress bar).
        */}
        <div className="relative">
          <ContactThreads />

          <div className="relative z-10 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
            {/* Left: heading over the portrait. */}
            <div className="flex flex-col gap-4 lg:col-span-3">
              <BracketFrame className="cursor-target flex w-full items-center justify-center py-3">
                <h2 className="text-center text-2xl font-black uppercase leading-[1.1] tracking-tight">
                  Get in
                  <br />
                  Touch
                </h2>
              </BracketFrame>
              <ProfileCard className="flex-1" />
            </div>

            {/* Middle: email, GitHub, then the closing line. */}
            <div className="flex flex-col gap-4 lg:col-span-6">
              <EmailCard />
              <GithubCard className="flex-1" />
              <Card variant="glass" className="grid place-items-center px-6 py-7">
                <p className="max-w-md text-center text-base leading-snug tracking-tight sm:text-lg">
                  {CONTACT.tagline}
                </p>
              </Card>
            </div>

            {/* Right: the two profile tiles. */}
            <div className="flex flex-col gap-4 lg:col-span-3">
              <LinkedInCard className="flex-1" />
              <LeetCodeCard />
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-[0.75rem] text-muted">
          &copy; {new Date().getFullYear()} {CONTACT.name}
        </p>
      </div>
    </section>
  );
}
