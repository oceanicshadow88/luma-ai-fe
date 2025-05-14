import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../schema";
import { useResetPassword } from "../hooks/useResetPassword";
import { Input } from "@components/Input";
import { PasswordInput } from "@components/PasswordInput";
import { Button } from "@components/Button";
import { FormError } from "@components/FormError";
import { ResetPasswordFormData } from "@features/auth/type";
import { ApiError } from "@custom-types/ApiError";
import { toast } from "react-hot-toast";


export function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const {
    resetPassword,
  } = useResetPassword();

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await resetPassword(data);
      toast.success("Password reset successfully. Please log in again with new password.");

      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
    } catch (error) {
      if (error instanceof ApiError) {
        const msg = error.message || "Failed to reset password.";
        if (msg.includes("code")) {
          setError("verificationCode", { message: msg });
        } else if (msg.includes("match")) {
          setError("confirmPassword", { message: msg });
        } else if (msg.includes("password")) {
          setError("password", { message: msg });
        } else if (msg.includes("email")) {
          setError("email", { message: msg });
        } else {
          setError("root", { message: msg });
        }
      } else {
        setError("root", { message: "Unexpected error occurred." });
      }
    }
  };

  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      <div className="space-y-4 rounded-md shadow-sm">
        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          {...register("email")}
          error={errors.email?.message}
        />


        <PasswordInput
          id="password"
          label="Password"
          placeholder="************"
          {...register("password")}
          error={errors.password?.message}
        />
      </div>

      {errors.root && <FormError message={errors.root.message} />}

      <div>
        <Button type="submit" fullWidth disabled={isSubmitting} isLoading={isSubmitting}>
          Continue
        </Button>
      </div>
    </form>
  );
}
