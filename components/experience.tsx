"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { BarChart3, Briefcase, Network, Search, ShieldCheck } from "lucide-react";
import { useRef } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const capabilities = [
	{
		icon: Search,
		title: "Analysis & Insight",
		items: [
			"Analyze relational database data to identify trends, patterns, inconsistencies, and business insights.",
			"Translate business requirements into visualizations, KPIs, and analytical reports.",
		],
	},
	{
		icon: BarChart3,
		title: "Dashboards & DAX",
		items: [
			"Develop interactive Power BI dashboards for reporting and decision-making.",
			"Develop and optimize DAX measures and calculated metrics.",
		],
	},
	{
		icon: Network,
		title: "Data Modeling & Integration",
		items: [
			"Design data models using Microsoft Fabric.",
			"Integrate data from multiple sources.",
		],
	},
	{
		icon: ShieldCheck,
		title: "Data Quality",
		items: [
			"Clean, transform, and preprocess datasets.",
			"Validate and troubleshoot datasets, data models, DAX calculations, and dashboards.",
		],
	},
];

const tools = ["Power BI", "DAX", "Microsoft Fabric", "SQL", "Data Modeling"];

export function Experience() {
	const timelineRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: timelineRef,
		offset: ["start 75%", "end 60%"],
	});
	const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

	return (
		<section id="experience" className="relative px-4 py-24 sm:px-6 md:py-32">
			<div className="mx-auto max-w-6xl">
				<SectionHeading eyebrow="Experience" description="Hands-on business intelligence work in a real organization.">
					Professional <span className="text-gradient">experience</span>
				</SectionHeading>

				<div ref={timelineRef} className="relative pl-10 md:pl-16">
					{/* Timeline track and scroll-driven fill */}
					<div className="absolute bottom-0 left-[11px] top-2 w-px bg-line md:left-[23px]" />
					<motion.div
						className="absolute bottom-0 left-[11px] top-2 w-px origin-top bg-gradient-to-b from-brand-violet via-brand-blue to-brand-cyan md:left-[23px]"
						style={{ scaleY: lineScale }}
					/>

					{/* Timeline marker */}
					<div className="absolute left-0 top-1 md:left-3">
						<span className="relative flex h-6 w-6 items-center justify-center">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-violet/50" />
							<span className="relative h-4 w-4 rounded-full border-2 border-brand-cyan bg-ink-900 shadow-[0_0_16px_#22d3ee]" />
						</span>
					</div>

					<Reveal>
						<div className="glass-panel rounded-3xl p-6 sm:p-8">
							<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
								<div className="flex items-start gap-4">
									<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-violet to-brand-blue text-white shadow-[0_8px_30px_-8px_rgba(139,92,246,0.8)]">
										<Briefcase size={22} />
									</span>
									<div>
										<h3 className="font-display text-2xl font-bold text-fg sm:text-3xl">
											Intern BI Support Executive
										</h3>
										<p className="mt-1 text-fg-muted">Prima Management Services (Pvt) Ltd</p>
									</div>
								</div>
								<div className="flex items-center gap-2 self-start">
									<span className="rounded-full border border-brand-cyan/40 bg-brand-cyan/10 px-3 py-1 font-mono text-xs text-brand-cyan">
										Current
									</span>
									<span className="rounded-full border border-line px-3 py-1 font-mono text-xs text-fg-muted">
										May 2026 – Present
									</span>
								</div>
							</div>

							<div className="mt-8 grid gap-4 md:grid-cols-2">
								{capabilities.map(({ icon: Icon, title, items }) => (
									<div
										key={title}
										className="gradient-border rounded-2xl border border-line bg-ink-950/30 p-5 transition-colors duration-300 hover:bg-ink-950/50"
									>
										<div className="mb-4 flex items-center gap-3">
											<Icon size={18} className="text-brand-cyan" />
											<h4 className="font-semibold text-fg">{title}</h4>
										</div>
										<Stagger as="ul" className="space-y-3" stagger={0.15}>
											{items.map((item) => (
												<StaggerItem as="li" key={item} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
													<span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet-soft" />
													{item}
												</StaggerItem>
											))}
										</Stagger>
									</div>
								))}
							</div>

							<div className="mt-8 flex flex-wrap gap-2">
								{tools.map((tool) => (
									<span
										key={tool}
										className="rounded-full border border-brand-violet/30 bg-brand-violet/10 px-3 py-1 text-xs font-medium text-brand-violet-soft transition-colors hover:border-brand-cyan/50 hover:text-brand-cyan"
									>
										{tool}
									</span>
								))}
							</div>
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
