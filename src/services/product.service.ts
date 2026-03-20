export interface ProductImage {
  id: number;
  imageUrl: string;
  fileName: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  qty: number;
  description: string;
  isActive: boolean;
  category: Category;
  images: ProductImage[];
}

// GET all products
export const getProducts = async (search = ""): Promise<Product[]> => {
  const url = new URL("http://localhost:3000/api/v1/products");
  if (search) url.searchParams.append("search", search);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();
  return data.data;
};

// GET single product by ID
export const getProductById = async (productId: string | number): Promise<Product> => {
  const res = await fetch(`http://localhost:3000/api/v1/products/${productId}`);
  if (!res.ok) throw new Error("Failed to fetch product");

  const data = await res.json();
  return data.data;
};

// CREATE product (without image)
export const createProduct = async (payload: {
  name: string;
  categoryId: string;
  price: string;
  qty: string;
  description?: string;
  isActive?: boolean;
}) => {
   const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/api/v1/products", {

    method: "POST",
    headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
     },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to create product");

  const data = await res.json();
  return data.data;
};

// UPLOAD product image
export const uploadProductImage = async (productId: number, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:3000/api/v1/products/${productId}/upload`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
     },
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload product image");

  const data = await res.json();
  return data.data;
};

// UPDATE product
export const updateProduct = async (
  productId: number,
  payload: {
    name?: string;
    categoryId?: string;
    price?: string;
    qty?: string;
    description?: string;
    isActive?: boolean;
  },
  file?: File
) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined) formData.append(key, String(value));
  });

  if (file) formData.append("file", file);
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:3000/api/v1/products/${productId}`, {
    method: "PUT",
    headers: { 
      "Authorization": `Bearer ${token}`,
     },
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to update product");

  const data = await res.json();
  return data.data;
};

// DELETE product
export const deleteProduct = async (productId: number) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:3000/api/v1/products/${productId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
     },
  });

  if (!res.ok) throw new Error("Failed to delete product");

  const data = await res.json();
  return data;
};