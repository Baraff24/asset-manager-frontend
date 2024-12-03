import { z } from "zod";

export const supplierSchema = z.object({
  id: z.number(),
  name: z.string(),
  telephone: z.string(),
});

export const suppliersSchema = z.array(supplierSchema);

export type Supplier = z.infer<typeof supplierSchema>;
