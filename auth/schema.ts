import z from 'zod';

export const signInSchema = z.object({
  email: z.string().min(1, 'emailRequired').email('invalidEmail'),
  password: z.string().min(1, 'passwordRequired'),
});

export type SignInData = z.infer<typeof signInSchema>;
