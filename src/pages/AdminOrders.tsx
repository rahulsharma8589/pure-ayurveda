import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Package, Trash2, ChevronDown, MapPin } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface OrderItem {
  id: string;
  product_name: string;
  variant_size: string;
  quantity: number;
  price: number;
  mrp: number;
}

interface Address {
  first_name: string;
  last_name: string;
  full_address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

interface Order {
  id: string;
  user_id: string;
  status: string;
  total: number;
  subtotal: number;
  savings: number;
  created_at: string;
  address_id: string | null;
  order_items: OrderItem[];
  addresses: Address | null;
}

const statuses = ["confirmed", "processing", "shipped", "delivered", "cancelled"] as const;

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  confirmed: { label: "Confirmed", variant: "default" },
  processing: { label: "Processing", variant: "secondary" },
  shipped: { label: "Shipped", variant: "outline" },
  delivered: { label: "Delivered", variant: "default" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

const AdminOrders = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, loading: adminLoading } = useAdminCheck();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*), addresses(*)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      toast({ title: "Failed to load orders", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate("/");
      return;
    }
    if (!adminLoading && isAdmin) {
      fetchOrders();
    }
  }, [adminLoading, isAdmin]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      toast({ title: `Order status updated to ${statusConfig[newStatus]?.label || newStatus}` });
    } catch (error: any) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    }
  };

  const handleDelete = async (orderId: string) => {
    try {
      const { error } = await supabase.from("orders").delete().eq("id", orderId);
      if (error) throw error;
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      toast({ title: "Order deleted" });
    } catch (error: any) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    }
  };

  const filteredOrders = filterStatus === "all" ? orders : orders.filter((o) => o.status === filterStatus);

  if (adminLoading || loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) return null;

  return (
    <Layout>
      <div className="min-h-screen bg-background py-6 md:py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="font-serif text-2xl font-semibold text-foreground">Admin — Orders</h1>
                <Badge variant="outline" className="ml-2">{filteredOrders.length} orders</Badge>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map((s) => (
                    <SelectItem key={s} value={s}>{statusConfig[s].label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="text-center py-16">
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="font-serif text-xl font-semibold text-foreground mb-2">No orders found</h2>
              </div>
            ) : (
              <div className="rounded-xl border border-border overflow-hidden bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => {
                      const config = statusConfig[order.status] || statusConfig.confirmed;
                      const isExpanded = expandedOrder === order.id;

                      return (
                        <>
                          <TableRow
                            key={order.id}
                            className="cursor-pointer"
                            onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                          >
                            <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                              {format(new Date(order.created_at), "dd MMM yyyy")}
                            </TableCell>
                            <TableCell className="font-mono text-xs text-muted-foreground">
                              {order.id.slice(0, 8)}…
                            </TableCell>
                            <TableCell>{order.order_items.length} item{order.order_items.length !== 1 ? "s" : ""}</TableCell>
                            <TableCell className="font-semibold">₹{Number(order.total).toLocaleString()}</TableCell>
                            <TableCell>
                              <Select
                                value={order.status}
                                onValueChange={(val) => handleStatusChange(order.id, val)}
                              >
                                <SelectTrigger
                                  className="w-[130px] h-8 text-xs"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Badge variant={config.variant} className="text-xs">{config.label}</Badge>
                                </SelectTrigger>
                                <SelectContent>
                                  {statuses.map((s) => (
                                    <SelectItem key={s} value={s}>{statusConfig[s].label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-destructive hover:text-destructive"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete this order?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. The order and all its items will be permanently removed.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDelete(order.id)}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>

                          {isExpanded && (
                            <TableRow key={`${order.id}-details`}>
                              <TableCell colSpan={6} className="bg-muted/30 p-5">
                                <div className="grid md:grid-cols-2 gap-6">
                                  {/* Items */}
                                  <div>
                                    <h4 className="text-sm font-semibold text-foreground mb-3">Order Items</h4>
                                    <div className="space-y-2">
                                      {order.order_items.map((item) => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                          <span className="text-foreground">
                                            {item.product_name} ({item.variant_size}) × {item.quantity}
                                          </span>
                                          <span className="font-medium">₹{(Number(item.price) * item.quantity).toLocaleString()}</span>
                                        </div>
                                      ))}
                                      <Separator className="my-2" />
                                      <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>₹{Number(order.subtotal).toLocaleString()}</span>
                                      </div>
                                      {Number(order.savings) > 0 && (
                                        <div className="flex justify-between text-sm text-neem">
                                          <span>Savings</span>
                                          <span>−₹{Number(order.savings).toLocaleString()}</span>
                                        </div>
                                      )}
                                      <div className="flex justify-between text-sm font-bold">
                                        <span>Total</span>
                                        <span className="text-primary">₹{Number(order.total).toLocaleString()}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Address */}
                                  <div>
                                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1">
                                      <MapPin className="h-4 w-4" /> Delivery Address
                                    </h4>
                                    {order.addresses ? (
                                      <div className="text-sm text-muted-foreground space-y-1">
                                        <p className="font-medium text-foreground">
                                          {order.addresses.first_name} {order.addresses.last_name}
                                        </p>
                                        <p>{order.addresses.full_address}</p>
                                        <p>{order.addresses.city}, {order.addresses.state} - {order.addresses.pincode}</p>
                                        <p>Phone: {order.addresses.phone}</p>
                                      </div>
                                    ) : (
                                      <p className="text-sm text-muted-foreground">No address on file</p>
                                    )}
                                    <p className="text-xs text-muted-foreground mt-3">
                                      User: {order.user_id.slice(0, 8)}…
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
