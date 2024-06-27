import { format } from "date-fns"

import {formatCurrency } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

export const CategoryTooltip = ({ active, payload}: any) => {
   if (!active) return null;

   const name = payload[0].payload.name;
   const value = payload[0].value;

   return (
      <div className="rounded-sm bg-white/80 shadow-sm border overflow-hidden">
         <div className="text-sm p-2 px-3 text-muted-foreground">
            {name}
         </div>
         <Separator />
         <div className="p-2 px-3 space-y-1">
            <div className="flex items-center justify-between gap-x-4">
               <div className="flex items-center gap-x-2">
                  <div className="size-2 bg-rose-500 rounded-full" />
                  <p className="text-xs text-muted-foreground">
                     Expenses:
                  </p>                 
               </div>
                  <p className=" text-xs text-rose-500">
                     {formatCurrency(value * -1)}
                  </p>
            </div>
         </div>
      </div>
   )
}