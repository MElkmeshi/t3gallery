CREATE TABLE IF NOT EXISTS "t3gallery_Collection" (
	"id" serial PRIMARY KEY NOT NULL,
	"employee_id" integer NOT NULL,
	"pos_id" integer NOT NULL,
	"amount" integer NOT NULL,
	"reference_number" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t3gallery_Collection" ADD CONSTRAINT "t3gallery_Collection_employee_id_t3gallery_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."t3gallery_employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t3gallery_Collection" ADD CONSTRAINT "t3gallery_Collection_pos_id_t3gallery_POS_id_fk" FOREIGN KEY ("pos_id") REFERENCES "public"."t3gallery_POS"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
