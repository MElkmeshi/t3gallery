ALTER TABLE "t3gallery_Collection" RENAME TO "t3gallery_collection";--> statement-breakpoint
ALTER TABLE "t3gallery_collection" DROP CONSTRAINT "t3gallery_Collection_employee_id_t3gallery_employees_id_fk";
--> statement-breakpoint
ALTER TABLE "t3gallery_collection" DROP CONSTRAINT "t3gallery_Collection_pos_id_t3gallery_POS_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t3gallery_collection" ADD CONSTRAINT "t3gallery_collection_employee_id_t3gallery_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."t3gallery_employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t3gallery_collection" ADD CONSTRAINT "t3gallery_collection_pos_id_t3gallery_POS_id_fk" FOREIGN KEY ("pos_id") REFERENCES "public"."t3gallery_POS"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reference_number_idx" ON "t3gallery_collection" ("reference_number");--> statement-breakpoint
ALTER TABLE "t3gallery_collection" ADD CONSTRAINT "t3gallery_collection_reference_number_unique" UNIQUE("reference_number");