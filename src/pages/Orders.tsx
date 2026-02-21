import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Package, ChevronRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  variant_size: string;
  quantity: number;
  price: number;
  mrp: number;
}

interface Order {
  id: string;
  status: string;
  total: number;
  subtotal: number;
  savings: number;
  created_at: string;
  order_items: OrderItem[];
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  confirmed: { label: "Confirmed", variant: "default" },
  processing: { label: "Processing", variant: "secondary" },
  shipped: { label: "Shipped", variant: "outline" },
  delivered: { label: "Delivered", variant: "default" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

const Orders = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) {
          navigate("/login");
          return;
        }

        const { data, error } = await supabase
          .from("orders")
          .select("*, order_items(*)")
          .eq("user_id", userData.user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (error: any) {
        toast({ title: "Failed to load orders", description: error.message, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-background py-6 md:py-10">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="font-serif text-2xl font-semibold text-foreground">My Orders</h1>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-5 animate-pulse">
                    <div className="h-4 bg-muted rounded w-1/3 mb-3" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-16">
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="font-serif text-xl font-semibold text-foreground mb-2">No orders yet</h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Start shopping to see your orders here.
                </p>
                <Button onClick={() => navigate("/products")}>Browse Products</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const config = statusConfig[order.status] || statusConfig.confirmed;
                  const isExpanded = expandedOrder === order.id;

                  return (
                    <div
                      key={order.id}
                      className="bg-card border border-border rounded-xl overflow-hidden transition-shadow hover:shadow-md"
                    >
                      <button
                        className="w-full p-5 text-left"
                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant={config.variant}>{config.label}</Badge>
                              <span className="text-xs text-muted-foreground">
                                {format(new Date(order.created_at), "dd MMM yyyy, hh:mm a")}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {order.order_items.length} item{order.order_items.length !== 1 ? "s" : ""}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground">₹{Number(order.total).toLocaleString()}</span>
                            <ChevronRight
                              className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`}
                            />
                          </div>
                        </div>
                      </button>

                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Separator />
                          <div className="p-5 space-y-3">
                            {order.order_items.map((item) => (
                              <div key={item.id} className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                                  <span className="text-lg">🌿</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-foreground truncate">{item.product_name}</p>
                                  <p className="text-xs text-muted-foreground">{item.variant_size} × {item.quantity}</p>
                                </div>
                                <p className="text-sm font-semibold text-foreground">
                                  ₹{(Number(item.price) * item.quantity).toLocaleString()}
                                </p>
                              </div>
                            ))}

                            <Separator />

                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Subtotal</span>
                              <span className="text-foreground">₹{Number(order.subtotal).toLocaleString()}</span>
                            </div>
                            {Number(order.savings) > 0 && (
                              <div className="flex justify-between text-sm">
                                <span className="text-neem">Savings</span>
                                <span className="text-neem font-medium">−₹{Number(order.savings).toLocaleString()}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-sm font-semibold">
                              <span className="text-foreground">Total</span>
                              <span className="text-primary">₹{Number(order.total).toLocaleString()}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
