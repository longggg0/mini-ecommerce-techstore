import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { getCategories, type Category } from "@/services/category.service";
import { createProduct,  uploadProductImage } from "@/services/product.service";

export const AddProductDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    stock: "",
    image: null as File | null,
    description: "",
  });

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (!formData.name || !formData.categoryId || !formData.price || !formData.stock) {
        return alert("Please fill all required fields");
      }

      // Create product
      const newProduct = await createProduct({
        name: formData.name,
        categoryId: formData.categoryId,
        price: formData.price,
        qty: formData.stock,
        description: formData.description,
        isActive: true,
      });

      //  Upload image if exists
      if (formData.image) {
        await uploadProductImage(newProduct.id, formData.image);
      }

      //  Refetch and update cache
      queryClient.invalidateQueries({ queryKey: ["products"] });

      //  Reset form
      setFormData({
        name: "",
        categoryId: "",
        price: "",
        stock: "",
        image: null,
        description: "",
      });
      setOpen(false);
    } catch (error) {
      console.error("Add product error:", error);
      alert("Failed to add product");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      categoryId: "",
      price: "",
      stock: "",
      image: null,
      description: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black hover:bg-secondary/90 rounded-full px-8 h-12 shadow-lg hover:shadow-xl transition-all duration-300">
          Add New Product
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-150">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Product Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Category */}
          <div className="grid gap-2">
            <Label>Category</Label>
            <Select
              value={formData.categoryId}
              onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                {isLoading ? (
                  <SelectItem value="loading" disabled>
                    Loading...
                  </SelectItem>
                ) : (
                  categories.map((cat: Category) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          {/* Stock */}
          <div className="grid gap-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              placeholder="Enter stock quantity"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>

          {/* Image */}
          <div className="grid gap-2">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              onChange={(e) => {
                if (!e.target.files) return;
                setFormData({ ...formData, image: e.target.files[0] });
              }}
            />
            {formData.image && (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-md"
              />
            )}
          </div>

          
          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />
          </div>

        </div>

        <DialogFooter>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Save Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};