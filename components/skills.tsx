"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Skills() {
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

	const skillCategories = [
		{
			title: "Languages",
			skills: ["Python", "SQL", "JavaScript", "HTML", "CSS"],
		},
		{
			title: "Frameworks & Libraries",
			skills: ["Django", "Flask", "React", "Tailwind CSS"],
		},
		{
			title: "Databases",
			skills: ["PostgreSQL", "MySQL", "SQLite"],
		},
		{
			title: "Tools & Technologies",
			skills: ["Git", "GitHub", "VS Code", "Jupyter", "Pandas", "NumPy"],
		},
	];

	return (
		<section id="skills" className="py-16 md:py-24 px-4" ref={ref}>
			<div className="max-w-6xl mx-auto">
				{/* <h2
					className={`text-4xl font-bold mb-12 text-center transition-all duration-700 ${
						isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"
					}`}
					style={{ color: "#d0beb5" }}
				>
					Skills & Expertise
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
						Skills & Expertise
					</motion.p>
				</div>
				<div className="grid md:grid-cols-2 gap-8">
					{skillCategories.map((category, index) => (
						<div
							key={category.title}
							className={`glass-card p-6 rounded-lg card-hover transition-all duration-700 ${
								isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"
							}`}
							style={{ animationDelay: isVisible ? `${index * 0.1}s` : "0s" }}
						>
							<h3
								className="text-2xl font-bold mb-6"
								style={{ color: "#5F1773" }}
							>
								{category.title}
							</h3>
							<div className="flex flex-wrap gap-3">
								{category.skills.map((skill, idx) => (
									<span
										key={skill}
										className="px-4 py-2 rounded-full font-semibold text-sm skill-badge transition-all duration-300 hover:scale-110 hover:shadow-md hover:shadow-[#3D348B]/20"
									>
										{skill}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
