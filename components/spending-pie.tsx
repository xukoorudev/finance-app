'use client'
import { useState } from "react";
import { FileSearch, Loader2, PieChart, Radar, Target } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { 
   Card,
   CardHeader,
   CardContent,
   CardTitle
} from "@/components/ui/card"
import { 
   Select,
   SelectTrigger,
   SelectContent,
   SelectValue,
   SelectItem 
} from "@/components/ui/select";

import { PieVariant } from "@/components/pie-variant";
import { RadarVariant } from "@/components/radar-variant";
import { RadialVariant } from "@/components/radial-variant";


type Props = {
   data?: {
      name: string;
      value: number;

   }[];
}

export const SpendingPie = ({data = []}: Props) => {
   const [chartType, setChartType] = useState("pie");

   const onTypeChange = (type: string) => {

      setChartType(type)
   }

   return (
      <Card className=" border-none drop-shadow-sm">
         <CardHeader className="flex space-y-2 flex-row items-center justify-between">
            <CardTitle className="text-xl line-clamp-1">
               Transactions
            </CardTitle>
            
            <Select
               defaultValue={chartType}
               onValueChange={onTypeChange}
            >
               <SelectTrigger className="w-36 h-9 rounded-md px-3">
                  <SelectValue placeholder="Chart type"/>
                  <SelectContent>
                     <SelectItem value="pie">
                        <div className="flex items-center">
                           <PieChart className="size-4 mr-2 shrink-0"/>
                           <p className="line-clamp-1">
                              Pie chart
                           </p>
                        </div>
                     </SelectItem>
                     <SelectItem value="radar">
                        <div className="flex items-center">
                           <Radar className="size-4 mr-2 shrink-0"/>
                           <p className="line-clamp-1">
                              Radar chart
                           </p>
                        </div>
                     </SelectItem>
                     <SelectItem value="radial">
                        <div className="flex items-center">
                           <Target className="size-4 mr-2 shrink-0"/>
                           <p className="line-clamp-1">
                              Radial chart
                           </p>
                        </div>
                     </SelectItem>
                  </SelectContent>
               </SelectTrigger>
            </Select>
         </CardHeader>
         <CardContent>
            {data.length === 0 ? (
               <div className=" flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
                  <FileSearch className=" size-6 text-muted-foreground"/>
                  <p className="text-muted-foreground text-sm">
                     No data for this period
                  </p>
               </div>
            ): (
               <>                  
                  {chartType === "pie" && <PieVariant data={data}/>}
                  {chartType === "radar" && <RadarVariant data={data}/>}
                  {chartType === "radial" && <RadialVariant data={data}/>}
               </>
            )}
         </CardContent>
      </Card>
   )
}

export const SpendingPieLoading = () => {
   return (
      <Card className=" border-none drop-shadow-sm">
         <CardHeader className="flex space-y-2 flex-row items-center justify-between">
            <Skeleton className="h-8 w-48"/>
            <Skeleton className="h-8 w-full lg:w-[120px]"/>
         </CardHeader>
         <CardContent>
            <div className=" flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
               <Loader2 className="h-6 w-6 text-slate-300 animate-spin" />
            </div>
         </CardContent>
      </Card>
   )
}