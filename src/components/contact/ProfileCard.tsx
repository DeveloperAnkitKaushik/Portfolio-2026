import Image from "next/image";
import Card from "../ui/Card";
import { CONTACT } from "@/data/contact";

export default function ProfileCard({ className = "" }: { className?: string }) {
  return (
    <Card variant="glass" className={`group relative flex min-h-72 flex-col ${className}`}>
      <Image
        src="/contact/contact-ankit-bg.jpg"
        alt="Profile Background"
        fill
        className="pointer-events-none object-cover opacity-30"
      />

      <div className="relative z-10 px-5 py-4 text-center">
        <p className="text-2xl font-black uppercase leading-[1.05] tracking-tight sm:text-[1.7rem]">
          {CONTACT.name}
        </p>
        <p className="mt-2 text-[0.78rem] text-white">{CONTACT.role}</p>
      </div>

      <div className="relative flex-1">
        {CONTACT.photo ? (
          <Image
            src={CONTACT.photo}
            alt={CONTACT.name}
            fill
            sizes="(max-width: 1024px) 100vw, 25vw"
            // Monochrome keeps the portrait in the same register as the rest, but reveals color on hover.
            className="object-cover object-top grayscale transition-[filter] duration-500 ease-in-out group-hover:grayscale-0"
          />
        ) : (
          <div className="grid h-full place-items-center border-t border-line bg-bg/40">
            <span className="text-5xl font-black tracking-tight text-fg/15">
              {CONTACT.initials}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
