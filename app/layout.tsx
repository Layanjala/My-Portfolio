import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Layanjala Yasashrini Jayasundara | Python Developer & Data Analyst",
	description:
		"Portfolio of Layanjala Yasashrini Jayasundara - BSc Computer Science student specializing in Python, Django, Flask, and Data Analysis.",
	generator: "v0.app",
	icons: {
		icon: [
			{
				url: "/LJ Favicon.png",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/LJ Favicon.png",
				media: "(prefers-color-scheme: dark)",
			},
			{
				url: "/LJ Favicon.svg",
				type: "image/svg+xml",
			},
		],
		apple: "/LJ Favicon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className={`font-sans antialiased`}>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
