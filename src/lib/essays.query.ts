import { queryOptions } from "@tanstack/react-query";
import { getEssay, getEssays, getPaperText } from "./essays.functions";

/** Every page that lists essays reads the catalogue through this one query. */
export const essaysQuery = queryOptions({
  queryKey: ["essays"],
  queryFn: () => getEssays(),
  staleTime: 60_000,
});

/** One essay's full text, fetched only when its page is opened. */
export const essayQuery = (slug: string) =>
  queryOptions({
    queryKey: ["essay", slug],
    queryFn: () => getEssay({ data: { slug } }),
    staleTime: 60_000,
  });

/** One paper's full text. */
export const paperTextQuery = (slug: string) =>
  queryOptions({
    queryKey: ["paper", slug],
    queryFn: () => getPaperText({ data: { slug } }),
    staleTime: 10 * 60_000,
  });
