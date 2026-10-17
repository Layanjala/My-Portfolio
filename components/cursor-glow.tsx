"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

// Soft light that trails the cursor on desktop; skipped on touch devices and for reduced motion
export function CursorGlow() {
	const [enabled, setEnabled] = useState(false);
	const x = useMotionValue(-400);
	const y = useMotionValue(-400);
	const smoothX = useSpring(x, { stiffness: 120, damping: 20 });
	const smoothY = useSpring(y, { stiffness: 120, damping: 20 });

	useEffect(() => {
		const finePointer = window.matchMedia("(pointer: fine)").matches;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (!finePointer || reduced) return;

		setEnabled(true);
		const move = (e: PointerEvent) => {
			x.set(e.clientX - 200);
			y.set(e.clientY - 200);
		};
		window.addEventListener("pointermove", move);
		return () => window.removeEventListener("pointermove", move);
	}, [x, y]);

	if (!enabled) return null;

	return (
		<motion.div
			aria-hidden
			className="pointer-events-none fixed left-0 top-0 z-[1] h-[400px] w-[400px] rounded-full"
			style={{
				x: smoothX,
				y: smoothY,
				background:
					"radial-gradient(circle, rgba(139,92,246,0.13) 0%, rgba(34,211,238,0.05) 40%, transparent 70%)",
			}}
		/>
	);
}
