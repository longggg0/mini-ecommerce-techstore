import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { getProductById, type Product } from "@/services/product.service";

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id!);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading product...</p>;
  if (!product) return <p className="text-center py-20">Product not found</p>;

  return (
    <>
      <div className="min-h-screen">
        <div className="max-w-350 mx-auto px-8 lg:px-12 py-16 md:py-24">
          <Link to="/">
            <Button
              variant="ghost"
              className="mb-12 hover:bg-accent transition-all duration-300 rounded-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>

          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            {/* Product Images */}
            <div className="bg-white rounded-3xl shadow-2xl shadow-black/5 overflow-hidden">
              <div className="aspect-square p-8 md:p-12">
                {product.images.length > 0 ? (
                  <img
                    src={product.images[0].imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-10 py-4">
              <div className="space-y-6">
                <Badge
                  variant="secondary"
                  className="text-xs font-medium tracking-wide uppercase px-4 py-1.5"
                >
                  {product.category?.name}
                </Badge>

                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
                  {product.name}
                </h1>

                <p className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                  ${product.price}
                </p>
              </div>

              <div className="py-8 border-y border-border">
                <h3 className="font-semibold text-lg mb-4 tracking-tight">
                  Description
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {product.description}
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-base">Availability:</span>
                  <Badge className="px-4 py-1.5">
                    {`${product.qty} Left`}
                  </Badge>
                </div>

                <div className="flex items-center space-x-6 mt-6">
                  <Button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white h-14 mt-4 rounded-full flex items-center justify-center gap-2"
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      quantity,
                      image: product.images[0]?.imageUrl || "",
                    })
                  }
                >
                  <ShoppingCart className="h-5 w-5" /> Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};