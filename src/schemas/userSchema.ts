import { z } from "zod";
import { departmentSchema } from "./departmentSchema";

// Define the allowed gender choices
const GENDER_CHOICES = ["Male", "Female", "Other", "None"] as const;
export const userIdSchema = z.number();

export const userSchema = z.object({
  id: userIdSchema,
  username: z.string(),
  email: z.string().email(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  gender: z.enum(GENDER_CHOICES),
  telephone: z.string().nullable(),
  department: departmentSchema.nullable(),
});

export type User = z.infer<typeof userSchema>;
