ALTER TABLE "transactions" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN IF EXISTS "payee";