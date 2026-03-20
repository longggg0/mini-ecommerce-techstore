import React, { useState } from "react";
import { Footer } from "@/components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { User, Mail, Phone, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const TELEGRAM_BOT_TOKEN = "8624532493:AAF19kxc9Yvuax41QlZA2cg7ogbi7is3vxU";
const CHAT_ID = "1384205752";



export const CheckoutPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { cart, clearCart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const navigate = useNavigate();
  // --- read user from localStorage ---
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    province: user?.province || "",
  });

  const [status, setStatus] = useState<"form" | "success" | "fail">("form"); // current step

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePay = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
    alert("You must be logged in to place an order.");
    navigate("/login-page");
    return;
  }
    console.log(" PAY CLICKED");

    // --- Simple validation ---
  if (
    !formData.firstName.trim() ||
    !formData.lastName.trim() ||
    !formData.email.trim() ||
    !formData.phone.trim() ||
    !formData.address.trim() ||
    !formData.province.trim()
  ) {
    alert("Please fill in all fields.");
    return;
  }

  // phone number must be at least 6 digits
  const phoneDigits = formData.phone.replace(/\D/g, ""); // remove non-digits
  if (phoneDigits.length < 8) {
    alert("Phone number must be at least 8 digits.");
    setStatus("fail");
    return;
  }

  // Email validation
if (!formData.email.includes("@gmail.com")) {
  alert("Email must be a valid Gmail address (example@gmail.com).");
  setStatus("fail");
  return;
}

    const allFilled = Object.values(formData).every((v) => v.trim() !== "");
    if (!allFilled) {
      setStatus("fail");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      console.log(" sending to backend...");

      const res = await fetch("http://localhost:3000/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: user.id,
          location: `${formData.address}, ${formData.province}`,
          items: cart.map((item) => ({
            productId: item.id,
            qty: item.quantity,
          })),
        }),
      });

      const data = await res.json();

      console.log(" response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Order failed");
      }
      // ---  Send order info to Telegram ---
      const message = `
  📦 <b>New Order</b>
  👤 Name: ${formData.firstName} ${formData.lastName}
  📧 Email: ${formData.email}
  📱 Phone: ${formData.phone}
  🏠 Address: ${formData.address}, ${formData.province}

  🛒 <b>Items:</b>
  ${cart.map(
        (item) => `- ${item.name} x${item.quantity} = $${Number(item.price) * item.quantity}`
      ).join("\n")}

💰 Total: $${cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)}
    `;

      await sendTelegramMessage(message);

      clearCart();
      setStatus("success");

    } catch (err: any) {
      console.error(" error:", err.message);
      alert(err.message);
      setStatus("fail");
    }
  };
  //send to telegram
  const sendTelegramMessage = async (message: string) => {
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML", // allows bold, italics, etc.
        }),
      });
    } catch (err) {
      console.error("Telegram send error:", err);
    }
  };

  
  // --- Success Page ---
  if (status === "success") {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="max-w-350 mx-auto px-8 lg:px-12 py-32">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">Order Confirmed!</h1>
            <p className="text-xl text-muted-foreground">
              Thank you for your purchase. We've sent a confirmation email to {formData.email}
            </p>
            <Link to="/">
              <Button
                onClick={() => setStatus("form")}
                className="rounded-full px-8 h-12 mt-8"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // --- Failure Page ---
  if (status === "fail") {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="max-w-350 mx-auto px-8 lg:px-12 py-32">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="h-12 w-12 text-red-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">Incomplete Information</h1>
            <p className="text-xl text-muted-foreground">
              Please fill in all required fields to proceed with the payment.
            </p>
            <Button
              onClick={() => setStatus("form")}
              className="rounded-full px-8 h-12 mt-8"
            >
              Go Back
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // --- Checkout Form ---
  return (
    <div className="min-h-screen">
      <div className="max-w-350 mx-auto px-8 lg:px-12 py-16 md:py-10">
        <Link to="/cart-page">
          <Button
            variant="ghost"
            className="mb-12 hover:bg-accent transition-all duration-300 rounded-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-5">Shipping</h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-xl shadow-black/5 border-border/50">
              <CardHeader className="pb-5"></CardHeader>
              <CardContent className="px-8 pb-8">
                <form className="space-y-8" onSubmit={handlePay}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>First Name *</span>
                      </Label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className="bg-white h-12 border-border/50 rounded-xl"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm">Last Name *</Label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="bg-white h-12 border-border/50 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>Email *</span>
                      </Label>
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="bg-white h-12 border-border/50 rounded-xl"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>Phone *</span>
                      </Label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="bg-white h-12 border-border/50 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm">Street Address *</Label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main Street"
                      className="bg-white h-12 border-border/50 rounded-xl"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm">Province *</Label>
                    <Input
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      placeholder="Ontario"
                      className="bg-white h-12 border-border/50 rounded-xl"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 h-14 rounded-full transition-all duration-300 hover:shadow-xl text-base mt-8"
                  >
                    {loading ? "Processing..." : "Pay Now"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl shadow-black/5 p-8 sticky top-28 space-y-6">
              <h2 className="text-2xl font-bold tracking-tight mb-6">Order Summary</h2>
              <div className="space-y-4 pb-6 border-b border-border">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground">Your cart is empty.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="relative">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                        <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs">{item.quantity}</Badge>
                      </div>
                      <div>
                        <p className="font-semibold tracking-tight">{item.name}</p>
                        <p className="text-sm text-muted-foreground">${item.price}</p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-2xl font-bold tracking-tight">
                          ${Number(item.price) * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="space-y-4 py-6 border-b border-border">
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${subtotal}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold text-secondary">Free</span>
                </div>
              </div>
              <div className="flex justify-between text-2xl font-bold pt-4">
                <span>Total</span>
                <span className="text-primary">${subtotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};