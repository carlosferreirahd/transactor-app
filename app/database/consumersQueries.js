import { queryRunner } from "./queryRunner";
import { SELECT_ALL_CONSUMERS } from "../utils/queries";

export const fetchAllConsumers = async () => {
  return queryRunner({
    query: SELECT_ALL_CONSUMERS,
    params: [],
  });
}
