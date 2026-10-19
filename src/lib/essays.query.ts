import { queryOptions } from "@tanstack/react-query";
import { getEssays } from "./essays.functions";

/** Every page that shows essays reads the catalogue through this one query. */
export const essaysQuery = queryOptions({
  queryKey: ["essays"],
  queryFn: () => getEssays(),
  staleTime: 60_000,
});
