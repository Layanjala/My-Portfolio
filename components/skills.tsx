"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { BarChart3, Code2, Database, Layers, Workflow, Wrench } from "lucide-react";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

type Category = "Languages" | "Frameworks" | "Databases" | "Tools";

const categories: { id: Category; label: string; icon: typeof Code2 }[] = [
	{ id: "Languages", label: "Programming Languages", icon: Code2 },
	{ id: "Frameworks", label: "Frameworks & Libraries", icon: Layers },
	{ id: "Databases", label: "Databases", icon: Database },
	{ id: "Tools", label: "Tools & Platforms", icon: Wrench },
];

const skills: { name: string; short: string; category: Category }[] = [
	{ name: "SQL", short: "SQL", category: "Languages" },
	{ name: "Python", short: "Py", category: "Languages" },
	{ name: "Java", short: "Jv", category: "Languages" },
	{ name: "C", short: "C", category: "Languages" },
	{ name: "PHP", short: "PHP", category: "Languages" },
	{ name: "JavaScript", short: "JS", category: "Languages" },
	{ name: "HTML", short: "<>", category: "Languages" },
	{ name: "CSS", short: "{}", category: "Languages" },
	{ name: "Pandas", short: "Pd", category: "Frameworks" },
	{ name: "NumPy", short: "Np", category: "Frameworks" },
	{ name: "Matplotlib", short: "Mpl", category: "Frameworks" },
	{ name: "Django", short: "Dj", category: "Frameworks" },
	{ name: "Flask", short: "Fl", category: "Frameworks" },
	{ name: "React.js", short: "Re", category: "Frameworks" },
	{ name: "PostgreSQL", short: "Pg", category: "Databases" },
	{ name: "MySQL", short: "My", category: "Databases" },
	{ name: "Power BI", short: "BI", category: "Tools" },
	{ name: "Microsoft Excel", short: "Xl", category: "Tools" },
	{ name: "Microsoft Fabric", short: "Fb", category: "Tools" },
	{ name: "Jupyter Notebook", short: "Jn", category: "Tools" },
	{ name: "VS Code", short: "VS", category: "Tools" },
	{ name: "GitHub", short: "Gh", category: "Tools" },
	{ name: "Figma", short: "Fg", category: "Tools" },
];

// Technologies commonly used together; hovering one highlights its partners
const relations: [string, string[]][] = [
	["Python", ["Pandas", "NumPy", "Matplotlib", "Jupyter Notebook", "Django", "Flask"]],
	["SQL", ["PostgreSQL", "MySQL", "Power BI", "Microsoft Fabric"]],
	["Power BI", ["Microsoft Excel", "Microsoft Fabric"]],
	["JavaScript", ["React.js", "HTML", "CSS"]],
	["PHP", ["MySQL", "HTML", "CSS"]],
	["Django", ["PostgreSQL", "React.js"]],
	["Figma", ["HTML", "CSS"]],
	["VS Code", ["GitHub"]],
];

const pipeline = [
	{ icon: Code2, title: "Python", caption: "Collect & script" },
	{ icon: Workflow, title: "Data Processing", caption: "Clean & transform" },
	{ icon: Database, title: "SQL", caption: "Model & query" },
	{ icon: BarChart3, title: "Power BI", caption: "Visualize & share" },
];

const categoryStyles: Record<Category, string> = {
	Languages: "from-brand-violet/40 to-brand-violet/10 text-brand-violet-soft",
	Frameworks: "from-brand-blue/40 to-brand-blue/10 text-brand-blue",
	Databases: "from-brand-cyan/40 to-brand-cyan/10 text-brand-cyan",
	Tools: "from-brand-violet/30 to-brand-cyan/20 text-fg",
};

function DataPipeline() {
	return (
		<div className="glass-panel rounded-3xl p-6 sm:p-8">
			<p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-fg-subtle">How I work with data</p>
			<div className="flex flex-col items-stretch md:flex-row md:items-center">
				{pipeline.map(({ icon: Icon, title, caption }, i) => (
					<div key={title} className={`flex flex-col items-center md:flex-row ${i < pipeline.length - 1 ? "md:flex-1" : ""}`}>
						<motion.div
							className="gradient-border flex w-full flex-col items-center rounded-2xl border border-line bg-ink-950/40 px-4 py-5 text-center md:w-auto md:min-w-[150px]"
							initial={{ opacity: 0, scale: 0.85 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.18, duration: 0.6 }}
						>
							<span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-violet to-brand-cyan text-white shadow-[0_0_24px_rgba(139,92,246,0.5)]">
								<Icon size={20} />
							</span>
							<p className="font-semibold text-fg">{title}</p>
							<p className="mt-1 text-xs text-fg-muted">{caption}</p>
						</motion.div>
						{i < pipeline.length - 1 && (
							<>
								<div className="pipeline-track mx-3 hidden h-px flex-1 md:block">
									<span className="pipeline-dot" style={{ animationDelay: `${i * 0.6}s` }} />
								</div>
								<div className="pipeline-track pipeline-track-vertical my-2 h-8 w-px md:hidden">
									<span className="pipeline-dot" style={{ animationDelay: `${i * 0.6}s` }} />
								</div>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export function Skills() {
	const [filter, setFilter] = useState<Category | "All">("All");
	const [hovered, setHovered] = useState<string | null>(null);

	const related = useMemo(() => {
		const map = new Map<string, Set<string>>();
		const add = (a: string, b: string) => {
			if (!map.has(a)) map.set(a, new Set());
			map.get(a)!.add(b);
		};
		relations.forEach(([a, list]) =>
			list.forEach((b) => {
				add(a, b);
				add(b, a);
			})
		);
		return map;
	}, []);

	const visible = filter === "All" ? skills : skills.filter((s) => s.category === filter);
	const hoveredLinks = hovered ? related.get(hovered) : undefined;

	return (
		<section id="skills" className="relative px-4 py-24 sm:px-6 md:py-32">
			<div className="mx-auto max-w-6xl">
				<SectionHeading
					eyebrow="Skills"
					description="Hover a technology to see what it connects with in my workflow."
				>
					Technical <span className="text-gradient">expertise</span>
				</SectionHeading>

				<Reveal>
					<DataPipeline />
				</Reveal>

				{/* Category filter */}
				<Reveal delay={0.1} className="mt-14">
					<LayoutGroup>
						<div role="tablist" aria-label="Skill categories" className="glass-panel mx-auto flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-2xl p-1.5 sm:rounded-full">
							{(["All", ...categories.map((c) => c.id)] as const).map((id) => {
								const label = id === "All" ? "All" : categories.find((c) => c.id === id)!.label;
								const selected = filter === id;
								return (
									<button
										key={id}
										role="tab"
										aria-selected={selected}
										onClick={() => setFilter(id)}
										className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
											selected ? "text-white" : "text-fg-muted hover:text-fg"
										}`}
									>
										{selected && (
											<motion.span
												layoutId="skill-tab"
												className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-violet to-brand-blue"
												transition={{ type: "spring", stiffness: 380, damping: 30 }}
											/>
										)}
										<span className="relative">{label}</span>
									</button>
								);
							})}
						</div>
					</LayoutGroup>
				</Reveal>

				{/* Skill tiles */}
				<motion.div layout className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" style={{ perspective: 1000 }}>
					<AnimatePresence mode="popLayout">
						{visible.map((skill, i) => {
							const isHovered = hovered === skill.name;
							const isLinked = hoveredLinks?.has(skill.name) ?? false;
							const dimmed = hovered !== null && !isHovered && !isLinked;
							const category = categories.find((c) => c.id === skill.category)!;

							return (
								<motion.div
									key={skill.name}
									layout
									initial={{ opacity: 0, y: 20, rotateX: -30 }}
									animate={{ opacity: dimmed ? 0.35 : 1, y: 0, rotateX: 0 }}
									exit={{ opacity: 0, scale: 0.9 }}
									transition={{ duration: 0.4, delay: Math.min(i * 0.02, 0.3) }}
									whileHover={{ y: -6, rotateX: 8, rotateY: -8 }}
									onHoverStart={() => setHovered(skill.name)}
									onHoverEnd={() => setHovered(null)}
									data-active={isLinked || isHovered}
									className={`glass-panel gradient-border flex items-center gap-3 rounded-2xl p-3 sm:p-4 ${
										isLinked ? "ring-1 ring-brand-cyan/50" : ""
									}`}
								>
									<span
										className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-mono text-xs font-bold sm:h-11 sm:w-11 sm:text-sm ring-1 ring-white/10 ${categoryStyles[skill.category]}`}
									>
										{skill.short}
									</span>
									<div className="min-w-0">
										<p className="text-sm font-semibold leading-tight text-fg sm:truncate sm:text-base">{skill.name}</p>
										<p className="hidden truncate text-xs text-fg-subtle sm:block">{category.label}</p>
									</div>
								</motion.div>
							);
						})}
					</AnimatePresence>
				</motion.div>
			</div>
		</section>
	);
}
