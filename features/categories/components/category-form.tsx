import { z } from "zod";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { insertCategorySchema } from "@/db/schema";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
 } from "@/components/ui/form"

 const formSchema = insertCategorySchema.pick({
   name: true,
 })

 type FormValues = z.input<typeof formSchema>;

 type Props = {
   id?: string;
   defaultValues?: FormValues;
   onSubmit: (values: FormValues) => void;
   onDelete?: () => void;
   disabled?: boolean;
 }

 export const CategoryForm = ({
   id,
   defaultValues,
   onSubmit,
   onDelete,
   disabled
 }:Props) => {
   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: defaultValues,
   });

   const handleSubmit = (values: FormValues) => {
      onSubmit(values);
   }

   const handleDelete = () => {
      onDelete?.();
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
            <FormField 
               name="name"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Category Name</FormLabel>
                     <FormControl>
                        <Input 
                           className="focus-visible:border-none"
                           disabled={disabled}
                           placeholder="e.g. Food, Drink, Dress etc... " 
                            {...field} 
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button className="w-full " disabled={disabled} >
               {id ? "Save changes" : "Create ctegory"}
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
                  <p className="px-2">Delete</p>
               </Button>
            )}
         </form>
      </Form>
   )
 }