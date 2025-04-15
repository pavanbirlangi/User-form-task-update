
import { z } from "zod";

// Define phone number formats for different countries
export const phoneFormats = {
  US: { code: "+1", pattern: /^\d{10}$/, example: "1234567890 (10 digits)" },
  UK: { code: "+44", pattern: /^\d{10}$/, example: "7700900000 (10 digits)" },
  IN: { code: "+91", pattern: /^\d{10}$/, example: "9876543210 (10 digits)" },
  CA: { code: "+1", pattern: /^\d{10}$/, example: "4165550199 (10 digits)" },
  AU: { code: "+61", pattern: /^\d{9}$/, example: "412345678 (9 digits)" },
  DE: { code: "+49", pattern: /^\d{10,11}$/, example: "15123456789 (10-11 digits)" },
  FR: { code: "+33", pattern: /^\d{9}$/, example: "612345678 (9 digits)" },
  JP: { code: "+81", pattern: /^\d{10}$/, example: "9012345678 (10 digits)" },
  CN: { code: "+86", pattern: /^\d{11}$/, example: "13123456789 (11 digits)" },
  BR: { code: "+55", pattern: /^\d{10,11}$/, example: "21987654321 (10-11 digits)" },
};

export type CountryCode = keyof typeof phoneFormats;

export const userFormSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must be less than 50 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must be less than 50 characters" }),
  countryCode: z.enum(Object.keys(phoneFormats) as [CountryCode, ...CountryCode[]]),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required" })
    .refine((val) => /^\d+$/.test(val), { 
      message: "Phone number must contain only digits" 
    }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  address: z
    .string()
    .min(1, { message: "Address is required" })
    .max(500, { message: "Address must be less than 500 characters" }),
}).refine((data) => {
  const format = phoneFormats[data.countryCode as CountryCode];
  return format.pattern.test(data.phoneNumber);
}, {
  message: "Invalid phone number format for selected country",
  path: ["phoneNumber"]
});

export type UserFormData = z.infer<typeof userFormSchema>;
