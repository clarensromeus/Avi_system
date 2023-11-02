import { z, ZodType } from "zod";
import { Role } from "@/enum/validator";

// internally crafted imports of resources
import { ISignUp } from "@/typing/validation";

export const AdminSignup: ZodType<Omit<ISignUp, "DOB" | "Class">> = z
  .object({
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
    Password: z
      .string({
        required_error: "Password must not be empty",
      })
      .regex(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "please enter a strong password"
      ),
    Role: z.nativeEnum(Role),
  })
  .required();

export const StudentSignUp: ZodType<Omit<ISignUp, "Role">> = z
  .object({
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
    Password: z
      .string({
        required_error: "Password must not be empty",
      })
      .regex(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "please enter a strong password"
      ),
    DOB: z
      .string({ required_error: "DOB is required" })
      .min(8, "enter a correct date")
      .max(8, "enter a correct date")
      .trim(),
    Class: z.enum(
      ["9th grade", "8th grade", "4th grade", "1st grade", "7th grade"],
      { required_error: "class is required" }
    ),
  })
  .required();
