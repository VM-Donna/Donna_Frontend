import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Enter a task title."),
  description: z.preprocess(
    (value) => {
      if (typeof value !== "string") {
        return value;
      }

      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed : undefined;
    },
    z.string().optional()
  ),
  source: z.enum(["manual", "email", "calendar", "system"]).default("manual")
});

export type CreateTaskFormInput = z.infer<typeof createTaskSchema>;
