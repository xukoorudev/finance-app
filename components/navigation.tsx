'use client'

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useMedia, useMountedState } from "react-use"

import { NavButton } from "@/components/nav-button"
import { Button } from "@/components/ui/button"
import {
   Sheet,
   SheetContent,
   SheetTrigger,
 } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
 

const routes = [
   {
      href: "/",
      label: "Overview",
   },
   {
      href: "/transactions",
      label: "Transactions",
   },
   {
      href: "/accounts",
      label: "Acconnts",
   },
   {
      href: "/categories",
      label: "Categories",
   },
   // {
   //    href: "/settings",
   //    label: "Settings",
   // },
]

export const Navigation = () => {
   
   const [isOpen, setIsOpen] = useState(false)
   const isMounted = useMountedState();
   
   const router = useRouter()
   const pathname = usePathname()
   const isMobile = useMedia("(max-width: 1024px)", false)
   
   const onClick = (href: string) => {
      router.push(href)
      setIsOpen(false)
   }

   if (!isMounted) return null;
   
   if (isMobile) {
      return (
         <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
               <Button 
               variant="outline"
               size="icon" 
               className="font-normal bg-white/10 text-white hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none  focus:bg-white/30 transition"
               >
                  <MenuIcon className="size-6"/>
               </Button>
            </SheetTrigger>
            <SheetContent side="left" className="px-2">
               <nav className="flex flex-col gap-y-2 pt-6">
                  {routes.map((route) => (
                     <Button
                        key={route.href}
                        variant={route.href === pathname ? "secondary" : "ghost"}
                        onClick={() => onClick(route.href)}
                        className="w-full justify-start"
                        
                     >
                        {route.label}
                     </Button>
                  ))}
               </nav>
            </SheetContent>
         </Sheet>
      )
   }

   return (
      <nav className="hidden lg:flex items-center gap-x-2 overflow-y-auto">
      {routes.map((route) => (
         <NavButton 
         key={route.href}
            href={route.href}
            label={route.label}
            isActive={pathname === route.href}
         />

      ))}
    </nav>
  )
}
