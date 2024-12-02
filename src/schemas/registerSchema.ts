import { z } from "zod";

// Define the registration form schema
export const registerSchema = z.object({
  username: z.string().min(3, "Username deve essere almeno di 3 caratteri"),
  password1: z.string().min(6, "Password deve essere almeno di 6 caratteri"),
  password2: z.string().min(6, "Conferma password deve essere almeno di 6 caratteri"),
  email: z.string().email("Indirizzo email non valido"),
  first_name: z.string().max(30).optional(),
  last_name: z.string().max(150).optional(),
  gender: z.enum(["MAN", "WOMAN", "NONE"]).optional(),
  telephone: z
    .string()
    .regex(/^\d+$/, "Il telefono deve contenere solo cifre")
    .max(20)
    .optional(),
  department: z.number().nullable().optional(),
});

// Infer the TypeScript type from the schema
export type RegisterFormData = z.infer<typeof registerSchema>;
