
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PersonalInfoFields from "./form/PersonalInfoFields";
import ContactInfoFields from "./form/ContactInfoFields";
import AddressField from "./form/AddressField";
import { useUserForm } from "./form/useUserForm";
import { UserFormData } from "@/lib/schemas";

interface UserFormProps {
  onSubmitSuccess: (data: UserFormData) => void;
  defaultValues?: UserFormData;
  editMode?: boolean;
  editIndex?: number;
}

const UserForm = ({ 
  onSubmitSuccess, 
  defaultValues,
  editMode = false,
  editIndex = -1
}: UserFormProps) => {
  const { form, isSubmitting, watchCountryCode, onSubmit } = useUserForm({ 
    onSubmitSuccess,
    defaultValues,
    editMode,
    editIndex
  });

  return (
    <Card className={defaultValues ? "shadow-none border-0" : "w-full max-w-lg shadow-lg"}>
      <CardHeader className={defaultValues ? "px-0" : undefined}>
        <CardTitle className="text-2xl text-center">
          {defaultValues ? "Update Information" : "User Information"}
        </CardTitle>
      </CardHeader>
      <CardContent className={defaultValues ? "px-0" : undefined}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <PersonalInfoFields control={form.control} />
            <ContactInfoFields 
              control={form.control} 
              watchCountryCode={watchCountryCode} 
            />
            <AddressField control={form.control} />

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : defaultValues ? "Save Changes" : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserForm;
