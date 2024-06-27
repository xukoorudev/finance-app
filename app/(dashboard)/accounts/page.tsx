"use client"
import { Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { columns } from "./columns"

import { useNewAccount } from "@/features/accounts/hooks/use-new-account"
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts"
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-accounts"

import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
 } from "@/components/ui/card"
import { DataTable } from "@/components/data-table"
import { Skeleton } from "@/components/ui/skeleton"
 

const AccountsPage = () => {
   const newAccount = useNewAccount();
   const deleteAccounts = useBulkDeleteAccounts()
   const accountsQuery = useGetAccounts();
   const accounts = accountsQuery.data || [];

   const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

   if (accountsQuery.isLoading) {
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

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-16 md:-mt-12">
      <Card className="border-none drop-shadow-sm">
         <CardHeader className="gap-y-2 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-xl line-clamp-1">
               Accounts 
            </CardTitle>
            <Button onClick={newAccount.onOpen} size="sm">
               <Plus className="mr-2 size-4"/>
               Add new
            </Button>
         </CardHeader>
         <CardContent>
            <DataTable 
               filterKey="name"
               columns={columns}
               data={accounts} 
               onDelete={(row) => {
                  const ids = row.map((r) => r.original.id);
                  deleteAccounts.mutate({ ids })
               }}
               disabled={isDisabled}
             />
         </CardContent>
      </Card>

    </div>
  )
}

export default AccountsPage