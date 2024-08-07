
import { format } from "date-fns";
import {
   Tooltip,
   XAxis,
   BarChart,
   Bar,
   ResponsiveContainer,
   CartesianGrid,
   YAxis,
   Legend,
   Rectangle,
} from "recharts";
import { CustomTooltip } from "@/components/custome-tooltip";
 
type Props = {
   data: {
      date: string;
      income: number;
      expenses: number;
   }[];
};

export const BarVariant = ({ data }:Props) => {
   
   return (
      <ResponsiveContainer width="100%" height={350}>
         <BarChart data={data} >
            <CartesianGrid strokeDasharray="3 3" />
               <defs>
                  <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="2%" stopColor="#3d82f6" stopOpacity={0.8}/>
                     <stop offset="98%" stopColor="#3d82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="2%" stopColor="#f43f5e" stopOpacity={0.8}/>
                     <stop offset="98%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
               </defs>
               <XAxis 
                  axisLine={false}
                  tickLine={false}
                  dataKey="date"
                  tickFormatter={(value) => format(value, "dd MMM")}
                  style={{ fontSize: "12px" }}
                  tickMargin={16}
               />
               <YAxis style={{ fontSize: "12px" }}/>
               <Tooltip content={<CustomTooltip/>}/>
               <Legend />
               <Bar                 
                  dataKey="income"
                  fill="#3d82f6"
                  className="drop-shadow-sm"
                  activeBar={<Rectangle fill="#3d82f6" stroke="blue" />}
               />
               <Bar 
                  dataKey="expenses"
                  fill="#f43f5e"
                  className="drop-shadow-sm"
                  activeBar={<Rectangle fill="#f43f5e" stroke="red" />}
               />
         </BarChart>
      </ResponsiveContainer>

   )
}