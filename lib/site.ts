export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const SITE_URL = "https://www.swawebhub.com";

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Web Design", href: "/services/web-design" },
      { label: "Web Development", href: "/services/web-development" },
      { label: "SEO Website", href: "/services/seo-website" },
    ],
  },
  { label: "About Us", href: "/about" },
  {
    label: "Blog",
    href: "/blog",
    children: [
      { label: "All Articles", href: "/blog" },
      { label: "Blog Details", href: "/blog/1" },
    ],
  },
  {
    label: "Case Status",
    href: "/case-status",
    children: [
      { label: "Track Cases", href: "/case-status" },
      { label: "Case Details", href: "/case-status/1" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export type ServiceProcess = { e: string; t: string; d: string };
export type Service = {
  id: string;
  slug: string;
  emoji: string;
  title: string;
  tagline: string;
  desc: string;
  hero: string;
  features: { e: string; t: string; d: string }[];
  work: { e: string; t: string; d: string }[];
  tools?: string[];
  process: ServiceProcess[];
  deliverables: string[];
  faqs: { q: string; a: string }[];
  pricing: { name: string; price: string; period: string; blurb: string; features: string[]; featured?: boolean }[];
};

export const services: Service[] = [
  {
    id: "web-design",
    slug: "web-design",
    emoji: "🎨",
    title: "Web Design",
    tagline: "Pixel-perfect interfaces that convert",
    desc: "Pixel-perfect, conversion-focused designs crafted around your brand and audience.",
    hero: "We design websites that look premium and guide visitors to act — blending brand identity, UX research, and conversion strategy into every screen.",
    features: [
      { e: "🎯", t: "Conversion-led UX", d: "Every layout is mapped to a clear user journey and business goal." },
      { e: "🖌️", t: "Brand-native UI", d: "Custom design systems that feel unmistakably yours." },
      { e: "📱", t: "Responsive by default", d: "Flawless experiences across phone, tablet, and desktop." },
      { e: "🧩", t: "Design systems", d: "Reusable components that keep future work fast and consistent." },
      { e: "♿", t: "Accessible", d: "WCAG-minded contrast, focus states, and hierarchy." },
      { e: "⚡", t: "Prototyped", d: "Clickable Figma prototypes you can review before build." },
    ],
    work: [
      { e: "🧭", t: "UX / UI design", d: "User journeys, wireframes, and polished interfaces that convert." },
      { e: "🖱️", t: "Interactive prototypes", d: "Clickable Figma prototypes for realistic feedback before build." },
      { e: "🪪", t: "Logo & brand design", d: "Logos, color systems, and brand guidelines that scale." },
      { e: "✒️", t: "Figma", d: "Component-based design files, design tokens, and dev handoff." },
    ],
    tools: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "Adobe XD"],
    process: [
      { e: "🔍", t: "Discover", d: "We audit your brand, audience, and competitors to set direction." },
      { e: "🧠", t: "Wireframe", d: "Low-fidelity flows validate structure before visuals." },
      { e: "🎨", t: "Visual design", d: "High-fidelity UI in Figma with your brand applied." },
      { e: "🖱️", t: "Prototype", d: "Clickable prototype for realistic feedback and testing." },
      { e: "🤝", t: "Handoff", d: "Organized, dev-ready files handed to engineering." },
    ],
    deliverables: ["Figma design file", "Clickable prototype", "Design system & tokens", "Responsive layouts", "Asset export kit"],
    faqs: [
      { q: "Do you design and build?", a: "Yes. We can design only, or hand off to our development team for a seamless build." },
      { q: "How many revisions are included?", a: "Our design packages include two rounds of revisions; extra rounds are billed at an hourly rate." },
      { q: "Will it be responsive?", a: "Always. Every design is built mobile-first and tested across breakpoints." },
    ],
    pricing: [
      { name: "Design Starter", price: "$790", period: "/ project", blurb: "A polished single-page design to get launched.", features: ["1-page design", "1 brand moodboard", "2 revisions", "Figma source"], featured: false },
      { name: "Design Growth", price: "$1,790", period: "/ project", blurb: "Multi-page design system for growing brands.", features: ["Up to 6 pages", "Design system", "Responsive kit", "3 revisions", "Prototype"], featured: true },
      { name: "Design Scale", price: "Custom", period: "quote", blurb: "Full product design partnership.", features: ["Unlimited pages", "Design system + docs", "User research", "Ongoing retainer"], featured: false },
    ],
  },
  {
    id: "web-development",
    slug: "web-development",
    emoji: "💻",
    title: "Web Development",
    tagline: "Fast, scalable Next.js engineering",
    desc: "Fast, scalable Next.js builds with clean architecture and modern tooling.",
    hero: "We engineer modern web apps with Next.js and Tailwind — typed, tested, and tuned for Core Web Vitals so your site is fast and easy to maintain.",
    features: [
      { e: "⚡", t: "Blazing performance", d: "Core Web Vitals optimized via Next.js App Router and edge delivery." },
      { e: "🔒", t: "Typed & tested", d: "TypeScript end-to-end with component and integration tests." },
      { e: "🧱", t: "Clean architecture", d: "Maintainable code your team can extend with confidence." },
      { e: "🔌", t: "Integrations", d: "CMS, payments, email, and analytics wired in securely." },
      { e: "📈", t: "SEO-ready", d: "Semantic HTML, metadata, and structured data baked in." },
      { e: "🚀", t: "CI/CD deploy", d: "Automated builds and zero-downtime deployments." },
    ],
    work: [
      { e: "🔧", t: "Plugin editing & custom plugins", d: "Modify, extend, or build custom WordPress plugins to fit your needs." },
      { e: "🧱", t: "Custom WordPress", d: "Bespoke themes and WordPress builds tailored to your brand." },
      { e: "🛒", t: "WooCommerce", d: "Stores, custom product flows, and payment gateway integration." },
      { e: "⚡", t: "Next.js & headless", d: "Fast, modern front-ends with APIs and headless CMS." },
    ],
    tools: ["WordPress", "WooCommerce", "PHP", "Next.js", "React", "TypeScript"],
    process: [
      { e: "📐", t: "Plan", d: "We translate designs into a technical architecture and milestones." },
      { e: "🧱", t: "Build", d: "Component-driven development with shared design tokens." },
      { e: "🧪", t: "QA", d: "Cross-device testing, accessibility, and performance audits." },
      { e: "🚀", t: "Launch", d: "Production deploy with monitoring and analytics." },
      { e: "🔧", t: "Support", d: "30 days post-launch support and iteration." },
    ],
    deliverables: ["Next.js codebase", "CMS integration", "CI/CD pipeline", "Performance report", "Handover docs"],
    faqs: [
      { q: "What stack do you use?", a: "Next.js (App Router), React, TypeScript, and Tailwind CSS, deployed on Vercel or your host." },
      { q: "Can you work with our existing site?", a: "Yes. We can refactor, migrate, or extend most modern codebases." },
      { q: "Do you provide hosting?", a: "We set up and configure hosting and can manage it under a care plan." },
    ],
    pricing: [
      { name: "Dev Starter", price: "$1,490", period: "/ project", blurb: "A fast marketing site built from your design.", features: ["Up to 5 pages", "CMS-ready", "Basic SEO", "1-week delivery"], featured: false },
      { name: "Dev Growth", price: "$3,490", period: "/ project", blurb: "Full Next.js build with integrations.", features: ["Up to 12 pages", "CMS + forms", "Advanced SEO", "Analytics", "2-week delivery"], featured: true },
      { name: "Dev Scale", price: "Custom", period: "quote", blurb: "Web apps and platforms.", features: ["Custom app", "Auth & APIs", "Integrations", "Dedicated support"], featured: false },
    ],
  },
  {
    id: "seo-website",
    slug: "seo-website",
    emoji: "🚀",
    title: "SEO Website",
    tagline: "Rank, load fast, and convert",
    desc: "Search-optimized sites engineered to rank, load instantly, and convert.",
    hero: "We build SEO into the foundation — technical structure, content, and performance — so your site earns visibility and turns traffic into customers.",
    features: [
      { e: "🧭", t: "Keyword strategy", d: "Research-driven targeting of terms that actually convert." },
      { e: "🛠️", t: "Technical SEO", d: "Crawlability, sitemaps, schema, and Core Web Vitals." },
      { e: "📝", t: "Content", d: "SEO-aware copy and structure that serves users and bots." },
      { e: "🔗", t: "Authority", d: "Internal linking and off-page recommendations." },
      { e: "📊", t: "Analytics", d: "Tracking, Search Console, and clear reporting." },
      { e: "🔁", t: "Ongoing growth", d: "Monthly tuning based on real performance data." },
    ],
    work: [
      { e: "📄", t: "On-page SEO", d: "Title tags, meta, headings, internal links, and content optimization." },
      { e: "🔗", t: "Off-page SEO", d: "Link building, digital PR, and authority signals that lift rankings." },
      { e: "🛠️", t: "Technical SEO", d: "Crawl, index, site speed, and structured data (schema)." },
      { e: "📊", t: "Local & analytics", d: "Google Business Profile, Search Console, and conversion tracking." },
    ],
    tools: ["Google Search Console", "Google Analytics", "Ahrefs", "Screaming Frog", "SEMrush"],
    process: [
      { e: "🔎", t: "Audit", d: "We benchmark technical health, content, and rankings." },
      { e: "🗺️", t: "Strategy", d: "Keyword map and prioritized action plan." },
      { e: "🛠️", t: "Implement", d: "On-page, technical, and structured-data fixes." },
      { e: "✍️", t: "Content", d: "Optimized pages and blog cadence." },
      { e: "📈", t: "Grow", d: "Measure, report, and iterate monthly." },
    ],
    deliverables: ["SEO audit report", "Keyword map", "Optimized pages", "Schema markup", "Monthly report"],
    faqs: [
      { q: "How long until I see results?", a: "Technical fixes show quickly; rankings typically improve over 2–4 months of consistent work." },
      { q: "Do you guarantee #1 rankings?", a: "No ethical agency does. We guarantee a rigorous, data-led process and transparent reporting." },
      { q: "Is this included with a build?", a: "Yes — every SWAWEBHUB build ships with foundational SEO at no extra cost." },
    ],
    pricing: [
      { name: "SEO Starter", price: "$490", period: "/ mo", blurb: "Foundational optimization for a new site.", features: ["Technical audit", "On-page setup", "Schema", "Monthly report"], featured: false },
      { name: "SEO Growth", price: "$990", period: "/ mo", blurb: "Active growth for competitive niches.", features: ["Everything in Starter", "Content plan", "Link building", "Bi-weekly calls"], featured: true },
      { name: "SEO Scale", price: "Custom", period: "quote", blurb: "Enterprise SEO retainer.", features: ["Multiple sites", "Dedicated SEO", "CRO testing", "Quarterly strategy"], featured: false },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const footerPages = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Case Status", href: "/case-status" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];
