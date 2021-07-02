import { useMutation, useQueryClient } from "react-query";
import customFetch from "../../utils/customFetch";
import deleteResource from "../../utils/deleteResource";
import { IQuote } from "../../model";

const deleteQuote = async (_id: string) => {
  const response = await deleteResource("quote", _id);
  return response.data;
};

const addQuote = async (body: Partial<IQuote>) => {
  const url = "quote";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await customFetch(url, options, body);
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
  const addQuoteMutation = useMutation(addQuote, {
    onSuccess: () => invalidateAllStores(),
  });
  const updateQuoteMutation = useMutation(updateQuote, {
    onSuccess: () => invalidateAllStores(),
  });

  return {
    deleteQuoteMutation,
    addQuoteMutation,
    updateQuoteMutation,
  };
}
