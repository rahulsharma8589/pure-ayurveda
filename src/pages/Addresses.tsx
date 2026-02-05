 import { useState, useEffect } from "react";
 import { useNavigate } from "react-router-dom";
 import { motion } from "framer-motion";
 import { ArrowLeft, Plus, MapPin, Trash2, Star } from "lucide-react";
 import { Layout } from "@/components/layout/Layout";
 import { Button } from "@/components/ui/button";
 import { Separator } from "@/components/ui/separator";
 import { AddressDialog } from "@/components/profile/AddressDialog";
 import { supabase } from "@/integrations/supabase/client";
 import { useToast } from "@/hooks/use-toast";
 
 interface Address {
   id: string;
   first_name: string;
   last_name: string;
   phone: string;
   full_address: string;
   landmark: string | null;
   city: string;
   pincode: string;
   state: string;
   country: string;
   is_default: boolean;
 }
 
 const Addresses = () => {
   const navigate = useNavigate();
   const { toast } = useToast();
   const [addresses, setAddresses] = useState<Address[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
 
   const fetchAddresses = async () => {
     try {
       const { data: userData } = await supabase.auth.getUser();
       if (!userData.user) {
         navigate("/login");
         return;
       }
 
       const { data, error } = await supabase
         .from("addresses")
         .select("*")
         .eq("user_id", userData.user.id)
         .order("is_default", { ascending: false });
 
       if (error) throw error;
       setAddresses(data || []);
     } catch (error: any) {
       toast({
         title: "Failed to load addresses",
         description: error.message,
         variant: "destructive",
       });
     } finally {
       setIsLoading(false);
     }
   };
 
   useEffect(() => {
     fetchAddresses();
   }, []);
 
   const handleDelete = async (id: string) => {
     try {
       const { error } = await supabase.from("addresses").delete().eq("id", id);
       if (error) throw error;
       toast({ title: "Address deleted" });
       fetchAddresses();
     } catch (error: any) {
       toast({
         title: "Failed to delete address",
         description: error.message,
         variant: "destructive",
       });
     }
   };
 
   const handleSetDefault = async (id: string) => {
     try {
       const { data: userData } = await supabase.auth.getUser();
       if (!userData.user) return;
 
       // First, remove default from all addresses
       await supabase
         .from("addresses")
         .update({ is_default: false })
         .eq("user_id", userData.user.id);
 
       // Then set the selected one as default
       const { error } = await supabase
         .from("addresses")
         .update({ is_default: true })
         .eq("id", id);
 
       if (error) throw error;
       toast({ title: "Default address updated" });
       fetchAddresses();
     } catch (error: any) {
       toast({
         title: "Failed to update",
         description: error.message,
         variant: "destructive",
       });
     }
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
             {/* Header */}
             <div className="flex items-center gap-3 mb-6">
               <Button
                 variant="ghost"
                 size="icon"
                 onClick={() => navigate("/profile")}
               >
                 <ArrowLeft className="h-5 w-5" />
               </Button>
               <h1 className="text-xl font-semibold text-foreground">
                 My Addresses
               </h1>
             </div>
 
             {/* Add Address Button */}
             <Button
               onClick={() => setIsDialogOpen(true)}
               className="w-full mb-6"
               variant="outline"
             >
               <Plus className="h-4 w-4 mr-2" />
               Add New Address
             </Button>
 
             {/* Addresses List */}
             {isLoading ? (
               <div className="text-center py-8 text-muted-foreground">
                 Loading...
               </div>
             ) : addresses.length === 0 ? (
               <div className="text-center py-8">
                 <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                 <p className="text-muted-foreground">No addresses saved</p>
                 <p className="text-sm text-muted-foreground">
                   Add your first delivery address
                 </p>
               </div>
             ) : (
               <div className="space-y-4">
                 {addresses.map((address) => (
                   <motion.div
                     key={address.id}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="border rounded-lg p-4 relative"
                   >
                     {address.is_default && (
                       <span className="absolute top-2 right-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                         Default
                       </span>
                     )}
                     <p className="font-medium">
                       {address.first_name} {address.last_name}
                     </p>
                     <p className="text-sm text-muted-foreground mt-1">
                       {address.full_address}
                       {address.landmark && `, ${address.landmark}`}
                     </p>
                     <p className="text-sm text-muted-foreground">
                       {address.city}, {address.state} - {address.pincode}
                     </p>
                     <p className="text-sm text-muted-foreground">
                       {address.country}
                     </p>
                     <p className="text-sm text-muted-foreground mt-1">
                       Phone: {address.phone}
                     </p>
 
                     <Separator className="my-3" />
 
                     <div className="flex gap-2">
                       {!address.is_default && (
                         <Button
                           variant="ghost"
                           size="sm"
                           onClick={() => handleSetDefault(address.id)}
                         >
                           <Star className="h-4 w-4 mr-1" />
                           Set Default
                         </Button>
                       )}
                       <Button
                         variant="ghost"
                         size="sm"
                         className="text-destructive hover:text-destructive"
                         onClick={() => handleDelete(address.id)}
                       >
                         <Trash2 className="h-4 w-4 mr-1" />
                         Delete
                       </Button>
                     </div>
                   </motion.div>
                 ))}
               </div>
             )}
           </motion.div>
         </div>
       </div>
 
       <AddressDialog
         open={isDialogOpen}
         onOpenChange={setIsDialogOpen}
         onSuccess={fetchAddresses}
       />
     </Layout>
   );
 };
 
 export default Addresses;