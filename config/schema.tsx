import SuggestedDoctorCard from "@/app/(routes)/dashboard/_components/SuggestedDoctorCard";
import { pgTable, integer, varchar, text, json } from "drizzle-orm/pg-core";
// import { text } from "stream/consumers";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
//   age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits:integer()
});

export const SessionChatTable=pgTable('SessionChatTable',{
  id:integer().primaryKey().generatedAlwaysAsIdentity(),
  sessionId:varchar().notNull(),
  notes:text(),
  selectedDoctor:json(),
  conversation:json(),
  report:json(),
  createdBy:varchar().references(()=>usersTable.email),
  createdOn:varchar(),

})