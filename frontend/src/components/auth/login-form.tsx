import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/stores/auth.store.ts";
import { useNavigate } from "react-router-dom";
import Error from "../utils/Error.tsx";
import z from "zod";

const signinSchema = z.object({
  usernameOrEmail: z.string().min(1, "Username or email is required"),
  password: z.string().min(1, "Password is required"),
});

// get type of signin schema
type SignInFormValues = z.infer<typeof signinSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // navigate function
  const navigate = useNavigate();
  // store functions
  const {signIn, loginWithGoogle, loginWithFacebook, loginWithGithub} = useAuthStore();

  // form validation action
  const {register, handleSubmit, formState:{errors, isSubmitting}} = useForm<SignInFormValues>({
    resolver: zodResolver(signinSchema),
  });

  // submit form
  const onSubmit = async (data: SignInFormValues) => {
    try {
      const {usernameOrEmail, password} = data;
      await signIn(usernameOrEmail, password);

      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border shadow-lg shadow-black/5 dark:shadow-black/40">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              {/* header */}
              <div className="flex flex-col items-center text-center gap-2">
                <h1 className="text-6xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">Login to Echo to continue your story</p>
              </div>

              {/* username */}
              <div className="flex flex-col gap-2">
                <div className="space-y-2">
                  <Label htmlFor="usernameOrEmail" className="block text-lg">Username</Label>
                  <Input type="text" id="usernameOrEmail" placeholder="Enter your username or email"
                  {...register("usernameOrEmail")}></Input>
                  {/* input error */}
                  {errors.usernameOrEmail && (
                    <Error message={errors.usernameOrEmail.message}/>
                  )}
                </div>
              </div>

              {/* password */}
              <div className="flex flex-col gap-2">
                <div className="space-y-2">
                  <Label htmlFor="password" className="block text-lg">Password</Label>
                  <Input type="password" id="password" placeholder="Enter your password"
                  {...register("password")}></Input>
                  {/* input error */}
                  {errors.password && (
                    <Error message={errors.password.message}/>
                  )}
                </div>
                <a href="#" className="text-sm text-muted-foreground text-balance cursor-pointer hover:underline hover:text-primary">Forgot password?</a>
              </div>

              {/* form button */}
              <Button type="submit" className="text-lg w-full cursor-pointer hover:bg-accent hover:text-black disabled:text-white disabled:bg-accent" disabled={isSubmitting}>
                Login
              </Button>
            </div>

            {/* third app buttons */}
            <div className="text-center text-sm my-4">
              <p>Or continue with</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Button onClick={loginWithGoogle} className="hover:bg-red-400 hover:text-amber-50 cursor-pointer" variant="outline" type="button"> <FaGoogle/> </Button>
              <Button onClick={loginWithFacebook} className="hover:bg-blue-400 hover:text-amber-50 cursor-pointer" variant="outline" type="button"> <FaFacebookF/> </Button>
              <Button onClick={loginWithGithub} className="hover:bg-gray-400 hover:text-amber-50 cursor-pointer" variant="outline" type="button"> <FaGithub/> </Button>
            </div>

            {/* sign in */}
            <div className="text-center text-sm mt-4">
              <p>Dont have an account? <a href="/register" className="text-primary font-bold cursor-pointer hover:underline">Register</a></p>
            </div>
          </form>


          <div className="bg-muted relative hidden md:block">
            <img
              src="/LoginImg.png"
              alt="Authentication Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      {/* term of service and privacy policy */}
      <div className="px-6 text-center text-balance *:[a]:text-primary *:[a]:font-bold *:[a]:cursor-pointer *:[a]:hover:underline">
        You should agree to our <a href="#">Terms of Service</a>{" "} and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
