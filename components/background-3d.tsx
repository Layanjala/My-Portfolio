"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Star = { left: number; top: number; size: number; delay: number };

// Fixed, decorative scene behind the page: ambient light pools, a fine grid, data-point particles and a grid floor
export function Background3D() {
	// Generated on the client only so server and client markup match
	const [stars, setStars] = useState<Star[]>([]);

	useEffect(() => {
		const count = window.innerWidth < 768 ? 30 : 60;
		setStars(
			Array.from({ length: count }, () => ({
				left: Math.random() * 100,
				top: Math.random() * 100,
				size: Math.random() * 2 + 1,
				delay: Math.random() * 4,
			}))
		);
	}, []);

	const orbs = [
		{ className: "w-[32rem] h-[32rem] bg-brand-violet/20 top-[-10%] left-[-10%]", x: [0, 80, 0], y: [0, 60, 0], duration: 22 },
		{ className: "w-[30rem] h-[30rem] bg-brand-blue/15 top-[35%] right-[-15%]", x: [0, -90, 0], y: [0, -50, 0], duration: 26 },
		{ className: "w-[26rem] h-[26rem] bg-brand-cyan/10 bottom-[-10%] left-[25%]", x: [0, 60, -40, 0], y: [0, -70, 0], duration: 30 },
	];

	return (
		<div
			aria-hidden
			className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
		>
			{orbs.map((orb, i) => (
				<motion.div
					key={i}
					className={`absolute rounded-full blur-3xl ${orb.className}`}
					animate={{ x: orb.x, y: orb.y }}
					transition={{
						duration: orb.duration,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			))}

			<div className="grid-pattern absolute inset-0" />

			{stars.map((star, i) => (
				<span
					key={i}
					className="absolute rounded-full bg-brand-cyan animate-twinkle"
					style={{
						left: `${star.left}%`,
						top: `${star.top}%`,
						width: star.size,
						height: star.size,
						animationDelay: `${star.delay}s`,
					}}
				/>
			))}

			<div className="grid-floor-wrap">
				<div className="grid-floor" />
			</div>
		</div>
	);
}
