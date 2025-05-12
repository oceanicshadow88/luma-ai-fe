import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../schema";
import { useResetPassword } from "../hooks/useResetPassword";
import { Input } from "@components/Input";
import { PasswordInput } from "@components/PasswordInput";
import { Button } from "@components/Button";
import { FormError } from "@components/FormError";
import { VerificationCodeInput } from "@components/VerificationCodeInput";
import { ResetPasswordFormData } from "@features/auth/type";

export const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    clearErrors,
    getValues,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const { resetPassword, sendVerificationCode, isCodeSending, countdown } = useResetPassword();

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await resetPassword(data);
      navigate("/auth/login");
    } catch (error: any) {
      if (error.code === "email_not_found") {
        setError("email", { message: "This email is not registered" });
      } else if (error.code === "invalid_code") {
        setError("verificationCode", { message: "Invalid or expired code. Please request a new one." });
      } else if (error.code === "passwords_mismatch") {
        setError("confirmPassword", { message: "Passwords do not match" });
      } else {
        setError("root", { message: "Failed to reset password. Please try again. " });
      }
    }
  };

  const handleSendCode = async () => {
    clearErrors("email");

    const valid = await trigger("email");
    if (!valid) {
      return;
    }

    const email = getValues("email");

    try {
      await sendVerificationCode(email);
      alert("Verification code sent successfully!")
    } catch (error: any) {
      if (error.code === "email_not_found") {
        setError("email", { message: "This email is not registered." });
      } else {
        setError("verificationCode", { message: "Failed to send code. Please try again." });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      <div className="space-y-4 rounded-md shadow-sm">
        <div>
          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder="your@email.com"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div>
          <VerificationCodeInput
            id="verificationCode"
            label="Verification Code"
            placeholder="Enter the 6-digit code"
            buttonText={
              countdown > 0 ? `Resend in ${countdown}s` : "Send Verification Code"
            }
            onButtonClick={handleSendCode}
            isButtonDisabled={countdown > 0 || isCodeSending}
            {...register("verificationCode")}
            error={errors.verificationCode?.message}
          />
        </div>

        <div>
          <PasswordInput
            id="password"
            label="New Password"
            placeholder="************"
            {...register("password")}
            error={errors.password?.message}
          />
        </div>

        <div>
          <PasswordInput
            id="confirmPassword"
            label="Confirm New Password"
            placeholder="************"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </div>
      </div>



      {errors.root && <FormError message={errors.root.message} />}

      <div>
        <Button
          type="submit"
          fullWidth
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Reset Password
        </Button>
      </div>

    </form>
  );
};  