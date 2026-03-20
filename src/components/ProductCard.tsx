import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getImageUrl } from "@/config/api.config";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  qty: number;
  image?: string;
}

interface ProductCardProps {
  products: Product[];
}

export const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image || '',
    });
  };

  return (
    <>
      {products.map((product) => {
        const isOutOfStock = product.qty === 0;

        return (
          <div
            key={product.id}
            className={`group bg-white rounded-xl overflow-hidden transition-all duration-300 
            ${isOutOfStock 
              ? "opacity-50 cursor-not-allowed" 
              : "hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            }`}
          >
            <div
              onClick={() => {
                if (!isOutOfStock) {
                  navigate(`/product-detail/${product.id}`);
                }
              }}
            >
              {/* Product Image */}
              <div className="aspect-square overflow-hidden bg-accent/40 flex items-center justify-center relative">
                <img
                  src={getImageUrl(product.image || "")}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />

                {/* OUT OF STOCK BADGE */}
                {isOutOfStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-2 sm:p-3 space-y-1 sm:space-y-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase bg-secondary text-secondary-foreground">
                  {product.category}
                </span>

                <h3 className="font-semibold text-xs sm:text-sm text-foreground line-clamp-2 group-hover:text-secondary transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-base sm:text-lg font-semibold text-primary">
                    {product.price}$
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {product.qty} left
                  </span>
                </div>
              </div>
            </div>

            {/* Add To Cart */}
            <div className="p-2 sm:p-3 pt-0">
              <button
                disabled={isOutOfStock}
                className={`flex items-center justify-center w-full h-9 sm:h-11 rounded-full text-xs sm:text-sm transition
                ${
                  isOutOfStock
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90 text-white"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isOutOfStock) {
                    handleAddToCart(product);
                  }
                }}
              >
                <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                {isOutOfStock ? "Out of Stock" : "Add"}
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};