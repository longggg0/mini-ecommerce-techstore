import  { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "@/services/category.service";
import { updateProduct } from "@/services/product.service";
import { Textarea } from "./ui/textarea";

export const EditProductDialog = ({ product, open, setOpen }: any) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: product.name || "",
    categoryId: String(product.category?.id || ""),
    price: product.price || "",
    stock: product.qty || 0,
    description: product.description || "",
    image: null as File | null,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const handleSubmit = async () => {
    try {
      await updateProduct(
        product.id,
        {
          name: formData.name,
          categoryId: formData.categoryId,
          price: String(formData.price),
          qty: formData.stock.toString(),
          description: formData.description,
        },
        formData.image || undefined
      );

      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          {/* Name */}
          <div className="grid gap-2">
            <Label>Product Name</Label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* Category */}
          <div className="grid gap-2">
            <Label>Category</Label>
            <Select
              value={formData.categoryId}
              onValueChange={(value) =>
                setFormData({ ...formData, categoryId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((cat: any) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="grid gap-2">
            <Label>Price</Label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>

          {/* Stock */}
          <div className="grid gap-2">
            <Label>Stock</Label>
            <Input
              type="number"
              value={formData.stock}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stock: Number(e.target.value),
                })
              }
            />
          </div>

          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          {/* Image */}
          <div className="grid gap-2">
            <Label>Image</Label>
            <Input
              type="file"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: e.target.files?.[0] || null,
                })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};