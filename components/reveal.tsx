"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

// Fades and lifts its content in the first time it scrolls into view
export function Reveal({
	children,
	className,
	delay = 0,
	y = 24,
}: {
	children: ReactNode;
	className?: string;
	delay?: number;
	y?: number;
}) {
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.7, delay, ease }}
		>
			{children}
		</motion.div>
	);
}

const container: Variants = {
	hidden: {},
	show: (stagger: number) => ({
		transition: { staggerChildren: stagger },
	}),
};

export const staggerItem: Variants = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

// Reveals its StaggerItem children one after another
export function Stagger({
	children,
	className,
	stagger = 0.08,
	as = "div",
}: {
	children: ReactNode;
	className?: string;
	stagger?: number;
	as?: "div" | "ul";
}) {
	const Component = as === "ul" ? motion.ul : motion.div;
	return (
		<Component
			className={className}
			variants={container}
			custom={stagger}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, margin: "-80px" }}
		>
			{children}
		</Component>
	);
}

export function StaggerItem({
	children,
	className,
	as = "div",
}: {
	children: ReactNode;
	className?: string;
	as?: "div" | "li";
}) {
	const Component = as === "li" ? motion.li : motion.div;
	return (
		<Component className={className} variants={staggerItem}>
			{children}
		</Component>
	);
}
