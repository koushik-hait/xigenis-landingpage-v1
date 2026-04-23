import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Users table - extends Clerk user data with RBAC
export const users = sqliteTable("users", {
  id: text("id").primaryKey(), // Clerk user ID
  email: text("email").notNull().unique(),
  name: text("name"),
  avatar: text("avatar"),
  role: text("role", { enum: ['admin', 'manager', 'user'] }).notNull().default("user"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// CMS Content table for managing pages and sections
export const cmsContent = sqliteTable("cms_content", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  domain: text("domain").notNull().default("default"),
  sequence: integer("sequence").notNull().default(0),
  page: text("page").notNull(),
  section: text("section").notNull(),
  content: text("content").notNull(),
  status: text("status", { enum: ['published', 'drafted', 'deleted'] }).notNull().default("drafted"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type CmsContent = typeof cmsContent.$inferSelect;
export type NewCmsContent = typeof cmsContent.$inferInsert;
