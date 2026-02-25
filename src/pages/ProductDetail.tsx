import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { products } from "@/data/products";
import { findIngredientByName } from "@/data/ingredients";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ShoppingBag, Star, Check, ChevronLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const { addToCart, items, updateQuantity } = useCart();
  const { toast } = useToast();

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const selectedVariant = product.variants[selectedVariantIndex];
  const cartItem = items.find(
    (i) => i.productId === product.id && i.size === selectedVariant.size
  );

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary/50 border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>

      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Image */}
            <div className="aspect-square bg-secondary rounded-2xl flex items-center justify-center">
              <div className="text-center p-8">
                <span className="text-9xl block mb-4">🌿</span>
                <span className="px-4 py-1.5 bg-accent text-accent-foreground text-sm font-semibold rounded-full">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(4.9)</span>
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
                {product.name}
              </h1>
              <p className="text-muted-foreground mb-6">{product.longDescription}</p>

              {/* Variants */}
              {product.variants.length > 1 && (
                <div className="mb-6">
                  <span className="text-sm font-medium text-foreground mb-2 block">Size</span>
                  <div className="flex gap-2">
                    {product.variants.map((variant, index) => (
                      <button
                        key={variant.size}
                        onClick={() => setSelectedVariantIndex(index)}
                        className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                          selectedVariantIndex === index
                            ? "border-primary bg-primary/10 text-primary font-semibold"
                            : "border-border text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {variant.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-primary">₹{selectedVariant.salePrice}</span>
                {selectedVariant.mrp !== selectedVariant.salePrice && (
                  <span className="text-lg text-muted-foreground line-through">₹{selectedVariant.mrp}</span>
                )}
                <span className="text-sm text-muted-foreground">/ {selectedVariant.size}</span>
              </div>

              {/* CTA */}
              <div className="mb-8 max-w-xs">
                {cartItem ? (
                  <div className="w-full flex items-center rounded-lg border border-primary overflow-hidden">
                    <button
                      className="flex-1 h-12 flex items-center justify-center bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-colors"
                      onClick={() => updateQuantity(product.id, selectedVariant.size, cartItem.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="flex-[2] h-12 flex items-center justify-center text-foreground font-semibold text-lg bg-background">
                      {cartItem.quantity}
                    </span>
                    <button
                      className="flex-1 h-12 flex items-center justify-center bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-colors"
                      onClick={() => updateQuantity(product.id, selectedVariant.size, cartItem.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <Button
                    className="w-full gap-2 bg-primary hover:bg-primary/90 h-12 text-base"
                    onClick={() => {
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
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </Button>
                )}
              </div>

              {/* Benefits */}
              <div className="mb-6">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-3">Benefits</h3>
                <div className="space-y-2">
                  {product.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-neem mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ingredients */}
              {product.ingredients && (
                <div className="mb-6">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-3">Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient, i) => {
                      const matched = findIngredientByName(ingredient);
                      return matched ? (
                        <Link
                          key={i}
                          to={`/ingredients/${matched.id}`}
                          className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                        >
                          {ingredient}
                        </Link>
                      ) : (
                        <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                          {ingredient}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Usage */}
              {product.usage && (
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-3">How to Use</h3>
                  <ol className="list-decimal list-inside space-y-1.5">
                    {product.usage.map((step, i) => (
                      <li key={i} className="text-sm text-muted-foreground">{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
