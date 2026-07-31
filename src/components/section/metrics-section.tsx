import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function MetricsSection() {
	return (
		<section id="metrics" className="my-2">
			<BlurFade delay={BLUR_FADE_DELAY * 2}>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl border border-border/80 bg-linear-to-b from-card/80 to-muted/20 backdrop-blur-xs shadow-xs">
					{DATA.impactMetrics.map((metric, idx) => (
						<div
							key={idx}
							className="flex flex-col items-center text-center p-2 rounded-xl"
						>
							<span className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
								{metric.value}
							</span>
							<span className="text-xs font-medium text-muted-foreground mt-1 max-w-[150px]">
								{metric.label}
							</span>
						</div>
					))}
				</div>
			</BlurFade>
		</section>
	);
}
