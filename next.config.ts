import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: false,
	typedRoutes: true,
	/* config options here */
	experimental: {
		viewTransition: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "raw.githubusercontent.com",
				port: "",
				pathname: "/PokeAPI/sprites/master/sprites/pokemon/**",
			},
		],
	},
};

export default nextConfig;
