"use client";

import { StaggeredMenu } from "./reactbits/StaggeredMenu";
import { useTheme } from "./ThemeProvider";
import { CONTACT } from "@/data/contact";

// Every link must match a section id that actually exists on the page — an
// "Expertise" item used to sit here pointing at #expertise, which no section
// has, so clicking it did nothing.
const menuItems = [
  { label: "Home", ariaLabel: "Go to the top of the page", link: "#home" },
  { label: "Projects", ariaLabel: "Browse my projects", link: "#projects" },
  { label: "Tech Stack", ariaLabel: "See my tech stack", link: "#skills" },
  { label: "Experience", ariaLabel: "Read my experience", link: "#experience" },
  { label: "Contact", ariaLabel: "Get in touch", link: "#contact" },
];

// Sourced from CONTACT so the handles live in one place — the contact bento
// and this menu can't drift apart.
const socialItems = [
  { label: "GitHub", link: CONTACT.github.url },
  { label: "LinkedIn", link: CONTACT.linkedin.url },
  { label: "Leetcode", link: CONTACT.leetcode.url },
];

export default function Nav() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <StaggeredMenu
      isFixed
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials
      displayItemNumbering
      displayLogo={false}
      // Prelayers are the sheets that stagger in ahead of the panel, so they
      // need to read as steps toward the panel colour in either theme.
      colors={isDark ? ["#2a2a2a", "#1a1a1a"] : ["#dcdcd6", "#e9e9e4"]}
      accentColor={isDark ? "#8b8b8b" : "#6b6b6b"}
      menuButtonColor={isDark ? "#fafafa" : "#111111"}
      openMenuButtonColor={isDark ? "#fafafa" : "#111111"}
      changeMenuColorOnOpen={false}
    />
  );
}
