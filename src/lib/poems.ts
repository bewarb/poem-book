import fs from "fs";
import path from "path";
import matter from "gray-matter";

const poemsDirectory = path.join(process.cwd(), "content");

export function getAllPoems() {
  const fileNames = fs.readdirSync(poemsDirectory);

  return fileNames.map((fileName) => {
    const fullPath = path.join(poemsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug: fileName.replace(".md", ""),
      metadata: data as { title: string; date: string },
    };
  });
}

export function getPoemBySlug(slug: string) {
  const fullPath = path.join(poemsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    metadata: data as { title: string; date: string },
    content,
  };
}
