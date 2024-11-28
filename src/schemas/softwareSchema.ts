import { z } from "zod";
import { supplierSchema } from "./supplierSchema";
import { deviceIdSchema } from "./deviceSchema"; // Assuming deviceIdSchema is z.string().uuid()

export const softwareSchema = z.object({
  id: z.number(),
  name: z.string(),
  version: z.string(),
  supplier: supplierSchema,
  license_key: z.string(),
  expire_date: z.string(), // Use z.string() if dates are ISO strings
  installed_on: z.array(deviceIdSchema).optional(),
  max_installations: z.number().nonnegative(),
});

export type Software = z.infer<typeof softwareSchema>;
