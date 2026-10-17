"use client";

import { Code2, GraduationCap, Mic, Trophy, Users } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const roles = [
	{
		organization: "IEEE Student Branch, Uva Wellassa University — WIE Affinity Group",
		positions: [
			{ title: "Chairperson", period: "April 2025 – March 2026" },
			{ title: "Vice Chairperson", period: "January 2024 – April 2025" },
		],
	},
	{
		organization: "IEEE Young Professionals Sri Lanka — SLI National Project",
		positions: [
			{ title: "Vice Chairperson – Finance", period: "2025" },
			{ title: "Member Coordinator", period: "2024" },
		],
	},
];

const achievements = [
	{ icon: GraduationCap, title: "Dean's List", detail: "Uva Wellassa University" },
	{ icon: Code2, title: "IEEEXtreme Programming Competition", detail: "Participation · 2024, 2025" },
	{ icon: Code2, title: "UvaXtreme Programming Competition", detail: "Participation · 2024" },
	{ icon: Mic, title: "EngWrangle Debate Competition", detail: "CSI Department of UWU · Winners, 2022" },
];

export function Leadership() {
	return (
		<section id="leadership" className="relative px-4 py-24 sm:px-6 md:py-32">
			<div className="mx-auto max-w-6xl">
				<SectionHeading
					eyebrow="Leadership & Achievements"
					description="Leading teams, managing finances and coordinating members across IEEE communities."
				>
					Leading with <span className="text-gradient">purpose</span>
				</SectionHeading>

				<div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
					{/* Leadership timeline */}
					<Stagger className="space-y-6" stagger={0.15}>
						{roles.map((role) => (
							<StaggerItem key={role.organization}>
								<div className="glass-panel gradient-border rounded-3xl p-6 sm:p-7">
									<div className="mb-6 flex items-start gap-4">
										<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-violet to-brand-blue text-white">
											<Users size={20} />
										</span>
										<h3 className="font-display text-lg font-bold leading-snug text-fg sm:text-xl">{role.organization}</h3>
									</div>
									<ol className="relative ml-5 space-y-5 border-l border-line pl-6">
										{role.positions.map((position) => (
											<li key={position.title} className="relative">
												<span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-brand-cyan bg-ink-900 shadow-[0_0_10px_#22d3ee]" />
												<p className="font-semibold text-fg">{position.title}</p>
												<p className="mt-0.5 font-mono text-xs text-fg-muted">{position.period}</p>
											</li>
										))}
									</ol>
								</div>
							</StaggerItem>
						))}
					</Stagger>

					{/* Achievements */}
					<div>
						<Reveal>
							<p className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-fg-subtle">
								<Trophy size={14} className="text-brand-cyan" /> Achievements
							</p>
						</Reveal>
						<Stagger className="grid gap-4" stagger={0.1}>
							{achievements.map(({ icon: Icon, title, detail }) => (
								<StaggerItem key={title}>
									<div className="glass-panel shine group flex items-center gap-4 rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1">
										<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-violet/40 to-brand-cyan/30 text-brand-cyan ring-1 ring-brand-cyan/30 transition-transform duration-500 group-hover:rotate-[360deg]">
											<Icon size={20} />
										</span>
										<div>
											<p className="font-semibold text-fg">{title}</p>
											<p className="mt-0.5 text-sm text-fg-muted">{detail}</p>
										</div>
									</div>
								</StaggerItem>
							))}
						</Stagger>
					</div>
				</div>
			</div>
		</section>
	);
}
