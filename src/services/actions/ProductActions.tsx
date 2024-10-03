"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const ProductActions = ({ productId }: { productId: string }) => {
  const [loading, setLoading] = useState(false);

  const handleProductDelete = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        toast.success("Product deleted successfully");
        window.location.reload(); // or use router.push for better navigation control
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={() => handleProductDelete(productId)}
      size="icon"
      variant="destructive"
      disabled={loading}
    >
      <Trash2 />
    </Button>
  );
};

export default ProductActions;
