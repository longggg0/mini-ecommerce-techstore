// services/category.service.ts

export interface Category {
  id?: number;
  name: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}


//render category
export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch("http://localhost:3000/api/v1/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.data;
};

//Add category
export const addCategory = async (name: string): Promise<Category> => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/api/v1/categories", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`, //  include token
  },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to add category");
  const data = await res.json();
  return data.data;
};

//update
export const updateCategory = async (id: number, name: string): Promise<Category> => {
  const token = localStorage.getItem("token");
  console.log("Sending update for ID:", id, "with Name:", name); // Debug log
  
  const res = await fetch(`http://localhost:3000/api/v1/categories/${id}`, {
    method: "PUT", 
    headers: { "Content-Type": "application/json" ,
              "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("Server Error:", errorData);
    throw new Error("Failed to update");
  }

  const data = await res.json();
  return data.data;
};

//delete
export const deleteCategory = async (id: number): Promise<void> => {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:3000/api/v1/categories/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete category");
};