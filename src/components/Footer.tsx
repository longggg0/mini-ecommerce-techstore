import React from 'react';
import { Link } from 'react-router';
import { Smartphone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-muted/30 border-t border-border/50 mt-auto">
      <div className="max-w-350 mx-auto px-8 lg:px-12 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-12 border-b border-border/50">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                <Smartphone className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold tracking-tight">TechStore</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm font-light">
              Premium technology at your fingertips. Discover the latest iPhones and Laptops with exceptional quality and service.
            </p>
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-muted hover:bg-secondary/10 flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 text-muted-foreground hover:text-secondary" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-muted hover:bg-secondary/10 flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 text-muted-foreground hover:text-secondary" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-muted hover:bg-secondary/10 flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 text-muted-foreground hover:text-secondary" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-muted hover:bg-secondary/10 flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4 text-muted-foreground hover:text-secondary" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm tracking-tight">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
                >
                  iPhones
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
                >
                  Laptops
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm tracking-tight">Account</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/login-page" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link 
                  to="/register-page" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
                >
                  Register
                </Link>
              </li>
              <li>
                <p 
                  
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
                >
                  Shopping Cart
                </p>
              </li>
              <li>
                <p 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
                >
                  Checkout
                </p>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm tracking-tight">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/contact-us" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <p 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
                >
                  Shipping Info
                </p>
              </li>
              <li>
                <p
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
                >
                  Returns
                </p>
              </li>
              <li>
                <p 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
                >
                  FAQ
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-muted-foreground font-light tracking-tight">
            © 2026 TechStore. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <a 
              href="#" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
