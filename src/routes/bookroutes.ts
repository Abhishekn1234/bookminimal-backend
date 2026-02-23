import { Router } from "express";
import { BookController } from "../controllers/bookcontroller";

const router = Router();
const controller = new BookController();

router.get(
  "/:bookId/chapters/:chapterId/pages/:pageId/versions",
  controller.getPageVersions.bind(controller)
);
router.get("/", controller.getBooks.bind(controller));
router.get("/:bookId", controller.getBook.bind(controller));
router.post("/", controller.createBook.bind(controller));
router.put("/:bookId", controller.updateBook.bind(controller));
router.get(
  "/:bookId/chapters/:chapterId",
  controller.getChapter.bind(controller)
);


router.post("/:bookId/chapters", controller.createChapter.bind(controller));



router.post(
  "/:bookId/chapters/:chapterId/pages",
  controller.createPage.bind(controller)
);

router.post(
  "/:bookId/chapters/:chapterId/pages/:pageId/save",
  controller.savePage.bind(controller)
);

router.post(
  "/:bookId/chapters/:chapterId/pages/:pageId/restore/:version",
  controller.restoreVersion.bind(controller)
);



router.get(
  "/:bookId/index/versions",
  controller.getIndexVersions.bind(controller)
);

router.post(
  "/:bookId/index/save",
  controller.saveIndex.bind(controller)
);

router.post(
  "/:bookId/index/restore/:version",
  controller.restoreIndexVersion.bind(controller)
);

export default router;