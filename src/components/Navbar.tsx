import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Smartphone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export const Navbar: React.FC = () => {
  const { getTotalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const [user, setUser] = useState<{
    name?: string;
    email?: string;
    role?: string;
  } | null>(null);

  const navigate = useNavigate();

  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
    window.addEventListener("storage", loadUser);
    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login-page");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-border sticky top-0 z-50">
      <div className="max-w-350 mx-auto px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-primary rounded-xl p-2 transition-transform group-hover:scale-105 duration-300">
              <Smartphone className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-semibold text-primary tracking-tight group-hover:opacity-70">
              TechStore
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-7">
            <Link to="/" className="text-foreground/80 hover:text-foreground text-sm">
              Home
            </Link>
            <Link to="/order-history" className="text-foreground/80 hover:text-foreground text-sm">
              Orders
            </Link>
            <Link to="/contact-us" className="text-foreground/80 hover:text-foreground text-sm">
              Contact us
            </Link>

            {/* Cart */}
            <Link to="/cart-page" className="relative group">
              <ShoppingCart className="h-5 w-5 text-foreground/80 group-hover:text-foreground" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* User Section */}
            {user ? (
              <div className="flex items-center space-x-3 text-sm">
                <User className="h-4 w-4 text-foreground/60" />
                <span className="text-foreground/80">{user.name || user.email}</span>
                {user.role === "admin" && (
                  <Link to="/admin-dashboard">
                    <Button variant="secondary" size="sm">Dashboard</Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={handleLogout} className="hover:text-destructive">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link to="/login-page">
                <Button variant="outline" size="sm" className="rounded-full px-5">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Right Side */}
          <div className="flex md:hidden items-center space-x-4">
            <Link to="/cart-page" className="relative group">
              <ShoppingCart className="h-5 w-5 text-foreground/80" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border px-8 py-4 flex flex-col space-y-4">
          <Link to="/" className="text-foreground/80 hover:text-foreground text-sm" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/order-history" className="text-foreground/80 hover:text-foreground text-sm" onClick={() => setMenuOpen(false)}>
            Orders
          </Link>
          <Link to="/contact-us" className="text-foreground/80 hover:text-foreground text-sm" onClick={() => setMenuOpen(false)}>
            Contact us
          </Link>

          {user ? (
            <div className="flex flex-col space-y-3 text-sm pt-2 border-t border-border">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-foreground/60" />
                <span className="text-foreground/80">{user.name || user.email}</span>
              </div>
              {user.role === "admin" && (
                <Link to="/admin-dashboard" onClick={() => setMenuOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full">Dashboard</Button>
                </Link>
              )}
              <Button variant="ghost" size="sm" onClick={() => { handleLogout(); setMenuOpen(false); }} className="hover:text-destructive w-full justify-start">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login-page" onClick={() => setMenuOpen(false)}>
              <Button variant="outline" size="sm" className="rounded-full px-5 w-full">Login</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};