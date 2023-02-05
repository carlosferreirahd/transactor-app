export const CREATE_CONSUMERS_TABLE = "CREATE TABLE IF NOT EXISTS consumers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, balance REAL DEFAULT 0 NOT NULL);";
export const CREATE_TRANSACTIONS_TABLE = "CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, value REAL NOT NULL, operationTime TEXT NOT NULL, consumerId INTEGER NOT NULL, FOREIGN KEY(consumerId) REFERENCES consumers(id));";
export const SELECT_ALL_CONSUMERS = "SELECT * FROM consumers;";
export const ADD_NEW_CONSUMER = "INSERT INTO consumers (name) values (?);";
export const UPDATE_CONSUMER = "UPDATE consumers SET name=?, balance=? WHERE id=?;";
