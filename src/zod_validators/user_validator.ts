import z from 'zod';

const userSchema = z.object({
  name: z.string({
    invalid_type_error: "Name must be a string",
    required_error: "Name is required"
  }).max(50),
  company: z.string().max(100),
  email: z.string({
    invalid_type_error: "Email must be a valid email address",
    required_error: "Email is required"
  }).email().max(100),
  password: z.string().max(50).min(8),
  address: z.string().max(100),
  zip_code: z.string().max(10),
  city: z.string().max(50),
  country: z.string().max(50),
  entry_date: z.date(),
  type_user: z.string().max(50),
  apis_left: z.number().int().positive().default(0),
})

export function validate_body(object){
  return userSchema.safeParse(object);
}