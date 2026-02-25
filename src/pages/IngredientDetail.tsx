import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ingredients } from "@/data/ingredients";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Check, Leaf } from "lucide-react";

const IngredientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const ingredient = ingredients.find((i) => i.id === id);

  if (!ingredient) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Ingredient Not Found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Find products containing this ingredient
  const relatedProducts = products.filter((p) =>
    p.ingredients?.some((ing) => {
      const lower = ing.toLowerCase();
      return (
        lower.includes(ingredient.id) ||
        ingredient.name.toLowerCase().includes(lower) ||
        lower.includes(ingredient.name.split(" ")[0].toLowerCase())
      );
    })
  );

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary/50 border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <Link
            to="/products"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>

      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Visual */}
            <div className="aspect-square bg-secondary rounded-2xl flex items-center justify-center">
              <div className="text-center p-8">
                <span className="text-9xl block mb-4">{ingredient.image}</span>
                <span className="px-4 py-1.5 bg-accent text-accent-foreground text-sm font-semibold rounded-full inline-flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5" />
                  Ayurvedic Herb
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col">
              {ingredient.sanskritName && (
                <span className="text-sm font-medium text-muted-foreground mb-1 italic">
                  {ingredient.sanskritName}
                </span>
              )}
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                {ingredient.name}
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {ingredient.description}
              </p>

              {/* Benefits */}
              <div className="mb-6">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                  Key Benefits
                </h3>
                <div className="space-y-2">
                  {ingredient.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Traditional Use */}
              <div className="mb-8 p-4 bg-secondary/70 rounded-xl border border-border/50">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  Traditional Use
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {ingredient.traditionalUse}
                </p>
              </div>

              {/* Related Products */}
              {relatedProducts.length > 0 && (
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                    Found In Our Products
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {relatedProducts.map((product) => (
                      <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-lg hover:bg-primary/20 transition-colors"
                      >
                        {product.shortName}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IngredientDetail;
