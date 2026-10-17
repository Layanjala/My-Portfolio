"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Maximize2 } from "lucide-react";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TiltCard } from "@/components/tilt-card";
import { links } from "@/lib/links";

type Cover = "research" | "travel" | "revenue";

type Project = {
	title: string;
	label: string;
	description: string;
	technologies: string[];
	image?: string;
	cover?: Cover;
	// Only set these when a real public URL exists
	github?: string;
	demo?: string;
};

const projects: Project[] = [
	{
		title: "Aflatoxin Detection Using UV Fluorescence Imaging",
		label: "Research",
		description:
			"Designed, developed, and evaluated a deep learning-based model to detect and quantify aflatoxin contamination in corn kernels using UV fluorescence imaging, digital image processing, and machine learning, offering a rapid, non-destructive, and scalable approach to food safety assessment.",
		technologies: ["Python", "Deep Learning", "Machine Learning", "Image Processing", "UV Fluorescence"],
		cover: "research",
	},
	{
		title: "Travel Agency Analytics Dashboard",
		label: "End-to-end analytics",
		description:
			"Built an end-to-end analytics solution simulating a real-world travel agency workflow. Integrated and cleaned multi-source data with Python, designed a PostgreSQL database for SQL-based analysis, and delivered interactive Power BI dashboards presenting revenue and customer KPIs.",
		technologies: ["Python", "Pandas", "NumPy", "PostgreSQL", "SQL", "Power BI", "Jupyter Notebook"],
		cover: "travel",
	},
	{
		title: "Interactive Revenue Dashboard",
		label: "Power BI",
		description:
			"Developed an interactive Power BI dashboard to analyze sales performance, including revenue trends, profit and quantity metrics, geographic insights, customer segmentation, and product category performance.",
		technologies: ["Power BI", "DAX"],
		cover: "revenue",
	},
	{
		title: "Real Estate Management System",
		label: "Full-stack web app",
		description:
			"Built a full-stack web application to simplify real estate transactions by enabling buyers, sellers, and agents to browse, list, and manage property listings through an intuitive interface.",
		technologies: ["React", "Vite", "Tailwind CSS", "Django REST Framework", "SQLite"],
		image: "/real-estate.png",
	},
];

// Illustrative artwork for projects that have no screenshot
function ProjectCover({ type }: { type: Cover }) {
	return (
		<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.35),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.25),transparent_55%)] bg-ink-800">
			<div className="grid-pattern absolute inset-0 opacity-70" />
			<svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full" aria-hidden>
				{type === "research" && (
					<g>
						{Array.from({ length: 6 }).map((_, r) =>
							Array.from({ length: 9 }).map((_, c) => {
								const hot = (r * 9 + c) % 7 === 0 || (r + c) % 11 === 0;
								return (
									<ellipse
										key={`${r}-${c}`}
										cx={60 + c * 35}
										cy={50 + r * 30}
										rx="11"
										ry="8"
										fill={hot ? "#22d3ee" : "#8b5cf6"}
										opacity={hot ? 0.9 : 0.35}
									/>
								);
							})
						)}
						<rect x="40" y="0" width="320" height="3" fill="#22d3ee" opacity="0.8">
							<animate attributeName="y" values="30;220;30" dur="4s" repeatCount="indefinite" />
						</rect>
					</g>
				)}
				{type === "travel" && (
					<g>
						<path d="M30 190 C 90 150, 120 170, 170 120 S 260 90, 300 70 S 350 50, 370 40" fill="none" stroke="#22d3ee" strokeWidth="3" />
						<path d="M30 210 C 90 200, 140 190, 190 170 S 290 150, 370 120" fill="none" stroke="#8b5cf6" strokeWidth="3" opacity="0.8" />
						{[[80, 70], [150, 55], [250, 160], [320, 185], [200, 90]].map(([x, y], i) => (
							<g key={i}>
								<circle cx={x} cy={y} r="14" fill="#60a5fa" opacity="0.15" />
								<circle cx={x} cy={y} r="5" fill="#60a5fa" />
							</g>
						))}
					</g>
				)}
				{type === "revenue" && (
					<g>
						{[60, 110, 85, 150, 125, 175, 140].map((h, i) => (
							<rect key={i} x={40 + i * 34} y={220 - h} width="22" height={h} rx="4" fill={i % 2 ? "#22d3ee" : "#8b5cf6"} opacity="0.85" />
						))}
						<circle cx="330" cy="80" r="40" fill="none" stroke="rgba(148,163,214,0.25)" strokeWidth="12" />
						<circle cx="330" cy="80" r="40" fill="none" stroke="#60a5fa" strokeWidth="12" strokeDasharray="160 252" transform="rotate(-90 330 80)" />
					</g>
				)}
			</svg>
		</div>
	);
}

function ProjectMedia({ project, className = "" }: { project: Project; className?: string }) {
	return (
		<div className={`relative overflow-hidden ${className}`}>
			<div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
				{project.image ? (
					<img
						src={project.image}
						alt={`Screenshot of ${project.title}`}
						loading="lazy"
						className="h-full w-full object-cover"
					/>
				) : (
					<ProjectCover type={project.cover!} />
				)}
			</div>
		</div>
	);
}

function ProjectLinks({ project }: { project: Project }) {
	if (!project.github && !project.demo) return null;
	return (
		<div className="flex flex-wrap gap-3">
			{project.github && (
				<a
					href={project.github}
					target="_blank"
					rel="noopener noreferrer"
					className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-fg transition-colors hover:text-brand-cyan"
				>
					<Github size={16} /> View Code
				</a>
			)}
			{project.demo && (
				<a
					href={project.demo}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-violet to-brand-blue px-4 py-2 text-sm font-semibold text-white"
				>
					<ArrowUpRight size={16} /> Live Demo
				</a>
			)}
		</div>
	);
}

export function Projects() {
	const [selected, setSelected] = useState<Project | null>(null);

	return (
		<section id="projects" className="relative px-4 py-24 sm:px-6 md:py-32">
			<div className="mx-auto max-w-6xl">
				<SectionHeading eyebrow="Featured Projects" description="Research, analytics and engineering work. Select a project for the full story.">
					Selected <span className="text-gradient">work</span>
				</SectionHeading>

				<Stagger className="grid gap-8 md:grid-cols-2" stagger={0.12}>
					{projects.map((project, index) => (
						<StaggerItem key={project.title} className="h-full">
							<TiltCard intensity={6} className="h-full" rounded="rounded-3xl">
								<button
									type="button"
									onClick={() => setSelected(project)}
									className="glass-panel gradient-border flex h-full w-full flex-col overflow-hidden rounded-3xl text-left focus-visible:outline-2 focus-visible:outline-brand-cyan"
									aria-label={`Open details for ${project.title}`}
								>
									<div className="relative">
										<ProjectMedia project={project} className="aspect-[16/10]" />
										{/* Gradient overlay that deepens on hover */}
										<div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
										<span className="absolute left-5 top-5 rounded-full border border-white/15 bg-ink-950/60 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-fg backdrop-blur-md">
											{project.label}
										</span>
										<span className="absolute right-5 top-5 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/10 text-fg opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
											<Maximize2 size={16} />
										</span>
									</div>

									<div className="flex flex-1 flex-col p-6 sm:p-7">
										<p className="font-mono text-xs text-brand-cyan">{String(index + 1).padStart(2, "0")}</p>
										<h3 className="mt-2 font-display text-xl font-bold text-fg sm:text-2xl">{project.title}</h3>
										<p className="mt-3 line-clamp-3 text-sm leading-relaxed text-fg-muted">{project.description}</p>
										<div className="mt-5 flex flex-wrap gap-2">
											{project.technologies.map((tech) => (
												<span key={tech} className="rounded-full border border-line bg-ink-950/40 px-2.5 py-1 text-xs text-fg-muted">
													{tech}
												</span>
											))}
										</div>
										<span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand-violet-soft transition-colors group-hover:text-brand-cyan">
											View details
											<ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
										</span>
									</div>
								</button>
							</TiltCard>
						</StaggerItem>
					))}
				</Stagger>

				<Reveal className="mt-14 text-center">
					<a
						href={links.github}
						target="_blank"
						rel="noopener noreferrer"
						className="glass-panel group inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-fg transition-colors hover:text-brand-cyan"
					>
						<Github size={18} />
						More on GitHub
						<ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
					</a>
				</Reveal>
			</div>

			{/* Project detail modal */}
			<Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
				<DialogContent className="max-h-[90svh] overflow-y-auto rounded-3xl border-line bg-ink-800 p-0 text-fg sm:max-w-2xl">
					{selected && (
						<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
							<ProjectMedia project={selected} className="aspect-[16/8]" />
							<div className="p-6 sm:p-8">
								<p className="font-mono text-xs uppercase tracking-widest text-brand-cyan">{selected.label}</p>
								<DialogTitle className="mt-2 font-display text-2xl font-bold leading-tight sm:text-3xl">
									{selected.title}
								</DialogTitle>
								<DialogDescription className="mt-4 text-base leading-relaxed text-fg-muted">
									{selected.description}
								</DialogDescription>
								<p className="mt-6 font-mono text-xs uppercase tracking-widest text-fg-subtle">Technologies</p>
								<div className="mt-3 flex flex-wrap gap-2">
									{selected.technologies.map((tech) => (
										<span key={tech} className="rounded-full border border-brand-violet/30 bg-brand-violet/10 px-3 py-1 text-xs font-medium text-brand-violet-soft">
											{tech}
										</span>
									))}
								</div>
								<div className="mt-8">
									<ProjectLinks project={selected} />
								</div>
							</div>
						</motion.div>
					)}
				</DialogContent>
			</Dialog>
		</section>
	);
}
