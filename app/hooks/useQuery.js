import { useCallback, useState } from 'react';
import { useDatabase } from './useDatabase';
import { isNilOrEmpty } from '../utils/verifications';

export function useQuery() {
  const { db } = useDatabase();

  const [queryState, setQueryState] = useState({
    loading: false,
    error: null,
    data: null,
  });

  if (isNilOrEmpty(db)) {
    throw new Error('Invalid database object');
  }

  const queryRunner = useCallback(async ({ query, params }) => {
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
  }, []);

  const executeQuery = useCallback(({ query, params }) => {
    setQueryState(prevState => ({
      ...prevState,
      loading: true,
    }));

    queryRunner({ query, params })
      .then(res => setQueryState(prevState => ({
        ...prevState,
        data: res,
        error: null,
      })))
      .catch(err => setQueryState(prevState => ({
        ...prevState,
        data: null,
        error: err,
      })))
      .finally(() => setQueryState(prevState => ({
        ...prevState,
        loading: false,
      })));
  }, [queryRunner]);

  return {
    ...queryState,
    executeQuery,
  };
}
