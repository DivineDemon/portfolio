"use client";

import emailjs from "@emailjs/browser";
import {
	AlertCircle,
	CheckCircle2,
	Loader2,
	Mail,
	Send,
	Shield,
} from "lucide-react";
import { useRef, useState } from "react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";

export default function ContactSection() {
	const formRef = useRef<HTMLFormElement>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [status, setStatus] = useState<{
		type: "success" | "error" | null;
		message: string;
	}>({ type: null, message: "" });

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!formRef.current) return;

		setIsSubmitting(true);
		setStatus({ type: null, message: "" });

		// Read EmailJS Keys from Environment
		const serviceId =
			import.meta.env.PUBLIC_EMAILJS_SERVICE_ID ||
			import.meta.env.EMAILJS_SERVICE_ID ||
			"service_default";
		const templateId =
			import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID ||
			import.meta.env.EMAILJS_TEMPLATE_ID ||
			"template_default";
		const publicKey =
			import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY ||
			import.meta.env.EMAILJS_PUBLIC_KEY ||
			"key_default";

		try {
			await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
			setStatus({
				type: "success",
				message:
					"Thank you! Your AI Systems Audit request has been sent successfully. I will get back to you within 24 hours.",
			});
			formRef.current.reset();
		} catch (error) {
			console.error("EmailJS submission error:", error);
			setStatus({
				type: "error",
				message:
					"Direct email dispatch encountered an issue. Please email me directly at " +
					DATA.contact.email,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div
			id="contact"
			className="border border-border/80 rounded-3xl p-6 sm:p-12 relative overflow-hidden bg-gradient-to-b from-card via-card to-background shadow-2xl"
		>
			<div className="absolute -top-4 border bg-primary text-primary-foreground z-10 rounded-full px-5 py-1.5 left-1/2 -translate-x-1/2 shadow-md">
				<span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
					<Mail className="size-3.5" /> Book A Systems Audit
				</span>
			</div>

			<div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-3xl overflow-hidden pointer-events-none opacity-30">
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

			<div className="relative z-10 max-w-2xl mx-auto space-y-8">
				<div className="text-center space-y-3">
					<h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
						Schedule an AI Systems Audit & Consultation
					</h2>
					<p className="text-muted-foreground text-sm sm:text-base leading-relaxed text-balance max-w-lg mx-auto">
						Need custom agentic workflow orchestration, on-prem fine-tuned LLMs,
						or sub-180ms streaming pipelines? Send your project scope below.
					</p>
				</div>

				{/* Contact Form */}
				<form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{/* Name */}
						<div className="space-y-2">
							<label
								htmlFor="user_name"
								className="text-xs font-semibold text-foreground uppercase tracking-wider"
							>
								Your Name <span className="text-primary">*</span>
							</label>
							<input
								type="text"
								id="user_name"
								name="user_name"
								required
								placeholder="Sarah Jenkins"
								className="w-full px-4 py-3 rounded-xl border border-border bg-background/80 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground/60"
							/>
						</div>

						{/* Email */}
						<div className="space-y-2">
							<label
								htmlFor="user_email"
								className="text-xs font-semibold text-foreground uppercase tracking-wider"
							>
								Email Address <span className="text-primary">*</span>
							</label>
							<input
								type="email"
								id="user_email"
								name="user_email"
								required
								placeholder="s.jenkins@enterprise.com"
								className="w-full px-4 py-3 rounded-xl border border-border bg-background/80 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground/60"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{/* Company / Role */}
						<div className="space-y-2">
							<label
								htmlFor="company"
								className="text-xs font-semibold text-foreground uppercase tracking-wider"
							>
								Company / Organization
							</label>
							<input
								type="text"
								id="company"
								name="company"
								placeholder="Acme Logistics Corp."
								className="w-full px-4 py-3 rounded-xl border border-border bg-background/80 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground/60"
							/>
						</div>

						{/* Subject / Need */}
						<div className="space-y-2">
							<label
								htmlFor="subject"
								className="text-xs font-semibold text-foreground uppercase tracking-wider"
							>
								Primary AI Objective
							</label>
							<select
								id="subject"
								name="subject"
								className="w-full px-4 py-3 rounded-xl border border-border bg-background/80 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
							>
								<option value="Agentic Workflow Automation">
									Agentic Workflow Automation (LangGraph/MCP)
								</option>
								<option value="Custom LLM Fine-Tuning & RAG">
									Custom LLM Fine-Tuning & RAG Architecture
								</option>
								<option value="Real-Time Streaming Infrastructure">
									Real-Time Streaming & Fraud Scoring
								</option>
								<option value="Enterprise AI Enablement & 2nd Brain">
									Executive 2nd Brain & AI Enablement
								</option>
								<option value="General Technical Consultation">
									General Technical Strategy Audit
								</option>
							</select>
						</div>
					</div>

					{/* Message */}
					<div className="space-y-2">
						<label
							htmlFor="message"
							className="text-xs font-semibold text-foreground uppercase tracking-wider"
						>
							Project Scope & Requirements{" "}
							<span className="text-primary">*</span>
						</label>
						<textarea
							id="message"
							name="message"
							required
							rows={4}
							placeholder="Describe your operational bottleneck, data volume, or desired AI automation goals..."
							className="w-full px-4 py-3 rounded-xl border border-border bg-background/80 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground/60 resize-y"
						></textarea>
					</div>

					{/* Feedback Alerts */}
					{status.type === "success" && (
						<div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-medium flex items-start gap-2.5">
							<CheckCircle2 className="size-5 shrink-0 mt-0.5" />
							<span>{status.message}</span>
						</div>
					)}

					{status.type === "error" && (
						<div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs sm:text-sm font-medium flex items-start gap-2.5">
							<AlertCircle className="size-5 shrink-0 mt-0.5" />
							<span>{status.message}</span>
						</div>
					)}

					{/* Submit Button */}
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full py-3.5 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting ? (
							<>
								<Loader2 className="size-4 animate-spin" />
								<span>Dispatching Request...</span>
							</>
						) : (
							<>
								<Send className="size-4" />
								<span>Submit AI Audit Request</span>
							</>
						)}
					</button>
				</form>

				{/* Guarantees */}
				<div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground pt-4 border-t border-border/40">
					<div className="flex items-center gap-1.5">
						<Shield className="size-3.5 text-emerald-500" />
						<span>Zero-Data-Retention Standards</span>
					</div>
					<div className="flex items-center gap-1.5">
						<CheckCircle2 className="size-3.5 text-emerald-500" />
						<span>Direct Response within 24 Hours</span>
					</div>
				</div>
			</div>
		</div>
	);
}
