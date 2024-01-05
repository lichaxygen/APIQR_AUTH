import {db_config} from './config.js'
import type { Config } from "drizzle-kit";

if(db_config.connection_string === undefined){
  throw new Error('Missing DATABASE_URL environment variable');
}
export default {
  schema: './models/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: db_config.connection_string,
  }
} satisfies Config;