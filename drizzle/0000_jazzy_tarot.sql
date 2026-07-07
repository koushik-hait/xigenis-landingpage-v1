CREATE TABLE `cms_content` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sequence` integer DEFAULT 0 NOT NULL,
	`page` text NOT NULL,
	`section` text NOT NULL,
	`content` text NOT NULL,
	`status` text DEFAULT 'drafted' NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`avatar` text,
	`role` text DEFAULT 'user' NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);