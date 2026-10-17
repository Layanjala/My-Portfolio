"use client";

import { motion } from "framer-motion";
import { Clock, GraduationCap, Mic, Puzzle, Rocket, Users } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const strengths = [
	{ icon: Users, label: "Leadership and teamwork" },
	{ icon: Rocket, label: "Self-motivation and adaptability" },
	{ icon: Puzzle, label: "Problem-solving" },
	{ icon: Mic, label: "Public speaking and communication" },
	{ icon: Clock, label: "Effective time management" },
	{ icon: GraduationCap, label: "Dean's List academic standing" },
];

export function Strengths() {
	return (
		<section id="strengths" className="relative px-4 py-20 sm:px-6 md:py-28">
			<div className="mx-auto max-w-6xl">
				<SectionHeading eyebrow="Why Work With Me">
					What I bring to a <span className="text-gradient">team</span>
				</SectionHeading>

				<Stagger className="grid grid-cols-2 gap-4 md:grid-cols-3" stagger={0.08}>
					{strengths.map(({ icon: Icon, label }, i) => (
						<StaggerItem key={label}>
							<div className="glass-panel group flex h-full flex-col items-center gap-4 rounded-2xl p-6 text-center transition-colors duration-300 hover:border-brand-violet/40">
								<motion.span
									className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-violet/30 to-brand-cyan/20 text-brand-cyan shadow-[0_0_30px_-6px_rgba(139,92,246,0.6)] ring-1 ring-brand-violet/30"
									animate={{ y: [0, -5, 0] }}
									transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
								>
									<Icon size={24} className="transition-transform duration-300 group-hover:scale-125" />
								</motion.span>
								<p className="text-sm font-semibold text-fg sm:text-base">{label}</p>
							</div>
						</StaggerItem>
					))}
				</Stagger>
			</div>
		</section>
	);
}
