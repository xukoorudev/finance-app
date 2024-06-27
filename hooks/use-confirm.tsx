import { useState } from "react";

import { Button } from "@/components/ui/button";
import { 
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogFooter,
   DialogTitle
} from "@/components/ui/dialog";

import { Check, X } from "lucide-react";

export const useConfirm = (
   title: string,
   message: string,   
): [() => JSX.Element, () => Promise<unknown>] => {
   const [promies, setPromies] = useState<{ resolve: (value: boolean) => void} | null>(null);

   const confirm = () => new Promise((resolve, rejects) => {
      setPromies({ resolve })
   });

   const handleClose = () => {
      setPromies(null)
   };

   const handleConfirm = () => {
      promies?.resolve(true);
      handleClose();
   };

   const handleCancel = () => {
      promies?.resolve(false);
      handleClose();
   };

   const ConfirmationDialog = () => (
      <Dialog open={promies !== null}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>{title}</DialogTitle>
               <DialogDescription>{message}</DialogDescription>
            </DialogHeader>
            <DialogFooter className="pt-2">
               <Button
                  onClick={handleCancel}
                  variant="outline"
                  size="sm"
               >
                  <X className="size-6 pr-2"/>
                  Cancel
               </Button>
               <Button
                  onClick={handleConfirm}
                  
                  size="sm"
               >
                  <Check className="size-6 pr-2"/>
                  Confirm
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
   return [ConfirmationDialog, confirm];
};