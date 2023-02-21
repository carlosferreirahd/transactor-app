import { queryRunner } from "./queryRunner";
import { SELECT_ALL_TRANSACTIONS } from "../utils/queries";

export const fetchAllTransactions = async () => {
  return queryRunner({
    query: SELECT_ALL_TRANSACTIONS,
    params: [],
  });
}
