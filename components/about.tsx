"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function About() {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.1 }
		);

		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<section id="about" className="py-16 md:py-24 px-4" ref={ref}>
			<div className="max-w-6xl mx-auto">
				{/* <h2
					className={`text-4xl font-bold mb-12 text-center drop-shadow-[0_0_25px_rgba(216,180,254,0.7)] transition-all duration-700 ${
						isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"
					}`}
					style={{
						color: "#d0beb5",
					}}
				>
					About Me
				</h2> */}

				<div className="relative flex flex-col items-center justify-center mb-12">
					{/* Smoke Layer (appears first, oval shape) */}
					<motion.div
						initial={{ opacity: 0, scale: 0.6, filter: "blur(20px)" }}
						animate={{ opacity: 1, scale: 1.1, filter: "blur(25px)" }}
						transition={{
							duration: 1.2,
							ease: "easeOut",
						}}
						className="absolute left-1/2 top-1/2 w-72 h-20 bg-purple-500/40 rounded-full -translate-x-1/2 -translate-y-1/2"
					/>

					{/* Smoke settles behind text */}
					<motion.div
						initial={{ opacity: 1, scale: 1.1 }}
						animate={{ opacity: 0.5, scale: 1 }}
						transition={{
							delay: 1.2,
							duration: 1,
							ease: "easeOut",
						}}
						className="absolute left-1/2 top-1/2 w-72 h-20 bg-purple-500/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"
					/>

					{/* Text Reveal */}
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							delay: 0.9,
							duration: 0.6,
							ease: "easeOut",
						}}
						className="relative mb-8 text-4xl font-bold text-white drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]"
					>
						About Me
					</motion.p>
				</div>

				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div
						className={`space-y-6 transition-all duration-700 ${
							isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-10"
						}`}
					>
						<p
							className="text-lg leading-relaxed"
							style={{
								color: "#c2e7d9",
							}}
						>
							Motivated Computer Science undergraduate with a strong passion for
							software development. Seeking a Software Engineer Internship to
							apply problem-solving abilities and technical expertise. Skilled
							in learning new technologies and dedicated to contributing
							effectively to development team objectives.
						</p>

						<p
							className="text-lg leading-relaxed"
							style={{
								color: "#c2e7d9",
							}}
						>
							As a quick learner and motivated individual, I continuously
							explore new technologies and best practices to build efficient and
							scalable solutions. My goal is to contribute meaningfully to
							projects as a Python Developer, Data Analyst, or Data Scientist.
						</p>

						<div
							className="pt-4 animate-fade-in-up"
							style={{
								animationDelay: "0.2s",
							}}
						>
							<h3
								className="text-xl font-semibold mb-4"
								style={{
									color: "#f9e4ffff",
								}}
							>
								Education
							</h3>
							<div
								className="glass-card p-4 rounded-lg"
								style={{
									borderLeft: "4px solid #3D348B",
								}}
							>
								<h4
									className="font-semibold text-lg"
									style={{
										color: "#3D348B",
									}}
								>
									BSc Hons Computer Science and Technology
								</h4>
								<p
									style={{
										color: "#3D3E65",
									}}
								>
									Uva Wellassa University of Sri Lanka
								</p>
								<p className="text-sm opacity-75">Undergraduate</p>
							</div>
						</div>
					</div>

					<div
						className={`glass-card p-8 rounded-lg transition-all duration-700 ${
							isVisible ? "animate-slide-in-right" : "opacity-0 translate-x-10"
						}`}
					>
						<h3
							className="text-2xl font-bold mb-6"
							style={{
								color: "#3D348B",
							}}
						>
							Why Work With Me
						</h3>
						<ul className="space-y-4">
							{[
								"Quick learner and adaptable to new technologies",
								"Strong problem-solving skills",
								"Attention to detail and code quality",
								"Collaborative team player",
								"Motivated to deliver excellence",
								"Continuous commitment to learning",
							].map((item, i) => (
								<li
									key={i}
									className="flex items-start gap-3 animate-fade-in-up"
									style={{
										animationDelay: `${0.1 + i * 0.05}s`,
									}}
								>
									<span
										className="font-bold text-lg mt-1 animate-pulse-subtle"
										style={{
											color: "#5F1773",
										}}
									>
										✓
									</span>
									<span
										style={{
											color: "#3D348B",
										}}
									>
										{item}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
