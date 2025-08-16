import {
  RoundedButton,
  RoundedTextBox,
  Header,
  InlineActionText,
  DividerWithText,
} from "../../../../components";
import { Color, Input } from "../../../../types";

interface SignInAndUpUIProps {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  errors: { email?: string; password?: string; confirmPassword?: string };
  isSignUp: boolean;
  toggleSignUp: () => void;
  handleLogin: () => void;
  handleSignUp: () => void;
  loading?: boolean;
}

export const SignInAndUpUI: React.FC<SignInAndUpUIProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  errors,
  isSignUp,
  toggleSignUp,
  handleLogin,
  handleSignUp,
  loading = false,
}) => {
  return (
    <div className="h-[100vh] w-[100vw] bg-[#F9F9F9] flex flex-col">
      {/* Header */}
      <Header text="FinGPT" />

      {/* Main section */}
      <div className="flex flex-col items-center justify-center flex-1 gap-6">
        <div className="flex flex-col items-center justify-center max-w-md gap-4">
          <h1 className="text-3xl font-semibold pb-2 text-center">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h1>

          {/* Email */}
          <div className="w-full">
            <RoundedTextBox
              id="email"
              label="Email address"
              value={email}
              onChange={setEmail}
              color={Color.TEAL}
              error={errors.email}
              type={Input.EMAIL}
            />
          </div>

          {/* Password */}
          <div className="w-full">
            <RoundedTextBox
              id="password"
              label="Password"
              value={password}
              onChange={setPassword}
              color={Color.TEAL}
              error={errors.password}
              type={Input.PASSWORD}
            />
          </div>

          {/* Confirm Password (signup only) */}
          {isSignUp && (
            <div className="w-full">
              <RoundedTextBox
                id="confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                color={Color.TEAL}
                error={errors.confirmPassword}
                type={Input.PASSWORD}
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="w-full">
            <RoundedButton
              name={loading ? "Loading..." : isSignUp ? "Sign Up" : "Continue"}
              color={Color.BLACK}
              filled
              onClickHandler={isSignUp ? handleSignUp : handleLogin}
              disabled={loading}
            />
          </div>

          {/* Switch link */}
          <InlineActionText
            mainText={
              isSignUp ? "Already have an account?" : "Don’t have an account?"
            }
            buttonText={isSignUp ? "Sign in" : "Sign Up"}
            buttonAction={toggleSignUp}
          />
        </div>

        {/* Social login only for login */}
        {!isSignUp && (
          <div className="flex flex-col items-center w-full max-w-md gap-3">
            <DividerWithText text="OR" />

            <RoundedButton
              name="Continue with Google"
              color={Color.TEAL}
              filled={false}
              icon="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
              onClickHandler={() => console.log("Google login clicked")}
            />

            <RoundedButton
              name="Continue with Apple"
              color={Color.TEAL}
              filled={false}
              icon="https://img.icons8.com/?size=100&id=95294&format=png&color=000000"
              onClickHandler={() => console.log("Apple login clicked")}
            />
          </div>
        )}
      </div>
    </div>
  );
};
