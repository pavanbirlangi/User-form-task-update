import { UserFormData } from "./schemas";

const STORAGE_KEY = "user-form-data";

export const saveUserData = (userData: UserFormData): { success: boolean; error?: string } => {
  try {
    const existingData = getUserData();
    
    // Check for duplicate email
    const duplicateEmail = existingData.find(user => user.email === userData.email);
    if (duplicateEmail) {
      return { 
        success: false, 
        error: "A user with this email already exists."
      };
    }
    
    // Check for duplicate phone number
    const duplicatePhone = existingData.find(user => user.phoneNumber === userData.phoneNumber && user.countryCode === userData.countryCode);
    if (duplicatePhone) {
      return { 
        success: false, 
        error: "A user with this phone number already exists."
      };
    }
    
    // No duplicates found, save the data
    const newData = [...existingData, userData];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    return { success: true };
  } catch (error) {
    console.error("Error saving user data to localStorage:", error);
    return { 
      success: false, 
      error: "Failed to save user data. Please try again."
    };
  }
};

export const getUserData = (): UserFormData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error retrieving user data from localStorage:", error);
    return [];
  }
};

export const deleteUserData = (index: number): boolean => {
  try {
    const existingData = getUserData();
    if (index >= 0 && index < existingData.length) {
      existingData.splice(index, 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting user data from localStorage:", error);
    return false;
  }
};

export const clearUserData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing user data from localStorage:", error);
  }
};

export const updateUserData = (index: number, userData: UserFormData): { success: boolean; error?: string } => {
  try {
    const existingData = getUserData();
    
    // Check for duplicate email, excluding the current record
    const duplicateEmail = existingData.find((user, i) => i !== index && user.email === userData.email);
    if (duplicateEmail) {
      return { 
        success: false, 
        error: "A user with this email already exists."
      };
    }
    
    // Check for duplicate phone number, excluding the current record
    const duplicatePhone = existingData.find((user, i) => 
      i !== index && 
      user.phoneNumber === userData.phoneNumber && 
      user.countryCode === userData.countryCode
    );
    if (duplicatePhone) {
      return { 
        success: false, 
        error: "A user with this phone number already exists."
      };
    }
    
    // No duplicates found, update the data
    existingData[index] = userData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
    return { success: true };
  } catch (error) {
    console.error("Error updating user data in localStorage:", error);
    return { 
      success: false, 
      error: "Failed to update user data. Please try again."
    };
  }
};
