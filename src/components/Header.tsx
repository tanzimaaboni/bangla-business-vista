
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, Menu, X } from "lucide-react";

export function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-bangladesh-green text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center">
          <span className="text-bangladesh-gold">Bangla</span>
          <span className="text-white">Business</span>
          <span className="text-bangladesh-gold ml-1">Vista</span>
        </Link>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-bangladesh-gold transition-colors">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/admin" className="hover:text-bangladesh-gold transition-colors">
                Admin Panel
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="text-white border-white hover:bg-white hover:text-bangladesh-green"
              >
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button 
                variant="outline" 
                size="sm"
                className="text-white border-white hover:bg-white hover:text-bangladesh-green"
              >
                <User className="h-4 w-4 mr-1" /> Admin Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 bg-bangladesh-green border-t border-white/20">
          <nav className="flex flex-col items-center space-y-4 pb-4">
            <Link 
              to="/" 
              className="w-full text-center py-2 hover:bg-bangladesh-green/80"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/admin" 
                  className="w-full text-center py-2 hover:bg-bangladesh-green/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Panel
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-4/5 text-white border-white hover:bg-white hover:text-bangladesh-green"
                >
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </Button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="w-4/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button 
                  variant="outline"
                  className="w-full text-white border-white hover:bg-white hover:text-bangladesh-green"
                >
                  <User className="h-4 w-4 mr-1" /> Admin Login
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
