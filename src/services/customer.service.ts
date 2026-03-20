// services/customer.ts
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export const registerCustomer = async (payload: RegisterPayload) => {
  console.log("Payload sent to backend:", payload); // <- debug here
  const res = await fetch('http://localhost:3000/api/v1/customers-auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Registration failed');
  }

  return res.json();
};

export interface LoginPayload {
  email: string;
  password: string;
}

export const loginCustomer = async (payload: LoginPayload) => {
  const res = await fetch("http://localhost:3000/api/v1/customers-auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  createdAt: string;
}

export const getCustomers = async (): Promise<Customer[]> => {
  const res = await fetch("http://localhost:3000/api/v1/customers");

  if (!res.ok) throw new Error("Failed to fetch customers");

  const data = await res.json();
  return data.data;
};

export const deleteCustomer = async (id: number) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:3000/api/v1/customers/${id}`, {
    method: "DELETE",
    headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    }
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to delete customer");
  }

  return res.json();
};