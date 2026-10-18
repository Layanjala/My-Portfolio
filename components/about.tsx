"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TiltCard } from "@/components/tilt-card";

// Titles that follow the ghost across the screen
const ghostTrail = [
	"Intern BI Support Executive",
	"IEEE WIE Chairperson",
	"IEEE SLI Finance Vice Chair",
	"Student Leader · Bank of Ceylon",
];

// Profile photo that flips on load (and on click) to reveal a waving "Hi There!" bubble
function ProfilePhoto() {
	const [flipped, setFlipped] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setFlipped(true), 800);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="flex flex-col items-center">
			<motion.div
				className="relative"
				style={{ perspective: 1000, transformStyle: "preserve-3d" }}
				animate={{ y: [0, -10, 0] }}
				transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
			>
				<div className="orbit-ring orbit-ring-1" />
				<div className="orbit-ring orbit-ring-2" />
				<motion.button
					type="button"
					aria-label="Flip profile photo"
					className="relative block h-44 w-44 cursor-pointer overflow-hidden rounded-full ring-2 ring-brand-violet/50 shadow-[0_0_60px_rgba(139,92,246,0.55)] sm:h-52 sm:w-52"
					onClick={() => setFlipped((prev) => !prev)}
					animate={{ rotateY: flipped ? 360 : 0, scale: flipped ? 1.06 : 1 }}
					transition={{ duration: 0.9, ease: "easeInOut" }}
				>
					<Image
						src="/Proffesional headshot.png"
						alt="Portrait of Layanjala Yasashrini Jayasundara"
						fill
						sizes="208px"
						className="object-cover"
					/>
				</motion.button>
			</motion.div>

			<div className="mt-10 h-10">
				<AnimatePresence>
					{flipped && (
						<motion.div
							className="glass-panel flex items-center gap-2 rounded-full px-4 py-2"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.5, delay: 0.6 }}
						>
							<motion.span
								className="text-xl"
								animate={{ rotate: [0, 20, -20, 20, -20, 0] }}
								transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
							>
								👋
							</motion.span>
							<span className="font-semibold text-fg">Hi There!</span>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}

// Illustrative mini dashboard: a line chart that draws itself, growing bars and a donut ring
function InsightDashboard() {
	const bars = [42, 68, 55, 82, 64, 90, 74];

	return (
		<TiltCard intensity={8}>
			<div className="glass-panel gradient-border rounded-2xl p-5 sm:p-6">
				<div className="mb-5 flex items-center justify-between">
					<div className="flex gap-1.5">
						<span className="h-2.5 w-2.5 rounded-full bg-brand-violet/70" />
						<span className="h-2.5 w-2.5 rounded-full bg-brand-blue/70" />
						<span className="h-2.5 w-2.5 rounded-full bg-brand-cyan/70" />
					</div>
					<span className="font-mono text-xs text-fg-subtle">data → model → insight</span>
				</div>

				{/* Line chart */}
				<div className="rounded-xl border border-line bg-ink-950/40 p-4">
					<p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-fg-subtle">Trend</p>
					<svg viewBox="0 0 300 100" className="h-28 w-full" aria-hidden>
						<defs>
							<linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
								<stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
							</linearGradient>
							<linearGradient id="trendLine" x1="0" y1="0" x2="1" y2="0">
								<stop offset="0%" stopColor="#8b5cf6" />
								<stop offset="100%" stopColor="#22d3ee" />
							</linearGradient>
						</defs>
						{[25, 50, 75].map((y) => (
							<line key={y} x1="0" x2="300" y1={y} y2={y} stroke="rgba(148,163,214,0.12)" strokeDasharray="4 6" />
						))}
						<motion.path
							d="M0 80 C 30 70, 50 72, 75 60 S 120 30, 150 42 S 200 70, 225 40 S 270 18, 300 14 L 300 100 L 0 100 Z"
							fill="url(#trendFill)"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 1, duration: 1 }}
						/>
						<motion.path
							d="M0 80 C 30 70, 50 72, 75 60 S 120 30, 150 42 S 200 70, 225 40 S 270 18, 300 14"
							fill="none"
							stroke="url(#trendLine)"
							strokeWidth="2.5"
							strokeLinecap="round"
							initial={{ pathLength: 0 }}
							whileInView={{ pathLength: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 1.8, ease: "easeInOut" }}
						/>
					</svg>
				</div>

				<div className="mt-4 grid grid-cols-[1.4fr_1fr] gap-4">
					{/* Bars */}
					<div className="rounded-xl border border-line bg-ink-950/40 p-4">
						<p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-fg-subtle">Categories</p>
						<div className="flex h-24 items-end gap-1.5">
							{bars.map((h, i) => (
								<motion.div
									key={i}
									className="flex-1 rounded-t bg-gradient-to-t from-brand-violet to-brand-cyan"
									initial={{ height: 0 }}
									whileInView={{ height: `${h}%` }}
									viewport={{ once: true }}
									transition={{ delay: 0.3 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
								/>
							))}
						</div>
					</div>

					{/* Donut */}
					<div className="flex flex-col items-center justify-center rounded-xl border border-line bg-ink-950/40 p-4">
						<svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90" aria-hidden>
							<circle cx="50" cy="50" r="38" fill="none" stroke="rgba(148,163,214,0.15)" strokeWidth="10" />
							<motion.circle
								cx="50"
								cy="50"
								r="38"
								fill="none"
								stroke="#22d3ee"
								strokeWidth="10"
								strokeLinecap="round"
								initial={{ pathLength: 0 }}
								whileInView={{ pathLength: 0.62 }}
								viewport={{ once: true }}
								transition={{ delay: 0.6, duration: 1.4, ease: "easeOut" }}
							/>
							<motion.circle
								cx="50"
								cy="50"
								r="24"
								fill="none"
								stroke="#8b5cf6"
								strokeWidth="8"
								strokeLinecap="round"
								initial={{ pathLength: 0 }}
								whileInView={{ pathLength: 0.4 }}
								viewport={{ once: true }}
								transition={{ delay: 0.9, duration: 1.4, ease: "easeOut" }}
							/>
						</svg>
						<p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-fg-subtle">Segments</p>
					</div>
				</div>
			</div>
		</TiltCard>
	);
}

export function About() {
	return (
		<section id="about" className="relative px-4 py-24 sm:px-6 md:py-32">
			<div className="mx-auto max-w-6xl">
				<SectionHeading eyebrow="About Me" description="A data-driven mind with a builder's toolkit.">
					Turning data into <span className="text-gradient">decisions</span>
				</SectionHeading>

				<div className="grid items-center gap-14 lg:grid-cols-2">
					<div>
						<Reveal className="mb-10 flex justify-center lg:justify-start lg:pl-10">
							<ProfilePhoto />
						</Reveal>
						<Reveal delay={0.1}>
							<p className="text-lg leading-relaxed text-fg">
								Motivated Computer Science and Technology graduate awaiting graduation, with practical
								experience as a BI Support Executive Intern. Skilled in Power BI, Microsoft Fabric, SQL,
								data processing, data modelling, and developing insightful dashboards.
							</p>
						</Reveal>
						<Reveal delay={0.2}>
							<p className="mt-5 text-lg leading-relaxed text-fg-muted">
								Eager to expand my expertise in financial data analytics and apparel industry data,
								applying technology and analytical thinking to improve business decisions,
								merchandising, production planning, and supply chain operations. Passionate about
								continuous learning and exploring opportunities at the intersection of data, finance,
								and the apparel industry.
							</p>
						</Reveal>
					</div>

					<Reveal delay={0.15}>
						<InsightDashboard />
					</Reveal>
				</div>

				{/* Ghost floats across the full width, pulling a trail of role badges */}
				<div className="relative left-1/2 my-16 h-64 w-screen -translate-x-1/2 overflow-hidden md:h-80">
					<motion.div
						className="absolute top-1/2 flex items-center gap-4"
						initial={{ left: "100%", x: "0%" }}
						animate={{ left: "0%", x: "-100%" }}
						transition={{
							repeat: Infinity,
							repeatType: "loop",
							duration: 30,
							ease: "linear",
						}}
						style={{ translateY: "-50%" }}
					>
						{/* Ghost bobs up and down while it travels */}
						<motion.div
							className="relative h-[155px] w-[100px] shrink-0 drop-shadow-[0_0_35px_rgba(167,139,250,0.85)] md:h-[232px] md:w-[150px]"
							animate={{ y: [0, -25, 0], rotate: [-4, 4, -4] }}
							transition={{
								duration: 2.4,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						>
							{/* The GIF is 360x360 but the ghost only fills x 138-222, y 111-241, so crop to it */}
							<Image
								src="/download-unscreen.gif"
								alt="Animated ghost mascot"
								width={360}
								height={360}
								className="absolute max-w-none"
								style={{ width: "428.57%", height: "276.92%", left: "-164.29%", top: "-85.38%" }}
								unoptimized
							/>
						</motion.div>

						{/* Following badges, each bobbing slightly out of step like a trail */}
						{ghostTrail.map((title, i) => (
							<motion.div
								key={title}
								className="glass-panel whitespace-nowrap rounded-xl px-4 py-2 text-base font-semibold text-fg shadow-[0_0_30px_rgba(139,92,246,0.45)] md:px-5 md:py-2.5 md:text-xl"
								animate={{ y: [0, -12, 0], scale: [1, 1.05, 1] }}
								transition={{
									duration: 2.4,
									delay: (i + 1) * 0.25,
									repeat: Infinity,
									ease: "easeInOut",
								}}
							>
								<span className="mr-2 inline-block h-2 w-2 rounded-full bg-brand-cyan align-middle shadow-[0_0_8px_#22d3ee]" />
								{title}
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
