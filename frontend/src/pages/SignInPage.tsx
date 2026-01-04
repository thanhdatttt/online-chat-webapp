import { LoginForm } from "@/components/login-form"

const SignInPage = () => {
  return (
    <div className="bg-[radial-gradient(125%_125%_at_50%_90%,#fff_40%,#6366f1_100%)] flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-6xl">
        <LoginForm />
      </div>
    </div>
  );
}

export default SignInPage;