export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const SITE_URL = "https://www.swawebhub.com";

export const contactEmail = "hello@swawebhub.com";
export const contactPhone = "+1 (555) 000-0000";

export const navItems: NavItem[] = [
  { label: "🏠 Home", href: "/" },
  {
    label: "🎨 Services",
    href: "/services",
    children: [
      { label: "🎨 Web Design", href: "/services/web-design" },
      { label: "💻 Web Development", href: "/services/web-development" },
      { label: "🚀 SEO Website", href: "/services/seo-website" },
    ],
  },
  { label: "👥 About Us", href: "/about" },
  { label: "🛠️ Technology", href: "/technology" },
  {
    label: "📁 Case Status",
    href: "/case-status",
    children: [
      { label: "📋 Track Cases", href: "/case-status" },
      { label: "📊 Case Details", href: "/case-status/1" },
    ],
  },
  { label: "💰 Pricing", href: "/pricing" },
  { label: "📧 Contact", href: "/contact" },
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
  pricingRows?: { feature: string; starter: string; professional: string; custom: string }[];
};

export const services: Service[] = [
  {
    id: "web-design",
    slug: "web-design",
    emoji: "🎨",
    title: "Web Design",
    tagline: "Pixel-perfect interfaces that convert",
    desc: "Conversion-focused web design crafted around your brand, audience, and business goals. We create responsive, accessible, and beautiful interfaces that turn visitors into customers.",
    hero: "We design premium websites that look stunning and drive action — blending brand identity, UX research, conversion strategy, and accessibility into every screen.",
    features: [
      { e: "🎯", t: "Conversion-led UX", d: "Every layout is mapped to a clear user journey and business goal using research-backed wireframes and heatmap analysis." },
      { e: "🖌️", t: "Brand-native UI", d: "Custom design systems with your colors, typography, and voice — so every touchpoint feels unmistakably yours." },
      { e: "📱", t: "Responsive by default", d: "Mobile-first designs tested across phone, tablet, and desktop breakpoints for pixel-perfect rendering everywhere." },
      { e: "🧩", t: "Scalable design systems", d: "Reusable components, tokens, and patterns that keep future iterations fast, consistent, and on-brand." },
      { e: "♿", t: "Accessible design", d: "WCAG 2.1 AA contrast ratios, focus states, and semantic structure so everyone can use your site." },
      { e: "⚡", t: "Interactive prototyping", d: "Clickable Figma prototypes with micro-interactions and transitions you can test before development." },
    ],
    work: [
      { e: "🧭", t: "UX research & strategy", d: "User journeys, personas, wireframes, and information architecture mapped to business outcomes." },
      { e: "🖱️", t: "Interactive prototyping", d: "High-fidelity Figma prototypes with real transitions for stakeholder approval before build." },
      { e: "🪪", t: "Brand identity design", d: "Logo systems, color palettes, typography scales, and brand guidelines that scale across channels." },
      { e: "✒️", t: "Visual design & UI", d: "Pixel-perfect interfaces in Figma with design tokens, variants, and developer handoff." },
      { e: "📐", t: "Design systems", d: "Component libraries with documented patterns for consistent, maintainable product design." },
    ],
    tools: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "Adobe XD", "Framer", "Maze"],
    process: [
      { e: "🔍", t: "Discover", d: "Brand audit, competitive analysis, stakeholder interviews, and user research to set creative direction." },
      { e: "🧠", t: "Wireframe", d: "Low-fidelity layouts validate structure, hierarchy, and user flows before visual design begins." },
      { e: "🎨", t: "Visual design", d: "High-fidelity UI in Figma with your brand applied, including micro-interactions and motion." },
      { e: "🖱️", t: "Prototype & test", d: "Clickable prototype for realistic feedback, usability testing, and stakeholder sign-off." },
      { e: "🤝", t: "Handoff", d: "Organized, annotated Figma files with design tokens and a structured component library." },
    ],
    deliverables: ["Figma design file", "Interactive prototype", "Design system & tokens", "Responsive layouts (desktop, tablet, mobile)", "Brand style guide", "Asset export kit (SVG, PNG, WebP)", "Developer handoff documentation"],
    faqs: [
      { q: "Do you design and build?", a: "Yes. We offer design-only or design-plus-build packages. Our design team handoffs cleanly to our development team for seamless execution." },
      { q: "How many revisions are included?", a: "All design packages include 2 rounds of revisions. Additional rounds are billed at ₹2,999/hour or included in our Custom plan." },
      { q: "Will my design be responsive?", a: "Always. We design mobile-first and test across 5+ breakpoints (320px to 1440px+) before handoff." },
      { q: "Do you provide brand identity design?", a: "Yes. Our Professional and Custom plans include logo design, color systems, and typography guidelines." },
      { q: "What file formats do you deliver?", a: "Figma source files, exported assets (SVG, PNG, WebP), and a documented design system with tokens." },
    ],
    pricing: [
      { name: "Design Starter", price: "₹5,999", period: "/ project", blurb: "A polished single-page design to get launched fast.", features: ["Up to 6 pages", "Basic UI/UX design", "Contact & social forms", "Google Maps integration", "Basic animations", "2 rounds of revisions", "15 days support"], featured: false },
      { name: "Design Professional", price: "₹11,999", period: "/ project", blurb: "Premium design system for growing brands ready to scale.", features: ["Up to 12 pages", "Premium UI/UX design", "Figma design system", "Advanced animations", "Premium prototyping", "SEO-friendly structure", "5 rounds of revisions", "30 days support"], featured: true },
      { name: "Design Custom", price: "Custom Quote", period: "", blurb: "Full product design partnership for ambitious brands.", features: ["Unlimited pages", "Fully custom UI/UX", "Brand identity design", "Premium motion design", "Performance-optimized assets", "Unlimited revisions", "90 days support"], featured: false },
    ],
    pricingRows: [
      { feature: "Pages", starter: "Up to 6", professional: "Up to 12", custom: "Unlimited" },
      { feature: "Responsive Design", starter: "✅", professional: "✅", custom: "✅" },
      { feature: "UI/UX Design", starter: "Basic", professional: "Premium", custom: "Fully Custom" },
      { feature: "Brand Identity", starter: "❌", professional: "Included", custom: "Advanced" },
      { feature: "Contact Form", starter: "✅", professional: "✅", custom: "✅" },
      { feature: "Google Maps", starter: "✅", professional: "✅", custom: "✅" },
      { feature: "Social Integration", starter: "✅", professional: "✅", custom: "✅" },
      { feature: "Animations", starter: "Basic", professional: "Advanced", custom: "Premium" },
      { feature: "Figma Design System", starter: "❌", professional: "✅", custom: "✅" },
      { feature: "SEO Structure", starter: "✅", professional: "✅", custom: "✅" },
      { feature: "Speed Optimization", starter: "Basic", professional: "Advanced", custom: "Premium" },
      { feature: "Revisions", starter: "2", professional: "5", custom: "Unlimited" },
      { feature: "Delivery Time", starter: "3–5 Days", professional: "5–8 Days", custom: "Project Based" },
      { feature: "Support", starter: "15 Days", professional: "30 Days", custom: "90 Days" },
    ],
  },
  {
    id: "web-development",
    slug: "web-development",
    emoji: "💻",
    title: "Web Development",
    tagline: "Fast, scalable engineering",
    desc: "Robust web development using modern frameworks and clean architecture. From WordPress and Shopify to Next.js and custom APIs, we build fast, secure, and maintainable websites.",
    hero: "We engineer modern websites with Next.js, WordPress, and Shopify — typed, tested, and tuned for Core Web Vitals, security, and long-term maintainability.",
    features: [
      { e: "⚡", t: "Blazing performance", d: "Core Web Vitals optimized via Next.js App Router, edge caching, and image optimization for sub-2-second loads." },
      { e: "🔒", t: "Typed & tested", d: "TypeScript end-to-end with Jest, React Testing Library, and automated CI/CD pipelines for reliable releases." },
      { e: "🧱", t: "Clean architecture", d: "Modular, component-driven code with shared design tokens — easy to extend and hand off." },
      { e: "🔌", t: "Seamless integrations", d: "CMS, payments, CRM, email, and analytics wired securely with proper error handling and monitoring." },
      { e: "📈", t: "SEO-ready code", d: "Semantic HTML, dynamic metadata, Open Graph, and structured data baked into every template." },
      { e: "🚀", t: "CI/CD deployment", d: "Automated builds, preview deployments, and zero-downtime releases on Vercel, Netlify, or your infrastructure." },
    ],
    work: [
      { e: "🔧", t: "WordPress development", d: "Custom theme development, plugin customization, Gutenberg blocks, and headless WordPress with WPGraphQL." },
      { e: "🧱", t: "Custom WordPress", d: "Bespoke themes and plugin architecture tailored to your content strategy and business logic." },
      { e: "🛍️", t: "Shopify customization", d: "Custom Liquid themes, Shopify Plus development, checkout extensions, and app integrations." },
      { e: "⚡", t: "Next.js & headless", d: "React Server Components, App Router, API routes, and headless CMS integrations (Sanity, Contentful, Strapi)." },
      { e: "🔌", t: "Custom API development", d: "REST and GraphQL APIs with authentication, rate limiting, and comprehensive documentation." },
      { e: "💳", t: "Payment integrations", d: "Stripe, Razorpay, PayPal, and WooCommerce Payments with secure webhook handling." },
    ],
    tools: ["WordPress", "WooCommerce", "PHP", "Next.js", "React", "TypeScript", "Node.js", "GraphQL", "REST API", "Stripe", "Razorpay"],
    process: [
      { e: "📐", t: "Plan", d: "Technical architecture, database schema, API contracts, and deployment strategy aligned with your roadmap." },
      { e: "🧱", t: "Build", d: "Component-driven development with design tokens, shared utilities, and automated testing." },
      { e: "🧪", t: "QA", d: "Cross-browser testing, Lighthouse audits, accessibility checks, and load testing before launch." },
      { e: "🚀", t: "Launch", d: "Staged rollout with monitoring, error tracking, and performance dashboards wired in." },
      { e: "🔧", t: "Support", d: "30 days post-launch bug fixes, performance monitoring, and handover documentation included." },
    ],
    deliverables: ["Production-ready codebase", "CMS integration & admin", "CI/CD pipeline (GitHub Actions / Vercel)", "Performance & security report", "API documentation", "Handover docs & training video"],
    faqs: [
      { q: "What stack do you use?", a: "We specialize in Next.js (App Router), React, TypeScript, and Tailwind CSS for modern builds. For CMS projects, we use WordPress, WooCommerce, or headless options like Sanity." },
      { q: "Can you work with our existing codebase?", a: "Yes. We can refactor, migrate, extend, or rebuild most modern codebases. We'll audit your repo and propose a migration path." },
      { q: "Do you provide hosting?", a: "We set up and configure hosting on Vercel, Netlify, AWS, or your preferred provider. We also offer managed care plans." },
      { q: "Will my site be secure?", a: "Yes. We implement HTTPS, CSP headers, rate limiting, input sanitization, and regular dependency updates. Enterprise plans include security audits." },
      { q: "Can you build e-commerce functionality?", a: "Absolutely. We build custom WooCommerce stores, Shopify themes, and headless commerce solutions with Stripe and Razorpay integrations." },
    ],
    pricing: [
      { name: "Dev Starter", price: "₹9,999", period: "/ project", blurb: "A solid WordPress or simple site to launch fast.", features: ["WordPress / basic site", "CMS setup", "WooCommerce setup (basic)", "Contact form", "Blog system", "Basic SEO", "15 days support"], featured: false },
      { name: "Dev Professional", price: "₹19,999", period: "/ project", blurb: "Shopify or Next.js with advanced integrations and optimization.", features: ["Shopify theme / Next.js app", "WooCommerce customization", "Payment gateway (Stripe/Razorpay)", "Admin dashboard", "API integration", "Advanced SEO setup", "30 days support"], featured: true },
      { name: "Dev Custom", price: "Custom Quote", period: "", blurb: "Any technology stack, fully tailored to your business needs.", features: ["Any tech stack (MERN, PERN, etc.)", "Custom integrations (CRM, ERP)", "Enterprise security hardening", "Premium performance optimization", "Full source code ownership", "90 days support"], featured: false },
    ],
    pricingRows: [
      { feature: "Platform", starter: "WordPress", professional: "Shopify / Next.js", custom: "Any Technology" },
      { feature: "Responsive Build", starter: "✅", professional: "✅", custom: "✅" },
      { feature: "CMS Setup", starter: "✅", professional: "✅", custom: "✅" },
      { feature: "WordPress Customization", starter: "✅", professional: "✅", custom: "✅" },
      { feature: "WooCommerce Setup", starter: "✅", professional: "❌", custom: "✅" },
      { feature: "WooCommerce Customization", starter: "❌", professional: "✅", custom: "✅" },
      { feature: "Shopify Customization", starter: "❌", professional: "✅", custom: "✅" },
      { feature: "Next.js Development", starter: "❌", professional: "✅", custom: "✅" },
      { feature: "API Integration", starter: "❌", professional: "Basic", custom: "Advanced" },
      { feature: "Payment Gateway", starter: "❌", professional: "✅", custom: "✅" },
      { feature: "Admin Dashboard", starter: "❌", professional: "Basic", custom: "Custom" },
      { feature: "Blog / CMS", starter: "✅", professional: "✅", custom: "✅" },
      { feature: "Security", starter: "Basic", professional: "Advanced", custom: "Enterprise" },
      { feature: "Performance", starter: "Basic", professional: "Advanced", custom: "Premium" },
      { feature: "Source Code", starter: "✅", professional: "✅", custom: "✅" },
      { feature: "Support", starter: "15 Days", professional: "30 Days", custom: "90 Days" },
    ],
  },
  {
    id: "seo-website",
    slug: "seo-website",
    emoji: "🚀",
    title: "SEO Website",
    tagline: "Rank, load fast, and convert",
    desc: "Search-optimized websites engineered to rank, load instantly, and convert visitors into customers. We combine technical SEO, content strategy, and performance optimization.",
    hero: "We build SEO into the foundation — technical structure, content strategy, and Core Web Vitals optimization — so your site earns visibility and turns organic traffic into loyal customers.",
    features: [
      { e: "🧭", t: "Keyword strategy", d: "Data-driven targeting of high-intent keywords that match your audience's search behavior and buying journey." },
      { e: "🛠️", t: "Technical SEO", d: "Crawlability, indexation, sitemaps, schema markup, and Core Web Vitals tuned for Google's ranking factors." },
      { e: "📝", t: "SEO content strategy", d: "Content briefs, topic clusters, and on-page optimization that serve users and search engines equally." },
      { e: "🔗", t: "Authority building", d: "Internal linking architecture, outreach strategy, and digital PR to earn high-quality backlinks." },
      { e: "📊", t: "Analytics & tracking", d: "Google Analytics 4, Search Console, conversion tracking, and custom dashboards for actionable insights." },
      { e: "🔁", t: "Continuous growth", d: "Monthly optimization cycles based on real performance data, algorithm updates, and competitive shifts." },
    ],
    work: [
      { e: "📄", t: "On-page SEO", d: "Title tags, meta descriptions, heading hierarchy, internal linking, and content optimization for target keywords." },
      { e: "🔗", t: "Off-page SEO & link building", d: "Digital PR, guest posting, and authority-building campaigns that earn contextual backlinks." },
      { e: "🛠️", t: "Technical SEO", d: "Crawl budget optimization, indexation control, site speed, schema markup, and Core Web Vitals." },
      { e: "📊", t: "Local & analytics", d: "Google Business Profile optimization, local citations, Search Console, and conversion tracking." },
      { e: "✍️", t: "Content optimization", d: "Blog strategy, topic clusters, FAQ schema, and content refreshes to maintain and grow rankings." },
    ],
    tools: ["Google Search Console", "Google Analytics 4", "Ahrefs", "SEMrush", "Screaming Frog", "Surfer SEO", "Yoast SEO", "Rank Math"],
    process: [
      { e: "🔎", t: "Audit", d: "Comprehensive technical audit, content gap analysis, backlink profile review, and competitor benchmarking." },
      { e: "🗺️", t: "Strategy", d: "Keyword map, content calendar, technical roadmap, and prioritized action plan tied to revenue goals." },
      { e: "🛠️", t: "Implement", d: "On-page fixes, technical optimizations, schema deployment, and content publishing with quality guidelines." },
      { e: "✍️", t: "Content & outreach", d: "Optimized pages, blog cadence, and outreach campaigns to earn authoritative backlinks." },
      { e: "📈", t: "Grow & iterate", d: "Monthly reporting, ranking analysis, algorithm response, and continuous optimization based on data." },
    ],
    deliverables: ["Comprehensive SEO audit report", "Keyword strategy document", "Optimized pages & content", "Schema markup implementation", "Monthly performance reports", "Backlink profile analysis", "Competitor tracking dashboard"],
    faqs: [
      { q: "How long until I see SEO results?", a: "Technical fixes (Core Web Vitals, schema) show impact in 4-8 weeks. Rankings typically improve over 2-4 months of consistent content and link building." },
      { q: "Do you guarantee #1 rankings?", a: "No ethical agency does. We guarantee a rigorous, data-led process, transparent reporting, and measurable improvement in organic visibility." },
      { q: "Is SEO included with web design/development?", a: "Yes — every SWAWEBHUB build ships with foundational SEO (meta tags, schema, Core Web Vitals, sitemaps) at no extra cost." },
      { q: "What's included in monthly SEO?", a: "Technical monitoring, content optimization, rank tracking, backlink analysis, competitor intelligence, and monthly strategy calls." },
      { q: "Do you work with e-commerce SEO?", a: "Absolutely. We optimize product pages, category hierarchies, schema for prices and availability, and conversion-focused landing pages." },
    ],
    pricing: [
      { name: "SEO Starter", price: "₹7,999", period: "/ month", blurb: "Foundational optimization for new sites ready to rank.", features: ["Up to 10 keywords", "Website SEO audit", "On-page optimization", "Google Search Console setup", "Monthly performance report", "Email support"], featured: false },
      { name: "SEO Professional", price: "₹15,999", period: "/ month", blurb: "Active growth for competitive niches with proven results.", features: ["Up to 20 keywords", "Advanced technical SEO", "Schema markup", "Local SEO optimization", "Competitor analysis", "Content strategy", "Priority support"], featured: true },
      { name: "SEO Custom", price: "Custom Quote", period: "", blurb: "Enterprise SEO retainer for maximum market dominance.", features: ["Unlimited keywords", "Enterprise technical SEO", "Advanced analytics & BI", "Dedicated SEO specialist", "Link building campaigns", "Quarterly strategy reviews"], featured: false },
    ],
    pricingRows: [
      { feature: "Target Keywords", starter: "Up to 10", professional: "Up to 20", custom: "Unlimited" },
      { feature: "Website SEO Audit", starter: "✅", professional: "✅", custom: "✅" },
      { feature: "Keyword Research", starter: "✅", professional: "✅", custom: "✅" },
      { feature: "On-Page SEO", starter: "✅", professional: "✅", custom: "✅" },
      { feature: "Technical SEO", starter: "Basic", professional: "Advanced", custom: "Enterprise" },
      { feature: "Meta Tags Optimization", starter: "✅", professional: "✅", custom: "✅" },
      { feature: "XML Sitemap", starter: "✅", professional: "✅", custom: "✅" },
      { feature: "Robots.txt", starter: "✅", professional: "✅", custom: "✅" },
      { feature: "Image Optimization", starter: "✅", professional: "✅", custom: "✅" },
      { feature: "Schema Markup", starter: "❌", professional: "✅", custom: "✅" },
      { feature: "Search Console Setup", starter: "✅", professional: "✅", custom: "✅" },
      { feature: "Analytics Setup", starter: "✅", professional: "✅", custom: "✅" },
      { feature: "Core Web Vitals", starter: "Basic", professional: "Advanced", custom: "Premium" },
      { feature: "Local SEO", starter: "❌", professional: "✅", custom: "✅" },
      { feature: "Competitor Analysis", starter: "❌", professional: "✅", custom: "✅" },
      { feature: "Monthly Report", starter: "✅", professional: "✅", custom: "✅" },
      { feature: "Backlink Strategy", starter: "❌", professional: "Basic", custom: "Advanced" },
      { feature: "Support", starter: "Email", professional: "Priority", custom: "Dedicated" },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const footerPages = [
  { label: "🏠 Home", href: "/" },
  { label: "👥 About Us", href: "/about" },
  { label: "📝 Blog", href: "/blog" },
  { label: "💰 Pricing", href: "/pricing" },
  { label: "📧 Contact Us", href: "/contact" },
  { label: "🎨 Services", href: "/services" },
  { label: "📁 Case Status", href: "/case-status" },
  { label: "💬 Testimonials", href: "/testimonials" },
  { label: "🔒 Privacy Policy", href: "/privacy" },
  { label: "📄 Terms & Conditions", href: "/terms" },
];

export const techStacks = [
  {
    service: "Web Design",
    emoji: "🎨",
    color: "from-pink-500/20 to-purple-500/20",
    border: "border-pink-500/30",
    iconBg: "bg-pink-500/10",
    tools: [
      { name: "Figma", desc: "UI/UX design & prototyping", level: "Expert" },
      { name: "Adobe XD", desc: "Interactive prototypes", level: "Advanced" },
      { name: "Photoshop", desc: "Image editing & optimization", level: "Expert" },
      { name: "Illustrator", desc: "Vector graphics & branding", level: "Advanced" },
    ],
    stats: { projects: "120+", satisfaction: "98%" },
    capabilities: ["Design systems", "Responsive layouts", "Prototyping", "Brand identity"],
  },
  {
    service: "Web Development",
    emoji: "💻",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
    iconBg: "bg-blue-500/10",
    tools: [
      { name: "Next.js", desc: "React framework for production", level: "Expert" },
      { name: "React", desc: "Component-based UI library", level: "Expert" },
      { name: "TypeScript", desc: "Type-safe JavaScript", level: "Advanced" },
      { name: "Tailwind CSS", desc: "Utility-first CSS framework", level: "Expert" },
      { name: "WordPress", desc: "CMS & blog platform", level: "Expert" },
      { name: "WooCommerce", desc: "E-commerce solution", level: "Advanced" },
      { name: "PHP", desc: "Server-side scripting", level: "Advanced" },
    ],
    stats: { projects: "85+", satisfaction: "99%" },
    capabilities: ["Full-stack apps", "API integration", "CMS development", "E-commerce"],
  },
  {
    service: "SEO & Analytics",
    emoji: "🚀",
    color: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/30",
    iconBg: "bg-green-500/10",
    tools: [
      { name: "Google Analytics", desc: "Traffic & behavior insights", level: "Expert" },
      { name: "Search Console", desc: "Search performance monitoring", level: "Expert" },
      { name: "Ahrefs", desc: "SEO analysis & backlinks", level: "Advanced" },
      { name: "SEMrush", desc: "Competitive intelligence", level: "Advanced" },
      { name: "Screaming Frog", desc: "Technical SEO crawler", level: "Advanced" },
    ],
    stats: { projects: "200+", satisfaction: "97%" },
    capabilities: ["Technical SEO", "Content strategy", "Link building", "Analytics setup"],
  },
];

export const techPrinciples = [
  {
    e: "⚡",
    t: "Performance-first",
    d: "Every tool is chosen for speed. Core Web Vitals are non-negotiable.",
    metric: "< 2s load time",
  },
  {
    e: "🔒",
    t: "Security by default",
    d: "Enterprise-grade platforms with regular updates and best practices.",
    metric: "99.9% uptime",
  },
  {
    e: "📈",
    t: "Scalable architecture",
    d: "From startup to enterprise, our stack grows with your business.",
    metric: "10x capacity",
  },
  {
    e: "🛠️",
    t: "Easy maintenance",
    d: "Clean code and popular tools mean any developer can pick up where we left off.",
    metric: "0 vendor lock-in",
  },
  {
    e: "🌍",
    t: "Global ecosystem",
    d: "All our tools have worldwide support, documentation, and communities.",
    metric: "24/7 support",
  },
  {
    e: "🚀",
    t: "Future-ready",
    d: "We stay current with the latest standards so your site doesn't become legacy.",
    metric: "Always updated",
  },
];

export const techEcosystem = [
  {
    phase: "Design",
    tools: ["Figma", "Adobe XD", "Photoshop", "Illustrator"],
    color: "pink",
  },
  {
    phase: "Development",
    tools: ["Next.js", "React", "TypeScript", "Tailwind", "WordPress", "WooCommerce"],
    color: "blue",
  },
  {
    phase: "SEO & Launch",
    tools: ["Google Analytics", "Search Console", "Ahrefs", "SEMrush", "Screaming Frog"],
    color: "green",
  },
];
