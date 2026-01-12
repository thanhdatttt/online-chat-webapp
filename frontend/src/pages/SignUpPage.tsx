import { SignupForm } from "@/components/auth/signup-form";

const SignUpPage = () => {
  return (
    <div className="bg-linear-to-br from-primary via-purple-400 to-pink-400 flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      {/* Your Content/Components */}
      <div className="w-full max-w-lg md:max-w-6xl">
        <SignupForm />
      </div>
    </div>
  );
}

export default SignUpPage;