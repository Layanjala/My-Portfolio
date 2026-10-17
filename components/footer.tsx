"use client";

import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { links } from "@/lib/links";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="relative z-10 border-t border-line px-4 py-10 sm:px-6">
			<div className="mx-auto flex max-w-6xl flex-col items-center gap-6 md:flex-row md:justify-between">
				<div className="text-center md:text-left">
					<p className="font-display text-lg font-bold text-fg">
						LYJ<span className="text-brand-cyan">.</span>
					</p>
					<p className="mt-1 text-sm text-fg-muted">
						© {currentYear} Layanjala Yasashrini Jayasundara. All rights reserved.
					</p>
				</div>

				<div className="flex items-center gap-3">
					{[
						{ icon: Github, href: links.github, label: "GitHub" },
						{ icon: Linkedin, href: links.linkedin, label: "LinkedIn" },
						{ icon: Mail, href: links.email, label: "Email" },
					].map(({ icon: Icon, href, label }) => (
						<a
							key={label}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={label}
							className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg-muted transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/50 hover:text-brand-cyan"
						>
							<Icon size={17} />
						</a>
					))}

					<motion.a
						href="#home"
						aria-label="Back to top"
						className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-violet to-brand-blue text-white shadow-[0_0_24px_rgba(139,92,246,0.5)]"
						whileHover={{ y: -4 }}
						whileTap={{ scale: 0.92 }}
					>
						<ArrowUp size={18} />
					</motion.a>
				</div>
			</div>
		</footer>
	);
}
