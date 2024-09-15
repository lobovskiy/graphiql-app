import z, { string } from 'zod';

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, 'emailRequired')
      .email('invalidEmail')
      .max(100)
      .trim(),
    username: z.string().min(1, 'usernameRequired').max(100).trim(),
    password: z
      .string()
      .min(1, { message: 'passwordRequired' })
      .min(8, { message: 'passwordMin' })
      .max(20, { message: 'passwordMax' })
      .refine((password) => /[A-Z]/.test(password), {
        message: 'passwordUpperCase',
      })
      .refine((password) => /[a-z]/.test(password), {
        message: 'passwordLowerCase',
      })
      .refine((password) => /[0-9]/.test(password), {
        message: 'passwordNumber',
      })
      .refine((password) => /[!@#$%^&*]/.test(password), {
        message: 'passwordSpecialChar',
      }),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwordsMatch',
    path: ['confirmPassword'],
  });

export type RegisterData = z.infer<typeof registerSchema>;

export const userDataSchema = z.object({
  uid: string().min(1),
  email: string().min(1),
  name: string().min(1),
  authProvider: string().optional(),
});

export type UserData = z.infer<typeof userDataSchema>;
