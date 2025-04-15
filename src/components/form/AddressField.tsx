
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { UserFormData } from "@/lib/schemas";

interface AddressFieldProps {
  control: Control<UserFormData>;
}

const AddressField = ({ control }: AddressFieldProps) => {
  return (
    <FormField
      control={control}
      name="address"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Address</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="123 Main St, City, Country" 
              className="min-h-[100px]"
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AddressField;
