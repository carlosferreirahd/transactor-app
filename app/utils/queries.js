export const CREATE_CONSUMERS_TABLE = "CREATE TABLE IF NOT EXISTS consumers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, balance INTEGER DEFAULT 0 NOT NULL);";
export const CREATE_TRANSACTIONS_TABLE = "CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, value INTEGER NOT NULL, operationTime TEXT NOT NULL, consumerId INTEGER NOT NULL, FOREIGN KEY(consumerId) REFERENCES consumers(id));";
export const SELECT_ALL_CONSUMERS = "SELECT * FROM consumers;";
export const SELECT_ALL_TRANSACTIONS = "SELECT * FROM transactions";
export const ADD_NEW_CONSUMER = "INSERT INTO consumers (name) values (?);";
export const ADD_NEW_TRANSACTION = "INSERT INTO transactions (value, operationTime, consumerId) values (?,?,?);";
export const UPDATE_CONSUMER = "UPDATE consumers SET name=?, balance=? WHERE id=?;";
export const SELECT_TRANSACTIONS_BY_CONSUMER_ID = "SELECT * FROM transactions WHERE consumerId=?";
export const DELETE_TRANSACTION_BY_ID = "DELETE FROM transactions WHERE id=?";
