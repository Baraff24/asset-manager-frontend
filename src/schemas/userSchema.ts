import { z } from "zod";
import { departmentSchema } from "./departmentSchema";

const GENDER_CHOICES = ["MAN", "WOMAN", "NONE"] as const;
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
  // Include other fields if necessary, but avoid sensitive data like 'password'
});

export const usersSchema = z.array(userSchema);

export type User = z.infer<typeof userSchema>;
export type Users = z.infer<typeof usersSchema>;