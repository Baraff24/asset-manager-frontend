import { z } from "zod";

// Define the registration form schema
export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password1: z.string().min(6, "Password must be at least 6 characters long"),
  password2: z.string().min(6, "Password confirmation must be at least 6 characters long"),
  email: z.string().email("Invalid email address"),
  first_name: z.string().max(30).optional(),
  last_name: z.string().max(150).optional(),
  gender: z.enum(["MAN", "WOMAN", "NONE"]).optional(),
  telephone: z
    .string()
    .regex(/^\d+$/, "Telephone must contain only digits")
    .max(20)
    .optional(),
  department: z.number().nullable().optional(),
});

// Infer the TypeScript type from the schema
export type RegisterFormData = z.infer<typeof registerSchema>;
