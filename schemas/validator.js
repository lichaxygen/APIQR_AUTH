import z from 'zod';

export const validatorSchema = 
z.object(
  {
    username: z.string(
      {
        invalid_type_error: "Username must be a string",
        required_error: "Username is required in order to authenticate token"
      }),
      token_type: z.enum(["API", "APP"],{
        required_error: 'Token type is required'
      }).default("API")
  },
  {
    invalid_type_error: "Not correct JSON",
    required_error: "JSON is required"
  }
)

export function validate_body(object){
  return validatorSchema.safeParse(object);
}