import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
	title: "Layanjala Yasashrini Jayasundara | Data Analyst & BI Developer",
	description:
		"Portfolio of Layanjala Yasashrini Jayasundara - Computer Science and Technology graduate awaiting graduation and BI Support Executive Intern specializing in Power BI, Microsoft Fabric, SQL, data modelling, and dashboard development.",
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
		],
		apple: "/LJ Favicon.png",
	},
};

export const viewport: Viewport = {
	themeColor: "#070b19",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`relative ${geist.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
		>
			<body className="font-sans antialiased">
				<MotionProvider>{children}</MotionProvider>
				<Analytics />
			</body>
		</html>
	);
}
