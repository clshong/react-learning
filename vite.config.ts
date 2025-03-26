import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { resolve } from "path";
import UnoCSS from "unocss/vite";

export default defineConfig((mode) => {
  return {
    plugins: [
      react(),
      visualizer({
        filename: "./stats.html",
        open: true,
      }),
      UnoCSS(),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "dist",
      assetsDir: "static",
      manifest: true,
      // 代码分割
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name].[hash].js",
          entryFileNames: "assets/js/[name].[hash].js",
          assetFileNames: "assets/[ext]/[name].[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
      // 压缩配置
      chunkSizeWarningLimit: 1000, // 大于1000k才警告
      // sourcemap: mode !== "production", // 非生产环境开启
      minify: "esbuild",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom", // 预加载高频依赖
      ],
    },
    // 开发服务器配置
    server: {
      port: 8000,
      open: true,
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          changeOrigin: true,
        },
      },
    },
  };
});
