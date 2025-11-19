"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Projects() {
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

	const projects = [
		{
			title:
				"Notiq - Collaborative PDF Reader and Note-Sharing Platform (ongoing)",
			description:
				"A collaborative web-based platform enabling students to upload, read, and annotate PDF notes. Implementing features for adding comments, highlights, bookmarks, as well as appending new pages for additional content",
			technologies: [
				"Django",
				"Flask",
				"PostgreSQL",
				"HTML/CSS",
				"JavaScript",
				"Tkinter",
				// Python, Django, Flask, HTML, CSS, JavaScript, Tkinter, PostgreSQL, GitHub
			],
			github: "#",
			demo: "#",
			image: "NotiQ.png",
		},
		{
			title: "Real Estate Management System",
			description:
				"Built a full-stack web application to simplify real estate transactions by enabling buyers, sellers, and agents to browse, list, and manage property listings through an intuitive interface",
			technologies: [
				"React",
				"Vite",
				"Tailwind",
				"Django/REST",
				"SQLite",
				// Technologies – React, Vite, Tailwind CSS, Django, Django REST Framework, SQLite, GitHub
			],
			github: "#",
			demo: "#",
			image: "real-estate.png",
		},
		{
			title: "Exchanza",
			description:
				" Developed a web-based platform enabling users to buy, sell, and bid on second-hand products, through an interactive and user-friendly interface.",
			technologies: [
				"PHP",
				"MySQL",
				"HTML",
				"CSS",
				"JavaScript",
				// Technologies – PHP, MySQL, HTML, CSS, JavaScript, GitHub
			],
			github: "#",
			demo: "#",
			image: "Exchanza presentation.png",
		},
		{
			title: "Autonomous Shopping Cart System",
			description:
				"Developed a smart shopping cart system leveraging IoT, computer vision, and APIs to automate item detection, enable real-time price updates, and support mobile integration. ",
			technologies: [
				"Arduino",
				"C++",
				"Nodejs",
				"React Native",
				// Technologies – Arduino, C++, Nodejs, React Native, GitHub
			],
			github: "#",
			demo: "#",
			image: "Group No 04.png",
		},
	];

	return (
		<section id="projects" className="py-16 md:py-24 px-4" ref={ref}>
			<div className="max-w-6xl mx-auto">
				{/* <h2
					className={`text-4xl font-bold mb-12 text-center transition-all duration-700 ${
						isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"
					}`}
					style={{
						color: "#d0beb5",
					}}
				>
					Featured Projects
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
						Featured Projects
					</motion.p>
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					{projects.map((project, index) => (
						<div
							key={project.title}
							className={`relative w-full h-80 perspective ${
								isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"
							}`}
							style={{
								animationDelay: isVisible ? `${index * 0.15}s` : "0s",
							}}
						>
							<div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d hover:rotate-y-180 rounded-xl shadow-lg">
								{/* FRONT - image */}
								<div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden">
									<img
										src={project.image}
										alt={project.title}
										className="w-full h-full object-cover"
									/>
								</div>

								{/* BACK - details */}
								<div className="absolute w-full h-full rotate-y-180 backface-hidden rounded-xl bg-white p-6 flex flex-col justify-between shadow-xl">
									<div>
										<h3
											className="text-2xl font-bold mb-2"
											style={{ color: "#3D348B" }}
										>
											{project.title}
										</h3>

										<p
											className="text-base leading-relaxed mb-4"
											style={{ color: "#3D3E65" }}
										>
											{project.description}
										</p>

										<div className="flex flex-wrap gap-2 mb-6">
											{project.technologies.map((tech) => (
												<span
													key={tech}
													className="text-xs px-3 py-1 rounded-full skill-badge transition-all hover:scale-110"
												>
													{tech}
												</span>
											))}
										</div>
									</div>

									<div className="flex gap-4">
										<a
											href={project.github}
											className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-md"
											style={{ backgroundColor: "#3D3E65", color: "#C2E7D9" }}
										>
											<Github size={18} /> Code
										</a>
										<a
											href={project.demo}
											className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-md"
											style={{ backgroundColor: "#C2E7D9", color: "#3D348B" }}
										>
											<ExternalLink size={18} /> Demo
										</a>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
