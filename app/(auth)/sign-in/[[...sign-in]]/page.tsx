import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl">
            Welcome Back!
          </h1>
          <p className="text-base text-muted-foreground">
            Log in or Create an account to get back to your dashboard!
          </p>
        </div>
        <div className="flex items-center justify-center pt-8">
          <ClerkLoaded>
            <SignIn path="/sign-in"/>
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="h-8 w-8 animate-spin"/>
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-blue-700 hidden lg:flex items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Image src="/logo.svg" width={100} height={100} alt="Logo" />
          <h1 className="font-black text-4xl text-gray-200">
            Finance
          </h1>
          <p>Total solution for your finance account management</p>
        </div>
      </div>
    </div>
  )
}