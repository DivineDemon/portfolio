"use client";

import { ArrowUpRight, Globe, TrendingUp } from "lucide-react";
import Markdown from "react-markdown";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Props {
	title: string;
	githubUrl?: string;
	websiteUrl?: string;
	description: string;
	dates: string;
	impact?: string;
	tags: readonly string[];
	onOpenModal?: () => void;
	className?: string;
}

export function ProjectCard({
	title,
	githubUrl,
	websiteUrl,
	description,
	dates,
	impact,
	tags,
	onOpenModal,
	className,
}: Props) {
	return (
		<div
			className={cn(
				"flex flex-col h-full border border-border/80 bg-card rounded-2xl p-6 hover:border-primary/50 hover:shadow-xl transition-all duration-300 group relative overflow-hidden text-left",
				className,
			)}
		>
			{/* Main Clickable Area */}
			<button
				type="button"
				onClick={onOpenModal}
				className="absolute inset-0 size-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary z-0 rounded-2xl text-left"
				aria-label={`View Case Study for ${title}`}
			/>

			{/* Header */}
			<div className="flex items-start justify-between gap-3 mb-2 relative z-10 pointer-events-none">
				<div className="flex flex-col gap-1">
					<h3 className="font-bold text-lg tracking-tight text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
						<span>{title}</span>
						<ArrowUpRight className="size-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary shrink-0" />
					</h3>
					<time className="text-xs text-muted-foreground font-mono">
						{dates}
					</time>
				</div>

				{/* Quick Links: GitHub & Website */}
				<div className="flex items-center gap-1.5 shrink-0 pointer-events-auto">
					{githubUrl && (
						<a
							href={githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							onClick={(e) => e.stopPropagation()}
							className="p-1.5 rounded-lg border border-border bg-muted/40 hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-colors flex items-center justify-center"
							title="View Source on GitHub"
						>
							<Icons.github className="size-3.5" />
						</a>
					)}
					{websiteUrl && (
						<a
							href={websiteUrl}
							target="_blank"
							rel="noopener noreferrer"
							onClick={(e) => e.stopPropagation()}
							className="p-1.5 rounded-lg border border-border bg-muted/40 hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-colors flex items-center justify-center"
							title="View Live Platform"
						>
							<Globe className="size-3.5" />
						</a>
					)}
				</div>
			</div>

			{/* Impact Badge */}
			{impact && (
				<div className="flex items-center gap-1.5 px-2.5 py-1 my-2 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-xs w-fit border border-emerald-500/20 relative z-10 pointer-events-none">
					<TrendingUp className="size-3.5 shrink-0" />
					<span>{impact}</span>
				</div>
			)}

			{/* Description */}
			<div className="text-xs flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert my-2 relative z-10 pointer-events-none">
				<Markdown>{description}</Markdown>
			</div>

			{/* Footer: Tech Stack Tags & CTA */}
			<div className="flex flex-wrap items-center justify-between gap-2 mt-auto pt-4 border-t border-border/40 relative z-10 pointer-events-none">
				<div className="flex flex-wrap gap-1">
					{tags.slice(0, 4).map((tag) => (
						<Badge
							key={tag}
							className="text-[10px] font-mono font-medium border border-border/60 bg-muted/30 px-2 py-0.5"
							variant="outline"
						>
							{tag}
						</Badge>
					))}
					{tags.length > 4 && (
						<Badge
							className="text-[10px] font-mono border border-border/60 bg-muted/30 px-1.5 py-0.5"
							variant="outline"
						>
							+{tags.length - 4}
						</Badge>
					)}
				</div>

				<span className="text-xs font-semibold text-primary group-hover:underline">
					Read Case Study →
				</span>
			</div>
		</div>
	);
}
