const nextConfig = {
	output: "export",
	// Remove basePath and assetPrefix
	images: {
		unoptimized: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
