import { z } from "zod";

export const TeacherValidation = z.object({
  Firstname: z
    .string({ required_error: "firstname is required" })
    .min(5, "firstname is too short")
    .trim(),
  Lastname: z
    .string({ required_error: "lastname is required" })
    .min(5, "lastname is too short")
    .trim(),
  Email: z
    .string({
      required_error: "Email must not be empty",
    })
    .email({ message: "please enter a valid email" }),
  PhoneNumber: z
    .string({ required_error: "phone number must not be empty" })
    .regex(
      /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{2}$/,
      "enter a correct phone number"
    ),
  Course: z.enum(
    [
      "Mathematics",
      "Spanish",
      "English",
      "Desktop computing",
      "Data management",
      "",
    ],
    { required_error: "select a course" }
  ),
});
