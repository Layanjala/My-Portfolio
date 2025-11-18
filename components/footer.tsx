export function Footer() {
	const currentYear =
		new Date().getFullYear();

	return (
		<footer
			className="py-8 px-4 text-center text-white"
			style={{
				backgroundColor:
					"#3D348B",
			}}
		>
			<div className="max-w-6xl mx-auto">
				<p className="mb-2">
					© {currentYear}{" "}
					Layanjala Yasashrini
					Jayasundara. All
					rights reserved.
				</p>
				<p className="opacity-80 text-sm">
					Designed & Built
					with passion | Sri
					Lanka
				</p>
			</div>
		</footer>
	);
}
