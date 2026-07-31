import { CheckCircle2, ArrowRight } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function ServicesSection() {
	return (
		<section id="services" className="scroll-mt-20">
			<div className="flex min-h-0 flex-col gap-y-8">
				<div className="flex flex-col gap-y-4 items-center justify-center text-center">
					<div className="flex items-center w-full">
						<div className="flex-1 h-px bg-linear-to-r from-transparent via-border to-transparent" />
						<div className="border bg-primary/10 border-primary/20 text-primary z-10 rounded-full px-4 py-1">
							<span className="text-xs font-semibold uppercase tracking-wider">
								Core Capabilities & Services
							</span>
						</div>
						<div className="flex-1 h-px bg-linear-to-l from-transparent via-border to-transparent" />
					</div>
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
						AI Systems & Enablement at Scale
					</h2>
					<p className="text-muted-foreground max-w-xl md:text-base text-balance">
						From autonomous multi-agent pipelines to on-prem fine-tuned LLMs and high-throughput streaming microservices.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{DATA.services.map((service, index) => {
						const IconComponent = service.icon;
						return (
							<BlurFade
								key={service.id}
								delay={BLUR_FADE_DELAY * 8 + index * 0.05}
							>
								<div className="flex flex-col h-full p-6 rounded-2xl border border-border/80 bg-card/50 hover:bg-card hover:border-primary/40 transition-all duration-300 shadow-xs hover:shadow-md group">
									<div className="flex items-center gap-3 mb-3">
										<div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
											<IconComponent className="size-6 shrink-0" />
										</div>
										<div>
											<h3 className="font-bold text-lg leading-tight tracking-tight text-foreground">
												{service.title}
											</h3>
											<p className="text-xs text-primary font-medium mt-0.5">
												{service.subtitle}
											</p>
										</div>
									</div>

									<p className="text-sm text-muted-foreground leading-relaxed mb-4">
										{service.description}
									</p>

									<ul className="space-y-2 mt-auto pt-3 border-t border-border/40">
										{service.features.map((feature, fIdx) => (
											<li
												key={fIdx}
												className="flex items-start gap-2 text-xs text-foreground/90 font-medium"
											>
												<CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
												<span>{feature}</span>
											</li>
										))}
									</ul>

									<a
										href="#contact"
										className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline mt-4 pt-2 group/link"
									>
										<span>Book a Consultation</span>
										<ArrowRight className="size-3.5 group-hover/link:translate-x-1 transition-transform" />
									</a>
								</div>
							</BlurFade>
						);
					})}
				</div>
			</div>
		</section>
	);
}
