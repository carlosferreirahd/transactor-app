import { queryRunner } from "./queryRunner";
import {
  ADD_NEW_CONSUMER,
  SELECT_ALL_CONSUMERS,
  UPDATE_CONSUMER,
} from "../utils/queries";

export const fetchAllConsumersFromDb = async () => {
  return queryRunner({
    query: SELECT_ALL_CONSUMERS,
    params: [],
  });
}

export const addConsumerToDb = async ({ newConsumerName }) => {
  return queryRunner({
    query: ADD_NEW_CONSUMER,
    params: [newConsumerName],
  });
}

export const updateConsumerFromDb = async ({ consumerNewData }) => {
  const {
    id,
    name,
    balance,
  } = consumerNewData;

  return queryRunner({
    query: UPDATE_CONSUMER,
    params: [
      name,
      balance,
      id,
    ],
  });
}
