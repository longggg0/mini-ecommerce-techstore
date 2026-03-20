import React, { useState, useEffect } from "react";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  deleteProduct,
  type Product,
} from "@/services/product.service";

import { AdminLayout } from "../components/AdminLayout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Pencil, Trash2, Search } from "lucide-react";

import { AddProductDialog } from "@/components/AddProductDialog";
import { EditProductDialog } from "@/components/EditProductDialog";

export const AdminProductsPage: React.FC = () => {
  const queryClient = useQueryClient();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  //SEARCH STATE
  const [search, setSearch] = useState("");
const [debouncedSearch, setDebouncedSearch] = useState(search);

// Debounce input to avoid too many API calls
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 300); // 300ms delay

  return () => clearTimeout(timer);
}, [search]);

 const { data: products = [], isLoading } = useQuery({
  queryKey: ["products", debouncedSearch], // react-query caches each search separately
  queryFn: () => getProducts(debouncedSearch),
  placeholderData:keepPreviousData, // prevents table from flickering while loading
});

  // DELETE
  const handleDelete = async (productId: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(productId);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Delete product error:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-10">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-3">
              Product Management
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your product inventory
            </p>
          </div>

          <AddProductDialog />
        </div>

        {/*  SEARCH */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 bg-white h-12 border-border/50 rounded-full"
          />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-xl shadow-black/5 divide-y divide-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-accent/50 border-b border-border">
                <tr>
                  <th className="px-8 py-5 text-left text-sm font-semibold">
                    ID
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-semibold">
                    Image
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-semibold">
                    Category
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-semibold">
                    Price
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-semibold">
                    Stock
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-semibold">
                    Description
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border/50">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10">
                      Loading products...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10">
                      No products found
                    </td>
                  </tr>
                ) : (
                  products.map((product: Product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-accent/30 transition-all duration-300"
                    >
                      <td className="px-8 py-5">{product.id}</td>

                      {/* IMAGE */}
                      <td className="px-8 py-5">
                        <img
                          src={
                            product.images?.length > 0
                              ? product.images[0].imageUrl
                              : "/no-image.png"
                          }
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md border"
                        />
                      </td>

                      {/* NAME */}
                      <td className="px-8 py-5">
                        <span className="font-semibold">
                          {product.name}
                        </span>
                      </td>

                      {/* CATEGORY */}
                      <td className="px-8 py-5">
                        <Badge variant="secondary">
                          {product.category?.name || "N/A"}
                        </Badge>
                      </td>

                      {/* PRICE */}
                      <td className="px-8 py-5 font-bold">
                        ${Number(product.price).toLocaleString()}
                      </td>

                      {/* STOCK */}
                      <td className="px-8 py-5">
                        <Badge
                          variant={
                            product.qty > 0 ? "default" : "destructive"
                          }
                        >
                          {product.qty} units
                        </Badge>
                      </td>
                      {/* NAME */}
                      <td className="px-8 py-5">
                        <span className="font-semibold">
                          {product.description}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-8 py-5">
                        <div className="flex items-center space-x-3">
                          {/* EDIT */}
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                            onClick={() => setEditingProduct(product)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          {/* DELETE */}
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:border-destructive rounded-full"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* EDIT DIALOG */}
        {editingProduct && (
          <EditProductDialog
            product={editingProduct}
            open={!!editingProduct}
            setOpen={() => setEditingProduct(null)}
          />
        )}
      </div>
    </AdminLayout>
  );
};