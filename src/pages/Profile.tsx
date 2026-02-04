import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Package, LogOut, Plus, Edit2, Trash2, ChevronRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

// Mock user data (frontend only)
const mockUser = {
  name: "Rahul Sharma",
  email: "rahul.sharma@example.com",
  phone: "",
  addresses: [] as { id: string; label: string; address: string }[],
  orders: [
    { id: "ORD001", date: "2024-01-15", status: "Delivered", total: 1299 },
    { id: "ORD002", date: "2024-01-20", status: "In Transit", total: 899 },
  ],
};

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [user, setUser] = useState(mockUser);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneInput, setPhoneInput] = useState(user.phone);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: "", address: "" });

  const handleSavePhone = () => {
    setUser({ ...user, phone: phoneInput });
    setIsEditingPhone(false);
    toast({ title: "Phone number updated successfully" });
  };

  const handleAddAddress = () => {
    if (!newAddress.label || !newAddress.address) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    const address = { ...newAddress, id: Date.now().toString() };
    setUser({ ...user, addresses: [...user.addresses, address] });
    setNewAddress({ label: "", address: "" });
    setIsAddingAddress(false);
    toast({ title: "Address added successfully" });
  };

  const handleDeleteAddress = (id: string) => {
    setUser({ ...user, addresses: user.addresses.filter(a => a.id !== id) });
    toast({ title: "Address removed" });
  };

  const handleLogout = () => {
    toast({ title: "Logged out successfully" });
    navigate("/");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header Section */}
            <Card className="mb-6 border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl font-semibold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-serif font-semibold text-foreground">
                      Hi, {user.name.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-muted-foreground">Welcome back to Dinkar Ayurveda</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Section */}
            <Card className="mb-4 border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
              </CardContent>
            </Card>

            {/* Phone Section */}
            <Card className="mb-4 border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Mobile Number
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditingPhone ? (
                  <div className="space-y-3">
                    <Input
                      type="tel"
                      placeholder="Enter mobile number"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="max-w-xs"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSavePhone}>Save</Button>
                      <Button size="sm" variant="outline" onClick={() => setIsEditingPhone(false)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-foreground">
                      {user.phone || <span className="text-muted-foreground">No phone number added</span>}
                    </p>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => { setPhoneInput(user.phone); setIsEditingPhone(true); }}
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      {user.phone ? "Edit" : "Add"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Addresses Section */}
            <Card className="mb-4 border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Addresses
                  </CardTitle>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setIsAddingAddress(true)}
                    disabled={isAddingAddress}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isAddingAddress && (
                  <div className="mb-4 p-4 border border-primary/20 rounded-lg bg-primary/5">
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="label">Label (e.g., Home, Office)</Label>
                        <Input
                          id="label"
                          placeholder="Home"
                          value={newAddress.label}
                          onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Full Address</Label>
                        <Input
                          id="address"
                          placeholder="Enter your full address"
                          value={newAddress.address}
                          onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleAddAddress}>Save Address</Button>
                        <Button size="sm" variant="outline" onClick={() => { setIsAddingAddress(false); setNewAddress({ label: "", address: "" }); }}>Cancel</Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {user.addresses.length === 0 && !isAddingAddress ? (
                  <p className="text-muted-foreground">No addresses saved yet</p>
                ) : (
                  <div className="space-y-3">
                    {user.addresses.map((addr) => (
                      <div key={addr.id} className="flex items-start justify-between p-3 bg-secondary/50 rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">{addr.label}</p>
                          <p className="text-sm text-muted-foreground">{addr.address}</p>
                        </div>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteAddress(addr.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Orders Section */}
            <Card className="mb-4 border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  My Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user.orders.length === 0 ? (
                  <p className="text-muted-foreground">No orders yet</p>
                ) : (
                  <div className="space-y-3">
                    {user.orders.map((order) => (
                      <div 
                        key={order.id} 
                        className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg cursor-pointer hover:bg-secondary/70 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-foreground">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="font-medium text-foreground">₹{order.total}</p>
                            <p className={`text-xs ${order.status === 'Delivered' ? 'text-green-600' : 'text-amber-600'}`}>
                              {order.status}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Wishlist Section (Extra) */}
            <Card className="mb-4 border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-foreground">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-foreground">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-foreground">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Notification Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Separator className="my-6" />

            {/* Logout */}
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
