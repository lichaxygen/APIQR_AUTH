import { and, eq } from 'drizzle-orm';
import db from '../db.ts';
import { api_user, token } from '../schema.ts';

async function insertApiUser(username: string, password: string): Promise<void> {
  await db.insert(api_user).values({ username, password }).execute();
}

async function insertToken(username: string, tokenValue: string): Promise<void> {
  await db.insert(token).values({ username, token: tokenValue }).execute();
}

async function selectUser(username: string): Promise<{id: number, password: string}[]> {
  const result = await db
    .select({
      id: api_user.id,
      password: api_user.password
    })
    .from(api_user)
    .where(eq(api_user.username, username))
    .limit(1)
    .execute();
  return result;
}

async function searchTokenByUsername(username: string): Promise<string> {
  const result = await db
    .select({ token: token.token })
    .from(token)
    .where(eq(token.username, username))
    .limit(1)
    .execute();
  return result[0].token;
}

export { insertApiUser, insertToken }