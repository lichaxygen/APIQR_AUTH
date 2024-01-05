import {drizzle} from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import {db_config} from '../config.js';
import * as schema from './schema';

if(db_config.connection_string === undefined){
  throw new Error('Missing DATABASE_URL environment variable');
}

const client = postgres(db_config.connection_string);
const db = drizzle(client, {schema});

export default db;