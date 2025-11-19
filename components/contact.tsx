"use client";

import { Mail, Phone, Github, Linkedin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Contact() {
	const [isVisible, setIsVisible] = useState(false);
	const [animationStarted, setAnimationStarted] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					// Start the animation when section becomes visible
					setTimeout(() => setAnimationStarted(true), 500);
				}
			},
			{ threshold: 0.1 }
		);

		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	const handleRestartAnimation = () => {
		setAnimationStarted(false);
		setTimeout(() => setAnimationStarted(true), 100);
	};

	const contactIcons = [
		{
			icon: Mail,
			href: "https://mail.google.com/mail/?view=cm&fs=1&to=layanjalajayasundara@gmail.com?subject=Hello%20Layanjala&body=Hi%20Layanjala%2C%0D%0A%0D%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20connect.",
			title: "Email",
			side: "left",
			position: 0,
		},
		{
			icon: Phone,
			href: "tel:+94711371419",
			title: "Phone",
			side: "left",
			position: 1,
		},
		{
			icon: Github,
			href: "https://github.com/Layanjala",
			title: "GitHub",
			side: "right",
			position: 0,
		},
		{
			icon: Linkedin,
			href: "https://www.linkedin.com/in/yasashrini-jayasundara-a5b422221/",
			title: "LinkedIn",
			side: "right",
			position: 1,
		},
	];

	return (
		<section
			id="contact"
			className="py-12 md:py-16 px-4 overflow-hidden"
			ref={ref}
		>
			<div className="max-w-6xl mx-auto">
				<h2
					className={`text-4xl font-bold mb-8 text-center transition-all duration-700 ${
						isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"
					}`}
					style={{
						color: "#d0beb5",
					}}
				>
					Get In Touch
				</h2>

				{/* Icons Flow Animation Container */}
				<div className="relative h-48 md:h-64 flex items-center justify-center">
					{/* Rotating center circle */}
					<div
						className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-[#C2E7D9] to-[#3D348B] opacity-80 transition-all duration-1000 ${
							animationStarted
								? "scale-150 rotate-180 opacity-0"
								: "scale-100 rotate-0 opacity-80"
						}`}
					/>

					{/* Contact icons flowing from center */}
					<div className="relative w-full h-full">
						{contactIcons.map((item, index) => {
							const Icon = item.icon;
							const isLeft = item.side === "left";
							const delay = index * 200 + 500; // Start after circle rotation

							// Calculate vertical positions with proper spacing
							const verticalPositions: Record<"left" | "right", string[]> = {
								left: ["35%", "65%"], // Two positions for left side
								right: ["35%", "65%"], // Two positions for right side
							};

							const verticalPosition =
								verticalPositions[item.side as "left" | "right"][item.position];

							return (
								<div
									key={index}
									className={`absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000 ease-out ${
										animationStarted
											? `opacity-100 ${
													isLeft ? "left-16 md:left-32" : "right-16 md:right-32"
											  }`
											: "left-1/2 right-1/2 opacity-0 scale-50"
									}`}
									style={{
										transitionDelay: `${delay}ms`,
										transform: animationStarted
											? `translateY(-50%)`
											: "translateY(-50%) translateX(-50%)",
										top: animationStarted ? verticalPosition : "50%",
									}}
								>
									<a
										href={item.href}
										target={item.href.startsWith("http") ? "_blank" : undefined}
										rel={
											item.href.startsWith("http")
												? "noopener noreferrer"
												: undefined
										}
										className="flex flex-col items-center transition-all duration-300 hover:scale-110"
										title={item.title}
									>
										<div
											className="inline-flex items-center justify-center w-16 h-16 rounded-full hover:shadow-lg glass"
											style={{
												backgroundColor: "#C2E7D9",
											}}
										>
											<Icon
												size={28}
												style={{
													color: "#3D348B",
												}}
											/>
										</div>
									</a>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
