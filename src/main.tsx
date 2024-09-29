import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Navbar from "./navbar";
import Header from "./header";
import ProductTable from "./components/productTable";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Navbar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <ProductTable />
      </div>
    </div>
  </StrictMode>
);
