import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, Leaf, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Ayurveda", path: "/ayurveda" },
  { name: "Contact", path: "/contact" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, openCart } = useCart();

  const isActive = (path: string) => location.pathname === path;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductClick = (productId: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    navigate("/products");
  };

  return (
    <>
      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-background"
          >
            <div className="container mx-auto px-4">
              {/* Search Header */}
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex items-center justify-between h-16 md:h-20 border-b border-border"
              >
                <div className="flex-1 max-w-2xl mx-auto">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search for products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-12 pl-12 pr-4 text-lg bg-secondary border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
                      autoFocus
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="ml-4 p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-foreground" />
                </button>
              </motion.div>

              {/* Search Results */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="py-8 max-h-[calc(100vh-5rem)] overflow-y-auto"
              >
                {searchQuery ? (
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {filteredProducts.length} results for "{searchQuery}"
                    </p>
                    {filteredProducts.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {filteredProducts.map((product, index) => (
                          <motion.button
                            key={product.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            onClick={() => handleProductClick(product.id)}
                            className="group p-4 rounded-xl bg-card hover:bg-secondary border border-border/50 transition-all text-left"
                          >
                            <div className="aspect-square rounded-lg bg-secondary flex items-center justify-center mb-3">
                              <span className="text-4xl">🌿</span>
                            </div>
                            <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {product.shortName}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">{product.category}</p>
                            <p className="text-sm font-semibold text-primary mt-2">
                              ₹{product.variants[0].salePrice}
                            </p>
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">No products found for "{searchQuery}"</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium text-foreground mb-4">Popular Products</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {products.filter(p => p.featured).map((product, index) => (
                        <motion.button
                          key={product.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          onClick={() => handleProductClick(product.id)}
                          className="group p-4 rounded-xl bg-card hover:bg-secondary border border-border/50 transition-all text-left"
                        >
                          <div className="aspect-square rounded-lg bg-secondary flex items-center justify-center mb-3">
                            <span className="text-4xl">🌿</span>
                          </div>
                          <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {product.shortName}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{product.category}</p>
                          <p className="text-sm font-semibold text-primary mt-2">
                            ₹{product.variants[0].salePrice}
                          </p>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-semibold text-primary">Dinkar</span>
              <span className="text-xs text-muted-foreground -mt-1 tracking-wider">AYURVEDA</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="w-9 h-9 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
            >
              <Search className="w-4 h-4 text-muted-foreground" />
            </button>
            <Button variant="outline" size="sm" className="gap-2 relative" onClick={openCart}>
              <ShoppingBag className="w-4 h-4" />
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Button>
            <Link 
              to="/profile"
              className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors border border-primary/20"
            >
              <User className="w-4 h-4 text-primary" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex gap-2 mt-4 px-4">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-9 h-9 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
              >
                <Search className="w-4 h-4 text-muted-foreground" />
              </button>
                <Button variant="outline" size="sm" className="flex-1 gap-2 relative" onClick={() => { setIsMenuOpen(false); openCart(); }}>
                  <ShoppingBag className="w-4 h-4" />
                  Cart
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                      {totalItems > 9 ? "9+" : totalItems}
                    </span>
                  )}
                </Button>
                <Link 
                  to="/profile" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center gap-2 text-sm font-medium text-primary transition-colors border border-primary/20"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
    </>
  );
};
