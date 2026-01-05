import { SignupForm } from "@/components/auth/signup-form";

const SignUpPage = () => {
  return (
    <div className="bg-[radial-gradient(125%_125%_at_50%_90%,#fff_40%,#6366f1_100%)] flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      {/* Your Content/Components */}
      <div className="w-full max-w-lg md:max-w-6xl">
        <SignupForm />
      </div>
    </div>
  );
}

export default SignUpPage;