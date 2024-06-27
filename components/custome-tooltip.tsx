import { format } from "date-fns"

import {formatCurrency } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

export const CustomTooltip = ({ active, payload}: any) => {
   if (!active) return null;

   const date = payload[0].payload.date;
   const income = payload[0].value;
   const expenses = payload[1].value;

   return (
      <div className="rounded-sm bg-white/80 shadow-sm border overflow-hidden">
         <div className="text-sm p-2 px-3 text-muted-foreground">
            {format(date, "MMM dd, yyyy")}
         </div>
         <Separator />
         <div className="p-2 px-3 space-y-1">
            <div className="flex items-center justify-between gap-x-4">
               <div className="flex items-center gap-x-2">
                  <div className="size-2 bg-blue-500 rounded-full" />
                  <p className="text-xs text-muted-foreground">Income:</p>                
               </div>
                  <p className=" text-xs text-blue-500">{formatCurrency(income)}</p>
            </div>
            <div className="flex items-center justify-between gap-x-4">
               <div className="flex items-center gap-x-2">
                  <div className="size-2 bg-rose-500 rounded-full" />
                  <p className="text-xs text-muted-foreground">Expenses:</p>                 
               </div>
                  <p className=" text-xs text-rose-500">{formatCurrency(expenses * -1)}</p>
            </div>
         </div>
      </div>
   )
}