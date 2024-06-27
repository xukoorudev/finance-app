"use client"

import { useSearchParams } from "next/navigation"
import { FaPiggyBank } from "react-icons/fa"
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";

import { useGetSummary } from "@/features/summary/api/use-get-summary";

import { formatDateRange } from "@/lib/utils";
import { DataCard, DataCardLoading } from "@/components/data-card";

export const DataGrid = () => {
   const { data, isLoading } = useGetSummary()

   const params = useSearchParams()
   const to = params.get("to") || undefined;
   const from = params.get("from") || undefined;

   const dateRangeLabel = formatDateRange({ to, from })

   if (isLoading) {
      return (
         <div className="grid grid-cols-1  md:grid-cols-3 gap-8 pb-2 mb-8">
            <DataCardLoading />
            <DataCardLoading />
            <DataCardLoading />
         </div>
      )
   }

  return (
      <div className="grid grid-cols-1  md:grid-cols-3 gap-8 pb-2 mb-8">
         <DataCard 
            title="Remaining"
            value={data?.remainingAmount}
            percentageChange={data?.remainingChange}
            icon={FaPiggyBank}
            variant="default"
            dateRange={dateRangeLabel}
         />
         <DataCard 
            title="Income"
            value={data?.incomeAmount}
            percentageChange={data?.incomeChange}
            icon={FaArrowTrendUp}
            variant="success"
            dateRange={dateRangeLabel}
         />
         <DataCard 
            title="Expenses"
            value={data?.expensesAmount}
            percentageChange={data?.expencesChange}
            icon={FaArrowTrendDown}
            variant="danger"
            dateRange={dateRangeLabel}
         />
      </div>
  )
}
