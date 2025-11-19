"use client";

import { Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import { useEffect, useState } from "react";

export function Hero() {
	return (
		<section id="home" className="gradient-hero text-white py-20 md:py-32 px-4">
			<div className="max-w-6xl mx-auto">
				<div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
					{/* Photo Section */}
					{(() => {
						const [flipped, setFlipped] = useState(false);
						useEffect(() => {
							const timer = setTimeout(() => setFlipped(true), 500);
							return () => clearTimeout(timer);
						}, []);
						const waveVariants = {
							wave: {
								rotate: [0, 20, -20, 20, -20, 0],
								transition: {
									duration: 1,
									repeat: Infinity,
									ease: [cubicBezier(0.25, 0.1, 0.25, 1)],
								},
							},
						};

						return (
							<div className="flex flex-col items-center justify-center">
								{/* Profile Picture */}
								<motion.div
									className="w-48 h-48 rounded-full shadow-2xl shadow-purple-300 cursor-pointer"
									onClick={() => setFlipped((prev) => !prev)}
									animate={{
										rotateY: flipped ? 180 : 0,
										scale: flipped ? 1.2 : 1,
									}}
									transition={{
										duration: 0.8,
										ease: "easeInOut",
									}}
									style={{
										transformStyle: "preserve-3d",
										perspective: 1000,
									}}
								>
									<img
										src="/Proffesional headshot.png"
										alt="LayanJala Yasashrini Jayasundara"
										className="w-full h-full object-cover rounded-full"
									/>
								</motion.div>

								{/* Say Hi Text with waving hand */}
								<AnimatePresence>
									{flipped && (
										<motion.div
											className="mt-4 bg-white p-2 px-4 rounded-full shadow-md flex items-center gap-2"
											initial={{
												opacity: 0,
												y: -10,
											}}
											animate={{
												opacity: 1,
												y: 0,
											}}
											exit={{
												opacity: 0,
												y: -10,
											}}
											transition={{
												duration: 0.5,
												delay: 0.8,
											}}
										>
											<motion.span
												className="text-2xl"
												variants={waveVariants}
												animate="wave"
											>
												👋
											</motion.span>
											{/* Typing effect */}
											<span
												style={{
													color: "#3D3E65",
													fontWeight: "bold",
													overflow: "hidden",
													whiteSpace: "nowrap",
													// borderRight: "0.15em solid #3D3E65",
													animation:
														"typing 1s steps(8, end), blink 0.75s step-end infinite",
												}}
											>
												Hi There!
											</span>
										</motion.div>
									)}
								</AnimatePresence>

								<style jsx>{`
									@keyframes typing {
										from {
											width: 0;
										}
										to {
											width: 3ch;
										} /* "Hi!" is 3 characters */
									}
									@keyframes blink {
										50% {
											border-color: transparent;
										}
									}
								`}</style>
							</div>
						);
					})()}

					{/* Text Content */}
					<div className="text-center md:text-left max-w-2xl">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
							Layanjala Yasashrini Jayasundara
						</h1>
						<p
							className="text-xl md:text-2xl mb-2 opacity-90 animate-fade-in-up"
							style={{
								animationDelay: "0.1s",
							}}
						>
							Python Developer | Data Analyst | Data Scientist
						</p>
						<p
							className="text-lg opacity-80 mb-8 animate-fade-in-up"
							style={{
								animationDelay: "0.2s",
							}}
						>
							BSc Hons Computer Science & Technology | Uva Wellassa University
						</p>
						<p
							className="text-lg opacity-75 mb-8 animate-fade-in-up"
							style={{
								animationDelay: "0.3s",
							}}
						>
							Motivated and quick learner with expertise in Python, Django,
							Flask, PostgreSQL, and SQL. Passionate about building scalable
							solutions and uncovering insights from data.
						</p>

						{/* Social Links and CTA */}
						<div
							className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 animate-fade-in-up"
							style={{
								animationDelay: "0.4s",
							}}
						>
							<a
								href="/Layanjala SE Resume 2.pdf"
								download="Layanjala SE Resume 2.pdf"
								className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:scale-105"
								style={{
									backgroundColor: "#C2E7D9",
									color: "#3D348B",
								}}
							>
								<Download size={20} />
								Download CV
							</a>

							<div className="flex gap-4">
								<a
									href="https://mail.google.com/mail/?view=cm&fs=1&to=layanjalajayasundara@gmail.com?subject=Hello%20Layanjala&body=Hi%20Layanjala%2C%0D%0A%0D%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20connect."
									className="p-3 rounded-full transition-all hover:scale-125 hover:shadow-lg"
									style={{
										backgroundColor: "rgba(194, 231, 217, 0.3)",
									}}
									title="Email"
								>
									<Mail size={24} />
								</a>
								<a
									href="tel:+94711371419"
									className="p-3 rounded-full transition-all hover:scale-125 hover:shadow-lg"
									style={{
										backgroundColor: "rgba(194, 231, 217, 0.3)",
									}}
									title="Phone"
								>
									<Phone size={24} />
								</a>
								<a
									href="https://github.com/Layanjala"
									className="p-3 rounded-full transition-all hover:scale-125 hover:shadow-lg"
									style={{
										backgroundColor: "rgba(194, 231, 217, 0.3)",
									}}
									title="GitHub"
								>
									<Github size={24} />
								</a>
								<a
									href="https://www.linkedin.com/in/yasashrini-jayasundara-a5b422221/"
									className="p-3 rounded-full transition-all hover:scale-125 hover:shadow-lg"
									style={{
										backgroundColor: "rgba(194, 231, 217, 0.3)",
									}}
									title="LinkedIn"
								>
									<Linkedin size={24} />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
