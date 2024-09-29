import { z } from "zod";

export const productSchema = z.object({
  product_name: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be a positive number"),
  discount: z
    .number({ invalid_type_error: "Discount must be a number" })
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%"),
});

export type ProductFormData = z.infer<typeof productSchema>;
