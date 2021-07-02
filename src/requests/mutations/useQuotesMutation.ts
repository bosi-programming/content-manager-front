import { useMutation, useQueryClient } from "react-query";

import customFetch from "../../utils/customFetch";
import { IQuote } from "../../components/QuoteCard";
import deleteResource from "../../utils/deleteResource";

const deleteQuote = async (_id: string) => {
  const response = await deleteResource("quote", _id);
  return response.data;
};

const updateQuote = async ({
  data,
  _id,
}: {
  data: Partial<IQuote>;
  _id: string;
}) => {
  const response = await customFetch(
    `quotes/${_id}`,
    { method: "PUT" },
    { ...data }
  );
  return response.data;
};

export function useQuotesMutation() {
  const queryClient = useQueryClient();

  const invalidateAllStores = () => {
    queryClient.invalidateQueries(["quotes"]);
  };

  const deleteQuoteMutation = useMutation(deleteQuote, {
    onSuccess: () => invalidateAllStores(),
  });
  const updateQuoteMutation = useMutation(updateQuote, {
    onSuccess: () => invalidateAllStores(),
  });

  return {
    deleteQuoteMutation,
    updateQuoteMutation,
  };
}
