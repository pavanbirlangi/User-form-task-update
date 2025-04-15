
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema, UserFormData, CountryCode } from "@/lib/schemas";
import { saveUserData, updateUserData } from "@/lib/storage-service";
import { useToast } from "@/components/ui/use-toast";

interface UseUserFormProps {
  onSubmitSuccess: (data: UserFormData) => void;
  defaultValues?: UserFormData;
  editMode?: boolean;
  editIndex?: number;
}

export const useUserForm = ({ 
  onSubmitSuccess, 
  defaultValues,
  editMode = false,
  editIndex = -1
}: UseUserFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: defaultValues || {
      firstName: "",
      lastName: "",
      countryCode: "US",
      phoneNumber: "",
      email: "",
      address: "",
    },
  });

  const watchCountryCode = form.watch("countryCode") as CountryCode;

  const onSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      let result;
      
      if (editMode && editIndex >= 0) {
        // Update existing user
        result = updateUserData(editIndex, data);
      } else {
        // Save new user
        result = saveUserData(data);
      }
      
      if (result.success) {
        // Send data back to parent component
        onSubmitSuccess(data);
        
        if (!editMode) {
          // Only show success toast for new submissions
          toast({
            title: "Form submitted successfully!",
            description: "Your information has been saved.",
          });
          
          // Reset form only for new submissions
          form.reset();
        }
      } else {
        // Show error message
        toast({
          title: "Submission failed",
          description: result.error || "There was an error processing your request.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your form submission failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    watchCountryCode,
    onSubmit,
  };
};
