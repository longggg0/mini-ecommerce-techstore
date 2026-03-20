import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory, type Category } from "@/services/category.service";
import { Pencil } from "lucide-react";

interface UpdateCategoryDialogProps {
  category: Category;
}

export const UpdateCategoryDialog: React.FC<UpdateCategoryDialogProps> = ({
  category,
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(category.name);
  const queryClient = useQueryClient();

  // Keep the input value in sync when the category data changes or dialog opens
  useEffect(() => {
    if (open) {
      setName(category.name);
    }
  }, [category.name, open]);

  const mutation = useMutation({
    mutationFn: () => updateCategory(category.id!, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setOpen(false);
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full">
         <Pencil className=""></Pencil>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
          <DialogDescription className="sr-only">
            Fill in the form below to update the category name.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Category Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending || !name.trim()}
          >
            {mutation.isPending ? "Updating..." : "Update Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};