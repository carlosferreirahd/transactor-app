import { queryRunner } from "./queryRunner";
import {
  ADD_NEW_TRANSACTION,
  SELECT_ALL_TRANSACTIONS,
} from "../utils/queries";

export const fetchAllTransactionsFromDb = async () => {
  return queryRunner({
    query: SELECT_ALL_TRANSACTIONS,
    params: [],
  });
}

export const addTransactionToDb = async ({ value, operationTime, consumerId }) => {
  return queryRunner({
    query: ADD_NEW_TRANSACTION,
    params: [value, operationTime, consumerId],
  });
}
