import z from 'zod';

let schemaUserAPI = z.object({
  username: z.string({
    invalid_type_error: "Username must be a string",
    required_error: "Username is required"
  }),
  password: z.string({
    invalid_type_error: "Password must be a string",
    required_error: "Password is required"
  })
})

export function validate_body(object){
  return schemaUserAPI.safeParse(object);
}