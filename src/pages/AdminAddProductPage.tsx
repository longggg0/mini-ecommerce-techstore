import React from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Upload } from 'lucide-react';

export const AdminAddProductPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tighter mb-3">Add New Product</h1>
          <p className="text-muted-foreground text-lg">Create a new product listing</p>
        </div>

        <Card className="shadow-xl shadow-black/5 border-border/50">
          <CardHeader className="pb-8">
            <CardTitle className="text-2xl tracking-tight">Product Details</CardTitle>
            <CardDescription className="text-base mt-2">
              Fill in the information below to add a new product
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm">Product Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g., iPhone 15 Pro Max"
                  defaultValue="iPhone 15 Pro Max"
                  required
                  className="bg-white h-12 border-border/50 rounded-xl"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="price" className="text-sm">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="1199"
                    defaultValue="1199"
                    required
                    className="bg-white h-12 border-border/50 rounded-xl"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="stock" className="text-sm">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="25"
                    defaultValue="25"
                    required
                    className="bg-white h-12 border-border/50 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="category" className="text-sm">Category *</Label>
                <Select defaultValue="iPhone" required>
                  <SelectTrigger className="bg-white h-12 border-border/50 rounded-xl">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iPhone">iPhone</SelectItem>
                    <SelectItem value="Laptop">Laptop</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="image" className="text-sm">Image URL</Label>
                <div className="flex items-center space-x-3">
                  <Input
                    id="image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    defaultValue="https://example.com/image.jpg"
                    className="bg-white flex-1 h-12 border-border/50 rounded-xl"
                  />
                  <Button type="button" variant="outline" size="icon" className="h-12 w-12 rounded-xl">
                    <Upload className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Enter an image URL or click the upload button
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-sm">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description..."
                  rows={6}
                  defaultValue="This is a sample product description."
                  required
                  className="bg-white resize-none border-border/50 rounded-xl"
                />
              </div>

              <div className="flex items-center space-x-4 pt-6">
                <Button type="button" className="bg-secondary hover:bg-secondary/90 h-12 rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  Save Product
                </Button>
                <Button type="button" variant="outline" className="h-12 rounded-full px-8 hover:bg-accent transition-all duration-300">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};