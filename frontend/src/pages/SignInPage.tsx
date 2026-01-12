import { LoginForm } from "@/components/auth/login-form"

const SignInPage = () => {
  return (
    <div className="bg-linear-to-br from-primary via-purple-400 to-pink-400 flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-6xl">
        <LoginForm />
      </div>
    </div>
  );
}

export default SignInPage;