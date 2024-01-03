import z from 'zod';

export const tokenSchema = z.object({
  username: z.string({
    invalid_type_error: 'Username must be a string',
    required_error: 'Username is required'
  }),
  password: z.string({
    required_error: 'password is required'
  }),
  type_key: z.enum(["API", "APP"],{
    required_error: 'Type key is required'
  })
});

export function validate_token(object){
  return tokenSchema.safeParse(object);
}

