import { exec } from "child_process";
import path from "path";
import fs from "fs";

export default function tinypngPlugin(options = {}) {
    return {
        name: "vite-tinypng",
        apply: "build", // 指定压缩脚本插件在构建时使用
        buildEnd: () => {
            // 不是图片类型，直接返回空
            const assetsDir = path
                .resolve(__dirname, "../../src/assets")
                .replace(/\\/g, "/");

            // 获取python脚本路径
            const pythonPath = path.join(__dirname, "../tinypng");

            // 执行Python脚本
            exec(
                `python tinypng.py ${assetsDir}`,
                { cwd: pythonPath },
                (error, stdout, stderr) => {
                    if (error) {
                        console.error(`script exec error: ${error}`);
                        return;
                    }
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);

                    try {
                        const processedContent =
                            fs.readFileSync(outputFilePath);
                        // 打印python脚本输出内容
                        console.log(
                            "Processed content:",
                            processedContent.toString()
                        );
                    } catch (err) {
                        console.error("Failed to read processed file:", err);
                    }
                }
            );
        },
    };
}
