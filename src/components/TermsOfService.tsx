import { ArrowLeft, Scroll } from "@phosphor-icons/react";

interface TermsOfServiceProps {
  navigateTo: (view: "home" | "terms" | "privacy") => void;
}

export default function TermsOfService({ navigateTo }: TermsOfServiceProps) {
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto text-left relative overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-20 left-10 h-[250px] w-[250px] rounded-full bg-[#10b981]/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 h-[250px] w-[250px] rounded-full bg-[#06b6d4]/5 blur-[80px] pointer-events-none" />

      {/* Floating navigation bar back */}
      <button 
        onClick={() => navigateTo("home")}
        className="group inline-flex items-center gap-2 rounded-full border border-border-theme bg-card-theme/80 px-4 py-2 text-xs font-semibold text-text-muted-theme hover:text-text-theme hover:border-text-muted-theme/40 transition-all duration-300 mb-8 cursor-pointer backdrop-blur-md"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
        Back to Homepage
      </button>

      {/* Main Glassmorphic Panel */}
      <div className="relative rounded-[2rem] border border-border-theme bg-card-theme p-8 md:p-12 overflow-hidden shadow-2xl backdrop-blur-xl">
        {/* Header Section */}
        <div className="border-b border-border-theme pb-8 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#10b981]/10 px-3 py-1 text-[10px] uppercase tracking-wider font-semibold text-[#10b981] mb-4">
            <Scroll className="h-3.5 w-3.5" />
            Legal Agreement
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-text-theme mb-3 tracking-tight">
            Terms of <span className="gradient-text-green">Service</span>
          </h1>
          <p className="text-xs text-text-muted-theme font-mono">
            Last Updated: July 17, 2026 &bull; Effective Immediately
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-xs sm:text-sm text-text-muted-theme leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-text-theme font-display flex items-center gap-2">
              <span className="text-[#10b981] font-mono">01.</span> Acceptance of Terms
            </h2>
            <p>
              By accessing and using H2T VPN (referred to as "the Site", "we", "us", or "our"), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not access or use the Site.
            </p>
            <p>
              We reserve the right to modify, amend, or replace these terms at any time. Any changes will be posted directly to this page with an updated "Last Updated" timestamp. Continued use of the Site constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-text-theme font-display flex items-center gap-2">
              <span className="text-[#10b981] font-mono">02.</span> Affiliate & Advertising Disclosure
            </h2>
            <p>
              H2T VPN operates as an independent comparison and review directory. To keep this resource free to the public, we utilize affiliate partnerships with various VPN providers listed on our site.
            </p>
            <p className="border-l-2 border-[#10b981] pl-4 py-1 bg-[#10b981]/5 text-xs text-text-theme rounded-r-md">
              <strong>Notice:</strong> We may receive monetary commissions or referral fees when users click on comparison buttons, links, or purchase VPN products from our partnered providers. These arrangements help fund our operation, server hosting, and research. While we prioritize unbiased speed benchmarks and independent security audits, referral commission rates may influence provider positioning or listings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-text-theme font-display flex items-center gap-2">
              <span className="text-[#10b981] font-mono">03.</span> Interactive Benchmarking & Simulation
            </h2>
            <p>
              Our Site includes interactive network latency and speed simulation tools (e.g., the WireGuard Speeds simulator). The data provided in these simulations is designed for illustrative comparison purposes based on averaged provider metrics and protocol overhead approximations. Actual network throughput, ping latency, and security encryption effectiveness will vary based on user ISP throttling, local hardware parameters, and network congestion.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-text-theme font-display flex items-center gap-2">
              <span className="text-[#10b981] font-mono">04.</span> Intellectual Property Rights
            </h2>
            <p>
              The design system, custom SVG graphics, interactive 3D WebGL core code, copy, logos, and layouts are the exclusive intellectual property of H2T VPN and are protected by applicable trademark, copyright, and digital asset regulations. You may not copy, replicate, publish, distribute, or reverse-engineer any component of our interactive simulator or core platform without express written consent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-text-theme font-display flex items-center gap-2">
              <span className="text-[#10b981] font-mono">05.</span> Limitation of Liability
            </h2>
            <p>
              H2T VPN provides content, metrics, rankings, and simulators on an "as-is" basis. We offer no guarantees, express or implied, regarding the accuracy, completeness, uptime, or reliable security performance of the third-party VPN providers reviewed on this Site. We are not responsible for any personal data breaches, server issues, subscription billing conflicts, or damages incurred when you contract with third-party service providers listed here.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-text-theme font-display flex items-center gap-2">
              <span className="text-[#10b981] font-mono">06.</span> Contact & Inquiries
            </h2>
            <p>
              For legal questions, reports of data inaccuracies, or partnership inquiry submissions relating to our comparison directory, please reach out to us at:
            </p>
            <div className="p-4 bg-card-elevated-theme rounded-2xl border border-border-theme font-mono text-xs text-text-theme space-y-1">
              <p>Email: legal@h2t.media</p>
              <p>Department: Compliance & Directory Audits</p>
              <p>Address: H2T Media and Advertising Co., Ltd</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
