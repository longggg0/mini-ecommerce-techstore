import React from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Badge } from '../components/ui/badge';
import {  Loader2 } from 'lucide-react'; // Added Loader2
import { AddCategoryDialog } from '@/components/AddCategoryDialog';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/services/category.service';
import { UpdateCategoryDialog } from '@/components/UpdateCategoryDialog';
import { DeleteCategoryDialog } from '@/components/DeleteCategoryDialog';

export const AdminCategoryPage: React.FC = () => {
  //  Fetch data using TanStack Query v5 syntax
  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <AdminLayout>
      <div className="space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-3">Categories Management</h1>
            <p className="text-muted-foreground text-lg">Manage your categories</p>
          </div>
          <AddCategoryDialog />
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-accent/50 border-b border-border">
                <tr>
                  <th className="px-8 py-5 text-left text-sm font-semibold tracking-tight">ID</th>
                  <th className="px-8 py-5 text-left text-sm font-semibold tracking-tight">Name</th>
                  <th className="px-8 py-5 text-left text-sm font-semibold tracking-tight">Date</th>
                  <th className="px-8 py-5 text-left text-sm font-semibold tracking-tight">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {/* 2. Loading State */}
                {isLoading && (
                  <tr>
                    <td colSpan={4} className="px-8 py-10 text-center">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Loading categories...</span>
                      </div>
                    </td>
                  </tr>
                )}

                {/* 3. Error State */}
                {isError && (
                  <tr>
                    <td colSpan={4} className="px-8 py-10 text-center text-destructive">
                      Failed to load categories. Please try again.
                    </td>
                  </tr>
                )}

                {/* 4. Render actual data */}
                {!isLoading && !isError && categories?.map((category) => (
                  <tr key={category.id} className="hover:bg-accent/30 transition-all duration-300">
                    <td className="px-8 py-5">
                      <h6>{category.id}</h6>
                    </td>
                    <td className="px-8 py-5">
                      <div className="font-semibold tracking-tight">
                        <Badge variant="secondary">{category.name}</Badge>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <p>
                        {category.createdAt
                          ? new Date(category.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </td>
                    <td className=" py-5 ">
                      <div className="flex items-center space-x-3">

                        <UpdateCategoryDialog category={category} />

                        <DeleteCategoryDialog
                          categoryId={category.id!}
                          categoryName={category.name}
                        />

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Empty State */}
        {!isLoading && categories?.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No categories found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};