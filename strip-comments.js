import fs from "node:fs";
import path from "node:path";

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir("./src", (filePath) => {
  if (
    filePath.endsWith(".ts") ||
    filePath.endsWith(".tsx") ||
    filePath.endsWith(".js") ||
    filePath.endsWith(".jsx")
  ) {
    let content = fs.readFileSync(filePath, "utf8");

    // Remove {/* ... */}
    content = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");

    // Remove // comments, but don't match URLs like http://
    content = content.replace(/(^|\s)\/\/[^\n]*/g, "$1");

    fs.writeFileSync(filePath, content);
  }
});
