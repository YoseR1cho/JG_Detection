import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { viteMockServe } from "vite-plugin-mock";
import { compression } from "vite-plugin-compression2";
import { visualizer } from "rollup-plugin-visualizer";
import viteTinypng from "./script/plugins/vite-plugin-tinypng.js";
// import viteImagemin from "vite-plugin-imagemin";
const isDevelopment = process.env.NODE_ENV === "development";

// https://vitejs.dev/config/
//配置参数

export default defineConfig({
    base: "./",
    plugins: [
        react(),
        viteMockServe({
            mockPath: "./src/mock",
            enable: true,
        }),
        // 启用文件压缩
        compression({
            threshold: 2000, // 设置只有超过 2k 的文件才执行压缩
            deleteOriginalAssets: false, // 设置是否删除原文件
            skipIfLargerOrEqual: true, // 如果压缩后的文件大小与原文件大小一致或者更大时，不进行压缩
        }),
        //  打包体积分析
        visualizer({
            open: true,
            filename: "visualizer.html", // 生成分析图的文件名
        }),
        viteTinypng({}),
        /*  viteImagemin({
            svgo: {
                plugins: [
                    // svg压缩
                    {
                        name: "removeViewBox",
                    },
                    {
                        name: "removeEmptyAttrs",
                        active: false,
                    },
                ],
            },
            gifsicle: {
                optimizationLevel: 7,
                interlaced: false,
            },
        }),*/
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "*": path.resolve(""),
        },
    },
    build: {
        target: "es2015",
        rollupOptions: {
            output: {
                chunkFileNames: "js/[name]-[hash].js", // 引入文件名的名称
                entryFileNames: "js/[name]-[hash].js", // 包的入口文件名称
                assetFileNames: "[ext]/[name]-[hash].[ext]", // 资源文件像 字体，图片等
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        return "vendor";
                    }
                },
            },
        },
    },
    server: {
        port: 4000,
        open: false,
        proxy: {
            "/api": {
                target: "https://localhost:5000",
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
            "/server": {
                target: "http://localhost:3004",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/server/, ""),
            },
        },
    },
});
