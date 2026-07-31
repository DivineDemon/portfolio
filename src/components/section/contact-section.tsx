import { ArrowRight, CheckCircle, Mail, Shield } from "lucide-react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";

export default function ContactSection() {
	return (
		<div
			id="contact"
			className="border border-border/80 rounded-2xl p-8 sm:p-12 relative overflow-hidden bg-linear-to-b from-card to-background shadow-lg"
		>
			<div className="absolute -top-4 border bg-primary text-primary-foreground z-10 rounded-full px-4 py-1 left-1/2 -translate-x-1/2 shadow-xs">
				<span className="text-xs font-semibold uppercase tracking-wider">
					Book A Systems Audit
				</span>
			</div>

			<div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-2xl overflow-hidden pointer-events-none opacity-40">
				<FlickeringGrid
					className="h-full w-full"
					squareSize={2}
					gridGap={2}
					style={{
						maskImage: "linear-gradient(to bottom, black, transparent)",
						WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
					}}
				/>
			</div>

			<div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-xl mx-auto">
				<h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
					Ready to Scale Your Enterprise AI Infrastructure?
				</h2>
				<p className="text-muted-foreground text-sm sm:text-base leading-relaxed text-balance">
					Whether you need custom agentic workflow orchestration, on-prem
					fine-tuned LLMs, or sub-180ms streaming pipelines — let&apos;s
					evaluate your current architecture.
				</p>

				<div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center mt-2">
					<a
						href={`mailto:${DATA.contact.email}?subject=Enterprise%20AI%20Systems%20Audit%20Inquiry`}
						className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-md hover:shadow-lg w-full sm:w-auto"
					>
						<Mail className="size-4" />
						<span>Schedule AI Systems Audit</span>
						<ArrowRight className="size-4" />
					</a>
					<a
						href={DATA.contact.social.LinkedIn.url}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:bg-muted font-medium text-sm transition-all w-full sm:w-auto"
					>
						<span>Connect on LinkedIn</span>
					</a>
				</div>

				<div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border/40 w-full mt-2">
					<div className="flex items-center gap-1.5">
						<Shield className="size-3.5 text-emerald-500" />
						<span>Zero-Data-Retention Standards</span>
					</div>
					<div className="flex items-center gap-1.5">
						<CheckCircle className="size-3.5 text-emerald-500" />
						<span>Bank-Grade Security Compliance</span>
					</div>
				</div>
			</div>
		</div>
	);
}
