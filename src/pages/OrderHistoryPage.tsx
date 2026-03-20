import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Package, Truck, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { fetchCustomerOrders, type Order } from "@/services/order.service";
import { Badge } from "@/components/ui/badge";

export const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Get customer ID from localStorage
  const storedUser = localStorage.getItem("user");
  const customerId = storedUser ? JSON.parse(storedUser).id : null;

  useEffect(() => {
    if (!customerId) return; // user not logged in

    const loadOrders = async () => {
      try {
        setLoading(true);
        let data = await fetchCustomerOrders(customerId);

        // ✅ Sort orders by date descending (latest first)
        data.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());

        setOrders(data);
      } catch (err: any) {
        setError(err.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [customerId]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing":
        return <Package className="h-5 w-5" />;
      case "Shipped":
        return <Truck className="h-5 w-5" />;
      case "Delivered":
        return <CheckCircle2 className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Shipped":
        return "bg-purple-100 text-purple-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero */}
      <div className="bg-white border-b border-border/50">
        <div className="max-w-350 mx-auto px-8 lg:px-12 py-16 md:py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold">Order History</h1>
          <p className="text-xl text-muted-foreground mt-2">Track and manage your orders</p>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1">
        <div className="max-w-350 mx-auto px-8 lg:px-12 py- md:py-24">
          {loading && <p className="text-center">Loading orders...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && orders.length === 0 && <p className="text-center">No orders found.</p>}

          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-border/50 shadow-sm overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
                    <div>
                      {/* Order number + status in same row */}
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold"><Badge variant={"secondary"}>{order.orderNumber}</Badge></h3>

                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(
                            order.status || ""
                          )}`}
                        >
                          {getStatusIcon(order.status || "")}
                          {order.status || "Completed"}
                        </span>
                      </div>

                      {/* Date below */}
                      <p className="text-sm text-muted-foreground mt-1">
                        📅 {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right mt-4 md:mt-0">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold">${parseFloat(order.total).toFixed(2)}</p>
                      {/* <Button variant="outline" size="sm" className="rounded-full h-10 px-4 mt-2">
                        Delete Order
                      </Button> */}
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="grid grid-cols-1 gap-4">
                    {order.orderDetails.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-accent/30 rounded-2xl">
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.productName}</h4>
                          <p className="text-sm text-muted-foreground mt-1">Quantity: {item.qty}</p>
                        </div>
                        <p className="font-semibold"><Badge variant={"destructive"}>${parseFloat(item.amount).toFixed(2)}</Badge></p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};