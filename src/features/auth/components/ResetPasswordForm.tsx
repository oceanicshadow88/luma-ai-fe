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
import { ApiError, ERROR_CODE_MAP, ResetPasswordField} from "@custom-types/ApiError";
import { toast } from "react-hot-toast";


function isRateLimitError(err: unknown): err is ApiError & { meta: { cooldownSeconds: number } } {
  return (
    err instanceof ApiError &&
    typeof err.meta?.cooldownSeconds === "number"
  );
}

export function ResetPasswordForm() {
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

  const {
    resetPassword,
    sendVerificationCode,
    isCodeSending,
    countdown,
  } = useResetPassword();

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await resetPassword(data);
      toast.success("Password reset successfully. Please log in again with new password.");

      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
    } catch (error) {
      if (error instanceof ApiError) { //Use error map to decide the error messages
        const mapped = ERROR_CODE_MAP[error.code] || ERROR_CODE_MAP.UNKNOWN_ERROR;
        setError(mapped.field as ResetPasswordField, { message: mapped.message });
      } else {
        setError("root", { message: "Unexpected error occurred." });
      }
    }
  };

  const handleSendCode = async () => {
    clearErrors("email");
    const isValid = await trigger("email");
    if (!isValid) return;

    const email = getValues("email");

    try {
      await sendVerificationCode(email);
      toast.success("If the email is valid, a verification code will be sent.");
    } catch (error) {
      if (isRateLimitError(error)) {
        setError("verificationCode", {
          message: `Too many requests. Try again in ${error.meta.cooldownSeconds} seconds.`,
        });
      } else if (error instanceof ApiError) {
        const mapped = ERROR_CODE_MAP[error.code] || ERROR_CODE_MAP.UNKNOWN_ERROR;
        setError(mapped.field as any, { message: mapped.message });
      } else {
        setError("verificationCode", {
          message: "Unexpected error. Please try again.",
        });
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

        <PasswordInput
          id="password"
          label="New Password"
          placeholder="************"
          {...register("password")}
          error={errors.password?.message}
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm New Password"
          placeholder="************"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </div>

      {errors.root && <FormError message={errors.root.message} />}

      <div>
        <Button type="submit" fullWidth disabled={isSubmitting} isLoading={isSubmitting}>
          Reset Password
        </Button>
      </div>
    </form>
  );
}
