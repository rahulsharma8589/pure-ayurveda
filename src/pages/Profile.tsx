import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Package, LogOut, ChevronRight, Edit2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Mock user data (frontend only)
const mockUser = {
  name: "Rahul Sharma",
  email: "rahul.sharma@example.com",
  phone: "",
};

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [user, setUser] = useState(mockUser);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneInput, setPhoneInput] = useState(user.phone);

  const handleSavePhone = () => {
    setUser({ ...user, phone: phoneInput });
    setIsEditingPhone(false);
    toast({ title: "Phone number updated" });
  };

  const handleLogout = () => {
    toast({ title: "Logged out successfully" });
    navigate("/");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background py-6 md:py-10">
        <div className="container mx-auto px-4 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Greeting */}
            <h1 className="text-2xl font-semibold text-foreground mb-6">
              Hi, {user.name}
            </h1>

            {/* Email */}
            <div className="flex items-center gap-3 py-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span className="text-foreground">{user.email}</span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 py-2">
              <Phone className="h-5 w-5 text-muted-foreground" />
              {isEditingPhone ? (
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    type="tel"
                    placeholder="Enter mobile number"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="max-w-[200px] h-8"
                  />
                  <Button size="sm" variant="ghost" onClick={handleSavePhone}>Save</Button>
                  <Button size="sm" variant="ghost" onClick={() => setIsEditingPhone(false)}>Cancel</Button>
                </div>
              ) : (
                <div className="flex items-center justify-between flex-1">
                  <span className="text-foreground">
                    {user.phone || <span className="text-muted-foreground">Add mobile number</span>}
                  </span>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8"
                    onClick={() => { setPhoneInput(user.phone); setIsEditingPhone(true); }}
                  >
                    <Edit2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              )}
            </div>

            <Separator className="my-4" />

            {/* Addresses */}
            <button className="flex items-center justify-between w-full py-4 hover:bg-muted/50 transition-colors rounded-lg px-1">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span className="text-foreground font-medium">Addresses</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>

            <Separator />

            {/* My Orders */}
            <button className="flex items-center justify-between w-full py-4 hover:bg-muted/50 transition-colors rounded-lg px-1">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-muted-foreground" />
                <div className="text-left">
                  <span className="text-foreground font-medium block">My Orders</span>
                  <span className="text-sm text-muted-foreground">No orders found</span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>

            <Separator />

            {/* Logout */}
            <button 
              className="flex items-center gap-3 w-full py-4 mt-4"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 text-destructive" />
              <span className="text-destructive font-medium">Logout</span>
            </button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
