// // --- Customer type from DB ---
// export interface Customer {
//   id: number;
//   firstName: string;
//   lastName: string;
//   name: string;
//   email: string;
//   role: string;
// }

import API_URL from "@/config/api.config";

// // --- Order detail type from DB ---
// export interface OrderDetailDB {
//   id: number;
//   productId: number;
//   productName: string;
//   productPrice: string; // string from DB
//   qty: number;
//   amount: string;
// }

// // --- Order type from DB ---
// export interface Order {
//   id: number;
//   orderNumber: string;
//   orderDate: string;
//   location: string;
//   total: string;
//   customer: Customer | null;
//   orderDetails: OrderDetailDB[];
//   status?: 'completed' | 'pending' | 'cancelled';
// }

// // --- Fetch existing orders ---
// export const fetchOrders = async (): Promise<Order[]> => {
//   const res = await fetch('http://localhost:3000/api/v1/orders');
//   if (!res.ok) throw new Error('Failed to fetch orders');
//   const data = await res.json();
//   return data.data.map((order: Order) => ({
//     ...order,
//     status: 'completed', // optional
//   }));
// };

// src/services/orderService.ts

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  role: string;
}

export interface OrderDetailDB {
  id: number;
  productId: number;
  productName: string;
  productPrice: string;
  qty: number;
  amount: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  orderDate: string;
  location: string;
  total: string;
  customer: Customer | null;
  orderDetails: OrderDetailDB[];
  status?: "completed" | "pending" | "cancelled";
}

// CREATE ORDER
export const createOrder = async (payload: {
  customerId: number;
  location: string;
  items: { productId: number; qty: number }[];
}) => {
  const res = await fetch(`${API_URL}/api/v1/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create order");
  }

  return data;
};


export const fetchOrders = async (name?: string): Promise<Order[]> => {
  const url = name
    ? `${API_URL}/api/v1/orders/search/by-name?name=${encodeURIComponent(name)}`
    : `${API_URL}/api/v1/orders`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch orders");

  const data = await res.json();
  return data.data.map((order: Order) => ({
    ...order,
    status: "completed",
  }));
};
//  FETCH ORDERS FOR A SINGLE CUSTOMER
export const fetchCustomerOrders = async (customerId: number): Promise<Order[]> => {
  const res = await fetch(`${API_URL}/api/v1/orders?customerId=${customerId}`);

  if (!res.ok) throw new Error("Failed to fetch customer orders");

  const data = await res.json();

  return data.data.map((order: Order) => ({
    ...order,
    status: "completed", // optional default status
  }));
};
//download doc
export const downloadOrderDoc = async (orderId: number) => {
  const response = await fetch(
    `${API_URL}/api/v1/orders/${orderId}/generate-doc`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to download order document");
  }

  // convert to blob (file)
  const blob = await response.blob();

  // create download link
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `order-${orderId}.docx`; // file name
  document.body.appendChild(a);
  a.click();

  // cleanup
  a.remove();
  window.URL.revokeObjectURL(url);
};
