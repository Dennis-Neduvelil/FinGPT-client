import { useState } from "react";
import { SignInAndUpUI } from "./SignInAndUpUI";
import { useAuth, useSocialLogin } from "@/hooks/reactQuery";
import { type AuthErrors } from "@/utils/auth";
import { handleLogin, handleSignUp } from "../../utils";

export const OnBoarding = () => {
  const { loginMutation, signUpMutation } = useAuth();
  const { googleLogin, appleLogin } = useSocialLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errors, setErrors] = useState<AuthErrors>({});
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <SignInAndUpUI
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      fullName={fullName}
      setFullName={setFullName}
      setConfirmPassword={setConfirmPassword}
      errors={errors}
      isSignUp={isSignUp}
      toggleSignUp={() => {
        setErrors({});
        setIsSignUp((prev) => !prev);
      }}
      handleLogin={() =>
        handleLogin({ email, password, setErrors, loginMutation })
      }
      handleSignUp={() =>
        handleSignUp({
          fullName,
          email,
          password,
          confirmPassword,
          setErrors,
          signUpMutation,
        })
      }
      handleGoogleLogin={googleLogin}
      handleAppleLogin={appleLogin}
      loading={loginMutation.isPending || signUpMutation.isPending}
    />
  );
};
