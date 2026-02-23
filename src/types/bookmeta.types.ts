import { ChapterMeta } from "./chaptermeta.types";
import { IndexMeta } from "./indexmeta.types";

export interface BookMeta {
  id: string;
  title: string;
  description: string;
  index: IndexMeta;
  chapters: ChapterMeta[];
}
