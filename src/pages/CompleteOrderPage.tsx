// import React from "react";
// import { Navbar } from "../components/Navbar";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
// import { Badge } from "../components/ui/badge";
// import {
//   CreditCard,
//   MapPin,
//   User,
//   Mail,
//   Phone,
//   Lock,
//   ArrowLeft,
// } from "lucide-react";

// export const CompleteOrderPage: React.FC = () => {
//   return (
//     <div className="min-h-screen">
//       <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-11 md:py-10">
//         <Button
//           variant="ghost"
//           className="mb-7 hover:bg-accent transition-all duration-300 rounded-full"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back
//         </Button>

//         <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-10">
//           Complete Your Order
//         </h1>

//         <div className="grid lg:grid-cols-3 gap-12">
//           {/* Checkout Form */}
//           <div className="lg:col-span-2 space-y-8">

//             {/* Progress Indicator */}
//             <div className="flex items-center space-x-4 mb-9">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-accent text-muted-foreground">
//                   1
//                 </div>
//                 <span className="font-medium">Shipping</span>
//               </div>

//               <div className="h-0.5 w-16 bg-border"></div>

//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-primary text-white">
//                   2 
//                 </div>
//                 <span className="font-medium text-muted-foreground">
//                   Payment
//                 </span>
//               </div>
//             </div>

//             {/* Shipping Information */}
//             {/* <Card className="shadow-xl shadow-black/5 border-border/50">
//               <CardHeader className="pb-8">
//                 <CardTitle className="text-2xl tracking-tight flex items-center space-x-3">
//                   <MapPin className="h-6 w-6" />
//                   <span>Shipping Information</span>
//                 </CardTitle>
//               </CardHeader>

//               <CardContent className="px-8 pb-8">
//                 <form className="space-y-8">
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div className="space-y-3">
//                       <Label className="text-sm flex items-center space-x-2">
//                         <User className="h-4 w-4 text-muted-foreground" />
//                         <span>First Name *</span>
//                       </Label>

//                       <Input
//                         placeholder="John"
//                         className="bg-white h-12 border-border/50 rounded-xl"
//                       />
//                     </div>

//                     <div className="space-y-3">
//                       <Label className="text-sm">Last Name *</Label>

//                       <Input
//                         placeholder="Doe"
//                         className="bg-white h-12 border-border/50 rounded-xl"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div className="space-y-3">
//                       <Label className="text-sm flex items-center space-x-2">
//                         <Mail className="h-4 w-4 text-muted-foreground" />
//                         <span>Email *</span>
//                       </Label>

//                       <Input
//                         placeholder="john@example.com"
//                         className="bg-white h-12 border-border/50 rounded-xl"
//                       />
//                     </div>

//                     <div className="space-y-3">
//                       <Label className="text-sm flex items-center space-x-2">
//                         <Phone className="h-4 w-4 text-muted-foreground" />
//                         <span>Phone *</span>
//                       </Label>

//                       <Input
//                         placeholder="+1 (555) 000-0000"
//                         className="bg-white h-12 border-border/50 rounded-xl"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-3">
//                     <Label className="text-sm">Street Address *</Label>

//                     <Input
//                       placeholder="123 Main Street"
//                       className="bg-white h-12 border-border/50 rounded-xl"
//                     />
//                   </div>

//                   <div className="space-y-3">
//                     <Label className="text-sm">Province *</Label>

//                     <Input
//                       placeholder="Ontario"
//                       className="bg-white h-12 border-border/50 rounded-xl"
//                     />
//                   </div>

//                   <Button className="w-full bg-primary hover:bg-primary/90 h-14 rounded-full transition-all duration-300 hover:shadow-xl text-base mt-8">
//                     Continue to Payment
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card> */}

//             {/* Payment Information */}
//             <Card className="shadow-xl shadow-black/5 border-border/50">
//               <CardHeader className="pb-8">
//                 <CardTitle className="text-2xl tracking-tight flex items-center space-x-3">
//                   <CreditCard className="h-6 w-6" />
//                   <span>Payment Information</span>
//                 </CardTitle>
//               </CardHeader>

//               <CardContent className="px-8 pb-8">
//                 <form className="space-y-8">
//                   <div className="space-y-3">
//                     <Label className="text-sm">Card Number *</Label>

//                     <Input
//                       placeholder="1234 5678 9012 3456"
//                       className="bg-white h-12 border-border/50 rounded-xl"
//                     />
//                   </div>

//                   <div className="space-y-3">
//                     <Label className="text-sm">Name on Card *</Label>

//                     <Input
//                       placeholder="JOHN DOE"
//                       className="bg-white h-12 border-border/50 rounded-xl"
//                     />
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div className="space-y-3">
//                       <Label className="text-sm">Expiry Date *</Label>

//                       <Input
//                         placeholder="MM/YY"
//                         className="bg-white h-12 border-border/50 rounded-xl"
//                       />
//                     </div>

//                     <div className="space-y-3">
//                       <Label className="text-sm flex items-center space-x-2">
//                         <Lock className="h-4 w-4 text-muted-foreground" />
//                         <span>CVV *</span>
//                       </Label>

//                       <Input
//                         placeholder="123"
//                         className="bg-white h-12 border-border/50 rounded-xl"
//                       />
//                     </div>
//                   </div>

//                   <div className="bg-accent/50 rounded-xl p-6 flex items-start space-x-3">
//                     <Lock className="h-5 w-5 text-muted-foreground mt-0.5" />

//                     <div className="text-sm text-muted-foreground">
//                       <p className="font-medium text-foreground mb-1">
//                         Secure Payment
//                       </p>

//                       <p>
//                         Your payment information is encrypted and secure. We
//                         never store your card details.
//                       </p>
//                     </div>
//                   </div>

//                   <Button className="w-full bg-secondary hover:bg-secondary/90 h-14 rounded-full transition-all duration-300 hover:shadow-xl text-base mt-8">
//                     Complete Order
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-xl shadow-black/5 p-8 sticky top-28 space-y-6">
//               <h2 className="text-2xl font-bold tracking-tight mb-6">
//                 Order Summary
//               </h2>

//               <div className="space-y-4 pb-6 border-b border-border">
//                 <div className="flex items-center space-x-4">
//                   <div className="relative">
//                     <img
//                       src="https://via.placeholder.com/100"
//                       className="w-20 h-20 object-cover rounded-xl"
//                     />

//                     <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs">
//                       1
//                     </Badge>
//                   </div>

//                   <div>
//                     <p className="font-semibold tracking-tight">
//                       iPhone 15 Pro
//                     </p>
//                     <p className="text-sm text-muted-foreground">$999</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-4 py-6 border-b border-border">
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Subtotal</span>
//                   <span className="font-semibold">$999</span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Shipping</span>
//                   <span className="font-semibold text-secondary">Free</span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Tax</span>
//                   <span className="font-semibold">$79.92</span>
//                 </div>
//               </div>

//               <div className="flex justify-between text-2xl font-bold pt-4">
//                 <span>Total</span>
//                 <span className="text-primary">$1,078.92</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };