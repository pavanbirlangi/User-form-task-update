import { UserFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { clearUserData, deleteUserData, updateUserData } from "@/lib/storage-service";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Pencil } from "lucide-react";
import EditUserDialog from "./EditUserDialog";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { phoneFormats } from "@/lib/schemas";

interface UserDataTableProps {
  data: UserFormData[];
  onDataCleared: () => void;
  onDataDeleted: () => void;
  onDataUpdated: () => void;
}

const UserDataTable = ({ data, onDataCleared, onDataDeleted, onDataUpdated }: UserDataTableProps) => {
  const { toast } = useToast();
  const [editingUser, setEditingUser] = useState<{ data: UserFormData; index: number } | null>(null);

  const handleClearData = () => {
    clearUserData();
    toast({
      title: "Data cleared",
      description: "All user data has been removed.",
    });
    onDataCleared();
  };

  const handleDeleteUser = (index: number) => {
    const success = deleteUserData(index);
    if (success) {
      toast({
        title: "Record deleted",
        description: "The user record has been removed.",
      });
      onDataDeleted();
    } else {
      toast({
        title: "Error",
        description: "Failed to delete the user record.",
        variant: "destructive",
      });
    }
  };

  const formatPhoneWithCountryCode = (user: UserFormData) => {
    const countryFormat = phoneFormats[user.countryCode];
    return `${countryFormat.code} ${user.phoneNumber}`;
  };

  const handleEditUser = (userData: UserFormData, index: number) => {
    setEditingUser({ data: userData, index });
  };

  const handleUpdateUser = (updatedData: UserFormData) => {
    if (!editingUser) return;
    
    // Call the callback to refresh data
    onDataUpdated();
  };

  if (data.length === 0) {
    return (
      <Card className="w-full shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-center">Saved User Data</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          <p>No user data available. Submit the form to see data here.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Saved User Data</CardTitle>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={handleClearData}
          className="flex items-center gap-1"
        >
          <Trash2 className="h-4 w-4" />
          Clear All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-auto max-h-96">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((user, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{formatPhoneWithCountryCode(user)}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{user.address}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 hover:text-blue-600 hover:bg-blue-50"
                      onClick={() => handleEditUser(user, index)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Record</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this user record? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteUser(index)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {editingUser && (
        <EditUserDialog
          user={editingUser.data}
          userIndex={editingUser.index}
          isOpen={true}
          onClose={() => setEditingUser(null)}
          onSave={handleUpdateUser}
        />
      )}
    </Card>
  );
};

export default UserDataTable;
