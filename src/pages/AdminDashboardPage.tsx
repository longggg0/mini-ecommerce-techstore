import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  Trash2,
  User,
} from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getCustomers,
  deleteCustomer,
  type Customer,
} from "@/services/customer.service";

import { Badge } from "@/components/ui/badge";
import { getProducts, type Product } from "@/services/product.service";
import { fetchOrders, type Order } from "@/services/order.service";

export const AdminDashboardPage: React.FC = () => {
  const queryClient = useQueryClient();

  // delete customer
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error) => {
      alert("Failed to delete customer");
      console.error(error);
    },
  });

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      deleteMutation.mutate(id);
    }
  };

  // fetch customers
  const { data: customers = [], isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  // fetch products
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  // fetch orders
  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: () => fetchOrders(),
  });

  //  calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;

  const totalInventoryValue = products.reduce(
    (total: number, product: Product) => {
      const price = parseFloat(product.price) || 0;
      return total + price * product.qty;
    },
    0
  );

  const isDashboardLoading = isLoading;

  if (isDashboardLoading) {
    return <div className="p-10">Loading dashboard...</div>;
  }

  return (
    <AdminLayout>
      <div className="space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-3">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground text-lg">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Total Products",
              value: totalProducts,
              icon: Package,
              color: "text-blue-600",
              bgColor: "bg-blue-50",
            },
            {
              title: "Total Orders",
              value: totalOrders,
              icon: ShoppingCart,
              color: "text-green-600",
              bgColor: "bg-green-50",
            },
            {
              title: "All Users",
              value: customers.length,
              icon: User,
              color: "text-purple-600",
              bgColor: "bg-purple-50",
            },
            {
              title: "Total Inventory Value",
              value: `$${totalInventoryValue.toLocaleString()}`,
              icon: TrendingUp,
              color: "text-orange-600",
              bgColor: "bg-orange-50",
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.title}
                className="shadow-lg shadow-black/5 border-border/50 hover:shadow-xl transition-all duration-300"
              >
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground tracking-tight">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold tracking-tight">
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Customer Table */}
        <div className="space-y-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-3">
              All Customers
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-accent/50 border-b border-border">
                  <tr>
                    <th className="px-8 py-5 text-left text-sm font-semibold">ID</th>
                    <th className="px-8 py-5 text-left text-sm font-semibold">Name</th>
                    <th className="px-8 py-5 text-left text-sm font-semibold">Email</th>
                    <th className="px-8 py-5 text-left text-sm font-semibold">Phone</th>
                    <th className="px-8 py-5 text-left text-sm font-semibold">Date</th>
                    <th className="px-8 py-5 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border/50">
                  {customers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-6">
                        No customers found
                      </td>
                    </tr>
                  ) : (
                    customers.map((customer: Customer) => (
                      <tr
                        key={customer.id}
                        className="hover:bg-accent/30 transition-all duration-300"
                      >
                        <td className="px-8 py-5">{customer.id}</td>

                        <td className="px-8 py-5 font-semibold">
                          <Badge variant="secondary">{customer.name}</Badge>
                        </td>

                        <td className="px-8 py-5">
                          <Badge>{customer.email}</Badge>
                        </td>

                        <td className="px-8 py-5">
                          <Badge variant="secondary">
                            {customer.phone || "N/A"}
                          </Badge>
                        </td>

                        <td className="px-8 py-5">
                          <Badge variant="destructive">
                            {new Date(customer.createdAt).toLocaleDateString()}
                          </Badge>
                        </td>

                        <td className="px-8 py-5">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive border-destructive"
                            onClick={() =>
                              handleDelete(customer.id, customer.name)
                            }
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};