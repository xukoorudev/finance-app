import { z } from "zod";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input";
import { Select } from "@/components/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/date-picker";
import { AmountInput } from "@/components/amount-input";

import { insertTransactionSchema } from "@/db/schema";
import { convertAmountToMiliunits } from "@/lib/utils";

import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
 } from "@/components/ui/form"

 const formSchema = z.object({
   date: z.coerce.date(),
   accountId: z.string(),
   categoryId: z.string().nullable().optional(),
   payee: z.string(),
   amount: z.string(),
   notes: z.string().nullable().optional()
 })

 const apiSchema = insertTransactionSchema.omit({
   id: true
 })
 

 type FormValues = z.input<typeof formSchema>;
 type ApiFormSchema = z.input<typeof apiSchema>;

 type Props = {
   id?: string;
   defaultValues?: FormValues;
   onSubmit: (values: ApiFormSchema) => void;
   onDelete?: () => void;
   disabled?: boolean;
   accountOptions: { label: string; value: string }[]
   categoryOptions: { label: string; value: string }[]
   onCreateAccount: (name: string) => void;
   onCreateCategory: (name: string) => void;
 }

 export const TransactionForm = ({
   id,
   defaultValues,
   onSubmit,
   onDelete,
   disabled,
   accountOptions,
   categoryOptions,
   onCreateAccount,
   onCreateCategory
 }:Props) => {
   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: defaultValues,
   });


   const handleSubmit = (values: FormValues) => {
      const amount = parseFloat(values.amount);
      const amountInMiliunits = convertAmountToMiliunits(amount);
      onSubmit({
         ...values,
         amount: amountInMiliunits,
      });
      console.log(values)
   }

   const handleDelete = () => {
      onDelete?.();
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
            <FormField 
               name="date"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <DatePicker 
                           value={field.value}
                           onChange={field.onChange}
                           disabled={disabled}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField 
               name="accountId"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>
                        Account
                     </FormLabel>
                     <FormControl>
                        <Select 
                           placeholder="Select or create an Account"
                           options={accountOptions}
                           onCreate={onCreateAccount}
                           value={field.value}
                           onChange={field.onChange}
                           disabled={disabled}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField 
               name="categoryId"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>
                        Category
                     </FormLabel>
                     <FormControl>
                        <Select 
                           placeholder="Select or create Category"
                           options={categoryOptions}
                           onCreate={onCreateCategory}
                           value={field.value}
                           onChange={field.onChange}
                           disabled={disabled}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField 
               name="payee"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>
                        Payee
                     </FormLabel>
                     <FormControl>
                        <Input 
                           {...field}
                           disabled={disabled}
                           placeholder="Add a payee"
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField 
               name="amount"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>
                        Amount
                     </FormLabel>
                     <FormControl>
                        <AmountInput 
                           {...field}
                           disabled={disabled}
                           placeholder="0.00"
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField 
               name="notes"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>
                        Notes
                     </FormLabel>
                     <FormControl>
                        <Textarea 
                           {...field}
                           value={field.value ?? ""}
                           disabled={disabled}
                           placeholder="Optional notes"
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button className="w-full " disabled={disabled} >
               {id ? "Save changes" : "Create transaction"}
            </Button>
            {!!id && (
               <Button 
                  type="button"
                  className="w-full"
                  disabled={disabled}
                  onClick={handleDelete}
                  variant="outline"
               >
                  <Trash2 size={15} />
                  <p className="px-2">Delete transaction</p>
               </Button>
            )}
         </form>
      </Form>
   )
 }