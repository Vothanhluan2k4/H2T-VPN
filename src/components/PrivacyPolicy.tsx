import { ArrowLeft, ShieldCheck, Cookie } from "@phosphor-icons/react";

interface PrivacyPolicyProps {
  navigateTo: (view: "home" | "terms" | "privacy") => void;
}

export default function PrivacyPolicy({ navigateTo }: PrivacyPolicyProps) {
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto text-left relative overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-20 right-10 h-[250px] w-[250px] rounded-full bg-[#06b6d4]/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 h-[250px] w-[250px] rounded-full bg-[#10b981]/5 blur-[80px] pointer-events-none" />

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
          <div className="inline-flex items-center gap-2 rounded-full bg-[#06b6d4]/10 px-3 py-1 text-[10px] uppercase tracking-wider font-semibold text-[#06b6d4] mb-4">
            <ShieldCheck className="h-3.5 w-3.5" />
            Security Shield Guaranteed
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-text-theme mb-3 tracking-tight">
            Privacy <span className="gradient-text-green">Policy</span>
          </h1>
          <p className="text-xs text-text-muted-theme font-mono">
            Last Updated: July 17, 2026 &bull; Strict Zero-Logs Guarantee
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-xs sm:text-sm text-text-muted-theme leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-text-theme font-display flex items-center gap-2">
              <span className="text-[#06b6d4] font-mono">01.</span> Core Privacy Statement
            </h2>
            <p>
              At H2T VPN, we are committed to safeguarding the privacy of our visitors. Because we evaluate and promote secure, zero-logs VPN architectures, we hold our own site to the absolute highest encryption and data-minimization standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-text-theme font-display flex items-center gap-2">
              <span className="text-[#06b6d4] font-mono">02.</span> Zero Web Traffic Logs
            </h2>
            <p className="border-l-2 border-[#06b6d4] pl-4 py-1 bg-[#06b6d4]/5 text-xs text-text-theme rounded-r-md">
              <strong>Our Commitment:</strong> We do not log, track, store, or sell any of your network activities, source IP addresses, browser agents, or interactive simulation queries. When you trigger speed tests or regional node pings on our comparison dashboard, all calculations are executed client-side inside your browser or securely processed in transient memory. No trace of your local device coordinates is retained.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-text-theme font-display flex items-center gap-2">
              <span className="text-[#06b6d4] font-mono">03.</span> Opt-in Newsletter Registry
            </h2>
            <p>
              When you opt-in to our premium whitelist or subscribe to deal alerts, we collect and store only your secure email address.
            </p>
            <p>
              This data is exclusively utilized to send monthly reports, coupon updates, and VPN provider review summaries. You can unsubscribe at any point with a single click in any newsletter email, which completely deletes your record from our secure mail server.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-text-theme font-display flex items-center gap-2">
              <span className="text-[#06b6d4] font-mono">04.</span> Cookies and Tracking
            </h2>
            <p className="flex items-start gap-2">
              <Cookie className="h-4 w-4 text-[#06b6d4] shrink-0 mt-0.5" />
              <span>
                We use cookies to enhance navigation layout preferences (such as light/dark mode states) and compile anonymous aggregate metrics via privacy-compliant analytics tools. If Google AdSense is deployed to serve relative advertisements, Google utilizes cookies (such as DART cookies) to serve ads based on your visit history to this and other sites.
              </span>
            </p>
            <p>
              You can configure your browser preferences to reject cookies or warn you before they are accepted. However, some visual elements of our interactive simulator may function sub-optimally with local storage disabled.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-text-theme font-display flex items-center gap-2">
              <span className="text-[#06b6d4] font-mono">05.</span> Third-Party Links & Partner Sites
            </h2>
            <p>
              Our Site reviews and links to third-party secure VPN service providers (such as NordVPN, Surfshark, and ExpressVPN). We are not responsible for the privacy practices, server log structures, or cookies applied by these independent platforms. We strongly recommend reading the privacy documentation of any VPN service you contract before configuring tunnels or entering payment details.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-text-theme font-display flex items-center gap-2">
              <span className="text-[#06b6d4] font-mono">06.</span> GDPR & CCPA Data Rights
            </h2>
            <p>
              Depending on your regional jurisdiction (such as the European Union or California), you possess explicit rights regarding your personal information, including the right to request access to the email address registered with us, ask for complete deletion, or restrict processing.
            </p>
            <p>
              To submit a compliance request or report any concerns, please contact our Data Protection Officer at:
            </p>
            <div className="p-4 bg-card-elevated-theme rounded-2xl border border-border-theme font-mono text-xs text-text-theme space-y-1">
              <p>Email: privacy@h2t.media</p>
              <p>DPO Division: Security Compliance & Audits</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
