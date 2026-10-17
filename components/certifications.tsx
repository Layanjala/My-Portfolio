"use client";

import { BadgeCheck, Hourglass } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const certifications = [
	{ name: "Programming in Python", issuer: "Open Learning Platform, University of Moratuwa", ongoing: false },
	{ name: "Toastmasters International", issuer: "Level 1 of Presentation Mastery", ongoing: false },
	{ name: "AI/ML Engineer – Stage 1", issuer: "Centre for Open and Distance Education, SLIIT", ongoing: false },
	{ name: "AI/ML Engineer – Stage 2", issuer: "Centre for Open and Distance Education, SLIIT", ongoing: true },
];

export function Certifications() {
	return (
		<section id="certifications" className="relative px-4 py-24 sm:px-6 md:py-32">
			<div className="mx-auto max-w-6xl">
				<SectionHeading eyebrow="Certifications" description="Continuous learning across programming, communication and AI/ML.">
					Always <span className="text-gradient">learning</span>
				</SectionHeading>

				<Stagger className="grid gap-5 sm:grid-cols-2" stagger={0.1}>
					{certifications.map((cert) => (
						<StaggerItem key={cert.name}>
							<div className="glass-panel gradient-border flex h-full flex-col rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
								<div className="flex items-start justify-between gap-4">
									<h3 className="font-display text-lg font-bold text-fg">{cert.name}</h3>
									{cert.ongoing ? (
										<span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-blue/40 bg-brand-blue/10 px-3 py-1 font-mono text-[11px] text-brand-blue">
											<Hourglass size={12} className="animate-pulse" /> Ongoing
										</span>
									) : (
										<span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-cyan/40 bg-brand-cyan/10 px-3 py-1 font-mono text-[11px] text-brand-cyan">
											<BadgeCheck size={12} /> Completed
										</span>
									)}
								</div>
								<p className="mt-3 text-sm text-fg-muted">{cert.issuer}</p>
							</div>
						</StaggerItem>
					))}
				</Stagger>
			</div>
		</section>
	);
}
