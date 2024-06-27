"use client"
import { useState } from "react"
import { Loader2, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { columns } from "./columns"

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction"
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions"
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions"

import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
 } from "@/components/ui/card"
import { DataTable } from "@/components/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import { UploadButton } from "./upload-button"

enum VARIENTS {
   LIST = "LIST",
   IMPORT = "IMPORT"
}
 
const INITIAL_IMPORT_RESULT = {
   data: [],
   errors: [],
   meta: {},
}

const TransactionPage = () => {
   const [varient, setVarient] = useState<VARIENTS>(VARIENTS.LIST)

   const newTransaction = useNewTransaction();
   const deleteTransactions = useBulkDeleteTransactions()
   const transactionsQuery = useGetTransactions();
   const transactions = transactionsQuery.data || [];

   const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending;

   if (transactionsQuery.isLoading) {
      return (
         <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-16 md:-mt-12">
            <Card className="border-none drop-shadow-sm">
               <CardHeader>
                  <Skeleton className="h-8 w-48"/>
                  <Skeleton className="h-8 w-48 mt-6"/>
                  <Skeleton className="h-8 w-full"/>
                  <Skeleton className="h-8 w-full"/>
                  <Skeleton className="h-8 w-full"/>
               </CardHeader>
               <CardContent>
                  <div className="h-[500px] w-full flex items-center justify-center">
                     <Loader2 className="size-6  text-slate-400 animate-spin"/>
                  </div>
               </CardContent>
            </Card>
         </div>
      )
   }

   if (varient === VARIENTS.IMPORT) {
      return (
         <>
            <div>
               This is a screent for import.
            </div>
         </>
      )
   }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-16 md:-mt-12">
      <Card className="border-none drop-shadow-sm">
         <CardHeader className="gap-y-2 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-xl line-clamp-1">
               Transactions 
            </CardTitle>
            <div className="flex items-center gap-2">
               <Button onClick={newTransaction.onOpen} size="sm" className=" w-full lg:w-auto">
                  <Plus className="mr-2 size-4"/>
                  Add new
               </Button>
               <UploadButton onUpload={() => {}} />
            </div>
         </CardHeader>
         <CardContent>
            <DataTable 
               filterKey="payee"
               columns={columns}
               data={transactions} 
               onDelete={(row) => {
                  const ids = row.map((r) => r.original.id);
                  deleteTransactions.mutate({ ids })
               }}
               disabled={isDisabled}
             />
         </CardContent>
      </Card>

    </div>
  )
}

export default TransactionPage
