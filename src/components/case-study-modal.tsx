"use client";

import {
	CheckCircle2,
	Cpu,
	ExternalLink,
	ShieldCheck,
	TrendingUp,
	X,
} from "lucide-react";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";

export interface CaseStudy {
	id: string;
	title: string;
	href?: string;
	githubUrl?: string;
	websiteUrl?: string;
	dates: string;
	impact?: string;
	description: string;
	problem?: string;
	architecture?: string;
	keyFeatures?: readonly string[];
	technologies: readonly string[];
}

interface CaseStudyModalProps {
	caseStudy: CaseStudy | null;
	isOpen: boolean;
	onClose: () => void;
}

export function CaseStudyModal({
	caseStudy,
	isOpen,
	onClose,
}: CaseStudyModalProps) {
	if (!isOpen || !caseStudy) return null;

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") {
			onClose();
		}
	};

	return (
		<div
			role="dialog"
			aria-modal="true"
			aria-labelledby="case-study-title"
			tabIndex={-1}
			className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
			onClick={onClose}
			onKeyDown={handleKeyDown}
		>
			<div
				role="document"
				className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-card-foreground outline-none"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
			>
				{/* Close Button */}
				<button
					type="button"
					onClick={onClose}
					className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
					aria-label="Close Case Study"
				>
					<X className="size-5" />
				</button>

				{/* Header */}
				<div className="space-y-2 pr-8">
					<div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
						<span>{caseStudy.dates}</span>
					</div>
					<h2
						id="case-study-title"
						className="text-2xl sm:text-3xl font-extrabold tracking-tight"
					>
						{caseStudy.title}
					</h2>

					{caseStudy.impact && (
						<div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-xs w-fit border border-emerald-500/20">
							<TrendingUp className="size-4 shrink-0" />
							<span>{caseStudy.impact}</span>
						</div>
					)}
				</div>

				{/* Action Buttons: GitHub & Live Demo Links */}
				<div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/40">
					{caseStudy.githubUrl && (
						<a
							href={caseStudy.githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background font-semibold text-xs hover:opacity-90 transition-all"
						>
							<Icons.github className="size-4" />
							<span>View Source Repository</span>
						</a>
					)}
					{caseStudy.websiteUrl && (
						<a
							href={caseStudy.websiteUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-muted/50 hover:bg-muted font-semibold text-xs transition-all"
						>
							<ExternalLink className="size-4 text-primary" />
							<span>Live Demo / Platform</span>
						</a>
					)}
				</div>

				{/* Overview */}
				<div className="space-y-2">
					<h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
						<Cpu className="size-4" /> Executive Overview
					</h3>
					<p className="text-sm text-muted-foreground leading-relaxed">
						{caseStudy.description}
					</p>
				</div>

				{/* Problem Statement */}
				{caseStudy.problem && (
					<div className="space-y-2 p-4 rounded-xl bg-muted/30 border border-border/60">
						<h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
							<ShieldCheck className="size-4 text-amber-500" /> Operational
							Bottleneck / Problem
						</h3>
						<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
							{caseStudy.problem}
						</p>
					</div>
				)}

				{/* System Architecture */}
				{caseStudy.architecture && (
					<div className="space-y-2">
						<h3 className="text-sm font-bold uppercase tracking-wider text-primary">
							Technical Architecture & Strategy
						</h3>
						<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
							{caseStudy.architecture}
						</p>
					</div>
				)}

				{/* Key Features & Impact */}
				{caseStudy.keyFeatures && caseStudy.keyFeatures.length > 0 && (
					<div className="space-y-2">
						<h3 className="text-sm font-bold uppercase tracking-wider text-primary">
							Key Deliverables & ROI Highlights
						</h3>
						<ul className="space-y-2">
							{caseStudy.keyFeatures.map((feature, idx) => (
								<li
									key={idx}
									className="flex items-start gap-2 text-xs sm:text-sm text-foreground/90 font-medium"
								>
									<CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
									<span>{feature}</span>
								</li>
							))}
						</ul>
					</div>
				)}

				{/* Tech Stack Tags */}
				<div className="space-y-2 pt-4 border-t border-border/40">
					<h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
						Technologies & Infrastructure
					</h3>
					<div className="flex flex-wrap gap-1.5">
						{caseStudy.technologies.map((tech) => (
							<Badge
								key={tech}
								variant="outline"
								className="text-xs font-mono border-border bg-muted/20"
							>
								{tech}
							</Badge>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
