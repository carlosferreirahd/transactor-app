import {
  CREATE_CONSUMERS_TABLE,
  CREATE_TRANSACTIONS_TABLE,
  UPDATE_CONSUMER_AFTER_ADD_TRANSACTION_TRIGGER,
  UPDATE_CONSUMER_AFTER_DELETE_TRANSACTION_TRIGGER,
} from "../utils/queries";
import { queryRunner } from "./queryRunner";

const CONFIG_QUERIES = [
  CREATE_CONSUMERS_TABLE,
  CREATE_TRANSACTIONS_TABLE,
  UPDATE_CONSUMER_AFTER_ADD_TRANSACTION_TRIGGER,
  UPDATE_CONSUMER_AFTER_DELETE_TRANSACTION_TRIGGER,
];

export const configDatabase = async () => {
  return Promise.all(
    CONFIG_QUERIES.map(
      async (configQuery) => {
        return queryRunner({ query: configQuery, params: [] })
      }
    )
  );
};
