/* eslint-disable @next/next/no-img-element */

import {
	Timeline,
	TimelineConnectItem,
	TimelineItem,
} from "@/components/timeline";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";

interface LinkItem {
	title: string;
	href: string;
	icon?: React.ReactNode;
}

export default function HackathonsSection() {
	return (
		<section id="hackathons" className="overflow-hidden">
			<div className="flex min-h-0 flex-col gap-y-8 w-full">
				<div className="flex flex-col gap-y-4 items-center justify-center">
					<div className="flex items-center w-full">
						<div className="flex-1 h-px bg-linear-to-r from-transparent via-border to-transparent" />
						<div className="border bg-primary/10 border-primary/20 text-primary z-10 rounded-full px-4 py-1">
							<span className="text-xs font-semibold uppercase tracking-wider">
								Honors & Key Achievements
							</span>
						</div>
						<div className="flex-1 h-px bg-linear-to-l from-transparent via-border to-transparent" />
					</div>
					<div className="flex flex-col gap-y-2 items-center justify-center text-center">
						<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
							Recognition & Industry Impact
						</h2>
						<p className="text-muted-foreground max-w-xl md:text-base text-balance">
							Enterprise performance awards, instructor excellence, and
							technical contributions.
						</p>
					</div>
				</div>
				<Timeline>
					{DATA.hackathons.map((hackathon) => (
						<TimelineItem
							key={hackathon.title + hackathon.dates}
							className="w-full flex items-start justify-between gap-10"
						>
							<TimelineConnectItem className="flex items-start justify-center">
								{hackathon.image ? (
									<img
										src={hackathon.image}
										alt={hackathon.title}
										className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border object-contain flex-none"
									/>
								) : (
									<div className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border flex-none" />
								)}
							</TimelineConnectItem>
							<div className="flex flex-1 flex-col justify-start gap-2 min-w-0">
								{hackathon.dates && (
									<time className="text-xs text-muted-foreground font-mono">
										{hackathon.dates}
									</time>
								)}
								{hackathon.title && (
									<h3 className="font-semibold leading-none">
										{hackathon.title}
									</h3>
								)}
								{hackathon.location && (
									<p className="text-sm text-muted-foreground">
										{hackathon.location}
									</p>
								)}
								{hackathon.description && (
									<p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
										{hackathon.description}
									</p>
								)}
								{hackathon.links && hackathon.links.length > 0 && (
									<div className="mt-1 flex flex-row flex-wrap items-start gap-2">
										{hackathon.links.map((link: LinkItem, idx: number) => (
											<a
												href={link.href}
												key={idx}
												target="_blank"
												rel="noopener noreferrer"
											>
												<Badge className="flex items-center gap-1.5 text-xs bg-primary text-primary-foreground">
													{link.icon}
													{link.title}
												</Badge>
											</a>
										))}
									</div>
								)}
							</div>
						</TimelineItem>
					))}
				</Timeline>
			</div>
		</section>
	);
}
