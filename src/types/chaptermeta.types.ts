import { PageMeta } from "./pagemeta.types";

export interface ChapterMeta {
  id: string;
  title: string;
  order: number;
  pages: PageMeta[];
}