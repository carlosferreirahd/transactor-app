import {
  createContext,
  useEffect,
  useState,
} from 'react';
import * as SQLite from 'expo-sqlite';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const DatabaseContextData = {
  db: undefined,
};

const DatabaseContext = createContext(DatabaseContextData);

const DATABASE_NAME = "transactor.sb";

const CREATE_TABLES_QUERIES = [
  "CREATE TABLE IF NOT EXISTS consumers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, balance REAL DEFAULT 0 NOT NULL);",
  "CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, value REAL NOT NULL, datetime TEXT NOT NULL, consumerId INTEGER NOT NULL, FOREIGN KEY(consumerId) REFERENCES consumers(id));",
];

function DatabaseProvider({
  children,
}) {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  const db = SQLite.openDatabase(DATABASE_NAME);

  useEffect(() => {

    async function createTables() {
      return Promise.all(
        CREATE_TABLES_QUERIES.map(
          async (createQuery) => {
            return new Promise((resolve, reject) => {
              db.transaction(tx => {
                tx.executeSql(
                  createQuery,
                  [],
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
        )
      );
    }

    // start creating tables //
    createTables()
      .then((res) => console.log("-- DATABASE LOADED! --", res))
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setLoading(false));

  }, []);

  if (loading) {
    return (
      <View style={styles.viewContainer}>
        <ActivityIndicator
          animating={true}
          size="large"
        />
      </View>
    );
  }

  return (
    <DatabaseContext.Provider
      value={{
        db,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { DatabaseProvider, DatabaseContext };
