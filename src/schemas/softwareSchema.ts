import { z } from "zod";
import {deviceIdSchema} from "./deviceSchema";

export const softwareSchema = z.object({
  id: z.number(),
  name: z.string(),
  version: z.string(),
  supplier: z.number(),
  license_key: z.string(),
  expire_date: z.string(),
  installed_on: z.array(deviceIdSchema).optional(),
  max_installations: z.number().nonnegative(),
});

export const softwareFormSchema = z.object({
  name: z.string(),
  version: z.string(),
  license_key: z.string().optional(),
  max_installations: z.coerce.number().min(1, 'Il numero massimo di installazioni deve essere almeno 1'),
  supplier: z.string(),
  expire_date: z.string(),
});

export const softwaresSchema = z.array(softwareSchema);

export type Software = z.infer<typeof softwareSchema>;
