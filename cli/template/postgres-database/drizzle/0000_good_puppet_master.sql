CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"author" text DEFAULT 'Gall anonim',
	"content" text,
	"createdAt" timestamp DEFAULT '2025-04-19 21:30:37.057'
);
