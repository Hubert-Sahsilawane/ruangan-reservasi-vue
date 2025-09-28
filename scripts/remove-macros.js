import fs from "fs"
import path from "path"

// Folder project (ubah kalau perlu)
const rootDir = path.resolve("./src")

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf-8")

  // Hapus defineProps & defineEmits dari import vue
  content = content.replace(
    /import\s*{\s*([^}]*)}\s*from\s*["']vue["'];?/g,
    (match, imports) => {
      let newImports = imports
        .split(",")
        .map((i) => i.trim())
        .filter(
          (i) => i !== "defineProps" && i !== "defineEmits" && i !== ""
        )

      if (newImports.length === 0) {
        return "" // hapus baris kalau kosong
      }

      return `import { ${newImports.join(", ")} } from "vue"`
    }
  )

  fs.writeFileSync(filePath, content, "utf-8")
  console.log(`✅ Updated: ${filePath}`)
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      walkDir(filePath)
    } else if (filePath.endsWith(".vue")) {
      processFile(filePath)
    }
  })
}

walkDir(rootDir)
console.log("🎉 Selesai! Semua import defineProps & defineEmits dihapus.")
