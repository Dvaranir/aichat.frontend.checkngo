import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { writeFileSync, rmSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const generatePhpPlugin = () => ({
	name: "generate-php",
	buildStart() {
		const targetDir = "../../frontend/dist/ai-chat";
		if (existsSync(targetDir)) {
			rmSync(targetDir, { recursive: true, force: true });
		}
		mkdirSync(targetDir, { recursive: true });
	},
});

export default defineConfig({
	plugins: [react(), generatePhpPlugin()],
	base: import.meta?.env?.VITE_BASE_URL ?? "https://yp-dev-static.checkngo.pro/ai-chat/",
	server: {
		port: 3000,
		host: true,
		allowedHosts: true,
		hmr: false,
	},
	build: {
		outDir: "../../frontend/dist/ai-chat",
		assetsDir: "assets",
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					const info = assetInfo.name.split('.');
					const extType = info[info.length - 1];
					if (/css/i.test(extType)) {
						return `assets/[name][extname]`;
					}
					return `assets/[name]-[hash][extname]`;
				},
				chunkFileNames: "assets/[name].js",
				entryFileNames: "assets/[name].js",
			},
		},
	},
});
