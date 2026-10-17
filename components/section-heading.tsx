"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

// Eyebrow + large display title that flips up in 3D when scrolled into view
export function SectionHeading({
	eyebrow,
	children,
	description,
	align = "center",
}: {
	eyebrow: string;
	children: ReactNode;
	description?: ReactNode;
	align?: "center" | "left";
}) {
	const centered = align === "center";

	return (
		<div
			className={`relative mb-14 md:mb-20 ${centered ? "text-center mx-auto" : ""} max-w-3xl`}
			style={{ perspective: 800 }}
		>
			{/* Soft glow behind the title */}
			<motion.div
				aria-hidden
				initial={{ opacity: 0, scale: 0.6 }}
				whileInView={{ opacity: 1, scale: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 1.2, ease: "easeOut" }}
				className={`pointer-events-none absolute top-6 h-24 w-72 rounded-full bg-brand-violet/25 blur-3xl ${
					centered ? "left-1/2 -translate-x-1/2" : "left-0"
				}`}
			/>

			<motion.p
				initial={{ opacity: 0, y: 12 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, ease }}
				className={`relative mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-brand-cyan`}
			>
				<span className="h-px w-8 bg-gradient-to-r from-transparent to-brand-cyan" />
				{eyebrow}
				{centered && (
					<span className="h-px w-8 bg-gradient-to-l from-transparent to-brand-cyan" />
				)}
			</motion.p>

			<motion.h2
				initial={{ opacity: 0, y: 30, rotateX: 75 }}
				whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
				viewport={{ once: true }}
				transition={{ delay: 0.1, duration: 0.9, ease }}
				className="relative font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl md:text-6xl"
			>
				{children}
			</motion.h2>

			{description && (
				<motion.p
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.25, duration: 0.7, ease }}
					className="relative mt-5 text-base leading-relaxed text-fg-muted md:text-lg"
				>
					{description}
				</motion.p>
			)}
		</div>
	);
}
