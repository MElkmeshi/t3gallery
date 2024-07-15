// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `t3gallery_${name}`);

export const images = createTable(
  "images",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    url: varchar("url", { length: 1024 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);
export const employees = createTable("employees", {
  id: integer("id").primaryKey(), //userId
  name: varchar("name", { length: 256 }).notNull(), //fullName
  email: varchar("email", { length: 256 }).notNull(), //userEmail
  password: varchar("password", { length: 512 }).notNull(), //userPassword
  mobile: varchar("mobile", { length: 256 }).notNull(), //userPhoneForLogIn
  role: varchar("role", { length: 256 }).notNull(), //userRole
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});

export const employeesRelations = relations(employees, ({ many }) => ({
  pos: many(pos),
}));

export const pos = createTable("POS", {
  id: integer("id").primaryKey(), //userId
  name: varchar("name", { length: 256 }).notNull(), //fullName
  email: varchar("email", { length: 256 }).notNull(), //userEmail
  mobile: varchar("mobile", { length: 256 }).notNull(), //userPhoneForLogIn
  employeeId: integer("employee_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});

export const postsRelations = relations(pos, ({ one }) => ({
  manger: one(employees, {
    fields: [pos.employeeId],
    references: [employees.id],
  }),
}));
