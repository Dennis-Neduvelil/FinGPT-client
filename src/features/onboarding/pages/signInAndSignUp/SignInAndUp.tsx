import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { SignInAndUpUI } from "./SignInAndUpUI";
import { loginSchema, signUpSchema, type LoginInput, type SignUpInput } from "../../../../validators";

// Fake API call functions (replace with your real endpoints)
const loginApi = async (data: LoginInput) => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

const signUpApi = async (data: SignUpInput) => {
  const res = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Signup failed");
  return res.json();
};

export const OnBoarding = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});
  const [isSignUp, setIsSignUp] = useState(false);

  // React Query mutations
  const loginMutation = useMutation({ mutationFn: loginApi });
  const signUpMutation = useMutation({ mutationFn: signUpApi });

const validate = () => {
  setErrors({});
  if (isSignUp) {
    const result = signUpSchema.safeParse({ email, password, confirmPassword });
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.issues.forEach((e) => {
        if (e.path[0]) fieldErrors[e.path[0] as keyof typeof errors] = e.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    return true;
  } else {
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.issues.forEach((e) => {
        if (e.path[0]) fieldErrors[e.path[0] as keyof typeof errors] = e.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    return true;
  }
};

  const handleLogin = () => {
    if (!validate()) return;
    loginMutation.mutate({ email, password });
  };

  const handleSignUp = () => {
    if (!validate()) return;
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