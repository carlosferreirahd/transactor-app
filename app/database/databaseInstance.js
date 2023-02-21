import * as SQLite from 'expo-sqlite';
import { DATABASE_NAME } from '../utils/constants';

const db = SQLite.openDatabase(DATABASE_NAME);

export default db;
