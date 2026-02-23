import fs from "fs";
import path from "path";

const BASE_PATH = path.join(process.cwd(), "storage", "books");

export function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

export function getPagePath(
  bookId: string,
  chapterId: string,
  pageId: string
) {
  return path.join(
    BASE_PATH,
    bookId,
    "chapters",
    chapterId,
    "pages",
    pageId
  );
}

export function getIndexPath(bookId: string) {
  return path.join(BASE_PATH, bookId, "index");
}

export function saveVersion(
  folderPath: string,
  content: string,
  editor: string
) {
  ensureDir(folderPath);

  const files = fs.existsSync(folderPath)
    ? fs.readdirSync(folderPath)
    : [];

  const version = files.length + 1;

  const filePath = path.join(folderPath, `v${version}.json`);

  fs.writeFileSync(
    filePath,
    JSON.stringify(
      {
        version,
        content,
        editor,
        timestamp: new Date()
      },
      null,
      2
    )
  );

  return version;
}

export function readVersion(folderPath: string, version: number) {
  const filePath = path.join(folderPath, `v${version}.json`);
  if (!fs.existsSync(filePath)) throw new Error("Version not found");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}