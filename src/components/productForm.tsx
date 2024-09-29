"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormData } from "@/schemas/productSchema";
import { api } from "@/lib/axios";
import axios from "axios";
import { useState } from "react";

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);
    try {
      const response = await api.post("/", data);
      if (response.status === 201 || response.status === 200) {
        setSubmitSuccess("Product added successfully!");
        reset();
      } else {
        setSubmitError("An error occurred while sending data.");
      }
    } catch (error: unknown) {
      setSubmitError(
        axios.isAxiosError(error)
          ? error.response?.data?.message ||
              "An error occurred while sending data."
          : "An error occurred while sending data."
      );
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="product_name"
          className="block text-sm font-medium text-gray-700"
        >
          Product Name
        </label>
        <input
          id="product_name"
          type="text"
          {...register("product_name")}
          className={`mt-1 block w-full rounded-md border ${
            errors.product_name ? "border-red-500" : "border-gray-300"
          } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
        />
        {errors.product_name && (
          <p className="mt-1 text-sm text-red-600">
            {errors.product_name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <input
          id="category"
          type="text"
          {...register("category")}
          className={`mt-1 block w-full rounded-md border ${
            errors.category ? "border-red-500" : "border-gray-300"
          } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
        />
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
          className={`mt-1 block w-full rounded-md border ${
            errors.price ? "border-red-500" : "border-gray-300"
          } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="discount"
          className="block text-sm font-medium text-gray-700"
        >
          Discount (%)
        </label>
        <input
          id="discount"
          type="number"
          step="1"
          {...register("discount", { valueAsNumber: true })}
          className={`mt-1 block w-full rounded-md border ${
            errors.discount ? "border-red-500" : "border-gray-300"
          } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
        />
        {errors.discount && (
          <p className="mt-1 text-sm text-red-600">{errors.discount.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>

      {submitSuccess && (
        <div className="p-4 text-sm text-green-700 bg-green-100 rounded-md">
          {submitSuccess}
        </div>
      )}

      {submitError && (
        <div className="p-4 text-sm text-red-700 bg-red-100 rounded-md">
          {submitError}
        </div>
      )}
    </form>
  );
}
