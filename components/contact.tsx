"use client";

import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { NetworkCanvas } from "@/components/network-canvas";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { links } from "@/lib/links";

const channels = [
	{ icon: Mail, label: "Email", value: links.emailAddress, href: links.email, external: true },
	{ icon: Linkedin, label: "LinkedIn", value: "Yasashrini Jayasundara", href: links.linkedin, external: true },
	{ icon: Github, label: "GitHub", value: "github.com/Layanjala", href: links.github, external: true },
	{ icon: Phone, label: "Phone", value: links.phoneDisplay, href: links.phone, external: false },
];

export function Contact() {
	return (
		<section id="contact" className="relative overflow-hidden px-4 py-24 sm:px-6 md:py-32">
			<div className="mx-auto max-w-6xl">
				<div className="glass-panel relative overflow-hidden rounded-[2rem] px-6 py-14 sm:px-12 md:py-20">
					{/* Connected-node network behind the content */}
					<NetworkCanvas className="pointer-events-none absolute inset-0 h-full w-full opacity-70 lg:left-1/3" />
					<div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/80 to-transparent" />

					<div className="relative max-w-2xl">
						<Reveal>
							<p className="mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-brand-cyan">
								<span className="h-px w-8 bg-gradient-to-r from-transparent to-brand-cyan" />
								Contact
							</p>
						</Reveal>
						<Reveal delay={0.1}>
							<h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-fg sm:text-5xl md:text-6xl">
								Let&apos;s Turn Data Into <span className="text-gradient">Meaningful Insights.</span>
							</h2>
						</Reveal>
						<Reveal delay={0.2}>
							<p className="mt-6 text-lg leading-relaxed text-fg-muted">
								I&apos;m always excited to explore opportunities in data analytics, business intelligence,
								data engineering, and software development.
							</p>
						</Reveal>
						<Reveal delay={0.3}>
							<div className="mt-9 flex flex-wrap items-center gap-4">
								<a
									href={links.email}
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-violet to-brand-blue px-7 py-3.5 font-semibold text-white shadow-[0_10px_40px_-10px_rgba(139,92,246,0.8)] transition-transform duration-300 hover:-translate-y-0.5"
								>
									<Mail size={18} />
									Get In Touch
									<ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
								</a>
								<span className="inline-flex items-center gap-2 text-sm text-fg-muted">
									<MapPin size={16} className="text-brand-cyan" /> {links.location}
								</span>
							</div>
						</Reveal>
					</div>

					<Stagger className="relative mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
						{channels.map(({ icon: Icon, label, value, href, external }) => (
							<StaggerItem key={label}>
								<a
									href={href}
									target={external ? "_blank" : undefined}
									rel={external ? "noopener noreferrer" : undefined}
									className="group flex h-full items-center gap-4 rounded-2xl border border-line bg-ink-950/50 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/40"
								>
									<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-violet/30 to-brand-cyan/20 text-brand-cyan transition-transform duration-300 group-hover:scale-110">
										<Icon size={20} />
									</span>
									<span className="min-w-0">
										<span className="block font-mono text-[11px] uppercase tracking-widest text-fg-subtle">{label}</span>
										<span className="block truncate text-sm font-medium text-fg">{value}</span>
									</span>
								</a>
							</StaggerItem>
						))}
					</Stagger>
				</div>
			</div>
		</section>
	);
}
