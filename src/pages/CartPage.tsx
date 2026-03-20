import React from "react";
import { Button } from "../components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Footer } from "@/components/Footer";

export const CartPage: React.FC = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="max-w-350 mx-auto px-4 sm:px-8 lg:px-12 py-32">
          <div className="text-center space-y-8 max-w-md mx-auto">
            <ShoppingBag className="h-32 w-32 mx-auto text-muted-foreground/30" />
            <h2 className="text-4xl font-semibold tracking-tight">Your cart is empty</h2>
            <p className="text-lg text-muted-foreground">Add some products to get started!</p>
            <Link to="/">
              <Button className="mt-8 rounded-full px-8 h-12">Continue Shopping</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="max-w-350 mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-8 sm:mb-16">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg shadow-black/5 p-4 sm:p-8 flex items-center gap-4 sm:gap-8 hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 sm:w-32 sm:h-32 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 space-y-1 sm:space-y-3 min-w-0">
                    <h3 className="font-semibold text-base sm:text-xl tracking-tight truncate">{item.name}</h3>
                    <p className="text-lg sm:text-2xl font-bold text-primary tracking-tight">${item.price}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 shrink-0">
                    <div className="flex items-center border border-border rounded-full overflow-hidden bg-accent/30">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 sm:h-10 sm:w-10 rounded-none hover:bg-white transition-all duration-300"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>

                      <span className="px-3 sm:px-6 py-2 font-medium text-sm sm:text-base">{item.quantity}</span>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 sm:h-10 sm:w-10 rounded-none hover:bg-white transition-all duration-300"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-300 rounded-full h-8 w-8 sm:h-10 sm:w-10 p-0"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-lg sm:text-2xl font-bold tracking-tight">
                      ${Number(item.price) * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 order-first lg:order-last">
              <div className="bg-white rounded-2xl shadow-xl shadow-black/5 p-6 sm:p-8 lg:sticky lg:top-28 space-y-6">
                <h2 className="text-2xl font-bold tracking-tight mb-6">Order Summary</h2>

                <div className="space-y-4 py-6 border-y border-border">
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold text-secondary">Free</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-sm text-muted-foreground">Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between text-2xl font-bold pt-4">
                  <span>Total</span>
                  <span className="text-primary tracking-tight">${subtotal}</span>
                </div>

                <Link to="/checkout">
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-white h-14 text-base rounded-full mt-8 mb-3 transition-all duration-300 hover:shadow-xl">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link to="/">
                  <Button variant="outline" className="w-full h-12 rounded-full mb-3 border-border hover:bg-accent transition-all duration-300">
                    Continue Shopping
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full transition-all duration-300"
                  onClick={clearCart}
                >
                  Clear Cart
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