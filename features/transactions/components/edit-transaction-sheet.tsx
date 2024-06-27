import { z } from "zod";
import { Loader2 } from "lucide-react";

import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
} from "@/components/ui/sheet"


import { useGetTransaction } from "@/features/transactions/api/use-get-transaction";
import { TransactionForm } from "@/features/transactions/components/transaction-form";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { useEditTransaction } from "@/features/transactions/api/use-edit-transaction";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";

import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

import { insertTransactionSchema } from "@/db/schema";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema = insertTransactionSchema.omit({
   id: true,
 })

 type FormValues = z.input<typeof formSchema>;
 
const EditTransactionSheet = () => {

   const {isOpen, onClose, id } = useOpenTransaction();

   const [ConfirmDialoge, confirm] = useConfirm(
      "Are you sure?",
      "You are aboute to delete this transaction."
   )

   const transactionQuery = useGetTransaction(id)
   const editMutation = useEditTransaction(id);
   const deleteMutation = useDeleteTransaction(id)

   //Category
   const categoryQuery = useGetCategories()
   const categoryMutation = useCreateCategory()
   const onCreateCategory = (name: string) => categoryMutation.mutate({
      name
   })
   const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
      label: category.name,
      value: category.id,
   })) 

   //Account
   const accountQuery = useGetAccounts()
   const accountMutation = useCreateAccount()
   const onCreateAccount = (name: string) => accountMutation.mutate({
      name
   })

   const accountOptions = (accountQuery.data ?? []).map((account) => ({
      label: account.name, 
      value: account.id,
   })) 

   const isPending = 
      editMutation.isPending || 
      deleteMutation.isPending ||
      categoryMutation.isPending ||
      accountMutation.isPending;

   const isLoading = 
      transactionQuery.isLoading ||
      accountQuery.isLoading ||
      categoryQuery.isLoading;

   const  onSubmit = (values: FormValues) => {

      editMutation.mutate(values, {
         onSuccess: () => {
            onClose();
         },
      });
   }

   const onDelete = async () => {
      const ok = await confirm();

      if (ok) {
         deleteMutation.mutate(undefined, {
            onSuccess: () => {
               onClose();
            }
         })
      }
   }


   const defaultValues = transactionQuery.data ? {
      accountId: transactionQuery.data.accountId,
      categoryId: transactionQuery.data.categoryId,
      amount: (transactionQuery.data.amount/1000).toString(),
      date: transactionQuery.data.date 
      ? new Date(transactionQuery.data.date)
      : new Date(),
      payee: transactionQuery.data.payee,
      notes: transactionQuery.data.notes,
   } : {
      accountId: "",
      categoryId: "",
      amount: "",
      date: new Date(),
      payee: "",
      notes: "",
   }

   return ( 
      <>
         <ConfirmDialoge />
         <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
               <SheetHeader>
                  <SheetTitle>
                     Edit Transaction
                  </SheetTitle>
                  <SheetDescription>
                     Edit an existing transaction.
                  </SheetDescription>
               </SheetHeader>
               {isLoading
                  ? (
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="size-4 text-muted-foreground animate-spin"/>
                     </div>

                  ) : (
                     <TransactionForm
                        id={id} 
                        defaultValues={defaultValues}
                        onSubmit={onSubmit}
                        onDelete={onDelete}
                        disabled={isPending}
                        categoryOptions={categoryOptions}
                        onCreateCategory={onCreateCategory}
                        accountOptions={accountOptions}
                        onCreateAccount={onCreateAccount}
                     />
                  )
               }
            </SheetContent>
         </Sheet>
      </>
    );
}
 
export default EditTransactionSheet;