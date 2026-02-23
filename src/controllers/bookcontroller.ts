import { Request, Response } from "express";
import { BookService } from "../services/bookservice";

const service = new BookService();

export class BookController {


  async getBooks(req: Request, res: Response) {
    try {
      const books = await service.getAllBooks();
      return res.status(200).json(books);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch books",
      });
    }
  }
async getBook(
  req: Request<{ bookId: string }>,
  res: Response
) {
  try {
    const { bookId } = req.params;

    const book = await service.getBookById(bookId);

    return res.status(200).json(book);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
}
async getChapter(
  req: Request<{ bookId: string; chapterId: string }>,
  res: Response
) {
  try {
    const { bookId, chapterId } = req.params;

    const chapter = await service.getChapter(bookId, chapterId);

    return res.status(200).json(chapter);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
}
  async createBook(
    req: Request<{}, {}, { title: string; description: string }>,
    res: Response
  ) {
    try {
      const { title, description } = req.body;
      const id = await service.createBook(title, description);
      return res.status(201).json({ bookId: id });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async createChapter(
    req: Request<{ bookId: string }, {}, { title: string; order: number }>,
    res: Response
  ) {
    try {
      const { bookId } = req.params;
      const { title, order } = req.body;

      const id = await service.createChapter(bookId, title, order);
      return res.status(201).json({ chapterId: id });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }



  async createPage(
    req: Request<{ bookId: string; chapterId: string }, {}, { title: string }>,
    res: Response
  ) {
    try {
      const { bookId, chapterId } = req.params;
      const { title } = req.body;

      const id = await service.createPage(bookId, chapterId, title);
      return res.status(201).json({ pageId: id });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async savePage(
    req: Request<
      { bookId: string; chapterId: string; pageId: string },
      {},
      { content: string; editorName: string }
    >,
    res: Response
  ) {
    try {
      const { bookId, chapterId, pageId } = req.params;
      const { content, editorName } = req.body;

      const version = await service.savePage(
        bookId,
        chapterId,
        pageId,
        content,
        editorName
      );

      return res.status(200).json({ version });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async restoreVersion(
    req: Request<{
      bookId: string;
      chapterId: string;
      pageId: string;
      version: string;
    }>,
    res: Response
  ) {
    try {
      const { bookId, chapterId, pageId, version } = req.params;

      const newVersion = await service.restoreVersion(
        bookId,
        chapterId,
        pageId,
        Number(version)
      );

      return res.status(200).json({ version: newVersion });
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }


  async getPageVersions(
    req: Request<{
      bookId: string;
      chapterId: string;
      pageId: string;
    }>,
    res: Response
  ) {
    try {
      const { bookId, chapterId, pageId } = req.params;

      const versions = await service.getPageVersions(
        bookId,
        chapterId,
        pageId
      );

      return res.status(200).json(versions);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }



  async getIndexVersions(
    req: Request<{ bookId: string }>,
    res: Response
  ) {
    try {
      const { bookId } = req.params;

      const versions = await service.getIndexVersions(bookId);

      return res.status(200).json(versions);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }

  async saveIndex(
    req: Request<{ bookId: string }, {}, { content: string; editorName: string }>,
    res: Response
  ) {
    try {
      const { bookId } = req.params;
      const { content, editorName } = req.body;

      const version = await service.saveIndex(
        bookId,
        content,
        editorName
      );

      return res.status(200).json({ version });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async restoreIndexVersion(
    req: Request<{ bookId: string; version: string }>,
    res: Response
  ) {
    try {
      const { bookId, version } = req.params;

      const newVersion = await service.restoreIndexVersion(
        bookId,
        Number(version)
      );

      return res.status(200).json({ version: newVersion });
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }
async updateBook(req: Request, res: Response) {
  const { bookId } = req.params;
  if (!bookId) return res.status(400).json({ error: "bookId is required" });

  const { title, description } = req.body;
  const updated = await service.updateBook(bookId, { title, description });
  res.json({ data: updated });
}

}