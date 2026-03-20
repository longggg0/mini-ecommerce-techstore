import React from 'react';
import { LayoutDashboard, Package, ShoppingCart, LogOut, ChartBarStacked } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, to: '/admin-dashboard' },
    { id: 'products', label: 'Products', icon: Package, to: '/admin-productPage' },
    { id: 'category', label: 'Categories', icon: ChartBarStacked, to: '/admin-category' },
    // { id: 'addProduct', label: 'Add Product', icon: Plus, to: '/admin-addProduct' },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, to: '/admin-order' },
  ];
  // inside AdminLayout
  const navigate = useNavigate();

  const handleLogout = () => {
    // remove admin info
    localStorage.removeItem("admin");

    // redirect to login page
    navigate("/login-page", { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-border flex flex-col">
        <div className="p-8 border-b border-border">
          <a href="/">
            <h1 className="text-2xl font-semibold text-primary tracking-tight">TechStore</h1>
          </a>
          <p className="text-sm text-muted-foreground mt-2 tracking-tight">Admin Panel</p>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-4 px-5 py-4 rounded-2xl w-full text-left
                  transition-colors duration-500 ease-in-out
                  ${isActive ? 'bg-black text-white' : 'text-foreground/70 hover:text-foreground hover:bg-accent'}`
                }
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium tracking-tight">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-6 border-t border-border space-y-3">
          <div className="px-5 py-4 bg-accent/50 rounded-2xl">
            <p className="text-sm font-semibold tracking-tight">Admin TechStore</p>
            <p className="text-xs text-muted-foreground mt-1">admin@gmail.com</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-4 px-5 py-4 w-full rounded-2xl text-destructive hover:bg-destructive/10 transition-all duration-300"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium tracking-tight">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-border px-12 py-8">
          <h2 className="text-2xl font-semibold tracking-tight">Admin Dashboard</h2>
        </header>

        <main className="flex-1 p-12 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};