import { relations } from "drizzle-orm"
import { pgTableCreator } from "drizzle-orm/pg-core"

export const pgTableWithSuffix = pgTableCreator((name: string) => `${name}_table`)

export const users = pgTableWithSuffix("users", (t) => ({
  id: t.uuid("id").defaultRandom().primaryKey(),
  name: t.varchar("name", { length: 191 }).notNull(),
  email: t.varchar("email", { length: 191 }).notNull().unique(),
  password: t.varchar("password", { length: 191 }).notNull(),
  is_active: t.boolean("is_active").notNull().default(true),
  created_at: t.timestamp("created_at").notNull().defaultNow(),
  updated_at: t.timestamp("updated_at").notNull().defaultNow(),
  deleted_at: t.timestamp("deleted_at"),
}))

export const sessions = pgTableWithSuffix("sessions", (t) => ({
  id: t.uuid("id").defaultRandom().primaryKey(),
  user_id: t
    .uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  user_agent: t.text("user_agent"),
  ip_address: t.varchar("ip_address", { length: 45 }),
  refresh_token: t.text("refresh_token").notNull().unique(),
  expires_at: t.timestamp("expires_at").notNull(),
  created_at: t.timestamp("created_at").notNull().defaultNow(),
}))

export const accounts = pgTableWithSuffix("accounts", (t) => ({
  id: t.uuid("id").defaultRandom().primaryKey(),

  user_id: t
    .uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),

  provider: t.varchar("provider", { length: 50 }).notNull(),
  provider_account_id: t.varchar("provider_account_id", { length: 255 }).notNull(),

  access_token: t.text("access_token"),
  refresh_token: t.text("refresh_token"),
  expires_at: t.timestamp("expires_at"),

  created_at: t.timestamp("created_at").notNull().defaultNow(),
}))

export const notes = pgTableWithSuffix("notes", (t) => ({
  id: t.uuid("id").defaultRandom().primaryKey(),
  user_id: t
    .uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: t.varchar("title", { length: 255 }).notNull(),
  content: t.text("content").notNull(),
  is_public: t.boolean("is_public").notNull().default(false),
  metadata: t.json("metadata"),
  created_at: t.timestamp("created_at").notNull().defaultNow(),
  updated_at: t.timestamp("updated_at").notNull().defaultNow(),
  deleted_at: t.timestamp("deleted_at"),
}))

export const tags = pgTableWithSuffix("tags", (t) => ({
  id: t.uuid("id").defaultRandom().primaryKey(),
  name: t.varchar("name", { length: 100 }).notNull(),
  slug: t.varchar("slug", { length: 150 }).notNull().unique(),
  created_at: t.timestamp("created_at").notNull().defaultNow(),
}))

export const note_tags = pgTableWithSuffix("note_tags", (t) => ({
  id: t.uuid("id").defaultRandom().primaryKey(),
  note_id: t
    .uuid("note_id")
    .references(() => notes.id, { onDelete: "cascade" })
    .notNull(),
  tag_id: t
    .uuid("tag_id")
    .references(() => tags.id, { onDelete: "cascade" })
    .notNull(),
  created_at: t.timestamp("created_at").notNull().defaultNow(),
}))

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  notes: many(notes),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.user_id],
    references: [users.id],
  }),
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.user_id],
    references: [users.id],
  }),
}))

export const notesRelations = relations(notes, ({ one, many }) => ({
  user: one(users, {
    fields: [notes.user_id],
    references: [users.id],
  }),
  note_tags: many(note_tags),
}))

export const tagsRelations = relations(tags, ({ many }) => ({
  note_tags: many(note_tags),
}))

export const noteTagsRelations = relations(note_tags, ({ one }) => ({
  note: one(notes, {
    fields: [note_tags.note_id],
    references: [notes.id],
  }),
  tag: one(tags, {
    fields: [note_tags.tag_id],
    references: [tags.id],
  }),
}))

export type UserSelect = typeof users.$inferSelect
export type UserInsert = typeof users.$inferInsert

export type SessionSelect = typeof sessions.$inferSelect
export type SessionInsert = typeof sessions.$inferInsert

export type AccountSelect = typeof accounts.$inferSelect
export type AccountInsert = typeof accounts.$inferInsert

export type NoteSelect = typeof notes.$inferSelect
export type NoteInsert = typeof notes.$inferInsert

export type TagSelect = typeof tags.$inferSelect
export type TagInsert = typeof tags.$inferInsert

export type NoteTagSelect = typeof note_tags.$inferSelect
export type NoteTagInsert = typeof note_tags.$inferInsert
