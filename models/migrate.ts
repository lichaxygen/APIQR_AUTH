import {migrate} from 'drizzle-orm/postgres-js/migrator';
import db from './db.ts';

export async function main(){
  console.log("Migration started...");
  await migrate(db, {migrationsFolder:"drizzle"})
  console.log("Migration ended...");
  process.exit(0)
}

main().catch(error => {
  console.error(error)
  process.exit(0)
})