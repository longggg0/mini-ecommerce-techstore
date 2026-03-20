import React, { useEffect, useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Search, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/category.service";
import { getProducts } from "@/services/product.service";

export const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const productsPerPage = 8;

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchInput);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const { data: categoriesData = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const categories = ["All", ...categoriesData.map((c) => c.name)];

  const { data: productsData = [], isLoading: isProductsLoading } = useQuery({
    queryKey: ["products", searchQuery],
    queryFn: () => getProducts(searchQuery),
    placeholderData: keepPreviousData,
  });

  const filteredByCategory =
    selectedCategory === "All"
      ? productsData
      : productsData.filter((p) => p.category.name === selectedCategory);

  const totalPages = Math.ceil(filteredByCategory.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredByCategory.slice(startIndex, startIndex + productsPerPage);

  const mappedProducts = paginatedProducts.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category?.name || "Uncategorized",
    price: p.price,
    qty: p.qty,
    image: p.images?.[0]?.imageUrl || "",
  }));

  if (isCategoriesLoading || isProductsLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="bg-white border-b border-border/50">
          <div className="max-w-350 mx-auto px-4 sm:px-8 lg:px-12 py-12 md:py-24">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="space-y-6 lg:space-y-8 lg:pr-8">
                <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium">
                  <Sparkles className="h-4 w-4" />
                  <span>New Arrivals</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1]">
                  The latest tech.
                  <br />
                  <span className="text-secondary">At your fingertips.</span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground font-light tracking-tight max-w-xl">
                  Experience cutting-edge technology with our premium collection
                  of iPhones and Laptops.
                </p>
              </div>

              <div className="relative h-64 sm:h-80 lg:h-150">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758692892196-49ce509892a3"
                  alt="Premium tech workspace"
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="max-w-350 mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-20">
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-medium text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-white text-foreground/70 hover:text-white hover:bg-black"
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex justify-center mt-8 sm:mt-10">
            <div className="flex w-full max-w-xl gap-2 px-0">
              <div className="relative flex-1">
                <form onSubmit={(e) => e.preventDefault()} className="relative">
                  <input
                    type="text"
                    placeholder="Search product..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full h-12 px-4 rounded-full border border-border/50 focus:outline-none"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-350 mx-auto px-4 sm:px-8 lg:px-12 pb-16 md:pb-32">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
            <ProductCard products={mappedProducts} />
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md border ${
                  currentPage === i + 1
                    ? "bg-black text-white"
                    : "bg-white hover:bg-black hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};