/** One course inside a grouped entry, each with its own link. */
export type JourneyCourse = {
  name: string;
  /** Leave undefined to render the row without a link icon. */
  url?: string;
};

export type JourneyEntry = {
  id: string;
  period: string;
  title: string;
  /** Organisation, shown next to the mode with a separating dot. */
  org: string;
  mode: string;
  points: string[];
  /** Renders a link icon beside the title. Omit for entries with no link. */
  url?: string;
  /**
   * For entries covering several courses from one author — each row gets its
   * own link icon, so one card can hold three separately-linked courses.
   */
  courses?: JourneyCourse[];
};

export type JourneyTrack = {
  id: "experience" | "education" | "certification";
  tab: string;
  eyebrow: string;
  heading: [string, string];
  description: string;
  entries: JourneyEntry[];
};

export const JOURNEY: JourneyTrack[] = [
  {
    id: "experience",
    tab: "Experience",
    eyebrow: "My Journey",
    heading: ["Work", "Experience"],
    description:
      "A timeline of my professional experience shipping production LLM features — AI agents, retrieval pipelines, and workflow automation — alongside the platform work that keeps them fast and reliable.",
    entries: [
      {
        id: "exp-wallmantra",
        period: "May 2025 – Present",
        title: "Software Engineer",
        org: "Wallmantra",
        mode: "New Delhi",
        points: [
          'Built and shipped "Grace AI", an AI-assisted shopping layer that lets customers find products in natural language and get personalised recommendations across the catalog.',
          "Added LLM-powered customer support workflows that handle common queries automatically and keep responses consistent, reducing manual support load.",
          "Improved storefront performance, cutting page load times by ~25% through caching and query optimisation.",
          "Set up a modular, reusable service architecture with onboarding docs that helped new developers get productive faster.",
          "Worked with product, design, and growth teams to ship AI features that made products easier to discover and improved checkout.",
        ],
      },
      {
        id: "exp-amantya",
        period: "Mar 2025 – May 2025",
        title: "Software Engineer Intern",
        org: "Amantya Technologies",
        mode: "Onsite, Gurugram",
        points: [
          "Designed multi-step agent workflows that automated client request handling and reduced manual work for the operations team by ~40%.",
          "Built a structured logging and monitoring setup with automatic file rotation that significantly cut log storage and made issues easier to trace.",
          "Standardised log formats and error-tracing across services, making debugging and deployments faster and more reliable.",
        ],
      },
    ],
  },
  {
    id: "education",
    tab: "Education",
    eyebrow: "My Journey",
    heading: ["Education &", "Academics"],
    description:
      "My academic background, highlighting the foundational computer science knowledge and coursework that shapes how I approach engineering problems.",
    entries: [
      {
        id: "edu-mca",
        period: "Sep 2023 – May 2025",
        title: "Master of Computer Applications (MCA)",
        org: "Guru Gobind Singh Indraprastha University (GGSIPU), New Delhi",
        mode: "92%",
        points: [
          "Completed the MCA programme with 92%, focusing on advanced software engineering, data structures, and systems design.",
          "Former President of the CodeShaala Tech Society — led 5 events and mentored 30+ juniors.",
          "Solved 1000+ DSA problems and reached a 2150+ Leetcode rating, with a 139 world ranking in a contest.",
        ],
      },
      {
        id: "edu-bca",
        period: "Nov 2020 – Aug 2023",
        title: "Bachelor of Computer Applications (BCA)",
        org: "Guru Gobind Singh Indraprastha University (GGSIPU), New Delhi",
        mode: "90%",
        points: [
          "Completed the BCA programme with 90%, building the programming and computer science foundation for the MCA.",
          "Ranked 4899 worldwide out of ~7 lakh participants in the Naukri Young Turk competition.",
          "Participated in 3+ hackathons, leading the backend in each.",
        ],
      },
    ],
  },
  {
    id: "certification",
    tab: "Certification",
    eyebrow: "My Journey",
    heading: ["Certifications", "& Courses"],
    description:
      "Certifications and structured courses that formalise the tools I work with day to day, from frontend fundamentals to backend architecture.",
    entries: [
      {
        id: "cert-leetcode-guardian",
        period: "Sept 2025 – Present",
        title: "Leetcode Guardian",
        org: "Leetcode",
        mode: "Top competitive rating badge",
        url: "https://leetcode.com/medal/?showImg=0&id=10299068&isLevel=false",
        points: [
          "Guardian badge, awarded to the top percentile of contest participants — 2150+ rating with a 139 world ranking in a contest.",
          "Solved 1000+ DSA problems across arrays, graphs, dynamic programming, and system-design-adjacent problem sets.",
        ],
      },
      {
        id: "cert-namaste-dev",
        // TODO: replace with the actual completion period.
        period: "Jan 2025 - Aug 2026",
        title: "Namaste React, Node & DSA",
        org: "NamasteDev — Akshay Saini",
        mode: "3 Certificates",
        points: [
          "Namaste React: Mastered React internals, building scalable frontend architectures, state management, and modern hooks in-depth.",
          "Namaste Node: Built robust backend systems, diving deep into the V8 engine, asynchronous programming, event loop, and RESTful API design.",
          "Namaste DSA: Solidified algorithmic thinking by solving complex problems, focusing on arrays, trees, dynamic programming, and space-time complexity analysis.",
        ],
        // TODO: paste each course's certificate/course URL — a row without a
        // `url` simply renders with no link icon.
        courses: [
          { name: "Namaste DSA", url: "https://media.licdn.com/dms/image/v2/D562DAQHw-J5Na8a77A/profile-treasury-image-shrink_1920_1920/B56aAQzYzPHAAg-/0/1786988301756?e=1787594400&v=beta&t=dt9DFHCsG4TOwKJlTohGFPHDso6cXKhRFm2qTeUMAZg" },
          { name: "Namaste Node", url: "https://media.licdn.com/dms/image/v2/D562DAQFNnSOKpkh_VA/profile-treasury-image-shrink_1920_1920/profile-treasury-image-shrink_1920_1920/0/1728107772180?e=1787594400&v=beta&t=FSS3tWapU7WUag165aIXQiOwq8GAtGoatrE7K2l6tHk" },
          { name: "Namaste React", url: "https://media.licdn.com/dms/image/v2/D562DAQHHef2AARgx-w/profile-treasury-image-shrink_1280_1280/profile-treasury-image-shrink_1280_1280/0/1732298657416?e=1787594400&v=beta&t=ANDutIdIuO8AEkwFffbGu3NrNrDwBnEcRFjrmRb2UjY" },
        ],
      },
      {
        id: "cert-meta",
        // TODO: replace with the actual issue date from your certificate.
        period: "Sept 2022 - Feb 2023",
        title: "Meta Front-End Developer Specialization",
        org: "Meta",
        mode: "Verified Certificate",
        url: "https://www.coursera.org/account/accomplishments/specialization/certificate/G6KTCUL8UQQW",
        points: [
          "Gained hands-on experience building interactive user interfaces with React, managing state, and utilizing modern hooks.",
          "Mastered responsive web design principles using HTML5, CSS3, and modern layout techniques like Flexbox and Grid.",
          "Developed proficiency in version control with Git and GitHub, understanding branching, merging, and collaborative workflows.",
          "Learned frontend engineering best practices including accessibility, UI/UX design fundamentals, and comprehensive testing.",
        ],
      },
    ],
  },
];
