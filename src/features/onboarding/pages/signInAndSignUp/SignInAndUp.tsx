import { useState } from "react";
import { SignInAndUpUI } from "./SignInAndUpUI";
import { useAuth } from "@/hooks/reactQuery";
import { validateAuth, type AuthErrors } from "@/utils/auth";

export const OnBoarding = () => {
  const { loginMutation, signUpMutation } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<AuthErrors>({});
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = () => {
    const { valid, errors } = validateAuth(false, { email, password });
    if (!valid) return setErrors(errors);
    loginMutation.mutate({ email, password });
  };

  const handleSignUp = () => {
    const { valid, errors } = validateAuth(true, { email, password, confirmPassword });
    if (!valid) return setErrors(errors);
    signUpMutation.mutate({ email, password, confirmPassword });
  };

  return (
    <SignInAndUpUI
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      errors={errors}
      isSignUp={isSignUp}
      toggleSignUp={() => {
        setErrors({});
        setIsSignUp((prev) => !prev);
      }}
      handleLogin={handleLogin}
      handleSignUp={handleSignUp}
      loading={loginMutation.isPending || signUpMutation.isPending}
    />
  );
};