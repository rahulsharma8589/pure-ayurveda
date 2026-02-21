import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/data/products";
import { ShoppingBag, Star, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({});
  const { addToCart, items, updateQuantity } = useCart();
  const { toast } = useToast();


  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const getSelectedVariant = (productId: string, variants: typeof products[0]["variants"]) => {
    return variants[selectedVariants[productId] || 0];
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Our Products
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Handcrafted Ayurvedic products made with pure, natural ingredients 
            and traditional formulations.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? "bg-primary" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProducts.map((product) => {
              const selectedVariant = getSelectedVariant(product.id, product.variants);
              
              return (
                <Link
                  to={`/products/${product.id}`}
                  key={product.id}
                  className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/50 block hover:shadow-lg transition-shadow"
                >
                  <div className="grid md:grid-cols-2">
                    {/* Image */}
                    <div className="aspect-square bg-secondary flex items-center justify-center">
                      <div className="text-center p-8">
                        <span className="text-7xl block mb-4">🌿</span>
                        <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col">
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">(4.9)</span>
                      </div>

                      <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                        {product.shortName}
                      </h2>
                      <p className="text-muted-foreground text-sm mb-4">
                        {product.description}
                      </p>

                      {/* Benefits */}
                      <div className="space-y-1.5 mb-4 flex-1">
                        {product.benefits.slice(0, 4).map((benefit, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-neem mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>

                      {/* Variants */}
                      {product.variants.length > 1 && (
                        <div className="flex gap-2 mb-4">
                          {product.variants.map((variant, index) => (
                            <button
                              key={variant.size}
                              onClick={(e) => { e.preventDefault(); setSelectedVariants(prev => ({ ...prev, [product.id]: index })); }}
                              className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                                (selectedVariants[product.id] || 0) === index
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-border text-muted-foreground hover:border-primary/50"
                              }`}
                            >
                              {variant.size}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-primary">
                          ₹{selectedVariant.salePrice}
                        </span>
                        {selectedVariant.mrp !== selectedVariant.salePrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{selectedVariant.mrp}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          / {selectedVariant.size}
                        </span>
                      </div>

                      {/* CTA */}
                      <div onClick={(e) => e.preventDefault()}>
                      {(() => {
                        const cartItem = items.find(
                          (i) => i.productId === product.id && i.size === selectedVariant.size
                        );
                        if (cartItem) {
                          return (
                            <div className="w-full flex items-center rounded-lg border border-primary overflow-hidden">
                              <button
                                className="flex-1 h-10 flex items-center justify-center bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-colors"
                                onClick={(e) => { e.preventDefault(); updateQuantity(product.id, selectedVariant.size, cartItem.quantity - 1); }}
                              >
                                −
                              </button>
                              <span className="flex-[2] h-10 flex items-center justify-center text-foreground font-semibold text-base bg-background">
                                {cartItem.quantity}
                              </span>
                              <button
                                className="flex-1 h-10 flex items-center justify-center bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-colors"
                                onClick={(e) => { e.preventDefault(); updateQuantity(product.id, selectedVariant.size, cartItem.quantity + 1); }}
                              >
                                +
                              </button>
                            </div>
                          );
                        }
                        return (
                          <Button
                            className="w-full gap-2 bg-primary hover:bg-primary/90"
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart({
                                productId: product.id,
                                productName: product.name,
                                shortName: product.shortName,
                                category: product.category,
                                size: selectedVariant.size,
                                mrp: selectedVariant.mrp,
                                salePrice: selectedVariant.salePrice,
                              });
                              toast({
                                title: "Added to cart!",
                                description: `${product.shortName} (${selectedVariant.size}) added.`,
                              });
                            }}
                          >
                            <ShoppingBag className="w-4 h-4" />
                            Add to Cart
                          </Button>
                        );
                      })()}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
