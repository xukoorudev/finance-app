ALTER TABLE "transactions" ADD COLUMN "payee" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN IF EXISTS "name";