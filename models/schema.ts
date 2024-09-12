import { relations } from "drizzle-orm";
import { date, pgTable, serial, text, time, varchar } from "drizzle-orm/pg-core";

export const api_user = pgTable("api_users",
  {
    id:serial("id").primaryKey(),
    username:text("username").unique().notNull(),
    password:text("password").unique().notNull()
  });


export const token = pgTable("token",{
  id:serial("id").primaryKey().unique(),
  username:text("username").unique().notNull(),
  token:text("token").notNull(),
  token_type:text("token_type", {}).notNull().default("API"),
  token_expire_date:date("token_expire_date", {mode:"date"}).notNull().defaultNow(), 
  api_user_id: serial("api_user_id").notNull().references(()=>api_user.id)
})

// relacion 1 a 1 de api_user a token
export const userRelations = relations(api_user, ({one}) => ({
  token: one(token,
     {
      fields: [api_user.id],
      references: [token.api_user_id] 
    })
}));

// create asociation between token and username


