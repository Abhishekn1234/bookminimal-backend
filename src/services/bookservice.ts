import { nanoid } from "nanoid";
import { db } from "../config/db";
import { getIndexPath, getPagePath, saveVersion, readVersion } from "./storageservice";
import { ensureUniqueBook, ensureUniqueChapter, ensureUniquePage } from "../utils/validation";
import {
  findBookOrThrow,
  findChapterOrThrow,
  findPageOrThrow
} from "../utils/finders.util";
import { BookMeta } from "../types";

export class BookService {
  
  async updateBook(bookId: string |string[], data: { title?: string; description?: string }) {
  await db.read();
  const book = db.data?.books.find((b) => b.id === bookId);
  if (!book) throw new Error("Book not found");

  book.title = data.title ?? book.title;
  book.description = data.description ?? book.description;

  await db.write();
  return book;
}
  async getPageVersions(
  bookId: string,
  chapterId: string,
  pageId: string
) {
  await db.read();

  const book = findBookOrThrow(bookId);
  const chapter = findChapterOrThrow(book, chapterId);
  const page = findPageOrThrow(chapter, pageId);

  return {
    latestVersion: page.latestVersion,
    versions: page.versions,
  };
}
async saveIndex(
  bookId: string,
  content: string,
  editor: string
) {
  await db.read();

  const book = findBookOrThrow(bookId);

  const folderPath = getIndexPath(bookId);
  const version = saveVersion(folderPath, content, editor);

  book.index.latestVersion = version;
  book.index.versions.push(version);

  await db.write();

  return version;
}
async restoreIndexVersion(
  bookId: string,
  version: number
) {
  await db.read();

  const book = findBookOrThrow(bookId);

  const folderPath = getIndexPath(bookId);
  const oldData = readVersion(folderPath, version);

  if (!oldData) {
    throw new Error("Index version not found");
  }

  return this.saveIndex(
    bookId,
    oldData.content,
    "restore-system"
  );
}
async getIndexVersions(bookId: string) {
  await db.read();

  const book = findBookOrThrow(bookId);

  return {
    latestVersion: book.index.latestVersion,
    versions: book.index.versions,
  };
}
async getChapter(bookId: string, chapterId: string) {
  await db.read();

  const book = findBookOrThrow(bookId);
  const chapter = findChapterOrThrow(book, chapterId);

  return chapter;
}
 async getBookById(bookId: string) {
  await db.read();

  const book = db.data?.books.find((b) => b.id === bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  return book;
}
  async createBook(title: string, description: string) {
    await db.read();

    ensureUniqueBook(db.data!.books, title,description);

    const bookId = "book_" + nanoid(6);

    const indexPath = getIndexPath(bookId);
    const indexVersion = saveVersion(indexPath, "", "system");

    db.data!.books.push({
      id: bookId,
      title,
      description,
      index: {
        latestVersion: indexVersion,
        versions: [indexVersion]
      },
      chapters: []
    });

    await db.write();

    return bookId;
  }
   async getAllBooks(): Promise<BookMeta[]> {
    await db.read();
    return db.data?.books || [];
  }

  async createChapter(bookId: string, title: string, order: number) {
    await db.read();

    const book = findBookOrThrow(bookId);

    ensureUniqueChapter(book, title);

    const chapterId = "chapter_" + nanoid(6);

    book.chapters.push({
      id: chapterId,
      title,
      order,
      pages: []
    });

    await db.write();

    return chapterId;
  }

  async createPage(bookId: string, chapterId: string, title: string) {
    await db.read();

    const book = findBookOrThrow(bookId);
    const chapter = findChapterOrThrow(book, chapterId);

    ensureUniquePage(chapter, title);

    const pageId = "page_" + nanoid(6);

    chapter.pages.push({
      id: pageId,
      title,
      latestVersion: 0,
      versions: []
    });

    await db.write();

    return pageId;
  }

  async savePage(
    bookId: string,
    chapterId: string,
    pageId: string,
    content: string,
    editor: string
  ) {
    await db.read();

    const book = findBookOrThrow(bookId);
    const chapter = findChapterOrThrow(book, chapterId);
    const page = findPageOrThrow(chapter, pageId);

    const folderPath = getPagePath(bookId, chapterId, pageId);
    const version = saveVersion(folderPath, content, editor);

    page.latestVersion = version;
    page.versions.push(version);

    await db.write();

    return version;
  }

  async restoreVersion(
    bookId: string,
    chapterId: string,
    pageId: string,
    version: number
  ) {
    await db.read();

    const folderPath = getPagePath(bookId, chapterId, pageId);
    const oldData = readVersion(folderPath, version);

    if (!oldData) {
      throw new Error("Version not found");
    }

    return this.savePage(
      bookId,
      chapterId,
      pageId,
      oldData.content,
      "restore-system"
    );
  }
}