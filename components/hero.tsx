"use client";

import { ArrowDown, ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { HeroVisual } from "@/components/hero-visual";
import { links } from "@/lib/links";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
	initial: { opacity: 0, y: 24 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.8, delay, ease },
});

export function Hero() {
	const nameLines = [
		{ words: ["Layanjala", "Yasashrini"], gradient: false },
		{ words: ["Jayasundara"], gradient: true },
	];

	return (
		<section
			id="home"
			className="relative flex min-h-[calc(100svh-5rem)] items-center px-4 pb-16 pt-10 sm:px-6 lg:pt-4"
		>
			<div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
				{/* Text Content */}
				<div className="relative z-10 text-center lg:text-left">
					<motion.p
						{...fadeUp(0.1)}
						className="glass-panel mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-fg-muted sm:text-sm"
					>
						<span className="relative flex h-2 w-2">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-cyan opacity-75" />
							<span className="relative inline-flex h-2 w-2 rounded-full bg-brand-cyan" />
						</span>
						BI Support Executive Intern · Prima Management Services
					</motion.p>

					<h1 className="font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight text-fg sm:text-6xl lg:text-7xl" style={{ perspective: 800 }}>
						{nameLines.map((line, li) => (
							<span key={li} className="block">
								{line.words.map((word, wi) => (
									<motion.span
										key={word}
										className={`mr-[0.25em] inline-block ${line.gradient ? "text-gradient" : ""}`}
										initial={{ opacity: 0, y: 50, rotateX: -80 }}
										animate={{ opacity: 1, y: 0, rotateX: 0 }}
										transition={{ duration: 1, delay: 0.2 + (li * 2 + wi) * 0.12, ease }}
									>
										{word}
									</motion.span>
								))}
							</span>
						))}
					</h1>

					<motion.p {...fadeUp(0.65)} className="mt-6 text-lg font-medium text-fg sm:text-xl">
						Data Analyst Enthusiast <span className="text-brand-violet-soft">|</span> BI Support Executive Intern
					</motion.p>

					<motion.p {...fadeUp(0.75)} className="mt-2 text-sm text-fg-muted sm:text-base">
						BSc (Hons) Computer Science and Technology · Uva Wellassa University of Sri Lanka
					</motion.p>

					<motion.p
						{...fadeUp(0.85)}
						className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg lg:mx-0"
					>
						Transforming complex data into meaningful insights through data analytics, business
						intelligence, and intelligent visualization.
					</motion.p>

					{/* Calls to action */}
					<motion.div
						{...fadeUp(1)}
						className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
					>
						<a
							href="#projects"
							className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-violet to-brand-blue px-7 py-3.5 font-semibold text-white shadow-[0_10px_40px_-10px_rgba(139,92,246,0.8)] transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
						>
							Explore My Work
							<ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
						</a>
						<a
							href={links.cv}
							download="Layanjala CV Resume.pdf"
							className="glass-panel group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-cyan/50 sm:w-auto"
						>
							<Download size={18} className="transition-transform duration-300 group-hover:translate-y-0.5" />
							Download CV
						</a>
						<a
							href="#contact"
							className="px-3 py-2 text-sm font-medium text-fg-muted underline-offset-4 transition-colors hover:text-brand-cyan hover:underline"
						>
							Contact Me
						</a>
					</motion.div>

					<motion.div {...fadeUp(1.15)} className="mt-8 flex justify-center gap-3 lg:justify-start">
						{[
							{ icon: Github, href: links.github, label: "GitHub" },
							{ icon: Linkedin, href: links.linkedin, label: "LinkedIn" },
							{ icon: Mail, href: links.email, label: "Email" },
						].map(({ icon: Icon, href, label }) => (
							<a
								key={label}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={label}
								className="glass-panel flex h-11 w-11 items-center justify-center rounded-full text-fg-muted transition-all duration-300 hover:-translate-y-1 hover:text-brand-cyan hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]"
							>
								<Icon size={18} />
							</a>
						))}
					</motion.div>
				</div>

				{/* 3D data scene */}
				<HeroVisual />
			</div>

			<motion.a
				href="#about"
				aria-label="Scroll to About"
				className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-fg-subtle transition-colors hover:text-brand-cyan md:block"
				animate={{ y: [0, 8, 0] }}
				transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
			>
				<ArrowDown size={22} />
			</motion.a>
		</section>
	);
}
