import { z } from "zod";

//Define the contact form schema
export const contactSchema = z.object({
  name: z.string().min(2, { message: "Il nome deve contenere almeno 3 caratteri" }),
  email: z.string().email({ message: "Inserisci un indirizzo email valido" }),
  subject: z.string().min(5, { message: "L'oggetto deve contenere almeno 5 caratteri" }),
  message: z.string().min(10, { message: "Il messaggio deve contenere almeno 10 caratteri" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;