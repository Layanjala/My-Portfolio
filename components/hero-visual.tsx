"use client";

import dynamic from "next/dynamic";
import {
	motion,
	useMotionValue,
	useSpring,
	useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent } from "react";

// CSS-only stand-in shown while the WebGL scene loads, or when WebGL is unavailable
function SceneFallback() {
	return (
		<div className="absolute inset-0 flex items-center justify-center" style={{ perspective: 900 }}>
			<div className="relative h-48 w-48 md:h-60 md:w-60">
				<div className="orbit-ring orbit-ring-1" />
				<div className="orbit-ring orbit-ring-2" />
				<div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#a78bfa,#4c1d95_55%,#0d1428_80%)] shadow-[0_0_80px_rgba(139,92,246,0.55)]" />
			</div>
		</div>
	);
}

const HeroScene = dynamic(() => import("@/components/hero-scene"), {
	ssr: false,
	loading: () => <SceneFallback />,
});

const labels = [
	{ text: "Power BI", className: "left-[4%] top-[18%]", depth: 30 },
	{ text: "Python", className: "right-[2%] top-[8%]", depth: 45 },
	{ text: "SQL", className: "right-[8%] bottom-[22%]", depth: 25 },
	{ text: "DAX", className: "left-[10%] bottom-[10%]", depth: 40 },
	{ text: "Microsoft Fabric", className: "left-[34%] top-[2%]", depth: 20 },
];

function hasWebGL() {
	try {
		const canvas = document.createElement("canvas");
		return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
	} catch {
		return false;
	}
}

// Hero 3D data scene plus floating tech labels that drift with the pointer
export function HeroVisual() {
	const ref = useRef<HTMLDivElement>(null);
	const [webgl, setWebgl] = useState<boolean | null>(null);
	const [active, setActive] = useState(true);
	const [reduced, setReduced] = useState(false);
	const [compact, setCompact] = useState(false);

	const px = useMotionValue(0);
	const py = useMotionValue(0);
	const sx = useSpring(px, { stiffness: 80, damping: 18 });
	const sy = useSpring(py, { stiffness: 80, damping: 18 });

	useEffect(() => {
		setWebgl(hasWebGL());
		setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
		setCompact(window.innerWidth < 768);

		// Pause rendering while the hero is scrolled out of view
		const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	const handleMove = (e: MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		px.set((e.clientX - rect.left) / rect.width - 0.5);
		py.set((e.clientY - rect.top) / rect.height - 0.5);
	};

	return (
		<div
			ref={ref}
			className="relative h-[340px] w-full sm:h-[420px] lg:h-[560px]"
			onMouseMove={handleMove}
			onMouseLeave={() => {
				px.set(0);
				py.set(0);
			}}
		>
			<motion.div
				className="absolute inset-0"
				initial={{ opacity: 0, scale: 0.92 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
			>
				{webgl ? (
					<HeroScene active={active} reduced={reduced} compact={compact} />
				) : (
					<SceneFallback />
				)}
			</motion.div>

			{labels.map((label, i) => (
				<FloatingLabel key={label.text} {...label} index={i} sx={sx} sy={sy} />
			))}
		</div>
	);
}

function FloatingLabel({
	text,
	className,
	depth,
	index,
	sx,
	sy,
}: {
	text: string;
	className: string;
	depth: number;
	index: number;
	sx: ReturnType<typeof useSpring>;
	sy: ReturnType<typeof useSpring>;
}) {
	const x = useTransform(sx, (v) => v * depth);
	const y = useTransform(sy, (v) => v * depth);

	return (
		<motion.div className={`pointer-events-none absolute ${className}`} style={{ x, y }}>
			<motion.span
				className="glass-panel inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] tracking-wide text-fg sm:text-xs"
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: [0, -8, 0] }}
				transition={{
					opacity: { delay: 1 + index * 0.15, duration: 0.6 },
					y: { delay: 1 + index * 0.15, duration: 4 + index * 0.4, repeat: Infinity, ease: "easeInOut" },
				}}
			>
				<span className="h-1.5 w-1.5 rounded-full bg-brand-cyan shadow-[0_0_8px_#22d3ee]" />
				{text}
			</motion.span>
		</motion.div>
	);
}
