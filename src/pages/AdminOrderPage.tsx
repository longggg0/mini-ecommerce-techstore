import React, { useState, useEffect } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AdminLayout } from '../components/AdminLayout';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Eye, CheckCircle, XCircle, Download, Search } from 'lucide-react';
import { fetchOrders, type Order, downloadOrderDoc } from '@/services/order.service';
import { Input } from '@/components/ui/input';


const getOrders = async (searchName: string): Promise<Order[]> => {
  return fetchOrders(searchName);
};

export const AdminOrdersPage: React.FC = () => {
  const [searchName, setSearchName] = useState('');
  const [debouncedName, setDebouncedName] = useState('');

  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedName(searchName), 500);
    return () => clearTimeout(handler);
  }, [searchName]);

  
  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ['orders', debouncedName],
    queryFn: () => getOrders(debouncedName),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <div className="p-10 text-center">Loading orders...</div>;
  if (isError) return <div className="p-10 text-center text-red-500">Failed to load orders</div>;

  return (
    <AdminLayout>
      <div className="space-y-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-3">Orders</h1>
          <p className="text-muted-foreground text-lg">Manage customer orders</p>
        </div>

        {/* Search input */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search orders by customer name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="pl-12 bg-white h-12 border-border/50 rounded-full"
          />
        </div>

        {/* Orders table */}
        <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-accent/50 border-b border-border">
                <tr>
                  <th className="px-8 py-5 text-left text-sm font-semibold tracking-tight">Order Number</th>
                  <th className="px-8 py-5 text-left text-sm font-semibold tracking-tight">Customer</th>
                  <th className="px-8 py-5 text-left text-sm font-semibold tracking-tight">Location</th>
                  <th className="px-8 py-5 text-left text-sm font-semibold tracking-tight">Total</th>
                  <th className="px-8 py-5 text-left text-sm font-semibold tracking-tight">Status</th>
                  <th className="px-8 py-5 text-left text-sm font-semibold tracking-tight">Date</th>
                  <th className="px-8 py-5 text-right text-sm font-semibold tracking-tight">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-accent/30 transition-all duration-300">
                    <td className="px-8 py-5 font-semibold tracking-tight">
                      <Badge variant={'secondary'}>{order.orderNumber}</Badge>
                    </td>
                    <td className="px-8 py-5">
                      {order.customer ? (
                        <div>
                          <div className="font-semibold tracking-tight">{order.customer.name}</div>
                          <div className="text-sm text-muted-foreground mt-1">{order.customer.email}</div>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">No Customer</span>
                      )}
                    </td>
                    <td className="px-8 py-5 text-sm font-medium">{order.location}</td>
                    <td className="px-8 py-5 font-bold tracking-tight">${order.total}</td>
                    <td className="px-8 py-5">
                      <Badge
                        variant={
                          order.status === 'completed'
                            ? 'default'
                            : order.status === 'pending'
                              ? 'secondary'
                              : 'destructive'
                        }
                        className="capitalize font-medium"
                      >
                        <span className="flex items-center space-x-1.5">
                          {order.status === 'completed' && <CheckCircle className="h-4 w-4" />}
                          {order.status === 'pending' && <Eye className="h-4 w-4" />}
                          {order.status === 'cancelled' && <XCircle className="h-4 w-4" />}
                          <span>{order.status}</span>
                        </span>
                      </Badge>
                    </td>
                    <td className="px-8 py-5 text-sm text-muted-foreground">
                      <Badge variant={'destructive'}>{new Date(order.orderDate).toLocaleDateString()}</Badge>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-end space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full hover:bg-accent transition-all duration-300"
                          onClick={() => downloadOrderDoc(order.id)}
                        >
                          <Download />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};