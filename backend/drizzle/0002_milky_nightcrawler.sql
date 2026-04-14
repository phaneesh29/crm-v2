ALTER TABLE "leads" ADD CONSTRAINT "leads_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_phone_unique" UNIQUE("phone");