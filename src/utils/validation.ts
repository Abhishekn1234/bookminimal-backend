

export function ensureUniqueBook(
  books: any[],
  title: string,
  description: string
) {
  const duplicateTitle = books.find(
    b => b.title.toLowerCase() === title.toLowerCase()
  );

  if (duplicateTitle) {
    throw new Error("Book title already exists");
  }

  const duplicateDescription = books.find(
    b => b.description.toLowerCase() === description.toLowerCase()
  );

  if (duplicateDescription) {
    throw new Error("Book description already exists");
  }
}
export function ensureUniqueChapter(book: any, title: string) {
  const duplicate = book.chapters.find(
    (c: any) => c.title.toLowerCase() === title.toLowerCase()
  );

  if (duplicate) {
    throw new Error("Chapter title already exists in this book");
  }
}

export function ensureUniquePage(chapter: any, title: string) {
  const duplicate = chapter.pages.find(
    (p: any) => p.title.toLowerCase() === title.toLowerCase()
  );

  if (duplicate) {
    throw new Error("Page title already exists in this chapter");
  }
}