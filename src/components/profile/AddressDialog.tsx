 import { useState } from "react";
 import { useForm } from "react-hook-form";
 import { zodResolver } from "@hookform/resolvers/zod";
 import { z } from "zod";
 import { motion, AnimatePresence } from "framer-motion";
 import { X, Loader2 } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
 } from "@/components/ui/dialog";
 import { INDIAN_STATES, COUNTRIES } from "@/constants/indianStates";
 import { supabase } from "@/integrations/supabase/client";
 import { useToast } from "@/hooks/use-toast";
 
 const addressSchema = z.object({
   firstName: z.string().min(1, "First name is required").max(50),
   lastName: z.string().min(1, "Last name is required").max(50),
   phone: z.string().min(10, "Phone must be at least 10 digits").max(15),
   fullAddress: z.string().min(5, "Address is required").max(200),
   landmark: z.string().max(100).optional(),
   city: z.string().min(1, "City is required").max(50),
   pincode: z.string().min(6, "Pincode must be 6 digits").max(6),
   state: z.string().min(1, "State is required"),
   country: z.string().min(1, "Country is required"),
   isDefault: z.boolean().default(false),
 });
 
 type AddressFormData = z.infer<typeof addressSchema>;
 
 interface AddressDialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   onSuccess: () => void;
 }
 
 export const AddressDialog = ({ open, onOpenChange, onSuccess }: AddressDialogProps) => {
   const { toast } = useToast();
   const [isSubmitting, setIsSubmitting] = useState(false);
 
   const {
     register,
     handleSubmit,
     setValue,
     watch,
     reset,
     formState: { errors },
   } = useForm<AddressFormData>({
     resolver: zodResolver(addressSchema),
     defaultValues: {
       country: "India",
       isDefault: false,
     },
   });
 
   const selectedState = watch("state");
   const selectedCountry = watch("country");
 
   const onSubmit = async (data: AddressFormData) => {
     setIsSubmitting(true);
     try {
       const { data: userData, error: userError } = await supabase.auth.getUser();
       
       if (userError || !userData.user) {
         toast({
           title: "Please login to add address",
           variant: "destructive",
         });
         return;
       }
 
       const { error } = await supabase.from("addresses").insert({
         user_id: userData.user.id,
         first_name: data.firstName,
         last_name: data.lastName,
         phone: data.phone,
         full_address: data.fullAddress,
         landmark: data.landmark || null,
         city: data.city,
         pincode: data.pincode,
         state: data.state,
         country: data.country,
         is_default: data.isDefault,
       });
 
       if (error) throw error;
 
       toast({ title: "Address added successfully" });
       reset();
       onSuccess();
       onOpenChange(false);
     } catch (error: any) {
       toast({
         title: "Failed to add address",
         description: error.message,
         variant: "destructive",
       });
     } finally {
       setIsSubmitting(false);
     }
   };
 
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
         <DialogHeader>
           <DialogTitle>Add New Address</DialogTitle>
         </DialogHeader>
 
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
           <div className="grid grid-cols-2 gap-3">
             <div className="space-y-1.5">
               <Label htmlFor="firstName">First Name *</Label>
               <Input
                 id="firstName"
                 {...register("firstName")}
                 placeholder="First name"
               />
               {errors.firstName && (
                 <p className="text-xs text-destructive">{errors.firstName.message}</p>
               )}
             </div>
             <div className="space-y-1.5">
               <Label htmlFor="lastName">Last Name *</Label>
               <Input
                 id="lastName"
                 {...register("lastName")}
                 placeholder="Last name"
               />
               {errors.lastName && (
                 <p className="text-xs text-destructive">{errors.lastName.message}</p>
               )}
             </div>
           </div>
 
           <div className="space-y-1.5">
             <Label htmlFor="phone">Phone Number *</Label>
             <Input
               id="phone"
               type="tel"
               {...register("phone")}
               placeholder="10-digit phone number"
             />
             {errors.phone && (
               <p className="text-xs text-destructive">{errors.phone.message}</p>
             )}
           </div>
 
           <div className="space-y-1.5">
             <Label htmlFor="fullAddress">Full Address *</Label>
             <Input
               id="fullAddress"
               {...register("fullAddress")}
               placeholder="House/Flat No., Building, Street"
             />
             {errors.fullAddress && (
               <p className="text-xs text-destructive">{errors.fullAddress.message}</p>
             )}
           </div>
 
           <div className="space-y-1.5">
             <Label htmlFor="landmark">Landmark (Optional)</Label>
             <Input
               id="landmark"
               {...register("landmark")}
               placeholder="Nearby landmark"
             />
           </div>
 
           <div className="grid grid-cols-2 gap-3">
             <div className="space-y-1.5">
               <Label htmlFor="city">City *</Label>
               <Input
                 id="city"
                 {...register("city")}
                 placeholder="City"
               />
               {errors.city && (
                 <p className="text-xs text-destructive">{errors.city.message}</p>
               )}
             </div>
             <div className="space-y-1.5">
               <Label htmlFor="pincode">Pincode *</Label>
               <Input
                 id="pincode"
                 {...register("pincode")}
                 placeholder="6-digit pincode"
                 maxLength={6}
               />
               {errors.pincode && (
                 <p className="text-xs text-destructive">{errors.pincode.message}</p>
               )}
             </div>
           </div>
 
           <div className="space-y-1.5">
             <Label>State *</Label>
             <Select
               value={selectedState}
               onValueChange={(value) => setValue("state", value)}
             >
               <SelectTrigger>
                 <SelectValue placeholder="Select state" />
               </SelectTrigger>
               <SelectContent>
                 {INDIAN_STATES.map((state) => (
                   <SelectItem key={state} value={state}>
                     {state}
                   </SelectItem>
                 ))}
               </SelectContent>
             </Select>
             {errors.state && (
               <p className="text-xs text-destructive">{errors.state.message}</p>
             )}
           </div>
 
           <div className="space-y-1.5">
             <Label>Country *</Label>
             <Select
               value={selectedCountry}
               onValueChange={(value) => setValue("country", value)}
             >
               <SelectTrigger>
                 <SelectValue placeholder="Select country" />
               </SelectTrigger>
               <SelectContent>
                 {COUNTRIES.map((country) => (
                   <SelectItem key={country} value={country}>
                     {country}
                   </SelectItem>
                 ))}
               </SelectContent>
             </Select>
             {errors.country && (
               <p className="text-xs text-destructive">{errors.country.message}</p>
             )}
           </div>
 
           <div className="flex items-center gap-2">
             <input
               type="checkbox"
               id="isDefault"
               {...register("isDefault")}
               className="h-4 w-4 rounded border-input"
             />
             <Label htmlFor="isDefault" className="text-sm font-normal">
               Set as default address
             </Label>
           </div>
 
           <Button type="submit" className="w-full" disabled={isSubmitting}>
             {isSubmitting ? (
               <>
                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
                 Adding...
               </>
             ) : (
               "Add Address"
             )}
           </Button>
         </form>
       </DialogContent>
     </Dialog>
   );
 };