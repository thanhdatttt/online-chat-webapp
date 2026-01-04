import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa6";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6 z-10", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border shadow-lg shadow-black/5 dark:shadow-black/40">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              {/* header */}
              <div className="flex flex-col items-center text-center gap-2">
                <h1 className="text-5xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-balance">Welcome to Echo! Fill in form to start your story</p>
              </div>

              {/* fullname */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="block text-lg">First Name</Label>
                  <Input type="text" id="firstName" placeholder="John"></Input>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="block text-lg">Last Name</Label>
                  <Input type="text" id="lastName" placeholder="Marson"></Input>
                </div>
              </div>

              {/* username */}
              <div className="flex flex-col gap-2">
                <div className="space-y-2">
                  <Label htmlFor="username" className="block text-lg">Username</Label>
                  <Input type="text" id="username" placeholder="Enter your username"></Input>
                </div>
              </div>

              {/* email */}
              <div className="flex flex-col gap-2">
                <div className="space-y-2">
                  <Label htmlFor="email" className="block text-lg">Email</Label>
                  <Input type="email" id="email" placeholder="Example@gmail.com"></Input>
                </div>
                <p className="text-center text-sm text-muted-foreground text-balance">We'll use this to contact you. We will not share your email with anyone else.</p>
              </div>

              {/* password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="password" className="block text-lg">Password</Label>
                  <Input type="password" id="password" placeholder="Enter your password"></Input>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="block text-lg">Confirm Password</Label>
                  <Input type="password" id="confirmPassword" placeholder="Confirm your password"></Input>
                </div>
              </div>

              {/* form button */}
              <Button type="submit" className="text-lg w-full cursor-pointer hover:bg-accent hover:text-black">
                Create account
              </Button>
            </div>

            {/* third app buttons */}
            <div className="text-center text-sm my-4">
              <p>Or continue with</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Button className="hover:bg-red-400 hover:text-amber-50 cursor-pointer" variant="outline" type="button"> <FaGoogle/> </Button>
              <Button className="hover:bg-blue-400 hover:text-amber-50 cursor-pointer" variant="outline" type="button"> <FaFacebookF/> </Button>
              <Button className="hover:bg-gray-400 hover:text-amber-50 cursor-pointer" variant="outline" type="button"> <FaGithub/> </Button>
            </div>

            {/* sign in */}
            <div className="text-center text-sm mt-4">
              <p>Already have an account? <a href="/login" className="text-primary font-bold cursor-pointer hover:underline">Login</a></p>
            </div>
          </form>

          {/* Image */}
          <div className="bg-muted relative hidden md:block">
            <img
              src="/AuthenImage.png"
              alt="Authentication Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      {/* term of service and privacy policy */}
      <div className="px-6 text-center text-balance">
        You should agree to our <a href="#" className="text-primary font-bold cursor-pointer hover:underline">Terms of Service</a>{" "} and <a href="#" className="text-primary font-bold cursor-pointer hover:underline">Privacy Policy</a>.
      </div>
    </div>
  )
}
