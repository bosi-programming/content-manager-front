import { useState } from "react";
import { useQuery } from "react-query";
import queryString from "querystring";
import customFetch from "../../utils/customFetch";
import {IQuote} from "../../model";

const fetchQuotes = async (params: any) => {
  const URLParams = queryString.stringify(params);
  const data = await customFetch(`quote?${URLParams}`);
  return data;
};

export function useQuotesQuery() {
  const [searchAuthor, setSearchAuthor] = useState<string>("");
  const [searchMedia, setSearchMedia] = useState<string>("");
  const [limit, setLimit] = useState<number>(50);
  const [page, setPage] = useState<number>(1);

  const params = {
    authorId: searchAuthor,
    mediaId: searchMedia,
    limit,
    page,
  };

  const quotesQuery = useQuery<IQuote[], Error>(
    ["quotes", "list", params],
    () => fetchQuotes(params),
    { staleTime: 60000 }
  );

  return {
    ...quotesQuery,
    props: {
      authorId: searchAuthor,
      mediaId: searchMedia,
      limit,
      page,
      quotes: Array.isArray(quotesQuery.data) ? quotesQuery.data : [],
    },
    handlers: {
      onLimitChange: (val: number) => setLimit(val),
      onPageChange: (val: number) => setPage(val),
      onAuthorChange: (val: string) => setSearchAuthor(val),
      onMediaChange: (val: string) => setSearchMedia(val),
    },
  };
}
