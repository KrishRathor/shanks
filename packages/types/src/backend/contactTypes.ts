import { z } from "zod";

export const CreateContactInput = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});


export const GetContactByIdRequest = z.object({
  id: z.string(),
});
