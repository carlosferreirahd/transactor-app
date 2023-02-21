import db from "./databaseInstance";

export function queryRunner({ query, params }) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        [...params],
        (tx, result) => {
          resolve(result);
        },
        (tx, err) => {
          reject(err);
        },
      );
    });
  });
}
