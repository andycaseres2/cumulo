/** A certification the platform teaches; its theory topics are listed on the course page. */
export interface Course {
  slug: string;
  title: string;
  /** Official exam code, e.g. "CLF-C02". */
  examCode: string;
  /** Who the course is for. */
  level: string;
  summary: string;
}
