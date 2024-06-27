'use client'

import { useUser } from "@clerk/nextjs"

export const WelcomeMsg = () => {
   const {user, isLoaded} = useUser()
  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-3xl lg:text-4xl font-extrabold text-white capitalize">
         Welcome Back{isLoaded ? ", ": " "}{user?.firstName} 👌
      </h2>
      <p className="text-white/70 lg:text-base">
         This is your Financial Overview Report
      </p>
    </div>
  )
}
