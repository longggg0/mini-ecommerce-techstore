import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "@/services/category.service";

export const AddCategoryDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (name: string) => addCategory(name),
    onSuccess: () => {
      // Corrected object syntax
      queryClient.invalidateQueries({ queryKey: ["categories"] }); 
      setFormData({ name: "" });
      setOpen(false);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.name.trim()) {
      mutation.mutate(formData.name); // pass the name string
    }
  };

  const handleCancel = () => {
    setFormData({ name: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black hover:bg-secondary/90 rounded-full px-8 h-12 shadow-lg hover:shadow-xl transition-all duration-300">
          Add New Category
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-100">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription className="sr-only">
      Enter the details for the new category you want to create.
    </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              placeholder="Enter category name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={mutation.isPending} 
          >
            {mutation.isPending ? "Saving..." : "Save Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};