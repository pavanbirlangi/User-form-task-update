
import { UserFormData } from "@/lib/schemas";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UserForm from "./UserForm";

interface EditUserDialogProps {
  user: UserFormData;
  userIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: UserFormData) => void;
}

const EditUserDialog = ({ user, userIndex, isOpen, onClose, onSave }: EditUserDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit User Details</DialogTitle>
        </DialogHeader>
        <UserForm 
          defaultValues={user}
          editMode={true}
          editIndex={userIndex}
          onSubmitSuccess={(data) => {
            onSave(data);
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
