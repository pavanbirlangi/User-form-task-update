
import { useState, useEffect } from "react";
import UserForm from "@/components/UserForm";
import UserDataTable from "@/components/UserDataTable";
import { getUserData } from "@/lib/storage-service";
import { UserFormData } from "@/lib/schemas";

const Index = () => {
  const [userData, setUserData] = useState<UserFormData[]>([]);
  
  const loadUserData = () => {
    const data = getUserData();
    setUserData(data);
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-center text-primary mb-2">
            User Information System
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Enter your details below and submit the form.
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <UserForm onSubmitSuccess={loadUserData} />
          </div>
          
          <div className="flex justify-center">
            <UserDataTable 
              data={userData} 
              onDataCleared={() => setUserData([])} 
              onDataDeleted={loadUserData}
              onDataUpdated={loadUserData} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
