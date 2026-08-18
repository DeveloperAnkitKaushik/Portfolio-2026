"use client";

import { useEffect, useRef, useState } from "react";
import { FiCheck, FiCopy, FiMail } from "react-icons/fi";
import Card from "../ui/Card";
import { CONTACT } from "@/data/contact";

export default function EmailCard() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked by permissions; the address is still selectable.
    }
  };

  return (
    <Card variant="glass" className="flex items-center gap-4 px-6 py-5">
      <FiMail size={22} className="shrink-0 text-fg" aria-hidden />

      <a
        href={`mailto:${CONTACT.email}`}
        className="min-w-0 flex-1 truncate text-lg tracking-tight text-fg no-underline sm:text-xl"
      >
        {CONTACT.email}
      </a>

      <button
        onClick={copy}
        aria-label={copied ? "Email copied" : "Copy email address"}
        className="cursor-target grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-bg/40 text-muted transition-colors hover:text-fg"
      >
        {copied ? <FiCheck size={15} /> : <FiCopy size={15} />}
      </button>
    </Card>
  );
}
