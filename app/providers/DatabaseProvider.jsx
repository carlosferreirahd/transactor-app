import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import * as SQLite from 'expo-sqlite';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { CREATE_CONSUMERS_TABLE, CREATE_TRANSACTIONS_TABLE } from '../utils/queries';

const DatabaseContextData = {
  db: undefined,
};

const DatabaseContext = createContext(DatabaseContextData);

const DATABASE_NAME = "transactor.db";

const CREATE_TABLES_QUERIES = [
  CREATE_CONSUMERS_TABLE,
  CREATE_TRANSACTIONS_TABLE,
];

function DatabaseProvider({
  children,
}) {

  const [loading, setLoading] = useState(true);

  const { showErrorModal } = useErrorHandler();

  const db = SQLite.openDatabase(DATABASE_NAME);

  const createTables = useCallback(async () => {
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
  }, []);

  const loadDatabase = useCallback(() => {
    setLoading(true);
    createTables()
      .then(() => console.log("-- DATABASE LOADED! --"))
      .catch(() => showErrorModal({
        title: 'Erro ao carregar banco de dados',
        description: 'Não foi possível gerar as tabelas do banco',
        buttonText: 'Tentar novamente',
        onButtonClick: loadDatabase,
      }))
      .finally(() => setLoading(false));
  }, [createTables]);

  // creating tables on app load //
  useEffect(() => {
    loadDatabase();
  }, [loadDatabase]);

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
