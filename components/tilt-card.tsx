"use client";

import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
	useTransform,
} from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

// Wraps content in a card that tilts in 3D toward the cursor, with a moving glare
export function TiltCard({
	children,
	className = "",
	intensity = 10,
	rounded = "rounded-2xl",
}: {
	children: ReactNode;
	className?: string;
	intensity?: number;
	rounded?: string;
}) {
	const x = useMotionValue(0.5);
	const y = useMotionValue(0.5);

	const spring = { stiffness: 180, damping: 18 };
	const rotateX = useSpring(
		useTransform(y, [0, 1], [intensity, -intensity]),
		spring
	);
	const rotateY = useSpring(
		useTransform(x, [0, 1], [-intensity, intensity]),
		spring
	);

	const glareX = useTransform(x, [0, 1], ["0%", "100%"]);
	const glareY = useTransform(y, [0, 1], ["0%", "100%"]);
	const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(167,139,250,0.22), transparent 55%)`;

	const handleMove = (e: MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		x.set((e.clientX - rect.left) / rect.width);
		y.set((e.clientY - rect.top) / rect.height);
	};

	const handleLeave = () => {
		x.set(0.5);
		y.set(0.5);
	};

	return (
		<div className={className} style={{ perspective: 1100 }}>
			<motion.div
				className={`group relative h-full ${rounded}`}
				onMouseMove={handleMove}
				onMouseLeave={handleLeave}
				whileHover={{ scale: 1.02 }}
				transition={{ type: "spring", stiffness: 260, damping: 22 }}
				style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
			>
				{children}
				<motion.div
					aria-hidden
					className={`pointer-events-none absolute inset-0 ${rounded} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
					style={{ background: glare }}
				/>
			</motion.div>
		</div>
	);
}
