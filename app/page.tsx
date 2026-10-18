import { Background3D } from "@/components/background-3d";
import { CursorGlow } from "@/components/cursor-glow";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Leadership } from "@/components/leadership";
import { Certifications } from "@/components/certifications";
import { Strengths } from "@/components/strengths";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
	return (
		<div className="relative min-h-screen overflow-x-clip bg-ink-900">
			<Background3D />
			<CursorGlow />
			<Header />
			<main className="relative z-10">
				<Hero />
				<About />
				<Experience />
				<Education />
				<Skills />
				<Projects />
				<Leadership />
				<Certifications />
				<Strengths />
				<Contact />
			</main>
			<Footer />
		</div>
	);
}
