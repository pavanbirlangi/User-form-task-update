
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { UserFormData, phoneFormats, CountryCode } from "@/lib/schemas";

interface ContactInfoFieldsProps {
  control: Control<UserFormData>;
  watchCountryCode: CountryCode;
}

const ContactInfoFields = ({ control, watchCountryCode }: ContactInfoFieldsProps) => {
  const selectedFormat = phoneFormats[watchCountryCode];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={control}
          name="countryCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(phoneFormats).map(([code, data]) => (
                    <SelectItem key={code} value={code}>
                      {code} ({data.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input 
                  placeholder={selectedFormat.example}
                  {...field} 
                  onChange={(e) => {
                    // Allow only digits
                    const value = e.target.value.replace(/\D/g, "");
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Format: {selectedFormat.code} + {selectedFormat.example}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input 
                type="email"
                placeholder="john.doe@example.com" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ContactInfoFields;
