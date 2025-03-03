import z from "zod";
export const authSchema = (type: "sign-in" | "sign-up" | "reset-password" | "change-password") => {
  return z.object({
    fullname:
      type === "sign-in" || type === "reset-password" || type === "change-password"
        ? z.string().optional()
        : z
            .string()
            .min(3, {
              message: "Full Name must be at least 3 characters.",
            })
            .max(50, {
              message: "Full Name must be shorter than 50 characters.",
            }),
    email:
      type === "change-password"
        ? z.string().optional()
        : z.string().email({ message: "Email is not format. Please check and try again." }).max(50, {
            message: "Email is not format or must not be longer than 50 characters.",
          }),
    password: type === "reset-password" ? z.string().optional() : z.string().min(8, "Password at least 8 characters"),
    passwordConfirm: type !== "change-password" ? z.string().optional() : z.string().min(8, "Password at least 8 characters"),
    rememberMe: z.boolean().default(false).optional(),
  });
};
