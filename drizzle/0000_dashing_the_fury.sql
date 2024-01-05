CREATE TABLE IF NOT EXISTS "api_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "api_users_username_unique" UNIQUE("username"),
	CONSTRAINT "api_users_password_unique" UNIQUE("password")
);
