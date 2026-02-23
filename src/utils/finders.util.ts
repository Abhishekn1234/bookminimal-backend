import { db } from "../config/db";

export function findBookOrThrow(bookId: string) {
  const book = db.data!.books.find(b => b.id === bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  return book;
}

export function findChapterOrThrow(book: any, chapterId: string) {
  const chapter = book.chapters.find((c: any) => c.id === chapterId);

  if (!chapter) {
    throw new Error("Chapter not found");
  }

  return chapter;
}

export function findPageOrThrow(chapter: any, pageId: string) {
  const page = chapter.pages.find((p: any) => p.id === pageId);

  if (!page) {
    throw new Error("Page not found");
  }

  return page;
}