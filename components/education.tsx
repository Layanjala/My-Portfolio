"use client";

import {
	Award,
	CalendarDays,
	GraduationCap,
	Landmark,
	Star,
	Users,
} from "lucide-react";
import { Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const facts = [
	{ icon: GraduationCap, label: "Degree", value: "BSc (Hons) Computer Science and Technology" },
	{ icon: Landmark, label: "University", value: "Uva Wellassa University of Sri Lanka" },
	{ icon: CalendarDays, label: "Status", value: "Since 2022 · Awaiting graduation" },
	{ icon: Star, label: "Current cumulative GPA", value: "3.67" },
	{ icon: Award, label: "Academic standing", value: "Dean's List" },
	{ icon: Users, label: "IEEE", value: "Active member · Former WIE Chairperson" },
];

export function Education() {
	return (
		<section id="education" className="relative px-4 py-24 sm:px-6 md:py-32">
			<div className="mx-auto max-w-6xl">
				<SectionHeading eyebrow="Education" description="Building strong foundations in computer science and technology.">
					Academic <span className="text-gradient">journey</span>
				</SectionHeading>

				<Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{facts.map(({ icon: Icon, label, value }) => (
						<StaggerItem key={label}>
							<div className="glass-panel gradient-border group flex h-full items-start gap-4 rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1">
								<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-violet/30 to-brand-cyan/20 text-brand-cyan ring-1 ring-brand-violet/30 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
									<Icon size={20} />
								</span>
								<div>
									<p className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">{label}</p>
									<p className="mt-1 font-semibold text-fg">{value}</p>
								</div>
							</div>
						</StaggerItem>
					))}
				</Stagger>
			</div>
		</section>
	);
}
