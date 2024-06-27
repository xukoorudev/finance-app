'use client'
import { useState } from "react";
import { AreaChart, BarChart2, FileSearch, LineChart, Loader2 } from "lucide-react";
import { 
   Card,
   CardHeader,
   CardContent,
   CardTitle
} from "@/components/ui/card"

import { AreaVariant } from "@/components/area-variant";
import { BarVariant } from "@/components/bar-variant";
import { LineVariant } from "@/components/line-variant";

import { 
   Select,
   SelectTrigger,
   SelectContent,
   SelectValue,
   SelectItem 
} from "@/components/ui/select";
import { Skeleton } from "./ui/skeleton";



type Props = {
   data?: {
      date: string;
      income: number;
      expenses: number;
   }[];
}

export const Chart = ({data = []}: Props) => {
   const [chartType, setChartType] = useState("area");

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
                     <SelectItem value="area">
                        <div className="flex items-center">
                           <AreaChart className="size-4 mr-2 shrink-0"/>
                           <p className="line-clamp-1">
                              Area chart
                           </p>
                        </div>
                     </SelectItem>
                     <SelectItem value="line">
                        <div className="flex items-center">
                           <LineChart className="size-4 mr-2 shrink-0"/>
                           <p className="line-clamp-1">
                              Line chart
                           </p>
                        </div>
                     </SelectItem>
                     <SelectItem value="bar">
                        <div className="flex items-center">
                           <BarChart2 className="size-4 mr-2 shrink-0"/>
                           <p className="line-clamp-1">
                              Bar chart
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
                  {chartType === "area" && <AreaVariant data={data}/>}
                  {chartType === "line" && <LineVariant data={data}/>}
                  {chartType === "bar" && <BarVariant data={data}/>}
               </>
            )}
         </CardContent>
      </Card>
   )
}

export const ChartLoading = () => {
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