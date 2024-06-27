"use client"

import { Edit2, MoreHorizontal, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
 } from "@/components/ui/dropdown-menu"

import { useOpenCategory } from "@/features/categories/hooks/use-open-category"
import { useDeleteCategory } from "@/features/categories/api/use-delete-category"
import { useConfirm } from "@/hooks/use-confirm"
import { Separator } from "@/components/ui/separator"
 

type Props = {
   id: string
}

export const Actions = ({id}: Props) => {
   const { onOpen , onClose } = useOpenCategory()

   const [ConfirmDialoge, confirm] = useConfirm(
      "Are you sure?",
      "You are aboute to delete this category."
   )

   const deleteMutation = useDeleteCategory(id)

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

   return (
      <>
         <ConfirmDialoge />
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="link" className="size-6 p-0 border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none">
                  <MoreHorizontal className="size-5" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left">
               <DropdownMenuItem
                  disabled={deleteMutation.isPending}
                  onClick={()=>onOpen(id)}
               >
                  <Edit2 className="size-4 mr-2 text-muted-foreground" />
                  Edit
               </DropdownMenuItem>
               <Separator />
               <DropdownMenuItem
                  disabled={deleteMutation.isPending}
                  onClick={onDelete}
               >
                  <Trash2 className="size-4 mr-2 text-muted-foreground"/>
                  Delete
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>

      </>
   )
}