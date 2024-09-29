// src/components/ProductTable.tsx

"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { api } from "@/lib/axios";
import axios from "axios";
import { Button } from "./ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Product = {
  id: number;
  product_name: string;
  category: string;
  price: number;
  discount: number;
};

type ApiResponse = Product[] | { results: Product[] };

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getProducts = async () => {
    try {
      const res = await api.get<ApiResponse>("/");
      console.log("API Response:", res.data);

      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else if (res.data.results && Array.isArray(res.data.results)) {
        setProducts(res.data.results);
      } else {
        throw new Error("Struktur data API tidak dikenali.");
      }
    } catch (err: unknown) {
      setError("Gagal memuat produk.");
      if (axios.isAxiosError(err)) {
        // Error khusus Axios
        console.error(
          "Error fetching products:",
          err.response?.data || err.message
        );
      } else if (err instanceof Error) {
        // Error umum
        console.error("Error fetching products:", err.message);
      } else {
        // Error lainnya
        console.error("Error fetching products:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    console.log("Products state updated:", products);
  }, [products]);

  if (loading) {
    return (
      <main className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex items-center justify-center h-screen">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="text-right">
          <a href="#">
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </a>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage your products</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Category
                    </TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Discount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.product_name}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell font-medium">
                        {product.category}
                      </TableCell>
                      <TableCell className="md:table-cell">
                        ${product.price}
                      </TableCell>
                      <TableCell className="md:table-cell">
                        {product.discount}%
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>{products.length}</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
